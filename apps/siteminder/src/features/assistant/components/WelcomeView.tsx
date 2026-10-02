import {
  AlertTriangle,
  ArrowRight,
  AudioLines,
  CalendarDays,
  History,
  LogIn,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { eventsLine, forecast, nextEvent, PACE_LABELS } from "@/features/property/insights";
import { useProperty } from "@/features/property/PropertyProvider";
import type { DemandEvent } from "@/features/property/types";
import {
  BOOKING_STATUS_LABELS,
  CHANNEL_STATUS_LABELS,
  channelIssue,
  daysUntil,
  PLANS,
  relativeDays,
} from "@/features/property/views";
import { useStudio } from "@/features/studio/StudioProvider";
import { formatShortDate } from "@/lib/format";
import { useAssistant } from "../AssistantProvider";
import { stepTopicEnabled } from "../engine/session";
import { popularQuestions, topics } from "../flows";
import { TopicIcon } from "./TopicIcon";

function NextEventCard({ event, events }: { event: DemandEvent; events: DemandEvent[] }) {
  const { open } = useAssistant();
  const now = new Date();
  const plan = forecast(event, events, now);
  const lastTime = plan.comparables[0];
  return (
    <section
      aria-label="Your next demand event"
      className="sm-night animate-fade-up overflow-hidden rounded-card text-white shadow-lift"
      style={{ animationDelay: "40ms" }}
    >
      <div className="p-4">
        <span className="pill bg-lime text-stratos">
          <CalendarDays className="size-3" aria-hidden />{" "}
          {relativeDays(daysUntil(event.start, now))}
        </span>
        <p className="mt-2 font-bold leading-snug">{event.name}</p>
        <p className="text-xs text-white/65">
          {formatShortDate(event.start)} · {event.venue}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-lime"
              style={{ width: `${event.onBooksPct ?? 0}%` }}
            />
          </div>
          <span className="text-xs font-semibold">{event.onBooksPct ?? 0}% booked</span>
        </div>
        <p className="mt-2 text-xs text-white/75">
          {PACE_LABELS[plan.pace]} ·{" "}
          {event.plan
            ? `priced at +${event.plan.upliftPct}%`
            : `suggest +${plan.upliftPct}% with a ${plan.minStay}-night minimum`}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-white/10 p-2.5">
        <button
          type="button"
          onClick={() =>
            open({ step: "events", recordId: event.id, label: `Plan for ${event.name}` })
          }
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20"
        >
          <TrendingUp className="size-3.5" aria-hidden />{" "}
          {event.plan ? "Review pricing" : "Plan pricing"}
        </button>
        {lastTime && (
          <button
            type="button"
            onClick={() =>
              open({
                step: "events.history",
                recordId: lastTime.id,
                label: `How did ${lastTime.name} go?`,
              })
            }
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20"
          >
            <History className="size-3.5" aria-hidden /> Last time:{" "}
            {lastTime.name.split(/[—|-]/)[0]?.trim()}
          </button>
        )}
      </div>
    </section>
  );
}

export function WelcomeView() {
  const store = useProperty();
  const { config } = useStudio();
  const { goToStep, open, setMode, voice } = useAssistant();
  const { signedIn, profile } = store;
  const personal = signedIn && config.assistant.personalGreeting;
  const now = new Date();
  const event =
    personal && config.assistant.eventInsights ? nextEvent(store.events, now) : undefined;
  const overbooked = store.bookings.find((b) => b.status === "overbooked");
  const channel = store.channels.find(channelIssue);
  const liveTopics = topics.filter((t) => config.topics[t.id]);
  const livePopular = popularQuestions.filter((q) => stepTopicEnabled(config, q.step));

  return (
    <div className="space-y-5 px-4 pt-5 pb-4">
      <div className="animate-fade-up">
        <p className="text-sm font-medium text-ink-soft">
          Hi {signedIn ? profile.firstName : "there"}
        </p>
        <h3 className="mt-0.5 text-2xl leading-tight font-bold">How can we help?</h3>
        {personal && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-royal-tint px-2.5 py-1 text-[11px] font-semibold text-royal">
            <Sparkles className="size-3.5" aria-hidden /> {store.property.name} ·{" "}
            {PLANS[store.property.plan].name} · {eventsLine(store.events)}
          </p>
        )}
      </div>

      {!signedIn && (
        <Link
          to="/login"
          className="flex animate-fade-up items-center gap-3 rounded-2xl border border-line-soft bg-white p-3 hover:border-royal"
        >
          <LogIn className="size-5 text-royal" aria-hidden />
          <span className="flex-1 text-sm">
            <span className="block font-semibold text-heading">Log in for faster help</span>
            <span className="text-xs text-ink-faint">
              We&apos;ll see your channels and bookings, so you won&apos;t need reference numbers.
            </span>
          </span>
          <ArrowRight className="size-4 text-ink-faint" aria-hidden />
        </Link>
      )}

      {personal && (overbooked || channel) && (
        <button
          type="button"
          onClick={() =>
            overbooked
              ? open({
                  step: "reservations",
                  recordId: overbooked.id,
                  label: `Booking ${overbooked.id} is overbooked`,
                })
              : channel &&
                open({ step: "channels", recordId: channel.id, label: `Fix ${channel.name}` })
          }
          className="flex w-full animate-fade-up items-start gap-3 rounded-2xl border border-critical/25 bg-critical-bg p-3 text-left"
        >
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-critical" aria-hidden />
          <span className="flex-1 text-sm">
            <span className="block font-semibold text-heading">
              {overbooked
                ? `${BOOKING_STATUS_LABELS.overbooked}: ${overbooked.guest} arrives ${relativeDays(daysUntil(overbooked.checkIn, now))}`
                : `${channel?.name}: ${channel ? CHANNEL_STATUS_LABELS[channel.status] : ""}`}
            </span>
            <span className="text-xs text-ink-soft">
              {overbooked
                ? `${overbooked.room} · ${overbooked.id} — let's rehouse or upgrade`
                : "It isn't receiving your rates and availability"}
            </span>
          </span>
          <ArrowRight className="mt-0.5 size-4 text-critical" aria-hidden />
        </button>
      )}

      {event && <NextEventCard event={event} events={store.events} />}

      <button
        type="button"
        onClick={() => setMode("voice")}
        className="group relative flex w-full animate-fade-up items-center gap-4 overflow-hidden rounded-card border border-line-soft bg-white p-4 text-left transition-shadow hover:shadow-lift"
        style={{ animationDelay: "80ms" }}
      >
        <span className="relative grid size-12 shrink-0 place-items-center rounded-full bg-royal text-white">
          <span
            className="absolute inset-0 animate-pulse-ring rounded-full bg-royal/40"
            aria-hidden
          />
          <AudioLines className="relative size-6" aria-hidden />
        </span>
        <span className="relative flex-1">
          <span className="block font-semibold text-heading">Talk to Support instead</span>
          <span className="block text-xs text-ink-soft">
            Speak naturally — we&apos;ll follow the same steps on screen.
          </span>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-lime px-2 py-0.5 text-[11px] font-semibold text-stratos">
            {voice.grokConfigured ? "Grok voice" : "Browser voice (demo)"}
          </span>
        </span>
        <ArrowRight
          className="relative size-5 shrink-0 text-royal transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </button>

      <section
        aria-labelledby="assistant-topics"
        className="animate-fade-up"
        style={{ animationDelay: "120ms" }}
      >
        <h4
          id="assistant-topics"
          className="mb-2 text-xs font-bold tracking-wide text-ink-faint uppercase"
        >
          Choose a topic
        </h4>
        <ul className="grid grid-cols-2 gap-2">
          {liveTopics.map((topic) => (
            <li key={topic.id}>
              <button
                type="button"
                onClick={() => goToStep(topic.entry, topic.label)}
                className="flex h-full w-full flex-col items-start gap-2 rounded-2xl border border-line-soft bg-white p-3 text-left transition-all hover:-translate-y-0.5 hover:border-royal/40 hover:shadow-card"
              >
                <span className="grid size-8 place-items-center rounded-xl bg-royal-tint text-royal">
                  <TopicIcon icon={topic.icon} className="size-4" />
                </span>
                <span>
                  <span className="block text-sm leading-tight font-semibold text-heading">
                    {topic.label}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-ink-faint">
                    {topic.description}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {livePopular.length > 0 && (
        <section
          aria-labelledby="assistant-popular"
          className="animate-fade-up"
          style={{ animationDelay: "160ms" }}
        >
          <h4
            id="assistant-popular"
            className="mb-2 text-xs font-bold tracking-wide text-ink-faint uppercase"
          >
            Popular questions
          </h4>
          <div className="flex flex-wrap gap-2">
            {livePopular.map((q) => (
              <button
                key={q.label}
                type="button"
                onClick={() => goToStep(q.step, q.label)}
                className="rounded-full border border-royal/25 bg-white px-3 py-1.5 text-left text-sm font-semibold text-royal hover:border-royal hover:bg-royal-tint"
              >
                {q.label}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
