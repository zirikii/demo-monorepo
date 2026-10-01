import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { useAssistant } from "../AssistantProvider";
import { AssistantHeader } from "./AssistantHeader";
import { Composer } from "./Composer";
import { ContextRail } from "./ContextRail";
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
      aria-labelledby="sm-assistant-title"
      tabIndex={-1}
      className={cn(
        "fixed inset-0 z-50 flex animate-pop-in overflow-hidden bg-white shadow-panel focus:outline-none",
        "sm:inset-auto sm:right-6 sm:bottom-6 sm:rounded-panel sm:ring-1 sm:ring-stratos/10",
        expanded
          ? "sm:h-[min(820px,calc(100dvh-3rem))] sm:w-[min(900px,calc(100vw-3rem))]"
          : "sm:h-[min(720px,calc(100dvh-3rem))] sm:w-[420px]",
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <AssistantHeader />
        {mode === "voice" ? (
          <div className="min-h-0 flex-1">
            <VoiceView />
          </div>
        ) : (
          <>
            {started && <FlowTrail conversation={conversation} onBack={back} />}
            <div className="min-h-0 flex-1 overflow-y-auto bg-white">
              {started ? <ThreadView /> : <WelcomeView />}
            </div>
            <div className="shrink-0 border-t border-line-soft bg-white px-3 pt-3 pb-2">
              <Composer onSend={(text) => sendText(text)} onVoice={() => setMode("voice")} />
              <p className="mt-2 text-center text-[11px] text-ink-faint">
                Unofficial demo assistant · Not affiliated with SiteMinder
              </p>
            </div>
          </>
        )}
      </div>
      {expanded && (
        <div className="hidden w-[300px] shrink-0 overflow-y-auto border-l border-line-soft bg-canvas sm:block">
          <ContextRail />
        </div>
      )}
    </div>
  );
}
