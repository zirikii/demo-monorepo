export type IdeaStatus = "Parking lot" | "Researching" | "Committed";

export interface DiscoveryIdea {
  key: string;
  summary: string;
  status: IdeaStatus;
  impact: number;
  effort: number;
  votes: number;
  owner: string;
  description: string;
}

export const IDEA_STATUSES: IdeaStatus[] = ["Parking lot", "Researching", "Committed"];

export const DISCOVERY_IDEAS: DiscoveryIdea[] = [
  {
    key: "DISC-4",
    summary: "Passkeys on first-run signup",
    status: "Committed",
    impact: 8,
    effort: 5,
    votes: 12,
    owner: "Sam Okonkwo",
    description:
      "Support volume on password resets is still too high. Delivery lives on PORTAL-088.",
  },
  {
    key: "DISC-9",
    summary: "Partner-channel onboarding wizard",
    status: "Researching",
    impact: 9,
    effort: 8,
    votes: 7,
    owner: "Maya Chen",
    description:
      "Partners skip the consumer path. Evidence from last week's calls. Delivery spine is PORTAL-142.",
  },
  {
    key: "DISC-15",
    summary: "In-app Rovo recap of partner Looms",
    status: "Parking lot",
    impact: 6,
    effort: 3,
    votes: 4,
    owner: "Priya Raman",
    description: "Turn Loom recaps into Jira comments automatically. Related to PORTAL-104.",
  },
];

export function getIdea(key: string, ideas = DISCOVERY_IDEAS): DiscoveryIdea | undefined {
  return ideas.find((idea) => idea.key.toLowerCase() === key.toLowerCase());
}
