import { AlertTriangle, Building2, CalendarDays, GitBranch, History, LogIn } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { eventsLine, forecast, insightLines, nextEvent, PACE_LABELS } from "@/features/property/insights";
import { useProperty } from "@/features/property/PropertyProvider";
import { BOOKING_STATUS_LABELS, bookingNeedsAction, CHANNEL_STATUS_LABELS, channelIssue, daysUntil, PLANS, relativeDays } from "@/features/property/views";
import { queueName } from "@/features/studio/config";
import { useStudio } from "@/features/studio/StudioProvider";
import { cn } from "@/lib/cn";
import { useAssistant } from "../AssistantProvider";

function RailSection({ title, icon: Icon, children }: { title: string; icon: typeof History; children: ReactNode }) {
  return (
    <section className="animate-fade-up">
      <h3 className="mb-2 flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-ink-faint uppercase">
        <Icon className="size-3.5" aria-hidden /> {title}
      </h3>
      {children}
    </section>
  );
}

/** What Support can see about the hotelier — shown beside the chat when it's expanded. */
export function ContextRail() {
  const store = useProperty();
  const { config } = useStudio();
  const { open, handoff } = useAssistant();
  const now = new Date();

  if (!store.signedIn) {
    return (
      <aside aria-label="What Support can see" className="space-y-4 p-4">
        <RailSection title="Your property" icon={Building2}>
          <Link to="/login" className="flex items-center gap-2 rounded-xl border border-line-soft bg-white p-3 text-sm hover:border-royal">
            <LogIn className="size-4 text-royal" aria-hidden />
            Log in so Support can see your channels, bookings and events.
          </Link>
        </RailSection>
      </aside>
    );
  }

  const issues = [
    ...store.channels.filter(channelIssue).map((c) => ({ id: c.id, label: c.name, status: CHANNEL_STATUS_LABELS[c.status], step: "channels" })),
    ...store.bookings.filter(bookingNeedsAction).map((b) => ({ id: b.id, label: b.guest, status: BOOKING_STATUS_LABELS[b.status], step: "reservations" })),
  ];
  const event = config.assistant.eventInsights ? nextEvent(store.events, now) : undefined;
  const plan = event ? forecast(event, store.events, now) : undefined;
  const lesson = config.assistant.eventInsights ? insightLines(store.events, 1)[0] : undefined;

  return (
    <aside aria-label="What Support can see" className="space-y-5 p-4">
      <RailSection title="Your property" icon={Building2}>
        <div className="rounded-xl bg-white p-3 text-sm shadow-card">
          <p className="font-semibold text-heading">{store.property.name}</p>
          <p className="text-xs text-ink-faint">
            {PLANS[store.property.plan].name} · {store.property.rooms} rooms · {store.property.pms} PMS
          </p>
          <p className="mt-1 text-xs text-ink-soft">
            {store.profile.firstName} {store.profile.lastName} · {store.profile.role}
          </p>
        </div>
      </RailSection>

      {issues.length > 0 && (
        <RailSection title="Live on your account" icon={AlertTriangle}>
          <ul className="space-y-1.5">
            {issues.map((i) => (
              <li key={i.id}>
                <button
                  type="button"
                  onClick={() => open({ step: i.step, recordId: i.id, label: `Help with ${i.label}` })}
                  className="flex w-full items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 text-left text-xs shadow-card hover:ring-1 hover:ring-royal/30"
                >
                  <span className="truncate font-semibold text-heading">{i.label}</span>
                  <span className="pill shrink-0 bg-critical-bg text-[10px] text-critical">{i.status}</span>
                </button>
              </li>
            ))}
          </ul>
        </RailSection>
      )}

      {event && plan && (
        <RailSection title="Next demand event" icon={CalendarDays}>
          <button
            type="button"
            onClick={() => open({ step: "events", recordId: event.id, label: `Plan for ${event.name}` })}
            className="sm-night block w-full rounded-xl p-3 text-left text-white"
          >
            <p className="text-sm font-semibold">{event.name}</p>
            <p className="text-xs text-white/65">
              {relativeDays(daysUntil(event.start, now))} · {event.onBooksPct ?? 0}% booked · {PACE_LABELS[plan.pace]}
            </p>
            <p className="mt-2 text-xs text-lime">{event.plan ? `Priced at +${event.plan.upliftPct}%` : `Suggest +${plan.upliftPct}%, ${plan.minStay}-night min`}</p>
          </button>
        </RailSection>
      )}

      {lesson && (
        <RailSection title="Event history" icon={History}>
          <p className="text-xs text-ink-soft">
            Support compares with {eventsLine(store.events)}. {lesson}
          </p>
        </RailSection>
      )}

      {handoff && (
        <RailSection title="Why this team?" icon={GitBranch}>
          <div className="rounded-xl border border-royal/20 bg-royal-tint/60 p-3 text-xs">
            <p className="font-semibold text-heading">
              {queueName(config, handoff.decision.queue)} · {handoff.decision.priority}
            </p>
            <p className="mt-1 text-ink-soft">{handoff.decision.reason}</p>
            <ul className="mt-2 space-y-1">
              {handoff.trace
                .filter((t) => t.enabled)
                .slice(0, 8)
                .map((t) => (
                  <li key={t.ruleId} className={cn("flex items-center gap-1.5", t.matched ? "text-heading" : "text-ink-faint")}>
                    <span className={cn("size-1.5 shrink-0 rounded-full", t.matched ? "bg-positive" : "bg-line")} aria-hidden />
                    <span className="truncate">{t.name}</span>
                  </li>
                ))}
            </ul>
          </div>
        </RailSection>
      )}
    </aside>
  );
}
