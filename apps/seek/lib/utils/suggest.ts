/**
 * Filter a list of keyword suggestions for a search query, SEEK-style.
 *
 * Matching is case-insensitive. Prefix matches rank above mid-string matches so
 * the most relevant completions surface first; ties keep the source order.
 * An empty/whitespace query returns no suggestions (the dropdown stays closed).
 */
export function filterKeywordSuggestions(
  query: string,
  suggestions: string[],
  limit = 8,
): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const prefix: string[] = [];
  const contains: string[] = [];

  for (const s of suggestions) {
    const lower = s.toLowerCase();
    if (lower === q) continue;
    if (lower.startsWith(q)) prefix.push(s);
    else if (lower.includes(q)) contains.push(s);
  }

  return [...prefix, ...contains].slice(0, Math.max(0, limit));
}
