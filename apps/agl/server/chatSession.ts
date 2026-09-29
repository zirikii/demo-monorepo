import { isSameOrigin, type VoiceRequest, type VoiceResponse } from "./voiceSession";

export const XAI_RESPONSES_URL = "https://api.x.ai/v1/responses";
export const CHAT_TIMEOUT_MS = 60_000;
export const CHAT_TURNS_PER_MINUTE = 30;
export const MAX_CHAT_BODY_BYTES = 256_000;
const MAX_OUTPUT_TOKENS = 1024;

export type ChatConfig = {
  apiKey: string;
  model: string;
  /** Sent as `reasoning.effort`; empty for models without reasoning control. */
  reasoningEffort: string;
};

export type ChatRequest = VoiceRequest & { body?: string };

export type ChatDeps = {
  fetchImpl?: typeof fetch;
  allowTurn?: (client: string) => boolean;
};

export type ChatCall = { callId: string; name: string; arguments: string };
export type ChatTurn = { responseId: string; text: string; calls: ChatCall[] };

export function readChatConfig(env: Record<string, string | undefined>): ChatConfig {
  return {
    apiKey: env.XAI_API_KEY?.trim() ?? "",
    model: env.XAI_CHAT_MODEL?.trim() || "grok-4.7",
    reasoningEffort: env.XAI_CHAT_REASONING?.trim() ?? "low",
  };
}

type ChatBody = { input: unknown[]; tools: unknown[]; previousResponseId?: string };

function parseBody(raw: string | undefined): ChatBody | null {
  try {
    const body = JSON.parse(raw ?? "") as Record<string, unknown>;
    if (!Array.isArray(body.input) || body.input.length === 0) return null;
    // Only client-side function tools: server-side tools (web search etc.) would bill the demo key.
    const tools = Array.isArray(body.tools)
      ? body.tools.filter((t) => (t as { type?: unknown } | null)?.type === "function")
      : [];
    const previous = typeof body.previousResponseId === "string" && body.previousResponseId ? body.previousResponseId : undefined;
    return { input: body.input, tools, previousResponseId: previous };
  } catch {
    return null;
  }
}

/** Flattens a Responses API payload into the reply text and any function calls to run. */
export function parseResponseOutput(payload: unknown): ChatTurn | null {
  if (!payload || typeof payload !== "object") return null;
  const p = payload as { id?: unknown; output?: unknown };
  if (typeof p.id !== "string" || !Array.isArray(p.output)) return null;
  const texts: string[] = [];
  const calls: ChatCall[] = [];
  for (const item of p.output as Record<string, unknown>[]) {
    if (item?.type === "message" && Array.isArray(item.content)) {
      for (const part of item.content as Record<string, unknown>[]) {
        if (part?.type === "output_text" && typeof part.text === "string") texts.push(part.text);
      }
    } else if (item?.type === "function_call" && typeof item.name === "string" && typeof item.call_id === "string") {
      calls.push({ callId: item.call_id, name: item.name, arguments: typeof item.arguments === "string" ? item.arguments : "{}" });
    }
  }
  return { responseId: p.id, text: texts.join("\n\n").trim(), calls };
}

/**
 * Routes `/api/chat`: one Grok Responses API round trip for the AGL Assistant's text chat. Like
 * `/api/voice/session` it spends the xAI key, so it only serves same-origin browser requests and
 * is rate limited per client address.
 */
export async function handleChatRequest(
  req: ChatRequest,
  config: ChatConfig,
  { fetchImpl = fetch, allowTurn = () => true }: ChatDeps = {},
): Promise<VoiceResponse | null> {
  if (req.pathname !== "/api/chat") return null;
  if (req.method !== "POST") return { status: 405, body: { error: "Method not allowed" } };
  if (!isSameOrigin(req)) return { status: 403, body: { error: "Chat can only be used from this site" } };
  if (!config.apiKey) {
    return { status: 503, body: { configured: false, error: "Grok chat isn't configured. Set XAI_API_KEY in apps/agl/.env.local." } };
  }
  const body = parseBody(req.body);
  if (!body) return { status: 400, body: { error: "Expected a JSON body with a non-empty input array" } };
  if (!allowTurn(req.client ?? "unknown")) {
    return { status: 429, body: { error: "Too many chat messages. Try again in a minute." } };
  }

  let res: Response;
  let payload: unknown;
  try {
    res = await fetchImpl(XAI_RESPONSES_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: config.model,
        input: body.input,
        tools: body.tools,
        previous_response_id: body.previousResponseId,
        reasoning: config.reasoningEffort ? { effort: config.reasoningEffort } : undefined,
        max_output_tokens: MAX_OUTPUT_TOKENS,
      }),
      signal: AbortSignal.timeout(CHAT_TIMEOUT_MS),
    });
    payload = res.ok ? await res.json().catch(() => null) : null;
  } catch (err) {
    if ((err as { name?: string } | null)?.name === "TimeoutError") {
      return { status: 504, body: { error: "Grok took too long to reply" } };
    }
    return { status: 502, body: { error: "Couldn't reach the xAI API" } };
  }
  if (!res.ok) return { status: 502, body: { error: `xAI rejected the chat request (${res.status})` } };
  const turn = parseResponseOutput(payload);
  if (!turn) return { status: 502, body: { error: "xAI returned an unexpected chat payload" } };
  return { status: 200, body: turn };
}
