import { useEffect, useState } from "react";
import { AudioLines, X } from "lucide-react";
import { useFan } from "@/features/fan/FanProvider";
import { useAssistant } from "../AssistantProvider";
import { SupportMark } from "./SupportMark";

const TEASER_KEY = "ticketek-assistant-teaser-dismissed";

export function AssistantLauncher() {
  const { isOpen, open } = useAssistant();
  const { profile, views, signedIn } = useFan();
  const [teaser, setTeaser] = useState(false);
  const soon = signedIn ? views.find((v) => v.status === "event-soon") : undefined;

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
        <div className="relative max-w-[270px] animate-pop-in rounded-tk-xl bg-white p-3.5 pr-8 text-sm text-ink shadow-tk-lift ring-1 ring-black/5">
          <button type="button" onClick={dismissTeaser} aria-label="Dismiss" className="absolute top-2 right-2 rounded-full p-1 text-ink-faint hover:bg-page">
            <X className="size-3.5" aria-hidden />
          </button>
          <p className="font-bold">{signedIn ? `Hi ${profile.firstName}, need a hand?` : "Hi, need a hand?"}</p>
          <p className="mt-0.5 text-ink-soft">{soon ? `${soon.event.name} is coming up — ask about tickets, gates or getting there.` : "Tickets, refunds, transfers — chat or just talk to us."}</p>
        </div>
      )}
      <div className="flex items-center gap-2 rounded-full bg-white p-1.5 shadow-tk-lift ring-1 ring-black/5">
        <button
          type="button"
          onClick={() => {
            dismissTeaser();
            open({ mode: "voice" });
          }}
          aria-label="Talk to Ticketek Support"
          title="Talk to Ticketek Support"
          className="inline-flex size-11 items-center justify-center rounded-full bg-tk-blue-tint text-tk-blue transition-colors hover:bg-tk-blue hover:text-white"
        >
          <AudioLines className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => {
            dismissTeaser();
            open();
          }}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-midnight pr-5 pl-1.5 font-semibold text-white transition-colors hover:bg-midnight-soft"
        >
          <SupportMark />
          Support
        </button>
      </div>
    </div>
  );
}
