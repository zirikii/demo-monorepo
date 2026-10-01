import { RotateCcw, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { renderStep } from "@/features/assistant/engine/conversation";
import { promptOptions } from "@/features/assistant/engine/session";
import { buildChatInstructions } from "@/features/assistant/engine/voicePrompt";
import { ROOT_ID, topics } from "@/features/assistant/flows";
import { insightLines, pastEvents, upcomingEvents } from "@/features/property/insights";
import { useProperty } from "@/features/property/PropertyProvider";
import type { BookingStatus, ChannelStatus, PlanId } from "@/features/property/types";
import {
  BOOKING_STATUS_LABELS,
  CHANNEL_STATUS_LABELS,
  EVENT_CATEGORY_LABELS,
  PLANS,
} from "@/features/property/views";
import { hoursLabel } from "@/features/studio/config";
import { useStudio } from "@/features/studio/StudioProvider";
import type { Persona, StudioConfig, VoiceName } from "@/features/studio/types";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";
import { formatCurrency, formatMonthYear, formatShortDate } from "@/lib/format";
import { AdminPage, Card, Toggle } from "./AdminLayout";

const PERSONAS: { id: Persona; label: string; description: string }[] = [
  { id: "warm", label: "Warm", description: "Friendly and reassuring — the default" },
  {
    id: "expert",
    label: "Expert",
    description: "Speaks like a revenue and distribution specialist",
  },
  { id: "concise", label: "Concise", description: "Short, to the point — for busy front desks" },
];

const VOICES: { id: VoiceName; label: string }[] = [
  { id: "eve", label: "Eve — bright, energetic" },
  { id: "ara", label: "Ara — warm, friendly" },
  { id: "rex", label: "Rex — calm, professional" },
  { id: "sal", label: "Sal — smooth, balanced" },
  { id: "leo", label: "Leo — confident" },
];

type AssistantFlag = {
  [K in keyof StudioConfig["assistant"]]: StudioConfig["assistant"][K] extends boolean ? K : never;
}[keyof StudioConfig["assistant"]];

const FLAGS: { key: AssistantFlag; label: string; description: string }[] = [
  {
    key: "personalGreeting",
    label: "Personal greeting",
    description: "Open with the property's live issues and the next demand event.",
  },
  {
    key: "eventInsights",
    label: "Event history insights",
    description: "Use past events (occupancy, ADR, sell-out lead time) to plan pricing.",
  },
  {
    key: "voiceForms",
    label: "Forms by voice",
    description: "Let Grok fill in on-screen forms from what the hotelier says.",
  },
  {
    key: "showRoutingNotes",
    label: "Show routing notes",
    description: "Show which queue and rule a handoff used, in the chat.",
  },
];

function hourOptions() {
  return Array.from({ length: 25 }, (_, h) => h);
}

export function AssistantSettingsPage() {
  useDocumentTitle("Assistant · Support Studio");
  const { config, updateConfig } = useStudio();
  const { conversation, voice } = useAssistant();
  const set = (patch: Partial<StudioConfig["assistant"]>) =>
    updateConfig((c) => ({ ...c, assistant: { ...c.assistant, ...patch } }));
  const greeting = renderStep(ROOT_ID, conversation.context, conversation.customer).text;
  const prompt = buildChatInstructions(
    conversation.context,
    promptOptions(config, conversation.customer),
    greeting,
  );

  return (
    <AdminPage
      title="Assistant"
      description="How SiteMinder Support sounds, what it knows about the property, and which topics it handles. Changes apply to the next message."
      action={
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold",
            voice.grokConfigured ? "bg-positive-bg text-positive" : "bg-caution-bg text-caution",
          )}
        >
          {voice.grokConfigured ? "Grok connected" : "Grok key not set · guided mode"}
        </span>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Persona">
          <div className="space-y-2">
            {PERSONAS.map((p) => (
              <label
                key={p.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border p-3",
                  config.assistant.persona === p.id
                    ? "border-royal bg-royal-tint"
                    : "border-line-soft",
                )}
              >
                <input
                  type="radio"
                  name="persona"
                  checked={config.assistant.persona === p.id}
                  onChange={() => set({ persona: p.id })}
                  className="mt-1 accent-royal"
                />
                <span>
                  <span className="block font-semibold text-heading">{p.label}</span>
                  <span className="text-sm text-ink-soft">{p.description}</span>
                </span>
              </label>
            ))}
          </div>
          <label htmlFor="voice" className="mt-4 mb-1 block text-xs font-semibold">
            Grok voice
          </label>
          <select
            id="voice"
            value={config.assistant.voice}
            onChange={(e) => set({ voice: e.target.value as VoiceName })}
            className="field"
          >
            {VOICES.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ))}
          </select>
        </Card>
        <Card title="Personalisation">
          <ul className="divide-y divide-line-soft">
            {FLAGS.map((f) => (
              <li key={f.key} className="flex items-center justify-between gap-4 py-2.5">
                <span>
                  <span className="block font-semibold text-heading">{f.label}</span>
                  <span className="text-sm text-ink-soft">{f.description}</span>
                </span>
                <Toggle
                  label={f.label}
                  checked={config.assistant[f.key]}
                  onChange={(v) => set({ [f.key]: v })}
                />
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Topics">
          <p className="-mt-1 mb-3 text-sm text-ink-soft">
            Switched-off topics go straight to a person instead of the guided flow.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {topics.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-line-soft px-3 py-2 text-sm"
              >
                {t.label}
                <Toggle
                  label={t.label}
                  checked={config.topics[t.id]}
                  onChange={(v) =>
                    updateConfig((c) => ({ ...c, topics: { ...c.topics, [t.id]: v } }))
                  }
                />
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Live specialist hours">
          <p className="-mt-1 mb-3 text-sm text-ink-soft">
            Outside these hours, handoffs become a callback. Currently {hoursLabel(config)}.
          </p>
          <div className="flex gap-3">
            {(["open", "close"] as const).map((k) => (
              <div key={k}>
                <label
                  htmlFor={`hours-${k}`}
                  className="mb-1 block text-xs font-semibold capitalize"
                >
                  {k === "open" ? "Opens" : "Closes"}
                </label>
                <select
                  id={`hours-${k}`}
                  value={config.hours[k]}
                  onChange={(e) =>
                    updateConfig((c) => ({
                      ...c,
                      hours: { ...c.hours, [k]: Number(e.target.value) },
                    }))
                  }
                  className="field w-28"
                >
                  {hourOptions().map((h) => (
                    <option key={h} value={h}>
                      {String(h).padStart(2, "0")}:00
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <label htmlFor="custom" className="mt-4 mb-1 block text-xs font-semibold">
            Extra instructions for Grok
          </label>
          <textarea
            id="custom"
            rows={3}
            value={config.assistant.customInstructions}
            onChange={(e) => set({ customInstructions: e.target.value })}
            placeholder="e.g. Mention Dynamic Revenue Plus to properties that price events manually."
            className="field"
          />
        </Card>
      </div>
      <Card title="What Grok is told">
        <p className="-mt-1 mb-3 text-sm text-ink-soft">
          The system prompt for the current hotelier, built from the flow, their property records,
          event history and your routing rules.
        </p>
        <pre className="max-h-96 overflow-auto rounded-xl bg-stratos p-4 text-xs leading-relaxed whitespace-pre-wrap text-white/85">
          {prompt}
        </pre>
      </Card>
    </AdminPage>
  );
}

const CHANNEL_STATUSES = Object.keys(CHANNEL_STATUS_LABELS) as ChannelStatus[];
const BOOKING_STATUSES = Object.keys(BOOKING_STATUS_LABELS) as BookingStatus[];

export function PropertyProfilePage() {
  useDocumentTitle("Property & events · Support Studio");
  const store = useProperty();
  const { resetConfig, clearLog } = useStudio();
  const { property, channels, bookings, events } = store;
  const now = new Date();
  const upcoming = upcomingEvents(events, now);
  const past = pastEvents(events);

  const setProperty = (patch: Partial<typeof property>) =>
    store.update((s) => ({ ...s, property: { ...s.property, ...patch } }));
  const setChannel = (id: string, status: ChannelStatus) =>
    store.update((s) => ({
      ...s,
      channels: s.channels.map((c) =>
        c.id === id
          ? {
              ...c,
              status,
              issueRoom: status === "mapping-error" ? (c.issueRoom ?? "Deluxe King") : undefined,
            }
          : c,
      ),
    }));
  const setBooking = (id: string, status: BookingStatus) =>
    store.update((s) => ({
      ...s,
      bookings: s.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
    }));
  const setOnBooks = (id: string, pct: number) =>
    store.update((s) => ({
      ...s,
      events: s.events.map((e) =>
        e.id === id ? { ...e, onBooksPct: Math.max(0, Math.min(100, pct)) } : e,
      ),
    }));

  return (
    <AdminPage
      title="Property & events"
      description="The demo property SiteMinder Support personalises for. Change channel and booking states, or the events store, to see greetings, flows and routing respond."
      action={
        <button
          type="button"
          onClick={() => {
            store.reset();
            resetConfig();
            clearLog();
          }}
          className="btn-outline"
        >
          <RotateCcw className="size-4" aria-hidden /> Reset all demo data
        </button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title={property.name}>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-semibold">
              Property name
              <input
                className="field mt-1"
                value={property.name}
                onChange={(e) => setProperty({ name: e.target.value })}
              />
            </label>
            <label className="text-xs font-semibold">
              Plan
              <select
                className="field mt-1"
                value={property.plan}
                onChange={(e) => setProperty({ plan: e.target.value as PlanId })}
              >
                {(Object.keys(PLANS) as PlanId[]).map((p) => (
                  <option key={p} value={p}>
                    {PLANS[p].name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs font-semibold">
              Rooms
              <input
                className="field mt-1"
                type="number"
                min={1}
                value={property.rooms}
                onChange={(e) => setProperty({ rooms: Math.max(1, Number(e.target.value)) })}
              />
            </label>
            <label className="text-xs font-semibold">
              PMS
              <input
                className="field mt-1"
                value={property.pms}
                onChange={(e) => setProperty({ pms: e.target.value })}
              />
            </label>
          </div>
          <p className="mt-3 text-xs text-ink-faint">
            Signed-in hotelier: {store.profile.firstName} {store.profile.lastName} (
            {store.profile.email}). Support code {property.supportCode}.
          </p>
        </Card>
        <Card title="Channels">
          <ul className="divide-y divide-line-soft text-sm">
            {channels.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 py-2">
                <span className="truncate">{c.name}</span>
                <select
                  aria-label={`${c.name} status`}
                  className="field w-44 py-1.5"
                  value={c.status}
                  onChange={(e) => setChannel(c.id, e.target.value as ChannelStatus)}
                >
                  {CHANNEL_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {CHANNEL_STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Bookings" className="lg:col-span-2">
          <div className="grid gap-x-6 sm:grid-cols-2">
            {bookings.slice(0, 12).map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between gap-3 border-b border-line-soft py-2 text-sm"
              >
                <span className="min-w-0">
                  <span className="block truncate font-medium text-heading">{b.guest}</span>
                  <span className="text-xs text-ink-faint">
                    {b.id} · {formatShortDate(b.checkIn)}
                  </span>
                </span>
                <select
                  aria-label={`${b.id} status`}
                  className="field w-40 py-1.5"
                  value={b.status}
                  onChange={(e) => setBooking(b.id, e.target.value as BookingStatus)}
                >
                  {BOOKING_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {BOOKING_STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </Card>
        <Card
          title="Upcoming events"
          action={
            <Link to="/app/events" className="link text-sm">
              Add on the platform
            </Link>
          }
        >
          <ul className="divide-y divide-line-soft text-sm">
            {upcoming.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3 py-2">
                <span className="min-w-0">
                  <span className="block truncate font-medium text-heading">{e.name}</span>
                  <span className="text-xs text-ink-faint">
                    {formatShortDate(e.start)} · {EVENT_CATEGORY_LABELS[e.category]}
                    {e.plan ? ` · priced +${e.plan.upliftPct}%` : ""}
                  </span>
                </span>
                <label className="flex shrink-0 items-center gap-1 text-xs text-ink-faint">
                  <input
                    aria-label={`${e.name} on the books`}
                    type="number"
                    className="field w-16 py-1"
                    value={e.onBooksPct ?? 0}
                    onChange={(ev) => setOnBooks(e.id, Number(ev.target.value))}
                  />
                  %
                </label>
                <button
                  type="button"
                  onClick={() => store.removeEvent(e.id)}
                  className="grid size-8 place-items-center rounded-full text-ink-faint hover:bg-critical-bg hover:text-critical"
                  aria-label={`Remove ${e.name}`}
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Past events (demand history)">
          <ul className="max-h-80 divide-y divide-line-soft overflow-y-auto text-sm">
            {past.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3 py-2">
                <span className="min-w-0">
                  <span className="block truncate font-medium text-heading">{e.name}</span>
                  <span className="text-xs text-ink-faint">
                    {formatMonthYear(e.start)} · {e.outcome?.occupancyPct}% ·{" "}
                    {formatCurrency(e.outcome?.adr ?? 0)} · +{e.outcome?.adrUpliftPct}%
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => store.removeEvent(e.id)}
                  className="grid size-8 shrink-0 place-items-center rounded-full text-ink-faint hover:bg-critical-bg hover:text-critical"
                  aria-label={`Remove ${e.name}`}
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
          <ul className="mt-3 space-y-1 border-t border-line-soft pt-3 text-xs text-ink-soft">
            {insightLines(events).map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </Card>
      </div>
    </AdminPage>
  );
}
