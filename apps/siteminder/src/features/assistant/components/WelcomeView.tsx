import { AlertTriangle, ArrowRight, AudioLines, CalendarHeart, LogIn, MapPin, Send, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { useFan } from "@/features/fan/FanProvider";
import type { OrderView } from "@/features/fan/orders";
import { fanTier, lifetimeEvents } from "@/features/fan/recommendations";
import { useStudio } from "@/features/studio/StudioProvider";
import { asset } from "@/lib/asset";
import { formatDateTime } from "@/lib/format";
import { useAssistant } from "../AssistantProvider";
import { stepTopicEnabled } from "../engine/session";
import { popularQuestions, topics } from "../flows";
import { TopicIcon } from "./TopicIcon";

function NextEvent({ view }: { view: OrderView }) {
  const { open } = useAssistant();
  const soon = view.status === "event-soon";
  const actions = [
    { label: "Show my tickets", Icon: Ticket, step: "tickets" },
    { label: "Event-day info", Icon: MapPin, step: "eventday" },
    ...(view.canTransfer ? [{ label: "Send to a friend", Icon: Send, step: "transfer" }] : []),
  ];
  return (
    <section aria-label="Your next event" className="animate-fade-up overflow-hidden rounded-tk-xl bg-midnight text-white shadow-tk-lift" style={{ animationDelay: "40ms" }}>
      <div className="relative">
        <img src={asset(view.event.image)} alt="" className="h-28 w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
        <span className="absolute top-2 left-2 rounded-full bg-tk-yellow px-2 py-0.5 text-[11px] font-bold text-midnight">{soon ? "Coming up soon" : "Your next event"}</span>
        <div className="absolute inset-x-3 bottom-2">
          <p className="truncate font-bold">{view.event.name}</p>
          <p className="truncate text-xs text-white/75">
            {formatDateTime(view.performance.startsAt)} · {view.venue.name}
          </p>
        </div>
      </div>
      <div className="tk-gradient h-1" aria-hidden />
      <div className="flex flex-wrap gap-1.5 p-2.5">
        {actions.map(({ label, Icon, step }) => (
          <button
            key={step}
            type="button"
            onClick={() => open({ step, orderId: view.order.id, label: `${label} — ${view.event.name}` })}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20"
          >
            <Icon className="size-3.5" aria-hidden /> {label}
          </button>
        ))}
      </div>
    </section>
  );
}

export function WelcomeView() {
  const { profile, views, signedIn } = useFan();
  const { config } = useStudio();
  const { goToStep, open, setMode, voice } = useAssistant();
  const personal = signedIn && config.assistant.personalGreeting;
  const next = views.find((v) => v.status === "event-soon" || v.status === "upcoming" || v.status === "rescheduled");
  const affected = views.find((v) => (v.status === "cancelled" && !v.order.refund) || (v.status === "rescheduled" && !v.order.refund));
  const liveTopics = topics.filter((t) => config.topics[t.id]);
  const livePopular = popularQuestions.filter((q) => stepTopicEnabled(config, q.step));

  return (
    <div className="space-y-5 px-4 pt-5 pb-4">
      <div className="animate-fade-up">
        <p className="text-sm font-medium text-ink-soft">Hi {signedIn ? profile.firstName : "there"}</p>
        <h3 className="mt-0.5 text-2xl leading-tight font-extrabold text-ink">How can we help?</h3>
        {personal && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-tk-blue-tint px-2.5 py-1 text-[11px] font-semibold text-tk-blue">
            <CalendarHeart className="size-3.5" aria-hidden /> {fanTier(profile).label} · {lifetimeEvents(profile)} events with Ticketek
          </p>
        )}
      </div>

      {!signedIn && (
        <Link to="/login" className="flex animate-fade-up items-center gap-3 rounded-tk-lg border border-line-soft bg-white p-3 hover:border-tk-blue">
          <LogIn className="size-5 text-tk-blue" aria-hidden />
          <span className="flex-1 text-sm">
            <span className="block font-semibold">Sign in for faster help</span>
            <span className="text-xs text-ink-faint">We&apos;ll find your orders so you don&apos;t need order numbers.</span>
          </span>
          <ArrowRight className="size-4 text-ink-faint" aria-hidden />
        </Link>
      )}

      {personal && affected && (
        <button
          type="button"
          onClick={() => open({ step: "refunds", orderId: affected.order.id, label: `What are my options for ${affected.event.name}?` })}
          className="flex w-full animate-fade-up items-start gap-3 rounded-tk-lg border border-caution/40 bg-caution-bg p-3 text-left"
        >
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-caution" aria-hidden />
          <span className="flex-1 text-sm">
            <span className="block font-semibold text-ink">
              {affected.event.name} was {affected.status === "cancelled" ? "cancelled" : "rescheduled"}
            </span>
            <span className="text-xs text-ink-soft">See your refund and ticket options</span>
          </span>
          <ArrowRight className="mt-0.5 size-4 text-caution" aria-hidden />
        </button>
      )}

      {personal && next && <NextEvent view={next} />}

      <button
        type="button"
        onClick={() => setMode("voice")}
        className="group relative flex w-full animate-fade-up items-center gap-4 overflow-hidden rounded-tk-xl bg-midnight p-4 text-left text-white shadow-tk-lift"
        style={{ animationDelay: "80ms" }}
      >
        <span aria-hidden className="tk-gradient pointer-events-none absolute -right-10 -bottom-12 size-36 rounded-full opacity-40 blur-2xl" />
        <span className="tk-gradient relative grid size-12 shrink-0 place-items-center rounded-full text-midnight">
          <AudioLines className="size-6" aria-hidden />
        </span>
        <span className="relative flex-1">
          <span className="block font-bold">Talk to us instead</span>
          <span className="block text-xs text-white/75">Speak naturally — we&apos;ll follow the same steps on screen.</span>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold">
            {voice.grokConfigured ? "Grok voice" : "Browser voice (demo)"}
          </span>
        </span>
        <ArrowRight className="relative size-5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </button>

      <section aria-labelledby="assistant-topics" className="animate-fade-up" style={{ animationDelay: "120ms" }}>
        <h4 id="assistant-topics" className="mb-2 text-xs font-bold tracking-wide text-ink-faint uppercase">
          Choose a topic
        </h4>
        <ul className="grid grid-cols-2 gap-2">
          {liveTopics.map((topic) => (
            <li key={topic.id}>
              <button
                type="button"
                onClick={() => goToStep(topic.entry, topic.label)}
                className="flex h-full w-full flex-col items-start gap-2 rounded-tk-lg border border-line-soft bg-white p-3 text-left transition-all hover:-translate-y-0.5 hover:border-tk-blue hover:shadow-tk"
              >
                <span className="grid size-8 place-items-center rounded-full bg-tk-blue-tint text-tk-blue">
                  <TopicIcon icon={topic.icon} className="size-4" />
                </span>
                <span>
                  <span className="block text-sm leading-tight font-semibold text-ink">{topic.label}</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-ink-faint">{topic.description}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {livePopular.length > 0 && (
        <section aria-labelledby="assistant-popular" className="animate-fade-up" style={{ animationDelay: "160ms" }}>
          <h4 id="assistant-popular" className="mb-2 text-xs font-bold tracking-wide text-ink-faint uppercase">
            Popular questions
          </h4>
          <div className="flex flex-wrap gap-2">
            {livePopular.map((q) => (
              <button
                key={q.label}
                type="button"
                onClick={() => goToStep(q.step, q.label)}
                className="rounded-full border border-tk-blue/30 bg-white px-3 py-1.5 text-left text-sm font-semibold text-tk-blue hover:border-tk-blue hover:bg-tk-blue-tint"
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
