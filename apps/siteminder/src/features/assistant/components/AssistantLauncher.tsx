import { useEffect, useState } from "react";
import { AudioLines, X } from "lucide-react";
import { nextEvent } from "@/features/property/insights";
import { useProperty } from "@/features/property/PropertyProvider";
import { CHANNEL_STATUS_LABELS, channelIssue, daysUntil, relativeDays } from "@/features/property/views";
import { useAssistant, type OpenOptions } from "../AssistantProvider";
import { SupportMark } from "./SupportMark";

const TEASER_KEY = "siteminder-assistant-teaser-dismissed";

type Teaser = { title: string; body: string; action?: OpenOptions & { cta: string } };

function useTeaser(): Teaser {
  const store = useProperty();
  if (!store.signedIn) return { title: "Hi, need a hand?", body: "Channels, bookings, rates or billing — chat, or just talk to us." };
  const greeting = `Hi ${store.profile.firstName}`;
  const issue = store.channels.find(channelIssue);
  if (issue) {
    return {
      title: `${greeting} — ${issue.name} needs a look`,
      body: `${CHANNEL_STATUS_LABELS[issue.status]}${issue.issueRoom ? ` on ${issue.issueRoom}` : ""}. I can fix it with you in a minute.`,
      action: { step: "channels", recordId: issue.id, label: `Fix ${issue.name}`, cta: "Fix it now" },
    };
  }
  const event = nextEvent(store.events, new Date());
  if (event && !event.plan) {
    return {
      title: `${greeting}, ${event.name} is ${relativeDays(daysUntil(event.start, new Date()))}`,
      body: `You're ${event.onBooksPct ?? 0}% booked. Want a pricing plan based on your past events?`,
      action: { step: "events", recordId: event.id, label: `Plan for ${event.name}`, cta: "Plan pricing" },
    };
  }
  return { title: `${greeting}, need a hand?`, body: "Ask about channels, bookings, rates or billing." };
}

export function AssistantLauncher() {
  const { isOpen, open } = useAssistant();
  const teaserContent = useTeaser();
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
  const { action } = teaserContent;

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {teaser && (
        <div className="relative max-w-[300px] animate-pop-in rounded-card bg-white p-4 pr-9 text-sm text-ink shadow-lift ring-1 ring-stratos/5">
          <button type="button" onClick={dismissTeaser} aria-label="Dismiss" className="absolute top-2.5 right-2.5 rounded-full p-1 text-ink-faint hover:bg-canvas">
            <X className="size-3.5" aria-hidden />
          </button>
          <p className="font-semibold text-heading">{teaserContent.title}</p>
          <p className="mt-1 text-ink-soft">{teaserContent.body}</p>
          {action && (
            <button
              type="button"
              onClick={() => {
                dismissTeaser();
                open(action);
              }}
              className="btn-primary mt-3 px-4 py-1.5 text-xs"
            >
              {action.cta}
            </button>
          )}
        </div>
      )}
      <div className="flex items-center gap-1.5 rounded-full bg-white p-1.5 shadow-lift ring-1 ring-stratos/5">
        <button
          type="button"
          onClick={() => {
            dismissTeaser();
            open({ mode: "voice" });
          }}
          aria-label="Talk to SiteMinder Support"
          title="Talk to SiteMinder Support"
          className="inline-flex size-11 items-center justify-center rounded-full bg-royal-tint text-royal transition-colors hover:bg-royal hover:text-white"
        >
          <AudioLines className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => {
            dismissTeaser();
            open();
          }}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-stratos pr-5 pl-1.5 font-semibold text-white transition-colors hover:bg-deep"
        >
          <SupportMark />
          Support
        </button>
      </div>
    </div>
  );
}
