import { describe, expect, it, vi } from "vitest";
import { buildVoiceTools } from "@/features/assistant/engine/voicePrompt";
import { GrokRealtimeClient, requestVoiceGrant, type GrokClientHandlers } from "@/features/assistant/voice/grokRealtime";

class MockSocket {
  static last: MockSocket | null = null;
  readyState = 0;
  sent: Record<string, unknown>[] = [];
  onopen: (() => void) | null = null;
  onmessage: ((e: { data: string }) => void) | null = null;
  onerror: (() => void) | null = null;
  onclose: (() => void) | null = null;

  constructor(
    public url: string,
    public protocols: string[],
  ) {
    MockSocket.last = this;
  }

  send(data: string) {
    this.sent.push(JSON.parse(data) as Record<string, unknown>);
  }

  close() {
    this.readyState = 3;
    this.onclose?.();
  }

  open() {
    this.readyState = 1;
    this.onopen?.();
  }

  emit(event: Record<string, unknown>) {
    this.onmessage?.({ data: JSON.stringify(event) });
  }
}

const grant = { token: "ephemeral-123", expiresAt: null, model: "grok-voice-latest", voice: "eve", url: "wss://api.x.ai/v1/realtime?model=grok-voice-latest" };

function connect(handlers: Partial<GrokClientHandlers> = {}) {
  const onToolCall = vi.fn(() => ({ step_id: "billing" }));
  const client = new GrokRealtimeClient({
    grant,
    instructions: "Be helpful",
    tools: buildVoiceTools(),
    handlers: { onToolCall, ...handlers },
    WebSocketImpl: MockSocket as unknown as typeof WebSocket,
  });
  client.connect();
  const socket = MockSocket.last!;
  socket.open();
  return { client, socket, onToolCall };
}

const flush = () => new Promise((r) => setTimeout(r, 0));

describe("GrokRealtimeClient", () => {
  it("authenticates with the ephemeral token subprotocol and configures the session", () => {
    const onOpen = vi.fn();
    const { socket, client } = connect({ onOpen });
    expect(socket.url).toBe(grant.url);
    expect(socket.protocols).toEqual(["xai-client-secret.ephemeral-123"]);
    expect(socket.sent[0]).toMatchObject({
      type: "session.update",
      session: { voice: "eve", instructions: "Be helpful", turn_detection: { type: "server_vad" } },
    });
    expect(socket.sent[1]).toEqual({ type: "response.create" });
    expect(onOpen).toHaveBeenCalled();
    expect(client.connected).toBe(true);
  });

  it("streams transcripts and audio to the handlers", () => {
    const onAssistantTranscript = vi.fn();
    const onAudio = vi.fn();
    const onUserTranscript = vi.fn();
    const { socket } = connect({ onAssistantTranscript, onAudio, onUserTranscript });
    socket.emit({ type: "response.output_audio_transcript.delta", delta: "Hi " });
    socket.emit({ type: "response.output_audio_transcript.delta", delta: "Alex" });
    socket.emit({ type: "response.output_audio_transcript.done" });
    socket.emit({ type: "response.output_audio.delta", delta: "AAAA" });
    socket.emit({ type: "conversation.item.input_audio_transcription.completed", transcript: " pay my bill " });
    expect(onAssistantTranscript.mock.calls).toEqual([
      ["Hi ", false],
      ["Hi Alex", false],
      ["Hi Alex", true],
    ]);
    expect(onAudio).toHaveBeenCalledWith("AAAA");
    expect(onUserTranscript).toHaveBeenCalledWith("pay my bill");
  });

  it("runs tool calls and asks for a follow-up response", async () => {
    const { socket, onToolCall } = connect();
    socket.sent = [];
    socket.emit({ type: "response.function_call_arguments.done", name: "go_to_step", call_id: "call_1", arguments: '{"step_id":"billing"}' });
    await flush();
    expect(onToolCall).toHaveBeenCalledWith("go_to_step", { step_id: "billing" });
    expect(socket.sent).toEqual([
      { type: "conversation.item.create", item: { type: "function_call_output", call_id: "call_1", output: '{"step_id":"billing"}' } },
      { type: "response.create" },
    ]);
  });

  it("forwards typed or tapped input as a user message", () => {
    const { socket, client } = connect();
    socket.sent = [];
    client.sendUserText("(Customer tapped: Pay now)");
    expect(socket.sent[0]).toMatchObject({ type: "conversation.item.create", item: { role: "user", content: [{ type: "input_text", text: "(Customer tapped: Pay now)" }] } });
    expect(socket.sent[1]).toEqual({ type: "response.create" });
  });

  it("surfaces server errors", () => {
    const onError = vi.fn();
    const { socket } = connect({ onError });
    socket.emit({ type: "error", error: { message: "Invalid token" } });
    expect(onError).toHaveBeenCalledWith("Invalid token");
  });
});

describe("requestVoiceGrant", () => {
  it("returns the grant from the dev server", async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ ...grant }), { status: 200 }));
    await expect(requestVoiceGrant(fetchImpl as unknown as typeof fetch)).resolves.toMatchObject({ token: "ephemeral-123", voice: "eve" });
    expect(fetchImpl).toHaveBeenCalledWith("/api/voice/session", { method: "POST" });
  });

  it("throws the server's reason when voice isn't configured", async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ error: "Grok voice isn't configured" }), { status: 503 }));
    await expect(requestVoiceGrant(fetchImpl as unknown as typeof fetch)).rejects.toThrow("Grok voice isn't configured");
  });
});
