import { articles } from "@/data/articles";
import { caseStudies } from "@/data/caseStudies";
import { industries, solutions } from "@/data/industries";
import { integrations } from "@/data/integrations";
import { jobs } from "@/data/jobs";
import { products } from "@/data/products";

export type SearchResult = {
  kind: "Product" | "Solution" | "Industry" | "Article" | "Case study" | "Job" | "Integration";
  title: string;
  description: string;
  to: string;
  haystack: string;
};

function buildIndex(): SearchResult[] {
  return [
    ...products.map((product) => ({
      kind: "Product" as const,
      title: product.name,
      description: product.summary,
      to: `/products/${product.slug}`,
      haystack: `${product.name} ${product.tagline} ${product.summary} ${product.category}`,
    })),
    ...solutions.map((solution) => ({
      kind: "Solution" as const,
      title: solution.name,
      description: solution.blurb,
      to: `/solutions/${solution.slug}`,
      haystack: `${solution.name} ${solution.blurb}`,
    })),
    ...industries.map((industry) => ({
      kind: "Industry" as const,
      title: industry.name,
      description: industry.blurb,
      to: `/industry/${industry.slug}`,
      haystack: `${industry.name} ${industry.blurb} ${industry.award}`,
    })),
    ...articles.map((article) => ({
      kind: "Article" as const,
      title: article.title,
      description: article.excerpt,
      to: `/blog/${article.slug}`,
      haystack: `${article.title} ${article.excerpt} ${article.category} ${article.author}`,
    })),
    ...caseStudies.map((study) => ({
      kind: "Case study" as const,
      title: study.company,
      description: study.challenge,
      to: `/case-studies/${study.slug}`,
      haystack: `${study.company} ${study.industry} ${study.challenge} ${study.solution}`,
    })),
    ...jobs.map((job) => ({
      kind: "Job" as const,
      title: `${job.title} — ${job.company}`,
      description: job.summary,
      to: `/jobs/${job.slug}`,
      haystack: `${job.title} ${job.company} ${job.location} ${job.category} ${job.summary}`,
    })),
    ...integrations.map((integration) => ({
      kind: "Integration" as const,
      title: integration.name,
      description: integration.description,
      to: "/integrations",
      haystack: `${integration.name} ${integration.category} ${integration.description}`,
    })),
  ];
}

const index = buildIndex();

export function searchSite(query: string): SearchResult[] {
  const term = query.trim().toLowerCase();
  if (!term) return [];

  const words = term.split(/\s+/);
  return index.filter((entry) => {
    const haystack = entry.haystack.toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}
