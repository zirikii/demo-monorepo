import type { CustomerStory } from "./types";

export const CUSTOMER_STORIES: CustomerStory[] = [
  {
    slug: "northline-payments",
    company: "Northline Payments",
    industry: "Fintech",
    region: "Australia",
    summary:
      "A payments platform replaced four status rituals with Jira, Confluence, and Rovo — and put 85% of the recovered time back into the core ledger.",
    quote:
      "Agents in Jira raise the floor for what every team can do. You don't need to be an engineer or an AI expert. Capability becomes a property of the system.",
    quoteAuthor: "Maya Chen",
    quoteRole: "Head of Product Delivery",
    results: [
      { value: "85%", label: "engineering time redirected" },
      { value: "40x", label: "faster weekly reporting" },
    ],
    body: [
      "Northline ran delivery across Jira, a wiki, a slide deck, and a chat bot that could not see any of them. Status was a meeting, not a query.",
      "They moved planning, knowledge, and video recaps onto the Teamwork Collection. Rovo now drafts the Monday pack from the graph instead of from five tools.",
      "The same agents split epics when a partner deadline moves, and they reopen blocked items when a Loom review lands after hours.",
    ],
    products: ["jira", "confluence", "rovo", "loom"],
  },
  {
    slug: "lumen-health",
    company: "Lumen Health",
    industry: "Healthcare",
    region: "United Kingdom",
    summary:
      "Clinical operations cut onboarding from three weeks to four days by putting policies, runbooks, and tickets on one graph.",
    quote:
      "People know where to find what they need. Confluence is the single source of truth — and Jira is how the work actually moves.",
    quoteAuthor: "Sam Okonkwo",
    quoteRole: "Director of Clinical Systems",
    results: [
      { value: "360+", label: "hours saved onboarding each year" },
      { value: "3w → 4d", label: "time to first productive shift" },
    ],
    body: [
      "New clinicians used to inherit a shared drive, a shadow wiki, and a service desk that did not know either of them.",
      "Lumen put runbooks in Confluence, requests in Jira Service Management, and let Rovo answer 'how do I…' from the same graph.",
      "Incident reviews now pull the change, the asset, and the last training page into one timeline.",
    ],
    products: ["confluence", "jira-service-management", "rovo", "jira"],
  },
  {
    slug: "harbour-digital",
    company: "Harbour Digital",
    industry: "Media",
    region: "Singapore",
    summary:
      "A regional publisher collapsed campaign planning, creative reviews, and delivery into Jira and Loom — reclaiming thousands of meetings.",
    quote:
      "The big win is collaboration. More teams can work together because the work is visible, not locked in a deck.",
    quoteAuthor: "Nadia Fischer",
    quoteRole: "VP of Operations",
    results: [
      { value: "4,000+", label: "meetings reclaimed in 5 months" },
      { value: "75%", label: "less time on quarterly roadmaps" },
    ],
    body: [
      "Campaigns lived in slides. Creative reviews lived in email. Delivery lived in a tracker nobody in marketing opened.",
      "Harbour put ideas in Jira Product Discovery, execution in Jira, and reviews in Loom. Rovo now writes the weekly brand pack from those three sources.",
      "Leadership stopped asking for a status spreadsheet. The graph already had it.",
    ],
    products: ["jira", "jira-product-discovery", "loom", "confluence"],
  },
  {
    slug: "redwood-transit",
    company: "Redwood Transit",
    industry: "Public sector",
    region: "United States",
    summary:
      "A transit agency used JSM and Assets to cut change-related incidents and give riders a status page that was not a rumour.",
    quote:
      "When a change goes out, the incident already knows which asset and which team owns it. That used to be a war room.",
    quoteAuthor: "Jordan Hale",
    quoteRole: "Head of Technology Operations",
    results: [
      { value: "100+", label: "hours saved on repetitive support each week" },
      { value: "2×", label: "faster incident identification" },
    ],
    body: [
      "Redwood's service desk could not see the configuration items behind a rider-facing outage.",
      "Assets now sit next to the incident. Virtual agents answer fare and disruption questions from Confluence instead of a call queue.",
      "Change tickets inherit the services they touch, so the war room starts with a list instead of a hunt.",
    ],
    products: ["jira-service-management", "confluence", "jira", "rovo"],
  },
];

export function getStory(slug: string): CustomerStory | undefined {
  return CUSTOMER_STORIES.find((story) => story.slug === slug);
}
