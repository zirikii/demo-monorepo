export type CursorHealth = {
  ok: boolean;
  configured: boolean;
  reason?: string;
  me?: {
    apiKeyName?: string;
    userEmail?: string;
    userFirstName?: string;
    userLastName?: string;
  };
  repoUrl?: string;
  startingRef?: string;
  error?: unknown;
};

export type CursorAgent = {
  id: string;
  name: string;
  status: string;
  url: string;
  createdAt?: string;
  updatedAt?: string;
  latestRunId?: string;
};

export type CursorRun = {
  id: string;
  agentId: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  durationMs?: number;
  result?: string;
  git?: {
    branches?: Array<{ repoUrl: string; branch?: string; prUrl?: string }>;
  };
};

export type CreateAgentResponse = {
  agent: CursorAgent;
  run: CursorRun;
};

export type LaunchIncident = {
  title: string;
  site: string;
  symptom: string;
  oid: string;
  name?: string;
  prompt?: string;
};

async function parseJson<T>(res: Response): Promise<T> {
  const body = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) {
    throw new Error(body.error || `Cursor API proxy failed (${res.status})`);
  }
  return body;
}

export async function fetchCursorHealth(): Promise<CursorHealth> {
  const res = await fetch("/api/cursor/health");
  return parseJson<CursorHealth>(res);
}

export async function launchCursorAgent(incident: LaunchIncident): Promise<CreateAgentResponse> {
  const res = await fetch("/api/cursor/agents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(incident),
  });
  return parseJson<CreateAgentResponse>(res);
}

export async function fetchCursorAgent(agentId: string): Promise<CursorAgent> {
  const res = await fetch(`/api/cursor/agents/${agentId}`);
  return parseJson<CursorAgent>(res);
}

export async function fetchCursorRun(agentId: string, runId: string): Promise<CursorRun> {
  const res = await fetch(`/api/cursor/agents/${agentId}/runs/${runId}`);
  return parseJson<CursorRun>(res);
}

export function isTerminalRunStatus(status: string): boolean {
  return ["FINISHED", "ERROR", "CANCELLED", "EXPIRED"].includes(status.toUpperCase());
}
