import type { RealtimeTool } from "../engine/voicePrompt";
import type { ToolResult } from "../voice/grokRealtime";

export type ChatCall = { callId: string; name: string; arguments: string };
export type ChatTurn = { responseId: string; text: string; calls: ChatCall[] };

export type ChatInputItem =
  | { role: "system" | "user"; content: string }
  | { type: "function_call_output"; call_id: string; output: string };

const MAX_TOOL_ROUNDS = 5;

export async function requestChatTurn(
  body: { input: ChatInputItem[]; tools: RealtimeTool[]; previousResponseId: string | null },
  fetchImpl: typeof fetch = fetch,
): Promise<ChatTurn> {
  const res = await fetchImpl("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = (await res.json().catch(() => ({}))) as Partial<ChatTurn> & { error?: string };
  if (!res.ok || typeof payload.responseId !== "string" || !Array.isArray(payload.calls)) {
    throw new Error(payload.error ?? "Grok chat is unavailable");
  }
  return { responseId: payload.responseId, text: payload.text ?? "", calls: payload.calls };
}

export type ChatReply = { responseId: string; text: string };

/**
 * Runs one customer turn against Grok: sends the input, executes any tool calls it asks for and
 * feeds the results back, until it answers in text. Earlier turns live on xAI's side, chained by
 * `previousResponseId`.
 */
export async function runChatTurn(opts: {
  input: ChatInputItem[];
  previousResponseId: string | null;
  tools: RealtimeTool[];
  onToolCall: (name: string, args: Record<string, unknown>) => ToolResult;
  fetchImpl?: typeof fetch;
}): Promise<ChatReply> {
  let input = opts.input;
  let previousResponseId = opts.previousResponseId;
  // Text written alongside a tool call is usually a "let me check" preamble, so the latest reply wins.
  let text = "";
  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    const turn = await requestChatTurn({ input, tools: opts.tools, previousResponseId }, opts.fetchImpl);
    previousResponseId = turn.responseId;
    text = turn.text || text;
    if (turn.calls.length === 0) return { responseId: turn.responseId, text };
    input = turn.calls.map((call) => ({
      type: "function_call_output",
      call_id: call.callId,
      output: JSON.stringify(runTool(call, opts.onToolCall)),
    }));
  }
  throw new Error("Grok didn't finish its reply");
}

function runTool(call: ChatCall, onToolCall: (name: string, args: Record<string, unknown>) => ToolResult): ToolResult {
  try {
    return onToolCall(call.name, JSON.parse(call.arguments || "{}") as Record<string, unknown>);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Tool failed" };
  }
}
