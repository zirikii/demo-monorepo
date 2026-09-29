import { describe, expect, it, vi } from "vitest";
import { runChatTurn, type ChatTurn } from "@/features/assistant/chat/grokChat";
import { buildVoiceTools } from "@/features/assistant/engine/voicePrompt";

function scripted(turns: (ChatTurn | { status: number; error: string })[]) {
  const bodies: Record<string, unknown>[] = [];
  const fetchImpl = vi.fn(async (_url: string, init: RequestInit) => {
    bodies.push(JSON.parse(String(init.body)) as Record<string, unknown>);
    const next = turns.shift()!;
    return "status" in next
      ? new Response(JSON.stringify({ error: next.error }), { status: next.status })
      : new Response(JSON.stringify(next), { status: 200 });
  });
  return { fetchImpl: fetchImpl as unknown as typeof fetch, bodies };
}

describe("runChatTurn", () => {
  it("runs tool calls, feeds results back on the same response chain and returns the text", async () => {
    const { fetchImpl, bodies } = scripted([
      { responseId: "r1", text: "", calls: [{ callId: "c1", name: "go_to_step", arguments: '{"step_id":"billing"}' }] },
      { responseId: "r2", text: "Let's sort your bill.", calls: [] },
    ]);
    const onToolCall = vi.fn(() => ({ step_id: "billing" }));
    const reply = await runChatTurn({
      input: [{ role: "user", content: "bill" }],
      previousResponseId: "r0",
      tools: buildVoiceTools(),
      onToolCall,
      fetchImpl,
    });
    expect(reply).toEqual({ responseId: "r2", text: "Let's sort your bill." });
    expect(onToolCall).toHaveBeenCalledWith("go_to_step", { step_id: "billing" });
    expect(bodies[0]).toMatchObject({ previousResponseId: "r0", input: [{ role: "user", content: "bill" }] });
    expect(bodies[1]).toMatchObject({
      previousResponseId: "r1",
      input: [{ type: "function_call_output", call_id: "c1", output: '{"step_id":"billing"}' }],
    });
  });

  it("reports bad tool arguments back to Grok instead of throwing", async () => {
    const { fetchImpl, bodies } = scripted([
      { responseId: "r1", text: "", calls: [{ callId: "c1", name: "go_to_step", arguments: "{oops" }] },
      { responseId: "r2", text: "Sorry, one sec.", calls: [] },
    ]);
    await runChatTurn({ input: [{ role: "user", content: "x" }], previousResponseId: null, tools: [], onToolCall: vi.fn(), fetchImpl });
    const output = (bodies[1]!.input as { output: string }[])[0]!.output;
    expect(JSON.parse(output)).toHaveProperty("error");
  });

  it("throws the server's reason so the caller can fall back", async () => {
    const { fetchImpl } = scripted([{ status: 503, error: "Grok chat isn't configured" }]);
    await expect(
      runChatTurn({ input: [{ role: "user", content: "x" }], previousResponseId: null, tools: [], onToolCall: vi.fn(), fetchImpl }),
    ).rejects.toThrow("Grok chat isn't configured");
  });
});
