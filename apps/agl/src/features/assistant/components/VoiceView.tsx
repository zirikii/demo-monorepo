import { useState } from "react";
import { Keyboard, Mic, MicOff, PhoneOff, TriangleAlert } from "lucide-react";
import { AglRays, type RaysState } from "@/components/brand/AglRays";
import { cn } from "@/lib/cn";
import type { AssistantMessage, UserMessage } from "../engine/conversation";
import { useAssistant, type VoiceState, type VoiceStatus } from "../AssistantProvider";
import { StepCard } from "./cards/StepCard";
import { Composer } from "./Composer";
import { FlowTrail } from "./FlowTrail";
import { QuickReplies } from "./QuickReplies";

function raysState(status: VoiceStatus): RaysState {
  switch (status) {
    case "connecting":
    case "thinking":
      return "thinking";
    case "listening":
      return "listening";
    case "speaking":
      return "speaking";
    case "idle":
    case "error":
      return "idle";
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

function statusLabel(voice: VoiceState): string {
  if (voice.muted) return "Muted";
  switch (voice.status) {
    case "connecting":
      return "Connecting to Grok voice…";
    case "listening":
      return voice.provider === "demo" && !voice.canRecognise ? "Your turn — tap or type a reply" : "Listening…";
    case "thinking":
      return "Thinking…";
    case "speaking":
      return "Speaking…";
    case "idle":
      return "Voice paused";
    case "error":
      return "Voice unavailable";
    default: {
      const exhaustive: never = voice.status;
      return exhaustive;
    }
  }
}

function ProviderBadge({ voice }: { voice: VoiceState }) {
  const live = voice.provider === "grok";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white/85 ring-1 ring-white/15">
      <span className={cn("h-1.5 w-1.5 rounded-full", live ? "bg-[#22c55e]" : "bg-ray-cyan")} aria-hidden="true" />
      {live ? "Grok voice · Live" : "Demo voice · Grok key pending"}
    </span>
  );
}

export function VoiceView() {
  const { conversation, options, voice, chooseOption, sendText, setMode, toggleMute, back } = useAssistant();
  const [typing, setTyping] = useState(false);

  const messages = conversation.messages;
  const lastAssistant = [...messages].reverse().find((m): m is AssistantMessage => m.role === "assistant");
  const lastUser = [...messages].reverse().find((m): m is UserMessage => m.role === "user");
  const cardMessage = [...messages].reverse().find((m): m is AssistantMessage => m.role === "assistant" && Boolean(m.card));
  const cardIsCurrent = cardMessage && cardMessage.id === lastAssistant?.id;
  const caption = lastAssistant?.text || (voice.status === "connecting" ? "" : "…");
  const heard = voice.interim || (lastUser && lastUser.id > (lastAssistant?.id ?? 0) ? lastUser.text : "");

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-agl-navy via-[#021a5c] to-agl-blue-dark text-white">
      <div aria-hidden="true" className="pointer-events-none absolute top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-ray-cyan/20 blur-3xl" />

      <div className="relative flex flex-col items-start gap-2 px-4 pt-3">
        <ProviderBadge voice={voice} />
        <FlowTrail conversation={conversation} onBack={back} tone="dark" />
      </div>

      <div className="relative flex-1 overflow-y-auto px-5 pb-4">
        <div className={cn("flex flex-col items-center text-center", cardIsCurrent ? "pt-2" : "pt-6")}>
          <div
            className={cn(
              "relative flex items-center justify-center transition-all",
              cardIsCurrent ? "h-28 w-28" : "h-40 w-40",
            )}
          >
            {voice.status === "listening" && !voice.muted && (
              <span className="absolute inset-4 animate-pulse-ring rounded-full bg-ray-cyan/30" aria-hidden="true" />
            )}
            <span
              aria-hidden="true"
              className="absolute inset-6 rounded-full bg-white/5 ring-1 ring-white/15 transition-transform duration-150"
              style={{ transform: `scale(${1 + Math.min(voice.level, 1) * 0.12})` }}
            />
            <AglRays className={cn("relative", cardIsCurrent ? "h-16 w-16" : "h-24 w-24")} animated level={voice.level} state={raysState(voice.status)} />
          </div>
          <p className="mt-2 text-xs font-extrabold tracking-[0.14em] text-ray-light uppercase" role="status">
            {statusLabel(voice)}
          </p>

          <p className="mt-4 min-h-[3.5rem] max-w-sm text-lg leading-snug font-semibold text-white" aria-live="polite">
            {caption}
          </p>
          {heard && (
            <p className="mt-2 max-w-sm text-sm text-white/65 italic">
              <span className="sr-only">You said: </span>“{heard}”
            </p>
          )}
        </div>

        {voice.error && (
          <p role="alert" className="mx-auto mt-4 flex max-w-sm items-start gap-2 rounded-agl bg-white/10 p-3 text-xs text-white/90">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#ffcf5c]" aria-hidden="true" />
            {voice.error}
          </p>
        )}

        {cardMessage?.card && (
          <div className={cn("mx-auto mt-5 max-w-sm text-left text-ink transition-opacity", !cardIsCurrent && "opacity-60")}>
            <StepCard card={cardMessage.card} live={Boolean(cardIsCurrent)} />
          </div>
        )}

        {options.length > 0 && (
          <div className="mx-auto mt-5 max-w-sm">
            <p className="mb-2 text-[11px] font-extrabold tracking-wide text-white/60 uppercase">You can say</p>
            <QuickReplies options={options} onChoose={chooseOption} tone="dark" />
          </div>
        )}
      </div>

      <div className="relative shrink-0 border-t border-white/10 bg-agl-navy/60 px-4 pt-3 pb-4 backdrop-blur">
        {typing && (
          <div className="mb-3">
            <Composer tone="dark" autoFocus onSend={(text) => sendText(text, "text")} placeholder="Type instead…" />
          </div>
        )}
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setTyping((t) => !t)}
            aria-pressed={typing}
            aria-label="Type instead"
            title="Type instead"
            className={cn(
              "inline-flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-white/20 transition-colors",
              typing ? "bg-white text-agl-blue-dark" : "bg-white/10 text-white hover:bg-white/20",
            )}
          >
            <Keyboard className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-pressed={voice.muted}
            aria-label={voice.muted ? "Unmute microphone" : "Mute microphone"}
            title={voice.muted ? "Unmute" : "Mute"}
            className={cn(
              "inline-flex h-16 w-16 items-center justify-center rounded-full shadow-agl-lift transition-colors",
              voice.muted ? "bg-white/15 text-white ring-1 ring-white/30" : "bg-white text-agl-blue hover:bg-agl-sky",
            )}
          >
            {voice.muted ? <MicOff className="h-6 w-6" aria-hidden="true" /> : <Mic className="h-6 w-6" aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => setMode("chat")}
            aria-label="End voice and return to chat"
            title="End voice"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-critical text-white hover:bg-[#a30f27]"
          >
            <PhoneOff className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
