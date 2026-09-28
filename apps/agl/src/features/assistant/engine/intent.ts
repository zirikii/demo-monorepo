import { allNodes, getNode } from "../flows";
import type { FlowOption } from "../flows";

export type IntentMatch =
  | { kind: "option"; option: FlowOption; score: number }
  | { kind: "step"; stepId: string; score: number; reason: "safety" | "keyword" };

const STOPWORDS = new Set([
  "a", "an", "the", "i", "im", "my", "me", "to", "is", "it", "of", "on", "for", "and", "or", "please",
  "can", "you", "do", "want", "would", "like", "need", "just", "with", "in", "at", "this", "that", "be",
]);

/** Lowercases, drops apostrophes (so "isn't" == "isnt") and turns punctuation into spaces. */
export function normalise(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’'`]/g, "")
    .replace(/[^a-z0-9$.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function contentTokens(text: string): string[] {
  return normalise(text)
    .split(" ")
    .filter((t) => t && !STOPWORDS.has(t));
}

function containsPhrase(haystack: string, phrase: string): boolean {
  return ` ${haystack} `.includes(` ${normalise(phrase)} `);
}

/** Safety intents win over everything else, including the current step's options. */
const SAFETY_RULES: { pattern: RegExp; stepId: string }[] = [
  { pattern: /\b(smell(s|ing)?( of| like)? gas|gas leak|leaking gas|gas smell)\b/, stepId: "emergency.gas" },
  { pattern: /\b(fire|sparks?|sparking|electrocuted|electric shock|smoke|dangerous|danger)\b/, stepId: "emergency" },
];

const AFFIRMATIVE = /^(yes|yeah|yep|yup|sure|ok|okay|please do|go ahead|do it|sounds good|confirm)\b/;
const NEGATIVE = /^(no|nope|nah|not now|not really|maybe later)\b/;

function matchOption(text: string, options: FlowOption[]): { option: FlowOption; score: number } | undefined {
  const norm = normalise(text);
  if (AFFIRMATIVE.test(norm)) {
    const yes = options.find((o) => /^yes\b/i.test(o.label));
    if (yes) return { option: yes, score: 1 };
  }
  if (NEGATIVE.test(norm)) {
    const no = options.find((o) => /^(no|not|maybe later|leave|keep|i'll stay|i'll call)/i.test(o.label));
    if (no) return { option: no, score: 1 };
  }

  const said = new Set(contentTokens(text));
  let best: { option: FlowOption; score: number } | undefined;
  for (const option of options) {
    if (normalise(option.label) === norm) return { option, score: 1 };
    const labelTokens = contentTokens(option.label);
    if (labelTokens.length === 0) continue;
    const overlap = labelTokens.filter((t) => said.has(t)).length;
    const score = overlap / labelTokens.length;
    if (overlap > 0 && (!best || score > best.score)) best = { option, score };
  }
  return best;
}

function matchKeywords(text: string): { stepId: string; score: number } | undefined {
  const norm = normalise(text);
  let best: { stepId: string; score: number } | undefined;
  for (const node of allNodes) {
    if (!node.keywords) continue;
    let score = 0;
    for (const keyword of node.keywords) {
      if (containsPhrase(norm, keyword)) score += normalise(keyword).split(" ").length * 10;
    }
    if (score > 0 && (!best || score > best.score)) best = { stepId: node.id, score };
  }
  return best;
}

/**
 * Maps free text (typed or spoken) to where the conversation should go next.
 * Order: safety → strong match on the current step's options → global keywords → weak option match.
 */
export function resolveIntent(text: string, currentStepId: string | null): IntentMatch | null {
  const norm = normalise(text);
  if (!norm) return null;

  for (const rule of SAFETY_RULES) {
    if (rule.pattern.test(norm)) return { kind: "step", stepId: rule.stepId, score: 100, reason: "safety" };
  }

  const options = (currentStepId && getNode(currentStepId)?.options) || [];
  const optionMatch = options.length ? matchOption(text, options) : undefined;
  if (optionMatch && optionMatch.score >= 0.6) return { kind: "option", ...optionMatch };

  const keyword = matchKeywords(text);
  if (keyword && keyword.stepId !== currentStepId) return { kind: "step", ...keyword, reason: "keyword" };

  if (optionMatch && optionMatch.score >= 0.34) return { kind: "option", ...optionMatch };
  if (keyword) return { kind: "step", ...keyword, reason: "keyword" };
  return null;
}
