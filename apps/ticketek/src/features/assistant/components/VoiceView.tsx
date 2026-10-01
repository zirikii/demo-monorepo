import { useState } from "react";
import { Keyboard, Mic, MicOff, PhoneOff, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/cn";
import type { AssistantMessage, UserMessage } from "../engine/conversation";
import { useAssistant, type VoiceState } from "../AssistantProvider";
import { StepCard } from "./cards/StepCard";
import { Composer } from "./Composer";
import { FlowTrail } from "./FlowTrail";
import { QuickReplies } from "./QuickReplies";

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

/** The brand gradient as a living orb: it breathes while listening and swells with speech. */
function VoiceOrb({ voice, small }: { voice: VoiceState; small: boolean }) {
  const scale = 1 + Math.min(voice.level, 1) * 0.18;
  const active = voice.status === "speaking" || voice.status === "listening";
  return (
    <div className={cn("relative grid place-items-center transition-all", small ? "size-28" : "size-44")}>
      {voice.status === "listening" && !voice.muted && <span className="absolute inset-3 animate-pulse-ring rounded-full bg-tk-pink/30" aria-hidden />}
      <span aria-hidden className="tk-gradient absolute inset-5 rounded-full opacity-50 blur-xl transition-transform duration-150" style={{ transform: `scale(${scale * 1.1})` }} />
      <span
        aria-hidden
        className={cn("tk-gradient relative rounded-full shadow-[0_0_60px_rgba(252,110,235,0.35)] transition-transform duration-150", small ? "size-16" : "size-24", voice.status === "thinking" && "animate-spin-slow")}
        style={{ transform: `scale(${active ? scale : 1})` }}
      />
    </div>
  );
}

export function VoiceView() {
  const { conversation, options, voice, chooseOption, sendText, setMode, toggleMute, back } = useAssistant();
  const [typing, setTyping] = useState(false);
  const messages = conversation.messages;
  const lastAssistant = [...messages].reverse().find((m): m is AssistantMessage => m.role === "assistant");
  const lastUser = [...messages].reverse().find((m): m is UserMessage => m.role === "user");
  const cardMessage = [...messages].reverse().find((m): m is AssistantMessage => m.role === "assistant" && Boolean(m.card));
  const cardIsCurrent = Boolean(cardMessage && cardMessage.id === lastAssistant?.id);
  const caption = lastAssistant?.text || (voice.status === "connecting" ? "" : "…");
  const heard = voice.interim || (lastUser && lastUser.id > (lastAssistant?.id ?? 0) ? lastUser.text : "");

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-midnight text-white">
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-tk-jacaranda/25 blur-3xl" />
      <div className="relative flex flex-col items-start gap-2 px-4 pt-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/85 ring-1 ring-white/15">
          <span className={cn("size-1.5 rounded-full", voice.provider === "grok" ? "bg-[#22c55e]" : "bg-tk-yellow")} aria-hidden />
          {voice.provider === "grok" ? "Grok voice · Live" : "Browser voice · demo mode"}
        </span>
        <FlowTrail conversation={conversation} onBack={back} tone="dark" />
      </div>

      <div className="relative flex-1 overflow-y-auto px-5 pb-4">
        <div className={cn("flex flex-col items-center text-center", cardIsCurrent ? "pt-1" : "pt-6")}>
          <VoiceOrb voice={voice} small={cardIsCurrent} />
          <p className="mt-2 text-xs font-bold tracking-[0.14em] text-tk-pink uppercase" role="status">
            {statusLabel(voice)}
          </p>
          <p className="mt-4 min-h-14 max-w-sm text-lg leading-snug font-semibold" aria-live="polite">
            {caption}
          </p>
          {heard && (
            <p className="mt-2 max-w-sm text-sm text-white/65 italic">
              <span className="sr-only">You said: </span>“{heard}”
            </p>
          )}
        </div>
        {voice.error && (
          <p role="alert" className="mx-auto mt-4 flex max-w-sm items-start gap-2 rounded-tk bg-white/10 p-3 text-xs text-white/90">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-tk-yellow" aria-hidden />
            {voice.error}
          </p>
        )}
        {cardMessage?.card && (
          <div className={cn("mx-auto mt-5 max-w-sm text-left text-ink transition-opacity", !cardIsCurrent && "opacity-60")}>
            <StepCard card={cardMessage.card} values={cardMessage.values ?? {}} live={cardIsCurrent} />
          </div>
        )}
        {options.length > 0 && (
          <div className="mx-auto mt-5 max-w-sm">
            <p className="mb-2 text-[11px] font-bold tracking-wide text-white/60 uppercase">You can say</p>
            <QuickReplies options={options} onChoose={chooseOption} tone="dark" />
          </div>
        )}
      </div>

      <div className="relative shrink-0 border-t border-white/10 bg-midnight-soft/80 px-4 pt-3 pb-4 backdrop-blur">
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
            className={cn("inline-flex size-12 items-center justify-center rounded-full ring-1 ring-white/20 transition-colors", typing ? "bg-white text-midnight" : "bg-white/10 hover:bg-white/20")}
          >
            <Keyboard className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-pressed={voice.muted}
            aria-label={voice.muted ? "Unmute microphone" : "Mute microphone"}
            className={cn("inline-flex size-16 items-center justify-center rounded-full shadow-tk-lift transition-colors", voice.muted ? "bg-white/15 ring-1 ring-white/30" : "bg-white text-midnight hover:bg-tk-blue-tint")}
          >
            {voice.muted ? <MicOff className="size-6" aria-hidden /> : <Mic className="size-6" aria-hidden />}
          </button>
          <button
            type="button"
            onClick={() => setMode("chat")}
            aria-label="End voice and return to chat"
            title="End voice"
            className="inline-flex size-12 items-center justify-center rounded-full bg-critical text-white hover:bg-[#7d1c1c]"
          >
            <PhoneOff className="size-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
