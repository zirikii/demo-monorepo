import { Mic } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ChatMessage } from "../engine/conversation";
import { AssistantAvatar } from "./AssistantAvatar";
import { StepCard } from "./cards/StepCard";

export function MessageBubble({
  message,
  live,
  grouped,
  hidePending = false,
}: {
  message: ChatMessage;
  live: boolean;
  grouped: boolean;
  /** Set while the typing indicator already shows the reply is on its way. */
  hidePending?: boolean;
}) {
  switch (message.role) {
    case "system":
      return (
        <p className="mx-auto max-w-[85%] animate-fade-in rounded-full bg-surface-deep px-3 py-1 text-center text-xs text-ink-soft">
          {message.text}
        </p>
      );
    case "user":
      return (
        <div className="flex animate-fade-up justify-end">
          <div className="max-w-[82%] rounded-agl-lg rounded-br-md bg-agl-blue px-4 py-2.5 text-sm leading-relaxed text-white shadow-agl">
            {message.via === "voice" && (
              <span className="mb-0.5 flex items-center gap-1 text-[11px] font-semibold text-white/70">
                <Mic className="h-3 w-3" aria-hidden="true" /> Said
              </span>
            )}
            {message.text}
          </div>
        </div>
      );
    case "assistant": {
      const pending = message.awaitingVoice && !message.text && !hidePending;
      return (
        <div className="flex animate-fade-up items-start gap-2.5" data-step={message.stepId ?? undefined}>
          <span className={cn("mt-0.5", grouped && "invisible")}>
            <AssistantAvatar />
          </span>
          <div className="min-w-0 flex-1 space-y-2">
            {(message.text || pending) && (
              <div className="w-fit max-w-[92%] rounded-agl-lg rounded-tl-md bg-surface-tint px-4 py-2.5 text-sm leading-relaxed text-ink">
                {pending ? <span className="text-ink-faint">Speaking…</span> : message.text}
              </div>
            )}
            {message.card && <StepCard card={message.card} live={live} />}
          </div>
        </div>
      );
    }
    default: {
      const exhaustive: never = message;
      return exhaustive;
    }
  }
}
