import { articles } from "@/data/articles";
import { branches } from "@/data/branches";
import { faqs } from "@/data/faqs";
import { products } from "@/data/products";

export type SearchResult = {
  id: string;
  title: string;
  summary: string;
  to: string;
  kind: "Product" | "Support" | "Newsroom" | "Locate us";
};

const index: SearchResult[] = [
  ...products.map((product) => ({
    id: `product-${product.slug}`,
    title: product.name,
    summary: product.summary,
    to: `/products/${product.slug}`,
    kind: "Product" as const,
  })),
  ...faqs.map((faq) => ({
    id: `faq-${faq.id}`,
    title: faq.question,
    summary: faq.answer,
    to: `/support?category=${encodeURIComponent(faq.category)}`,
    kind: "Support" as const,
  })),
  ...articles.map((article) => ({
    id: `article-${article.slug}`,
    title: article.title,
    summary: article.standfirst,
    to: `/newsroom/${article.slug}`,
    kind: "Newsroom" as const,
  })),
  ...branches.map((branch) => ({
    id: `branch-${branch.id}`,
    title: `${branch.name} ${branch.type}`,
    summary: `${branch.address}, ${branch.suburb} ${branch.state} ${branch.postcode}`,
    to: "/locate-us",
    kind: "Locate us" as const,
  })),
];

export function searchSite(query: string): SearchResult[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  return index.filter(
    (entry) =>
      entry.title.toLowerCase().includes(needle) || entry.summary.toLowerCase().includes(needle),
  );
}
