import type { Solution } from "./types";

export const SOLUTIONS: Solution[] = [
  {
    slug: "software",
    name: "Software teams",
    audience: "Developers",
    headline: "Plan, build, and ship in one system of work",
    intro:
      "Boards, pull requests, incidents, and docs share context so engineers spend less time translating status and more time shipping.",
    outcomes: [
      "Work items stay linked to PRs, deploys, and incidents",
      "Rovo Dev stays in the editor instead of another chat window",
      "On-call sees the change that caused the page",
    ],
    productSlugs: ["jira", "bitbucket", "rovo", "jira-service-management"],
    stat: { value: "85%", label: "of wasted engineering time redirected toward innovation" },
  },
  {
    slug: "it",
    name: "IT teams",
    audience: "IT Professionals",
    headline: "Service that already knows the rest of the business",
    intro:
      "Requests, assets, and changes sit on the same graph as projects and knowledge — so agents and people resolve with context.",
    outcomes: [
      "Virtual agents answer from Confluence, not a separate knowledge base",
      "Changes and incidents share a timeline with Jira delivery",
      "Assets stay visible when something breaks",
    ],
    productSlugs: ["jira-service-management", "confluence", "jira", "rovo"],
    stat: { value: "100+", label: "hours saved per week eliminating repetitive questions" },
  },
  {
    slug: "product",
    name: "Product managers",
    audience: "Product Managers",
    headline: "From insight to shipped — without a second tracker",
    intro:
      "Capture feedback, score opportunities, and promote committed work into Jira. Roadmaps stay current because they sit on delivery.",
    outcomes: [
      "Ideas carry evidence, not just opinions",
      "Quarterly roadmaps take a fraction of the time",
      "Delivery teams inherit the why, not a slide",
    ],
    productSlugs: ["jira-product-discovery", "jira", "confluence", "rovo"],
    stat: { value: "75%", label: "reduction in time spent writing quarterly roadmaps" },
  },
  {
    slug: "business",
    name: "Business teams",
    audience: "Business Teams",
    headline: "Marketing, HR, legal, and ops on the same platform",
    intro:
      "Jira, Confluence, and Loom are not only for engineers. Business teams plan campaigns, policies, and launches with the same graph.",
    outcomes: [
      "Campaigns and launches share goals with product",
      "Policies live in Confluence and show up in Rovo search",
      "Looms replace status meetings across time zones",
    ],
    productSlugs: ["jira", "confluence", "loom", "trello"],
    stat: { value: "500k+", label: "in time reclaimed and 4,000+ meetings avoided in five months" },
  },
  {
    slug: "leadership",
    name: "Leadership",
    audience: "Leadership",
    headline: "Strategy connected to the work happening this week",
    intro:
      "Focus areas, funding, and goals roll down to Jira work. Reports that used to take a week become a Rovo prompt.",
    outcomes: [
      "Goals stay linked to work items, not a separate OKR tool",
      "Reporting is generated from the graph, not assembled in slides",
      "Portfolio risk is visible before the quarterly review",
    ],
    productSlugs: ["jira", "jira-product-discovery", "rovo", "confluence"],
    stat: { value: "40x", label: "acceleration in reporting with Rovo agents" },
  },
];

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((solution) => solution.slug === slug);
}
