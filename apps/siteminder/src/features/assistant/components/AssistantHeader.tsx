import type { ReactNode } from "react";
import { Maximize2, Minimize2, RotateCcw, X } from "lucide-react";
import { useStudio } from "@/features/studio/StudioProvider";
import { hoursLabel, isLiveChatOpen } from "@/features/studio/config";
import { useAssistant } from "../AssistantProvider";
import { ModeToggle } from "./ModeToggle";
import { SupportMark } from "./SupportMark";

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="inline-flex size-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-white"
    >
      {children}
    </button>
  );
}

export function AssistantHeader() {
  const { mode, setMode, expanded, setExpanded, restart, close, voice } = useAssistant();
  const { config } = useStudio();
  const subtitle =
    mode === "voice"
      ? voice.provider === "grok"
        ? "Voice · powered by Grok"
        : "Voice · demo mode"
      : isLiveChatOpen(config, new Date())
        ? "Instant answers · team online now"
        : `Instant answers · team back ${hoursLabel(config).split(" to ")[0]}`;

  return (
    <header className="relative shrink-0 overflow-hidden bg-midnight px-4 pt-4 pb-3 text-white">
      <div aria-hidden className="tk-gradient pointer-events-none absolute -top-20 -right-12 size-48 rounded-full opacity-30 blur-3xl" />
      <div className="relative flex items-center gap-3">
        <SupportMark size="md" online />
        <div className="min-w-0 flex-1">
          <h2 id="tk-assistant-title" className="truncate text-base leading-tight font-bold">
            Ticketek Support
          </h2>
          <p className="truncate text-xs text-white/70">{subtitle}</p>
        </div>
        <IconButton label="Start over" onClick={restart}>
          <RotateCcw className="size-4" aria-hidden />
        </IconButton>
        <span className="hidden sm:inline-flex">
          <IconButton label={expanded ? "Shrink chat" : "Expand chat"} onClick={() => setExpanded(!expanded)}>
            {expanded ? <Minimize2 className="size-4" aria-hidden /> : <Maximize2 className="size-4" aria-hidden />}
          </IconButton>
        </span>
        <IconButton label="Close chat" onClick={close}>
          <X className="size-5" aria-hidden />
        </IconButton>
      </div>
      <div className="relative mt-3 flex justify-center">
        <ModeToggle mode={mode} onChange={setMode} />
      </div>
      <div className="tk-gradient absolute inset-x-0 bottom-0 h-0.5" aria-hidden />
    </header>
  );
}
