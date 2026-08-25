import type { Resource } from "./types";

export const RESOURCES: Resource[] = [
  {
    slug: "rovo-at-work",
    title: "Rovo at work: How context and agents move work forward",
    type: "Guide",
    excerpt:
      "A walkthrough of how teams use Teamwork Graph context to let agents plan, update, and report without another tool.",
    publishedOn: "2026-03-12",
    body: [
      "Most AI assistants start from a blank chat. Rovo starts from the work you already have — projects, pages, goals, and people.",
      "This guide shows four patterns: updating a strategy brief from a meeting, splitting an epic when scope changes, answering a support question from Confluence, and writing a status pack from Jira.",
    ],
  },
  {
    slug: "state-of-teams-2026",
    title: "How top teams avoid the AI fragmentation tax: State of Teams 2026",
    type: "Report",
    excerpt:
      "Research on teams that kept context in one system versus teams that added a new AI tool for every workflow.",
    publishedOn: "2026-02-04",
    body: [
      "The fragmentation tax is the hours spent re-explaining work to a new model that cannot see last week's decision.",
      "Teams that put agents on a shared graph reported faster reporting, fewer status meetings, and less duplicate documentation.",
    ],
  },
  {
    slug: "agentic-enterprise",
    title: "Inside the agentic enterprise",
    type: "Ebook",
    excerpt:
      "How Atlassian customers are transforming work right now — without standing up a parallel AI stack.",
    publishedOn: "2026-01-20",
    body: [
      "An agentic enterprise is not a chatbot bolted onto a wiki. It is a system where agents can act because the work is already linked.",
      "This ebook covers governance, admin controls, and the first five agents most teams stand up.",
    ],
  },
  {
    slug: "team-26",
    title: "Catch the latest from Team '26",
    type: "Event",
    excerpt: "May 6–7 · Anaheim, CA. Product news, customer stories, and the next chapter of Rovo.",
    publishedOn: "2026-05-06",
    body: [
      "Team '26 is where Atlassian ships the year. Sessions cover Jira, Rovo, collections, and the Teamwork Graph.",
      "This demo page is a stand-in for the event hub — times and sessions are invented for the walkthrough.",
    ],
  },
  {
    slug: "inside-atlassian-ai",
    title: "Inside Atlassian: AI thinking and product news",
    type: "Announcement",
    excerpt:
      "How we think about agents, collections, and keeping customer data in the customer's control.",
    publishedOn: "2026-04-02",
    body: [
      "The point of Rovo is not more chat. It is fewer tools between a decision and the work that follows.",
      "This note covers what shipped, what is in preview, and what we will not train on.",
    ],
  },
  {
    slug: "saas-in-the-ai-era",
    title: "Mike Cannon-Brookes on 20VC: SaaS in the AI era",
    type: "Podcast",
    excerpt: "A conversation about systems of work, agents, and why context beats another copilot.",
    publishedOn: "2026-03-28",
    body: [
      "The thesis: software that already holds the graph of work is in a different position than a model that has to be briefed every time.",
      "This demo does not reproduce interview remarks. Use the live 20VC episode for anything attributed to Atlassian leadership.",
    ],
  },
];

export function getResource(slug: string): Resource | undefined {
  return RESOURCES.find((resource) => resource.slug === slug);
}
