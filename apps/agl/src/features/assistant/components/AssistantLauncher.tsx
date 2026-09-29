import { useEffect, useState } from "react";
import { AudioLines, X } from "lucide-react";
import { AglRays } from "@/components/brand/AglRays";
import { useAssistant } from "../AssistantProvider";

const TEASER_KEY = "agl-assistant-teaser-dismissed";

export function AssistantLauncher() {
  const { isOpen, open } = useAssistant();
  const [teaser, setTeaser] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(TEASER_KEY)) return;
    const timer = setTimeout(() => setTeaser(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  const dismissTeaser = () => {
    setTeaser(false);
    sessionStorage.setItem(TEASER_KEY, "1");
  };

  if (isOpen) return null;

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {teaser && (
        <div className="relative max-w-[260px] animate-pop-in rounded-agl-lg bg-white p-3.5 pr-8 text-sm text-ink shadow-agl-lift ring-1 ring-black/5">
          <button
            type="button"
            onClick={dismissTeaser}
            aria-label="Dismiss"
            className="absolute top-2 right-2 rounded-full p-1 text-ink-faint hover:bg-surface-tint"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <p className="font-extrabold">Hi, what&apos;s your query today?</p>
          <p className="mt-0.5 text-ink-soft">Bills, nbn®, moving house — chat or just talk to me.</p>
        </div>
      )}
      <div className="flex items-center gap-2 rounded-full bg-white p-1.5 shadow-agl-lift ring-1 ring-black/5">
        <button
          type="button"
          onClick={() => {
            dismissTeaser();
            open({ mode: "voice" });
          }}
          aria-label="Talk to AGL Assistant"
          title="Talk to AGL Assistant"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-agl-sky text-agl-blue transition-colors hover:bg-agl-sky-deep"
        >
          <AudioLines className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => {
            dismissTeaser();
            open();
          }}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-agl-blue pr-5 pl-1.5 font-extrabold text-white transition-colors hover:bg-agl-blue-hover"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <AglRays className="h-5 w-5" />
          </span>
          Chat with us
        </button>
      </div>
    </div>
  );
}
