import { events, nextPerformance } from "@/data/events";
import type { DateRangeId } from "@/data/nav";
import type { CategoryId, EventItem, Performance, RegionId } from "@/data/types";
import { getVenue } from "@/data/venues";
import { parseLocal } from "./clock";

export type EventFilter = {
  category?: CategoryId;
  genre?: string;
  region?: RegionId;
  range?: DateRangeId;
  flag?: "premium" | "last-minute" | "featured";
  query?: string;
  now?: Date;
};

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Inclusive start and exclusive end for a date shortcut, in local time. */
export function rangeBounds(range: DateRangeId, now: Date = new Date()): { from: Date; to: Date } {
  const today = startOfDay(now);
  const day = 86_400_000;
  switch (range) {
    case "today":
      return { from: now, to: new Date(today.getTime() + day) };
    case "weekend": {
      const dow = today.getDay();
      const untilSat = dow === 0 ? -1 : 6 - dow;
      const sat = new Date(today.getTime() + untilSat * day);
      const from = dow === 0 || dow === 6 ? now : new Date(sat.getTime() - 6 * 3_600_000);
      return { from, to: new Date(sat.getTime() + 2 * day) };
    }
    case "7days":
      return { from: now, to: new Date(today.getTime() + 8 * day) };
    case "30days":
      return { from: now, to: new Date(today.getTime() + 31 * day) };
    default: {
      const exhaustive: never = range;
      return exhaustive;
    }
  }
}

export function performanceInRegion(p: Performance, region: RegionId): boolean {
  return region === "national" || getVenue(p.venueId)?.state === region;
}

function upcoming(p: Performance, now: Date): boolean {
  return p.status !== "cancelled" && parseLocal(p.startsAt) >= now;
}

export function normaliseQuery(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’'`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function searchText(event: EventItem): string {
  const venues = event.performances.map((p) => {
    const v = getVenue(p.venueId);
    return v ? `${v.name} ${v.city} ${v.stateLabel}` : "";
  });
  return normaliseQuery([event.name, event.subtitle, event.promoter, event.genres.join(" "), ...venues].join(" "));
}

export function matchesQuery(event: EventItem, query: string): boolean {
  const terms = normaliseQuery(query).split(" ").filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = searchText(event);
  return terms.every((t) => haystack.includes(t));
}

/** Performances of an event that pass the region and date filters. */
export function matchingPerformances(event: EventItem, filter: EventFilter): Performance[] {
  const now = filter.now ?? new Date();
  const bounds = filter.range ? rangeBounds(filter.range, now) : null;
  return event.performances.filter((p) => {
    if (!upcoming(p, now)) return false;
    if (filter.region && !performanceInRegion(p, filter.region)) return false;
    if (bounds) {
      const t = parseLocal(p.startsAt);
      if (t < bounds.from || t >= bounds.to) return false;
    }
    return true;
  });
}

export function filterEvents(filter: EventFilter, list: EventItem[] = events): EventItem[] {
  const now = filter.now ?? new Date();
  return list
    .filter((event) => {
      if (filter.category && event.category !== filter.category) return false;
      if (filter.genre && !event.genres.includes(filter.genre)) return false;
      if (filter.flag === "premium" && !event.premium) return false;
      if (filter.flag === "last-minute" && !event.lastMinute) return false;
      if (filter.flag === "featured" && !event.featured) return false;
      if (filter.query && !matchesQuery(event, filter.query)) return false;
      return matchingPerformances(event, filter).length > 0;
    })
    .sort((a, b) => {
      const pa = nextPerformance(a, now)?.startsAt ?? "9999";
      const pb = nextPerformance(b, now)?.startsAt ?? "9999";
      return pa.localeCompare(pb);
    });
}

/** Venue summary for a card: one venue name, or "N venues". */
export function venueSummary(event: EventItem, region: RegionId = "national"): string {
  const perfs = event.performances.filter((p) => performanceInRegion(p, region) && p.status !== "cancelled");
  const ids = [...new Set((perfs.length ? perfs : event.performances).map((p) => p.venueId))];
  if (ids.length === 1) {
    const v = getVenue(ids[0]!);
    return v ? `${v.name}, ${v.stateLabel}` : "";
  }
  const states = [...new Set(ids.map((id) => getVenue(id)?.stateLabel).filter(Boolean))];
  return states.length > 1 ? `${ids.length} venues · ${states.join(", ")}` : `${ids.length} venues`;
}
