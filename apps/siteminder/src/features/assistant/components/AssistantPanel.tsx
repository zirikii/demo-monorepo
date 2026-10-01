import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { useAssistant } from "../AssistantProvider";
import { AssistantHeader } from "./AssistantHeader";
import { Composer } from "./Composer";
import { FlowTrail } from "./FlowTrail";
import { ThreadView } from "./ThreadView";
import { VoiceView } from "./VoiceView";
import { WelcomeView } from "./WelcomeView";

export function AssistantPanel() {
  const { isOpen, close, mode, setMode, expanded, conversation, sendText, back } = useAssistant();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  if (!isOpen) return null;
  const started = conversation.messages.length > 0;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="tk-assistant-title"
      tabIndex={-1}
      className={cn(
        "fixed inset-0 z-50 flex animate-pop-in flex-col overflow-hidden bg-white shadow-tk-panel focus:outline-none",
        "sm:inset-auto sm:right-6 sm:bottom-6 sm:rounded-tk-xl sm:ring-1 sm:ring-black/5",
        expanded ? "sm:h-[min(820px,calc(100dvh-3rem))] sm:w-[560px]" : "sm:h-[min(700px,calc(100dvh-3rem))] sm:w-[410px]",
      )}
    >
      <AssistantHeader />
      {mode === "voice" ? (
        <div className="min-h-0 flex-1">
          <VoiceView />
        </div>
      ) : (
        <>
          {started && <FlowTrail conversation={conversation} onBack={back} />}
          <div className="min-h-0 flex-1 overflow-y-auto bg-white">{started ? <ThreadView /> : <WelcomeView />}</div>
          <div className="shrink-0 border-t border-line-soft bg-white px-3 pt-3 pb-2">
            <Composer onSend={(text) => sendText(text)} onVoice={() => setMode("voice")} />
            <p className="mt-2 text-center text-[11px] text-ink-faint">Unofficial demo assistant · In an emergency call 000</p>
          </div>
        </>
      )}
    </div>
  );
}
