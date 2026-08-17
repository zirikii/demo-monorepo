import { AUDIENCES } from "@/data/audiences";
import { INSIGHTS } from "@/data/insights";
import { PRODUCTS } from "@/data/products";
import { PRODUCT_DOCUMENTS } from "@/data/documents";

export interface SearchResult {
  title: string;
  to: string;
  kind: "Product" | "Audience" | "Insight" | "Document";
  excerpt: string;
}

const INDEX: SearchResult[] = [
  ...PRODUCTS.map((product) => ({
    title: product.name,
    to: `/product/${product.slug}/`,
    kind: "Product" as const,
    excerpt: product.summary,
  })),
  ...AUDIENCES.map((audience) => ({
    title: audience.title,
    to: audience.path,
    kind: "Audience" as const,
    excerpt: audience.intro,
  })),
  ...INSIGHTS.map((insight) => ({
    title: insight.title,
    to: `/insights/${insight.slug}/`,
    kind: "Insight" as const,
    excerpt: insight.excerpt,
  })),
  ...PRODUCT_DOCUMENTS.map((document) => ({
    title: document.name,
    to: "/product-documents/",
    kind: "Document" as const,
    excerpt: `${document.type} · ${document.product}`,
  })),
];

export function searchSite(query: string): SearchResult[] {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .map((term) => term.trim())
    .filter(Boolean);

  if (terms.length === 0) return [];

  return INDEX.filter((entry) => {
    const haystack = `${entry.title} ${entry.excerpt} ${entry.kind}`.toLowerCase();
    return terms.every((term) => haystack.includes(term));
  }).slice(0, 30);
}
