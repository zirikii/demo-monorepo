import { Lightbulb, MapPin, Plus, Trash2, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import { categoryStats, forecast, insightLines, PACE_LABELS, pastEvents, upcomingEvents } from "@/features/property/insights";
import { useProperty } from "@/features/property/PropertyProvider";
import type { EventCategory } from "@/features/property/types";
import { daysUntil, EVENT_CATEGORY_LABELS, relativeDays } from "@/features/property/views";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { toLocalIso } from "@/lib/clock";
import { formatCurrency, formatMonthYear, formatShortDate } from "@/lib/format";
import { AskSupport, Badge, PageTitle, Panel } from "./ui";

const CATEGORIES = Object.keys(EVENT_CATEGORY_LABELS) as EventCategory[];

function AddEventForm({ onDone }: { onDone: () => void }) {
  const { addEvent } = useProperty();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [category, setCategory] = useState<EventCategory>("concert");
  const [crowd, setCrowd] = useState("40000");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    addEvent({
      name: name.trim(),
      category,
      venue: venue.trim() || "Sydney",
      start: `${date}T19:00:00`,
      end: `${date}T23:00:00`,
      distanceKm: 5,
      attendance: Number(crowd) || 20_000,
      source: "manual",
      onBooksPct: 35,
    });
    onDone();
  };

  return (
    <form onSubmit={submit} className="grid animate-fade-in gap-3 rounded-xl border border-line-soft bg-canvas p-4 sm:grid-cols-2 lg:grid-cols-5" aria-label="Add an event">
      <label className="text-xs font-semibold text-heading lg:col-span-2">
        Event name
        <input className="field mt-1" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Fred again.. at Allianz Stadium" />
      </label>
      <label className="text-xs font-semibold text-heading">
        Date
        <input className="field mt-1" type="date" value={date} min={toLocalIso(new Date()).slice(0, 10)} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label className="text-xs font-semibold text-heading">
        Category
        <select className="field mt-1" value={category} onChange={(e) => setCategory(e.target.value as EventCategory)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {EVENT_CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
      </label>
      <label className="text-xs font-semibold text-heading">
        Expected crowd
        <input className="field mt-1" inputMode="numeric" value={crowd} onChange={(e) => setCrowd(e.target.value.replace(/\D/g, ""))} />
      </label>
      <label className="text-xs font-semibold text-heading sm:col-span-2 lg:col-span-3">
        Venue
        <input className="field mt-1" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Venue" />
      </label>
      <div className="flex items-end gap-2 sm:col-span-2">
        <button type="submit" className="btn-primary flex-1">
          Save event
        </button>
        <button type="button" onClick={onDone} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}

export function EventsPage() {
  useDocumentTitle("Demand events");
  const { events, removeEvent } = useProperty();
  const [adding, setAdding] = useState(false);
  const now = new Date();
  const upcoming = upcomingEvents(events, now);
  const past = pastEvents(events);
  const stats = categoryStats(events);

  return (
    <div className="mx-auto max-w-6xl">
      <PageTitle
        title="Demand events"
        body="The concerts, games and conferences that move your demand — and what happened last time. SiteMinder Support uses this history to plan your pricing."
        actions={
          <button type="button" className="btn-primary" onClick={() => setAdding((v) => !v)} aria-expanded={adding}>
            <Plus className="size-4" aria-hidden /> Add event
          </button>
        }
      />
      {adding && (
        <div className="mb-6">
          <AddEventForm onDone={() => setAdding(false)} />
        </div>
      )}

      <h2 className="mb-3 text-lg font-semibold">Upcoming</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {upcoming.map((e) => {
          const f = forecast(e, events, now);
          return (
            <article key={e.id} className="card flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge tone="info">{EVENT_CATEGORY_LABELS[e.category]}</Badge>
                    <Badge tone={f.pace === "behind" ? "critical" : f.pace === "ahead" ? "positive" : "neutral"}>{PACE_LABELS[f.pace]}</Badge>
                    {e.plan && <Badge tone="positive">Pricing applied</Badge>}
                    {e.source === "manual" && <Badge tone="neutral">Added by you</Badge>}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">{e.name}</h3>
                  <p className="mt-1 flex flex-wrap gap-x-3 text-sm text-ink-faint">
                    <span>
                      {formatShortDate(e.start)} · {relativeDays(daysUntil(e.start, now))}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5" aria-hidden /> {e.venue}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="size-3.5" aria-hidden /> {e.attendance.toLocaleString("en-AU")}
                    </span>
                  </p>
                </div>
                {e.source === "manual" && (
                  <button type="button" onClick={() => removeEvent(e.id)} className="grid size-8 shrink-0 place-items-center rounded-full text-ink-faint hover:bg-critical-bg hover:text-critical" aria-label={`Remove ${e.name}`}>
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                )}
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-ink-faint">
                  <span>On the books</span>
                  <span>Expected {f.expectedOccupancy}%</span>
                </div>
                <div className="relative mt-1 h-2 rounded-full bg-canvas">
                  <span className="absolute inset-y-0 left-0 rounded-full bg-royal" style={{ width: `${e.onBooksPct ?? 0}%` }} />
                  <span className="absolute -top-1 h-4 w-0.5 bg-heading" style={{ left: `${f.expectedOccupancy}%` }} aria-hidden />
                </div>
                <p className="mt-1 text-sm font-semibold text-heading">{e.onBooksPct ?? 0}% booked</p>
              </div>
              <p className="mt-3 text-sm text-ink-soft">
                {e.plan ? `Running +${e.plan.upliftPct}% with a ${e.plan.minStay}-night minimum.` : `Suggested: +${f.upliftPct}% with a ${f.minStay}-night minimum.`} {f.advice}
              </p>
              {f.comparables.length > 0 && <p className="mt-2 text-xs text-ink-faint">Compared with {f.comparables.map((c) => `${c.name} (${formatMonthYear(c.start)})`).join(" and ")}</p>}
              <div className="mt-auto pt-4">
                <AskSupport step="events" recordId={e.id} label={`Plan for ${e.name}`}>
                  {e.plan ? "Review plan with Support" : "Plan pricing with Support"}
                </AskSupport>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Panel title="Past events" action={<span className="text-sm text-ink-faint">{past.length} in your history</span>}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-ink-faint">
                <tr>
                  <th className="pb-3 font-semibold">Event</th>
                  <th className="pb-3 text-right font-semibold">Occ.</th>
                  <th className="pb-3 text-right font-semibold">ADR</th>
                  <th className="pb-3 text-right font-semibold">Uplift</th>
                  <th className="pb-3 text-right font-semibold">Sold out</th>
                  <th className="pb-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {past.map((e) => (
                  <tr key={e.id}>
                    <td className="py-3 pr-3">
                      <span className="block font-semibold text-heading">{e.name}</span>
                      <span className="text-xs text-ink-faint">
                        {EVENT_CATEGORY_LABELS[e.category]} · {formatMonthYear(e.start)}
                      </span>
                      {e.outcome && <span className="mt-1 block text-xs text-ink-soft">{e.outcome.note}</span>}
                    </td>
                    <td className="py-3 pr-3 text-right tabular-nums">{e.outcome?.occupancyPct}%</td>
                    <td className="py-3 pr-3 text-right tabular-nums">{formatCurrency(e.outcome?.adr ?? 0)}</td>
                    <td className="py-3 pr-3 text-right tabular-nums text-positive">+{e.outcome?.adrUpliftPct}%</td>
                    <td className="py-3 pr-3 text-right tabular-nums">{e.outcome?.soldOutDaysBefore ? `${e.outcome.soldOutDaysBefore}d out` : "—"}</td>
                    <td className="py-3 text-right">
                      <AskSupport step="events.history" recordId={e.id} label={`Review ${e.name}`}>
                        Review
                      </AskSupport>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <div className="space-y-6">
          <Panel title="What your history says">
            <ul className="space-y-3">
              {insightLines(events, 4).map((line) => (
                <li key={line} className="flex gap-2 text-sm text-ink-soft">
                  <Lightbulb className="mt-0.5 size-4 shrink-0 text-royal" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
            <AskSupport step="events.insights" label="What have past events taught us?" className="mt-4">
              Talk it through with Support
            </AskSupport>
          </Panel>
          <Panel title="By category">
            <ul className="space-y-2 text-sm">
              {stats.map((s) => (
                <li key={s.category} className="flex items-center justify-between">
                  <span className="text-heading">
                    {EVENT_CATEGORY_LABELS[s.category]} <span className="text-ink-faint">· {s.count}</span>
                  </span>
                  <span className="tabular-nums text-ink-soft">
                    {s.occupancy}% · <span className="text-positive">+{s.uplift}%</span>
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
