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

const grant = {
  token: "ephemeral-123",
  expiresAt: null,
  model: "grok-voice-latest",
  voice: "eve",
  url: "wss://api.x.ai/v1/realtime?model=grok-voice-latest",
};

function connect(handlers: Partial<GrokClientHandlers> = {}, greeting?: string) {
  const onToolCall = vi.fn(() => ({ step_id: "billing" }));
  const client = new GrokRealtimeClient({
    grant,
    instructions: "Be helpful",
    tools: buildVoiceTools(),
    greeting,
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

  it("speaks a scripted greeting as a force_message instead of asking the model to open", () => {
    const { socket } = connect({}, "Hi Alex, what's your query today?");
    expect(socket.sent.slice(1)).toEqual([
      {
        type: "conversation.item.create",
        item: { type: "force_message", role: "assistant", content: [{ type: "output_text", text: "Hi Alex, what's your query today?" }] },
      },
    ]);
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

  it("runs tool calls and asks for a follow-up response once the response is done", async () => {
    const onResponseDone = vi.fn();
    const { socket, onToolCall } = connect({ onResponseDone });
    socket.sent = [];
    socket.emit({ type: "response.function_call_arguments.done", name: "go_to_step", call_id: "call_1", arguments: '{"step_id":"billing"}' });
    await flush();
    expect(onToolCall).toHaveBeenCalledWith("go_to_step", { step_id: "billing" });
    expect(socket.sent).toEqual([
      { type: "conversation.item.create", item: { type: "function_call_output", call_id: "call_1", output: '{"step_id":"billing"}' } },
    ]);
    socket.emit({ type: "response.done" });
    await flush();
    expect(socket.sent.at(-1)).toEqual({ type: "response.create" });
    expect(onResponseDone).not.toHaveBeenCalled();
  });

  it("answers parallel tool calls before a single follow-up, after playback finishes", async () => {
    let finishPlayback = () => {};
    const waitForPlayback = vi.fn(() => new Promise<void>((resolve) => (finishPlayback = resolve)));
    const { socket } = connect({ waitForPlayback });
    socket.sent = [];
    socket.emit({ type: "response.function_call_arguments.done", name: "go_to_step", call_id: "a", arguments: "{}" });
    socket.emit({ type: "response.function_call_arguments.done", name: "go_to_step", call_id: "b", arguments: "{}" });
    socket.emit({ type: "response.done" });
    await flush();
    expect(socket.sent.map((e) => e.type)).toEqual(["conversation.item.create", "conversation.item.create"]);
    expect(waitForPlayback).toHaveBeenCalledTimes(1);
    finishPlayback();
    await flush();
    expect(socket.sent.filter((e) => e.type === "response.create")).toHaveLength(1);
  });

  it("reports turn boundaries from server VAD and plain responses", () => {
    const onUserSpeechStarted = vi.fn();
    const onUserSpeechStopped = vi.fn();
    const onResponseDone = vi.fn();
    const { socket } = connect({ onUserSpeechStarted, onUserSpeechStopped, onResponseDone });
    socket.emit({ type: "input_audio_buffer.speech_started" });
    socket.emit({ type: "input_audio_buffer.speech_stopped" });
    socket.emit({ type: "response.done" });
    expect(onUserSpeechStarted).toHaveBeenCalledTimes(1);
    expect(onUserSpeechStopped).toHaveBeenCalledTimes(1);
    expect(onResponseDone).toHaveBeenCalledTimes(1);
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
