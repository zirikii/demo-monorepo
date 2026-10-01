import { events, nextPerformance } from "@/data/events";
import type { EventItem, RegionId } from "@/data/types";
import { getVenue } from "@/data/venues";
import type { AttendedEvent, FanProfile, Order } from "./types";

export type Recommendation = {
  event: EventItem;
  score: number;
  reason: string;
  because?: AttendedEvent;
};

export const GENRE_LABELS: Record<string, string> = {
  rock: "rock",
  indie: "indie",
  electronic: "electronic music",
  festival: "festivals",
  motorsport: "motorsport",
  basketball: "basketball",
  netball: "netball",
  musical: "musicals",
  comedy: "comedy",
  country: "country",
  tribute: "tribute shows",
  "80s": "80s music",
  australian: "Aussie artists",
  football: "football",
};

export type FanTier = { id: "rookie" | "regular" | "superfan" | "legend"; label: string; min: number };

export const FAN_TIERS: FanTier[] = [
  { id: "legend", label: "Legend", min: 30 },
  { id: "superfan", label: "Superfan", min: 15 },
  { id: "regular", label: "Regular", min: 5 },
  { id: "rookie", label: "Rookie", min: 0 },
];

export function lifetimeEvents(fan: FanProfile): number {
  return fan.attended.length + fan.archivedEvents;
}

export function fanTier(fan: FanProfile): FanTier {
  const count = lifetimeEvents(fan);
  return FAN_TIERS.find((t) => count >= t.min) ?? FAN_TIERS[FAN_TIERS.length - 1]!;
}

/** Genre → weight, where recent events count more than old ones. */
export function genreAffinity(attended: AttendedEvent[], now: Date = new Date()): Map<string, number> {
  const affinity = new Map<string, number>();
  for (const a of attended) {
    const years = Math.max(0, (now.getTime() - new Date(a.date).getTime()) / (365 * 86_400_000));
    const weight = 1 / (1 + years * 0.35);
    for (const g of a.genres) affinity.set(g, (affinity.get(g) ?? 0) + weight);
  }
  return affinity;
}

export function topGenres(attended: AttendedEvent[], count = 3): string[] {
  return [...genreAffinity(attended).entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([g]) => g);
}

function inRegion(event: EventItem, region: RegionId): boolean {
  if (region === "national") return true;
  return event.performances.some((p) => getVenue(p.venueId)?.state === region);
}

function shortName(attended: AttendedEvent): string {
  return attended.name.split(/ — | \(|: /)[0] ?? attended.name;
}

export function recommend(
  fan: FanProfile,
  orders: Order[],
  opts: { limit?: number; region?: RegionId; now?: Date } = {},
): Recommendation[] {
  const now = opts.now ?? new Date();
  const region = opts.region ?? fan.homeRegion;
  const owned = new Set(orders.map((o) => o.eventSlug));
  const affinity = genreAffinity(fan.attended, now);
  const byArtist = new Map<string, AttendedEvent>();
  for (const a of [...fan.attended].sort((x, y) => x.date.localeCompare(y.date))) byArtist.set(a.artistKey, a);

  const scored: Recommendation[] = [];
  for (const event of events) {
    if (owned.has(event.slug) || !nextPerformance(event, now)) continue;
    const seen = byArtist.get(event.artistKey);
    let score = 0;
    let reason = "Popular near you";
    let bestGenre: { genre: string; weight: number } | undefined;
    for (const g of event.genres) {
      const w = affinity.get(g) ?? 0;
      score += w * 8;
      if (w > 0 && (!bestGenre || w > bestGenre.weight)) bestGenre = { genre: g, weight: w };
    }
    if (bestGenre) reason = `Because you like ${GENRE_LABELS[bestGenre.genre] ?? bestGenre.genre}`;
    if (fan.favourites.includes(event.slug)) {
      score += 20;
      reason = "On your favourites";
    }
    if (seen) {
      score += 100;
      reason = `Because you saw ${shortName(seen)} in ${seen.date.slice(0, 4)}`;
    }
    if (inRegion(event, region)) score += 12;
    if (score > 0) scored.push({ event, score, reason, because: seen });
  }
  return scored.sort((a, b) => b.score - a.score || a.event.name.localeCompare(b.event.name)).slice(0, opts.limit ?? 8);
}
