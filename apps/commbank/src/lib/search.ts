export type SearchDoc = {
  title: string;
  description: string;
  to: string;
  category: string;
  keywords?: string[];
};

function tokenise(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9%$.]+/)
    .filter(Boolean);
}

/**
 * Ranked substring match. Title hits outweigh description hits so "smart access" surfaces the
 * account page rather than every page that happens to mention it.
 */
export function searchDocs(docs: SearchDoc[], query: string): SearchDoc[] {
  const terms = tokenise(query);
  if (terms.length === 0) return [];

  return docs
    .map((doc) => {
      const title = doc.title.toLowerCase();
      const description = doc.description.toLowerCase();
      const keywords = (doc.keywords ?? []).join(" ").toLowerCase();

      let score = 0;
      for (const term of terms) {
        if (title.includes(term)) score += 6;
        if (keywords.includes(term)) score += 3;
        if (description.includes(term)) score += 2;
        if (doc.category.toLowerCase().includes(term)) score += 1;
      }
      return { doc, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
    .map((entry) => entry.doc);
}

export function matchesQuery(haystack: string[], query: string): boolean {
  const terms = tokenise(query);
  if (terms.length === 0) return true;
  const blob = haystack.join(" ").toLowerCase();
  return terms.every((term) => blob.includes(term));
}
