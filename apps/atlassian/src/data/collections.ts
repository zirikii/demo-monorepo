import type { Collection } from "./types";

export const COLLECTIONS: Collection[] = [
  {
    slug: "teamwork",
    name: "Teamwork",
    eyebrow: "The teamwork platform for the AI era",
    headline: "Turn scattered tools into a seamless system",
    body: "AI orchestration, planning, knowledge, and delivery in one collection — Jira, Confluence, Loom, and Rovo on a secure platform.",
    includes: ["Jira", "Confluence", "Loom", "Rovo"],
    productSlugs: ["jira", "confluence", "loom", "rovo"],
    accent: "from-atl-blue to-atl-blue-night",
  },
  {
    slug: "strategy",
    name: "Strategy",
    eyebrow: "Optimize strategy and outcomes confidently",
    headline: "Connect goals, people, and funding to delivery",
    body: "Focus, Talent, and Jira Align help decision-makers close the gap between strategy and the work happening this sprint.",
    includes: ["Focus", "Talent", "Jira Align"],
    productSlugs: ["focus", "talent", "jira-align"],
    accent: "from-jpd to-atl-navy",
  },
  {
    slug: "service",
    name: "Service",
    eyebrow: "Deliver service at high velocity",
    headline: "IT, operations, and customers on one platform",
    body: "Jira Service Management, Customer Service Management, and Assets give every request the context it needs.",
    includes: ["Jira Service Management", "Customer Service Management", "Assets"],
    productSlugs: ["jira-service-management", "customer-service-management", "assets"],
    accent: "from-jsm to-atl-blue-night",
  },
  {
    slug: "software",
    name: "Software",
    eyebrow: "Ship high-quality software fast",
    headline: "An AI-native path from idea to production",
    body: "Rovo Dev, DX, Pipelines, and Bitbucket keep developers in flow while quality and speed stay visible.",
    includes: ["Rovo Dev", "DX", "Pipelines", "Bitbucket"],
    productSlugs: ["rovo-dev", "dx", "pipelines", "bitbucket"],
    accent: "from-rovo to-atl-navy",
  },
  {
    slug: "product",
    name: "Product",
    eyebrow: "Build products with confidence",
    headline: "Discovery that stays honest about delivery",
    body: "Jira Product Discovery, Feedback, and Rovo turn insights into roadmaps that are already tied to Jira work.",
    includes: ["Jira Product Discovery", "Feedback", "Rovo"],
    productSlugs: ["jira-product-discovery", "feedback", "rovo"],
    accent: "from-loom to-atl-navy",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((collection) => collection.slug === slug);
}
