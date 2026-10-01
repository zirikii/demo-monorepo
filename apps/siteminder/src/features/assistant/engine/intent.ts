import { allNodes } from "../flows";
import type { RenderedOption } from "./conversation";

export type IntentMatch =
  | { kind: "option"; option: RenderedOption; score: number }
  | { kind: "step"; stepId: string; score: number; reason: "safety" | "keyword" };

const STOPWORDS = new Set([
  "a",
  "an",
  "the",
  "i",
  "im",
  "my",
  "me",
  "to",
  "is",
  "it",
  "of",
  "on",
  "for",
  "and",
  "or",
  "please",
  "can",
  "you",
  "do",
  "want",
  "would",
  "like",
  "need",
  "just",
  "with",
  "in",
  "at",
  "this",
  "that",
  "be",
]);

/** Lowercases, drops apostrophes (so "can't" == "cant") and turns punctuation into spaces. */
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

/** Safety intents win over everything else, including the current step's options and routing. */
const SAFETY_PATTERN =
  /\b(hurt|injured|injury|unsafe|not safe|in danger|dangerous|assault(ed)?|attacked|harass(ed|ing|ment)?|threaten(ed|ing)?|violent|bleeding|collapsed|fainted|unconscious|can'?t breathe|on fire|fire in the)\b/;

const AFFIRMATIVE =
  /^(yes|yeah|yep|yup|sure|ok|okay|please do|go ahead|do it|sounds good|confirm)\b/;
const NEGATIVE = /^(no|nope|nah|not now|not really|maybe later)\b/;

/** Record options read "Name · detail"; the hotelier will usually just say the name. */
function matchText(option: RenderedOption): string {
  return option.recordId ? (option.label.split(" · ")[0] ?? option.label) : option.label;
}

function matchOption(
  text: string,
  options: RenderedOption[],
): { option: RenderedOption; score: number } | undefined {
  const norm = normalise(text);
  if (AFFIRMATIVE.test(norm)) {
    const yes = options.find((o) => /^(yes|thanks|okay)\b/i.test(o.label));
    if (yes) return { option: yes, score: 1 };
  }
  if (NEGATIVE.test(norm)) {
    const no = options.find((o) => /^(no|not|maybe later|keep|i'll)/i.test(o.label));
    if (no) return { option: no, score: 1 };
  }

  const said = new Set(contentTokens(text));
  let best: { option: RenderedOption; score: number } | undefined;
  for (const option of options) {
    const label = matchText(option);
    if (normalise(label) === norm || normalise(option.label) === norm) return { option, score: 1 };
    const labelTokens = contentTokens(label);
    if (labelTokens.length === 0) continue;
    const overlap = labelTokens.filter((t) => said.has(t)).length;
    // Naming any word of a record is enough to pick between the property's own records.
    const score =
      option.recordId && overlap > 0
        ? Math.max(0.6, overlap / labelTokens.length)
        : overlap / labelTokens.length;
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

export function isSafetyConcern(text: string): boolean {
  return SAFETY_PATTERN.test(normalise(text));
}

/**
 * Maps free text (typed or spoken) to where the conversation should go next.
 * Order: safety → strong match on the live options → global keywords → weak option match.
 */
export function resolveIntent(
  text: string,
  currentStepId: string | null,
  options: RenderedOption[],
): IntentMatch | null {
  const norm = normalise(text);
  if (!norm) return null;

  if (isSafetyConcern(text))
    return { kind: "step", stepId: "safety", score: 100, reason: "safety" };

  const optionMatch = options.length ? matchOption(text, options) : undefined;
  if (optionMatch && optionMatch.score >= 0.6) return { kind: "option", ...optionMatch };

  const keyword = matchKeywords(text);
  if (keyword && keyword.stepId !== currentStepId)
    return { kind: "step", ...keyword, reason: "keyword" };

  if (optionMatch && optionMatch.score >= 0.34) return { kind: "option", ...optionMatch };
  if (keyword) return { kind: "step", ...keyword, reason: "keyword" };
  return null;
}
