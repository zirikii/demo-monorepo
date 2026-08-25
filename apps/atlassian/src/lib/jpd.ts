import { DISCOVERY_IDEAS, type DiscoveryIdea, type IdeaStatus } from "@/data/jpd";
import { readCollection, writeCollection } from "./store";

const KEY = "atlassian-demo-ideas";

export function readIdeas(): DiscoveryIdea[] {
  return readCollection(KEY, DISCOVERY_IDEAS);
}

export function writeIdeas(ideas: DiscoveryIdea[]): void {
  writeCollection(KEY, ideas);
}

export function getStoredIdea(key: string): DiscoveryIdea | undefined {
  return readIdeas().find((idea) => idea.key.toLowerCase() === key.toLowerCase());
}

export function updateIdeaStatus(key: string, status: IdeaStatus): DiscoveryIdea[] {
  const next = readIdeas().map((idea) => (idea.key === key ? { ...idea, status } : idea));
  writeIdeas(next);
  return next;
}

export function voteIdea(key: string): DiscoveryIdea[] {
  const next = readIdeas().map((idea) =>
    idea.key === key ? { ...idea, votes: idea.votes + 1 } : idea,
  );
  writeIdeas(next);
  return next;
}
