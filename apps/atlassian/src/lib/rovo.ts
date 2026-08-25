import { ROVO_AGENTS, type RovoAgent } from "@/data/rovo";
import { readCollection, writeCollection } from "./store";

const KEY = "atlassian-demo-agents";

export function readAgents(): RovoAgent[] {
  return readCollection(KEY, ROVO_AGENTS);
}

export function writeAgents(agents: RovoAgent[]): void {
  writeCollection(KEY, agents);
}

export function setAgentEnabled(id: string, enabled: boolean): RovoAgent[] {
  const next = readAgents().map((agent) => (agent.id === id ? { ...agent, enabled } : agent));
  writeAgents(next);
  return next;
}
