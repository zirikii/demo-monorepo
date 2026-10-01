import { CheckCircle2, CircleSlash, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { topics, type TopicId } from "@/features/assistant/flows";
import { nextEvent, upcomingEvents } from "@/features/property/insights";
import { useProperty } from "@/features/property/PropertyProvider";
import type { PlanId } from "@/features/property/types";
import { BOOKING_STATUS_LABELS, CHANNEL_STATUS_LABELS, channelIssue, daysUntil, PLANS, relativeDays } from "@/features/property/views";
import { queueName } from "@/features/studio/config";
import { evaluateRouting } from "@/features/studio/routing";
import { scoreSentiment } from "@/features/studio/sentiment";
import { useStudio } from "@/features/studio/StudioProvider";
import type { RoutingSignals } from "@/features/studio/types";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";
import { AdminPage, Card } from "./AdminLayout";

type Scenario = {
  label: string;
  messages: string;
  topics: TopicId[];
  channelId?: string;
  bookingId?: string;
  eventId?: string;
  fallbacks?: number;
  plan?: PlanId;
  rooms?: number;
  overdueDays?: number;
};

const PLAN_IDS = Object.keys(PLANS) as PlanId[];

export function SimulatorPage() {
  useDocumentTitle("Routing simulator · Support Studio");
  const { config } = useStudio();
  const store = useProperty();
  const now = useMemo(() => new Date(), []);
  const upcoming = upcomingEvents(store.events, now);
  const firstIssue = store.channels.find(channelIssue);
  const overbooked = store.bookings.find((b) => b.status === "overbooked");
  const scenarios: Scenario[] = [
    {
      label: `${firstIssue?.name ?? "Channel"} down before ${upcoming[0]?.name.split(" — ")[0] ?? "an event"}`,
      messages: `${firstIssue?.name ?? "Expedia"} has stopped selling rooms and we've got a big weekend coming`,
      topics: ["channels"],
      channelId: firstIssue?.id,
      eventId: upcoming[0]?.id,
    },
    { label: "Overbooked tonight", messages: "I've got two guests for one Deluxe King tonight", topics: ["urgent", "reservations"], bookingId: overbooked?.id },
    { label: "Angry about an invoice", messages: "Why is my bill so high, this is ridiculous\nWorst service ever, fix it now!!", topics: ["billing"], overdueDays: 18 },
    { label: "Account hacked", messages: "I think someone hacked our extranet login, there was a suspicious login overnight", topics: ["account"] },
    { label: "Assistant keeps missing", messages: "blah\nno that's not it", topics: [], fallbacks: 2 },
    { label: "Chain asking about events", messages: "Can you help us price Neon Harbour across our hotels?", topics: ["events"], plan: "groups", rooms: 420 },
  ];
  const first = scenarios[0]!;

  const [messages, setMessages] = useState(first.messages);
  const [selectedTopics, setTopics] = useState<TopicId[]>(first.topics);
  const [channelId, setChannelId] = useState(first.channelId ?? "");
  const [bookingId, setBookingId] = useState(first.bookingId ?? "");
  const [eventId, setEventId] = useState(first.eventId ?? "");
  const [plan, setPlan] = useState<PlanId>(store.property.plan);
  const [accountWide, setAccountWide] = useState(true);
  const [fallbacks, setFallbacks] = useState(0);
  const [rooms, setRooms] = useState(store.property.rooms);
  const [overdue, setOverdue] = useState(0);
  const [priorContacts, setPriorContacts] = useState(0);

  const signals = useMemo<RoutingSignals>(() => {
    const channel = store.channels.find((c) => c.id === channelId);
    const booking = store.bookings.find((b) => b.id === bookingId);
    const event = store.events.find((e) => e.id === eventId);
    const next = nextEvent(store.events, now);
    return {
      customerTurns: messages.split("\n").map((m) => m.trim()).filter(Boolean),
      topics: selectedTopics,
      fallbackCount: fallbacks,
      event: event && { label: event.name, daysUntil: daysUntil(event.start, now) },
      channel: channel && { label: channel.name, status: channel.status },
      booking: booking && { label: `${booking.id} (${booking.guest})`, status: booking.status },
      nextEvent: accountWide && next ? { label: next.name, daysUntil: daysUntil(next.start, now) } : undefined,
      channelIssues: accountWide ? store.channels.filter(channelIssue).map((c) => c.name) : [],
      plan,
      rooms,
      overdueDays: overdue,
      priorContacts: Array.from({ length: priorContacts }, (_, i) => ({ endedAt: new Date(now.getTime() - (i + 1) * 86_400_000).toISOString() })),
      now,
    };
  }, [messages, selectedTopics, fallbacks, channelId, bookingId, eventId, accountWide, plan, rooms, overdue, priorContacts, store, now]);

  const live = evaluateRouting(config, signals, "live");
  const handoff = evaluateRouting(config, signals, "handoff");
  const willHandOff = live.decision.action === "handoff";

  const load = (s: Scenario) => {
    setMessages(s.messages);
    setTopics(s.topics);
    setChannelId(s.channelId ?? "");
    setBookingId(s.bookingId ?? "");
    setEventId(s.eventId ?? "");
    setFallbacks(s.fallbacks ?? 0);
    setPlan(s.plan ?? store.property.plan);
    setRooms(s.rooms ?? store.property.rooms);
    setOverdue(s.overdueDays ?? 0);
  };

  return (
    <AdminPage
      title="Routing simulator"
      description="Test the live rules against any conversation before a hotelier hits them. Changes on the Routing rules page apply here immediately."
    >
      <div className="flex flex-wrap gap-2">
        {scenarios.map((s) => (
          <button key={s.label} type="button" onClick={() => load(s)} className="rounded-full border border-line bg-white px-3 py-1.5 text-sm hover:border-royal hover:text-royal">
            {s.label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Conversation signals">
          <div className="space-y-4">
            <div>
              <label htmlFor="sim-messages" className="mb-1 block text-xs font-semibold">
                Hotelier messages (one per line)
              </label>
              <textarea id="sim-messages" rows={4} value={messages} onChange={(e) => setMessages(e.target.value)} className="field font-mono text-xs" />
              <p className="mt-1 text-xs text-ink-faint">
                Sentiment: {signals.customerTurns.map((t) => scoreSentiment(t).toFixed(2)).join(", ") || "–"}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label htmlFor="sim-channel" className="mb-1 block text-xs font-semibold">
                  Channel
                </label>
                <select id="sim-channel" value={channelId} onChange={(e) => setChannelId(e.target.value)} className="field">
                  <option value="">None</option>
                  {store.channels.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} · {CHANNEL_STATUS_LABELS[c.status]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="sim-booking" className="mb-1 block text-xs font-semibold">
                  Booking
                </label>
                <select id="sim-booking" value={bookingId} onChange={(e) => setBookingId(e.target.value)} className="field">
                  <option value="">None</option>
                  {store.bookings.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.guest} · {BOOKING_STATUS_LABELS[b.status]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="sim-event" className="mb-1 block text-xs font-semibold">
                  Event
                </label>
                <select id="sim-event" value={eventId} onChange={(e) => setEventId(e.target.value)} className="field">
                  <option value="">None</option>
                  {upcoming.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name} · {relativeDays(daysUntil(e.start, now))}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <fieldset>
              <legend className="mb-1 text-xs font-semibold">Topics reached</legend>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => {
                  const on = selectedTopics.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setTopics((list) => (on ? list.filter((x) => x !== t.id) : [...list, t.id]))}
                      className={cn("rounded-full border px-2.5 py-1 text-xs", on ? "border-stratos bg-stratos text-white" : "border-line")}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="sim-plan" className="mb-1 block text-xs font-semibold">
                  Plan
                </label>
                <select id="sim-plan" value={plan} onChange={(e) => setPlan(e.target.value as PlanId)} className="field">
                  {PLAN_IDS.map((p) => (
                    <option key={p} value={p}>
                      {PLANS[p].name}
                    </option>
                  ))}
                </select>
              </div>
              <label className="flex items-end gap-2 pb-2 text-sm">
                <input type="checkbox" checked={accountWide} onChange={(e) => setAccountWide(e.target.checked)} className="size-4 accent-royal" />
                Include account signals (next event, channels not selling)
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(
                [
                  ["sim-rooms", "Rooms", rooms, setRooms],
                  ["sim-overdue", "Days overdue", overdue, setOverdue],
                  ["sim-fallbacks", "Fallbacks", fallbacks, setFallbacks],
                  ["sim-contacts", "Contacts this week", priorContacts, setPriorContacts],
                ] as const
              ).map(([id, label, value, set]) => (
                <div key={id}>
                  <label htmlFor={id} className="mb-1 block text-xs font-semibold">
                    {label}
                  </label>
                  <input id={id} type="number" min={0} value={value} onChange={(e) => set(Number(e.target.value))} className="field" />
                </div>
              ))}
            </div>
          </div>
        </Card>
        <div className="space-y-4">
          <Card>
            <p className="text-xs font-semibold text-ink-faint uppercase">Result</p>
            <p data-testid="sim-result" className={cn("mt-1 text-xl font-extrabold", willHandOff ? "text-royal" : "text-ink")}>
              {willHandOff ? `Hands off to ${queueName(config, handoff.decision.queue)}` : "Assistant keeps helping"}
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              {willHandOff ? `Triggered by “${live.decision.ruleName}”. ` : ""}If the hotelier asks for a person, they land in{" "}
              <strong className="text-ink">{queueName(config, handoff.decision.queue)}</strong> at <strong className="text-ink">{handoff.decision.priority}</strong>.
            </p>
            <p className="mt-1 text-xs text-ink-faint">{handoff.decision.reason}</p>
          </Card>
          <Card title="Rule trace">
            <ol className="space-y-2">
              {handoff.trace.map((t) => {
                const Icon = !t.enabled ? CircleSlash : t.matched ? CheckCircle2 : XCircle;
                return (
                  <li key={t.ruleId} className="flex items-start gap-2 text-sm">
                    <Icon className={cn("mt-0.5 size-4 shrink-0", !t.enabled ? "text-ink-faint" : t.matched ? "text-positive" : "text-line")} aria-hidden />
                    <span>
                      <span className={cn("font-semibold", t.matched && "text-positive", !t.enabled && "text-ink-faint")}>{t.name}</span>
                      <span className="block text-xs text-ink-soft">{t.reason}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </Card>
        </div>
      </div>
    </AdminPage>
  );
}
