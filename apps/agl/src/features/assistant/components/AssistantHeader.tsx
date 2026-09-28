import type { ReactNode } from "react";
import { Maximize2, Minimize2, RotateCcw, X } from "lucide-react";
import { useAssistant } from "../AssistantProvider";
import { AssistantAvatar } from "./AssistantAvatar";
import { ModeToggle } from "./ModeToggle";

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-white"
    >
      {children}
    </button>
  );
}

export function AssistantHeader() {
  const { mode, setMode, expanded, setExpanded, restart, close, voice } = useAssistant();
  const subtitle =
    mode === "voice"
      ? voice.provider === "grok"
        ? "Voice · powered by Grok"
        : "Voice · demo mode"
      : "Online now · replies instantly";

  return (
    <header className="relative shrink-0 overflow-hidden bg-gradient-to-br from-agl-navy via-agl-blue-dark to-agl-blue px-4 pt-4 pb-3 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-ray-cyan/25 blur-3xl"
      />
      <div className="relative flex items-center gap-3">
        <AssistantAvatar size="md" online />
        <div className="min-w-0 flex-1">
          <h2 id="agl-assistant-title" className="truncate text-base leading-tight font-extrabold">
            AGL Assistant
          </h2>
          <p className="truncate text-xs text-white/75">{subtitle}</p>
        </div>
        <IconButton label="Start over" onClick={restart}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </IconButton>
        <span className="hidden sm:inline-flex">
          <IconButton label={expanded ? "Shrink chat" : "Expand chat"} onClick={() => setExpanded(!expanded)}>
            {expanded ? <Minimize2 className="h-4 w-4" aria-hidden="true" /> : <Maximize2 className="h-4 w-4" aria-hidden="true" />}
          </IconButton>
        </span>
        <IconButton label="Close chat" onClick={close}>
          <X className="h-5 w-5" aria-hidden="true" />
        </IconButton>
      </div>
      <div className="relative mt-3 flex justify-center">
        <ModeToggle mode={mode} onChange={setMode} />
      </div>
    </header>
  );
}
