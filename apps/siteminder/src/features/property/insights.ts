import { formatCurrency, formatMonthYear } from "@/lib/format";
import type { DemandEvent, EventCategory } from "./types";
import { daysUntil, EVENT_CATEGORY_LABELS } from "./views";

export function upcomingEvents(events: DemandEvent[], now: Date): DemandEvent[] {
  return events
    .filter((e) => daysUntil(e.end, now) >= 0 && !e.outcome)
    .sort((a, b) => a.start.localeCompare(b.start));
}

export function pastEvents(events: DemandEvent[]): DemandEvent[] {
  return events.filter((e) => e.outcome).sort((a, b) => b.start.localeCompare(a.start));
}

export function nextEvent(events: DemandEvent[], now: Date): DemandEvent | undefined {
  return upcomingEvents(events, now)[0];
}

/** Past events most like this one: same category first, then closest crowd size. */
export function comparables(event: DemandEvent, events: DemandEvent[], limit = 2): DemandEvent[] {
  const past = pastEvents(events).filter((e) => e.id !== event.id);
  const score = (e: DemandEvent) =>
    (e.category === event.category ? 0 : 10) +
    (e.name === event.name ? -5 : 0) +
    Math.abs(Math.log((e.attendance + 1) / (event.attendance + 1)));
  return [...past].sort((a, b) => score(a) - score(b)).slice(0, limit);
}

export type Pace = "ahead" | "on-track" | "behind";

export type EventForecast = {
  daysOut: number;
  comparables: DemandEvent[];
  /** Suggested ADR uplift in percent, rounded to the nearest 5. */
  upliftPct: number;
  minStay: number;
  expectedOccupancy: number;
  /** Typical sell-out lead time from comparables; 0 when they didn't sell out. */
  sellOutDays: number;
  pace: Pace;
  advice: string;
};

function round5(n: number): number {
  return Math.round(n / 5) * 5;
}

function average(values: number[]): number {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

export function forecast(event: DemandEvent, events: DemandEvent[], now: Date): EventForecast {
  const comps = comparables(event, events);
  const outcomes = comps.flatMap((c) => (c.outcome ? [c.outcome] : []));
  // Hold back a little from the comparables' realised uplift: it was earned on the final rooms.
  const upliftPct = Math.max(10, round5(average(outcomes.map((o) => o.adrUpliftPct)) * 0.8));
  const minStay = Math.max(1, ...outcomes.map((o) => o.minStay));
  const expectedOccupancy = Math.round(average(outcomes.map((o) => o.occupancyPct)) || 85);
  const sellOutDays = Math.round(average(outcomes.map((o) => o.soldOutDaysBefore)));
  const daysOut = daysUntil(event.start, now);
  const onBooks = event.onBooksPct ?? 0;
  const pace: Pace =
    sellOutDays > 0 && daysOut <= sellOutDays
      ? onBooks >= 85
        ? "on-track"
        : "behind"
      : onBooks >= 60
        ? "ahead"
        : "on-track";
  const lead = comps[0];
  const advice = lead?.outcome
    ? `Last time (${lead.name}, ${formatMonthYear(lead.start)}) you reached ${lead.outcome.occupancyPct}% at ${formatCurrency(lead.outcome.adr)} ADR${
        lead.outcome.soldOutDaysBefore > 0
          ? `, selling out ${lead.outcome.soldOutDaysBefore} days out`
          : ""
      }.`
    : "There's no comparable event in your history yet, so start conservatively and watch pickup.";
  return {
    daysOut,
    comparables: comps,
    upliftPct,
    minStay,
    expectedOccupancy,
    sellOutDays,
    pace,
    advice,
  };
}

export const PACE_LABELS: Record<Pace, string> = {
  ahead: "Ahead of pace",
  "on-track": "On track",
  behind: "Behind pace",
};

export type CategoryStat = {
  category: EventCategory;
  count: number;
  occupancy: number;
  uplift: number;
  sellOutDays: number;
};

export function categoryStats(events: DemandEvent[]): CategoryStat[] {
  const byCategory = new Map<EventCategory, DemandEvent[]>();
  for (const e of pastEvents(events))
    byCategory.set(e.category, [...(byCategory.get(e.category) ?? []), e]);
  return [...byCategory.entries()]
    .map(([category, list]) => {
      const outcomes = list.flatMap((e) => (e.outcome ? [e.outcome] : []));
      return {
        category,
        count: list.length,
        occupancy: Math.round(average(outcomes.map((o) => o.occupancyPct))),
        uplift: Math.round(average(outcomes.map((o) => o.adrUpliftPct))),
        sellOutDays: Math.round(average(outcomes.map((o) => o.soldOutDaysBefore))),
      };
    })
    .sort((a, b) => b.uplift - a.uplift);
}

/** Plain-English lessons from the events store, strongest first. */
export function insightLines(events: DemandEvent[], limit = 3): string[] {
  const lines = categoryStats(events).map((s) => {
    const label = EVENT_CATEGORY_LABELS[s.category].toLowerCase();
    const when = s.sellOutDays > 0 ? `sell out about ${s.sellOutDays} days out` : "rarely sell out";
    return `${label.charAt(0).toUpperCase()}${label.slice(1)} events ${when} at ${s.occupancy}% average occupancy and +${s.uplift}% ADR.`;
  });
  const lateRaise = pastEvents(events).find((e) =>
    e.outcome?.note.includes("before rates were raised"),
  );
  if (lateRaise)
    lines.splice(
      1,
      0,
      `At ${lateRaise.name} rates went up too late — open event pricing as soon as the date is announced.`,
    );
  return lines.slice(0, limit);
}

export function eventsLine(events: DemandEvent[]): string {
  const count = pastEvents(events).length;
  return count
    ? `${count} past events in your demand history`
    : "no past events in your demand history yet";
}
