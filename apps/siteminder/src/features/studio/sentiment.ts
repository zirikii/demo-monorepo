const NEGATIVE: Record<string, number> = {
  angry: -0.8,
  furious: -1,
  ridiculous: -0.8,
  useless: -0.9,
  terrible: -0.9,
  worst: -1,
  disgrace: -1,
  disgusting: -1,
  pathetic: -0.9,
  joke: -0.6,
  scam: -0.9,
  frustrated: -0.7,
  frustrating: -0.7,
  annoyed: -0.6,
  unacceptable: -0.9,
  rubbish: -0.8,
  hopeless: -0.8,
  never: -0.3,
  still: -0.2,
  again: -0.25,
  waiting: -0.3,
  "not happy": -0.8,
  "fed up": -0.9,
  "sick of": -0.8,
  "waste of": -0.7,
  wtf: -0.9,
};

const POSITIVE: Record<string, number> = {
  thanks: 0.5,
  thank: 0.5,
  great: 0.7,
  awesome: 0.8,
  perfect: 0.8,
  love: 0.7,
  brilliant: 0.8,
  helpful: 0.6,
  legend: 0.7,
  easy: 0.4,
  sorted: 0.5,
};

/** Tiny lexicon scorer (−1…1) — good enough for routing demos without calling a model. */
export function scoreSentiment(text: string): number {
  const norm = ` ${text.toLowerCase().replace(/[^a-z' ]+/g, " ").replace(/\s+/g, " ")} `;
  let score = 0;
  let hits = 0;
  for (const [term, weight] of [...Object.entries(NEGATIVE), ...Object.entries(POSITIVE)]) {
    if (norm.includes(` ${term} `)) {
      score += weight;
      hits++;
    }
  }
  if (/!{2,}/.test(text) || (text.length > 8 && text === text.toUpperCase() && /[A-Z]/.test(text))) {
    score -= 0.4;
    hits++;
  }
  if (hits === 0) return 0;
  return Math.max(-1, Math.min(1, score / Math.sqrt(hits)));
}
