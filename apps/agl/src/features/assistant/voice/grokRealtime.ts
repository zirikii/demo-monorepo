import type { RealtimeTool } from "../engine/voicePrompt";
import { REALTIME_SAMPLE_RATE } from "./pcm";

export type VoiceSessionGrant = {
  token: string;
  expiresAt: number | null;
  model: string;
  voice: string;
  url: string;
};

export type ToolResult = Record<string, unknown>;

export type GrokClientHandlers = {
  onOpen?: () => void;
  onUserSpeechStarted?: () => void;
  onUserTranscript?: (text: string) => void;
  onAssistantTranscript?: (text: string, final: boolean) => void;
  onAudio?: (base64: string) => void;
  onResponseDone?: () => void;
  onToolCall: (name: string, args: Record<string, unknown>) => ToolResult | Promise<ToolResult>;
  onError?: (message: string) => void;
  onClose?: () => void;
};

export type GrokClientOptions = {
  grant: VoiceSessionGrant;
  instructions: string;
  tools: RealtimeTool[];
  handlers: GrokClientHandlers;
  WebSocketImpl?: typeof WebSocket;
};

type ServerEvent = { type: string; [key: string]: unknown };

/**
 * Minimal client for the xAI realtime (Grok Voice) protocol, which mirrors the OpenAI Realtime
 * event shapes. Browsers can't set headers on WebSockets, so the ephemeral token rides in the
 * `xai-client-secret.<token>` subprotocol.
 */
export class GrokRealtimeClient {
  private ws: WebSocket | null = null;
  private transcript = "";
  private readonly opts: GrokClientOptions;

  constructor(opts: GrokClientOptions) {
    this.opts = opts;
  }

  connect(): void {
    const Impl = this.opts.WebSocketImpl ?? WebSocket;
    const ws = new Impl(this.opts.grant.url, [`xai-client-secret.${this.opts.grant.token}`]);
    this.ws = ws;
    ws.onopen = () => {
      this.send({
        type: "session.update",
        session: {
          voice: this.opts.grant.voice,
          instructions: this.opts.instructions,
          turn_detection: { type: "server_vad" },
          audio: {
            input: { format: { type: "audio/pcm", rate: REALTIME_SAMPLE_RATE } },
            output: { format: { type: "audio/pcm", rate: REALTIME_SAMPLE_RATE } },
          },
          tools: this.opts.tools,
        },
      });
      this.send({ type: "response.create" });
      this.opts.handlers.onOpen?.();
    };
    ws.onmessage = (event: MessageEvent) => {
      void this.handle(event.data);
    };
    ws.onerror = () => this.opts.handlers.onError?.("Voice connection error");
    ws.onclose = () => {
      this.ws = null;
      this.opts.handlers.onClose?.();
    };
  }

  get connected(): boolean {
    return this.ws?.readyState === 1;
  }

  appendAudio(base64: string): void {
    this.send({ type: "input_audio_buffer.append", audio: base64 });
  }

  /** Tells the agent about something the customer typed or tapped on screen. */
  sendUserText(text: string): void {
    this.send({
      type: "conversation.item.create",
      item: { type: "message", role: "user", content: [{ type: "input_text", text }] },
    });
    this.send({ type: "response.create" });
  }

  cancelResponse(): void {
    this.send({ type: "response.cancel" });
  }

  close(): void {
    this.ws?.close();
    this.ws = null;
  }

  private send(payload: Record<string, unknown>): void {
    if (this.ws && this.ws.readyState === 1) this.ws.send(JSON.stringify(payload));
  }

  private async handle(raw: unknown): Promise<void> {
    let event: ServerEvent;
    try {
      event = JSON.parse(String(raw)) as ServerEvent;
    } catch {
      return;
    }
    const h = this.opts.handlers;
    switch (event.type) {
      case "input_audio_buffer.speech_started":
        h.onUserSpeechStarted?.();
        break;
      case "conversation.item.input_audio_transcription.completed":
        if (typeof event.transcript === "string" && event.transcript.trim()) {
          h.onUserTranscript?.(event.transcript.trim());
        }
        break;
      case "response.output_audio_transcript.delta":
        this.transcript += String(event.delta ?? "");
        h.onAssistantTranscript?.(this.transcript, false);
        break;
      case "response.output_audio_transcript.done": {
        const text = typeof event.transcript === "string" ? event.transcript : this.transcript;
        this.transcript = "";
        if (text.trim()) h.onAssistantTranscript?.(text.trim(), true);
        break;
      }
      case "response.output_audio.delta":
        if (typeof event.delta === "string") h.onAudio?.(event.delta);
        break;
      case "response.function_call_arguments.done":
        await this.runTool(event);
        break;
      case "response.done":
        h.onResponseDone?.();
        break;
      case "error": {
        const err = event.error as { message?: string } | undefined;
        h.onError?.(err?.message ?? "Voice service error");
        break;
      }
      default:
        break;
    }
  }

  private async runTool(event: ServerEvent): Promise<void> {
    const name = String(event.name ?? "");
    const callId = String(event.call_id ?? "");
    let args: Record<string, unknown> = {};
    try {
      args = JSON.parse(String(event.arguments ?? "{}")) as Record<string, unknown>;
    } catch {
      args = {};
    }
    let output: ToolResult;
    try {
      output = await this.opts.handlers.onToolCall(name, args);
    } catch (err) {
      output = { error: err instanceof Error ? err.message : "Tool failed" };
    }
    this.send({
      type: "conversation.item.create",
      item: { type: "function_call_output", call_id: callId, output: JSON.stringify(output) },
    });
    // Without a follow-up response.create the agent goes silent after a tool call.
    this.send({ type: "response.create" });
  }
}

export async function fetchVoiceStatus(fetchImpl: typeof fetch = fetch): Promise<{ configured: boolean; model?: string; voice?: string }> {
  try {
    const res = await fetchImpl("/api/voice/status");
    if (!res.ok) return { configured: false };
    return (await res.json()) as { configured: boolean; model?: string; voice?: string };
  } catch {
    return { configured: false };
  }
}

export async function requestVoiceGrant(fetchImpl: typeof fetch = fetch): Promise<VoiceSessionGrant> {
  const res = await fetchImpl("/api/voice/session", { method: "POST" });
  const body = (await res.json().catch(() => ({}))) as Partial<VoiceSessionGrant> & { error?: string };
  if (!res.ok || !body.token || !body.url) throw new Error(body.error ?? "Couldn't start a voice session");
  return {
    token: body.token,
    url: body.url,
    model: body.model ?? "grok-voice-latest",
    voice: body.voice ?? "eve",
    expiresAt: body.expiresAt ?? null,
  };
}
