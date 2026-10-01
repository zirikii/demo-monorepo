import { CalendarDays, History, Lightbulb } from "lucide-react";
import { categoryStats, comparables, forecast, insightLines } from "@/features/property/insights";
import { useProperty } from "@/features/property/PropertyProvider";
import { EVENT_CATEGORY_LABELS } from "@/features/property/views";
import { formatCurrency, formatMonthYear } from "@/lib/format";
import type { TemplateValues } from "../../flows";
import { CardShell } from "./CardShell";

function Metric({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="rounded-xl bg-white/10 px-2 py-2 text-center">
      <p className="text-base font-bold">{value}</p>
      <p className="text-[10px] text-white/60">{label}</p>
    </div>
  );
}

export function EventPlaybookCard({ values }: { values: TemplateValues }) {
  const { events } = useProperty();
  const event = events.find((e) => e.id === values.eventId);
  const f = event ? forecast(event, events, new Date()) : undefined;
  return (
    <CardShell tone="night" title={values.eventName} icon={<CalendarDays className="size-4 text-lime" aria-hidden />} aside={<span className="pill bg-lime text-[11px] text-stratos">{values.eventPace}</span>}>
      <p className="-mt-2 mb-3 text-xs text-white/65">
        {values.eventDaysOut} · {values.eventVenue}
      </p>
      <div className="grid grid-cols-3 gap-2">
        <Metric label="On the books" value={values.eventOnBooks} />
        <Metric label="Suggested" value={`+${values.eventUplift}`} />
        <Metric label="Min stay" value={values.eventMinStay} />
      </div>
      {f && f.comparables.length > 0 && (
        <div className="mt-3 space-y-1.5">
          <p className="text-[11px] font-semibold tracking-wide text-white/50 uppercase">Based on your history</p>
          {f.comparables.map((c) => (
            <div key={c.id} className="flex items-center justify-between gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs">
              <span className="min-w-0">
                <span className="block truncate font-semibold">{c.name}</span>
                <span className="text-white/55">{formatMonthYear(c.start)}</span>
              </span>
              <span className="shrink-0 text-right tabular-nums">
                {c.outcome?.occupancyPct}% · {formatCurrency(c.outcome?.adr ?? 0)}
                <span className="block text-lime">+{c.outcome?.adrUpliftPct}%</span>
              </span>
            </div>
          ))}
        </div>
      )}
      {event?.plan && <p className="mt-3 text-xs text-lime">Event pricing is live: +{event.plan.upliftPct}% with a {event.plan.minStay}-night minimum.</p>}
    </CardShell>
  );
}

export function EventReviewCard({ values }: { values: TemplateValues }) {
  const { events } = useProperty();
  const event = events.find((e) => e.id === values.historyId);
  const similar = event ? comparables(event, events, 1)[0] : undefined;
  return (
    <CardShell title={values.historyName} icon={<History className="size-4 text-royal" aria-hidden />} aside={<span className="text-xs text-ink-faint">{values.historyDate}</span>}>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          ["Occupancy", values.historyOccupancy],
          ["ADR", values.historyAdr],
          ["Uplift", `+${values.historyUplift}`],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-canvas px-2 py-2">
            <p className="text-base font-bold text-heading">{v}</p>
            <p className="text-[10px] text-ink-faint">{k}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-ink-soft">{values.historySoldOut}</p>
      {values.historyNote && <p className="mt-1 rounded-xl bg-royal-tint px-3 py-2 text-xs text-royal">{values.historyNote}</p>}
      {similar && <p className="mt-2 text-[11px] text-ink-faint">Most similar: {similar.name} ({formatMonthYear(similar.start)})</p>}
    </CardShell>
  );
}

export function EventInsightsCard() {
  const { events } = useProperty();
  const stats = categoryStats(events);
  const best = Math.max(1, ...stats.map((s) => s.uplift));
  return (
    <CardShell title="What your events taught you" icon={<Lightbulb className="size-4 text-royal" aria-hidden />}>
      <ul className="space-y-2">
        {stats.map((s) => (
          <li key={s.category} className="text-xs">
            <div className="flex justify-between">
              <span className="font-semibold text-heading">
                {EVENT_CATEGORY_LABELS[s.category]} <span className="font-normal text-ink-faint">· {s.count}</span>
              </span>
              <span className="tabular-nums text-ink-soft">
                {s.occupancy}% occ · <span className="font-semibold text-positive">+{s.uplift}%</span>
              </span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-canvas">
              <div className="h-full rounded-full bg-royal" style={{ width: `${(s.uplift / best) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <ul className="mt-3 space-y-1 border-t border-line-soft pt-2">
        {insightLines(events, 2).map((line) => (
          <li key={line} className="text-[11px] text-ink-soft">
            {line}
          </li>
        ))}
      </ul>
    </CardShell>
  );
}
