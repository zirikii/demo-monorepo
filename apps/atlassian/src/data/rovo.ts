export interface RovoAgent {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface GraphHit {
  id: string;
  kind: "Work item" | "Page" | "Request" | "Pull request" | "Video";
  title: string;
  href: string;
}

export const ROVO_AGENTS: RovoAgent[] = [
  {
    id: "sprint-reporter",
    name: "Sprint reporter",
    description: "Summarise PORTAL Sprint 24 for standup.",
    enabled: true,
  },
  {
    id: "incident-summariser",
    name: "Incident summariser",
    description: "Draft JSM incident recaps from the queue.",
    enabled: true,
  },
  {
    id: "onboarding-writer",
    name: "Onboarding writer",
    description: "Turn partner Looms into Confluence playbook updates.",
    enabled: false,
  },
];

export const GRAPH_HITS: GraphHit[] = [
  {
    id: "PORTAL-161",
    kind: "Work item",
    title: "Login banner renders twice on Safari 18",
    href: "/jira/issues/PORTAL-161",
  },
  {
    id: "strategy-brief",
    kind: "Page",
    title: "Portal 2.0 strategy brief",
    href: "/confluence/pages/strategy-brief",
  },
  {
    id: "ITSM-14",
    kind: "Request",
    title: "VPN down for Harbour Digital office",
    href: "/jsm/requests/ITSM-14",
  },
  {
    id: "pr-42",
    kind: "Pull request",
    title: "Fix Safari banner casing (PORTAL-161)",
    href: "/bitbucket/portal-web/pull-requests/42",
  },
  {
    id: "safari-repro",
    kind: "Video",
    title: "Safari banner repro",
    href: "/loom/safari-repro",
  },
];

export function searchGraph(query: string, hits = GRAPH_HITS): GraphHit[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return hits;
  return hits.filter(
    (hit) =>
      hit.title.toLowerCase().includes(needle) ||
      hit.id.toLowerCase().includes(needle) ||
      hit.kind.toLowerCase().includes(needle),
  );
}
