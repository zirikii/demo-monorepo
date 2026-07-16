import type { CityForecast } from "@/data/types";

const rtf = new Intl.RelativeTimeFormat("en-AU", { numeric: "auto" });

/** Human-friendly "time ago" for a recent ISO timestamp, falling back to a date. */
export function timeAgo(iso: string, now: Date = new Date()): string {
  const then = new Date(iso).getTime();
  const diffMs = then - now.getTime();
  const diffMin = Math.round(diffMs / 60000);
  const absMin = Math.abs(diffMin);

  if (absMin < 1) return "Just now";
  if (absMin < 60) return rtf.format(Math.round(diffMin), "minute");
  const diffHr = Math.round(diffMin / 60);
  if (Math.abs(diffHr) < 24) return rtf.format(diffHr, "hour");
  const diffDay = Math.round(diffHr / 24);
  if (Math.abs(diffDay) < 7) return rtf.format(diffDay, "day");

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
  }).format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function readTimeLabel(minutes: number): string {
  return `${minutes} min read`;
}

/** Simple deterministic string hash → non-negative int. */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/**
 * Deterministic gradient used as a lightweight image placeholder (the demo
 * ships no external photography). The base hue is derived from the pillar
 * accent so cards stay on-brand, with per-seed variation for visual variety.
 */
const pillarHue: Record<string, number> = {
  news: 230,
  sport: 158,
  lifestyle: 328,
  travel: 200,
  entertainment: 266,
  shopping: 30,
};

export function gradientStyle(seed: string, pillar: string): { backgroundImage: string } {
  const base = pillarHue[pillar] ?? 220;
  const h = hash(seed);
  const hue1 = (base + (h % 24) - 12 + 360) % 360;
  const hue2 = (hue1 + 26 + (h % 30)) % 360;
  const light1 = 34 + (h % 12);
  const light2 = 52 + (h % 14);
  return {
    backgroundImage: `linear-gradient(135deg, hsl(${hue1} 70% ${light1}%), hsl(${hue2} 74% ${light2}%))`,
  };
}

export function weatherGlyph(icon: CityForecast["icon"]): string {
  switch (icon) {
    case "sun":
      return "☀";
    case "cloud":
      return "☁";
    case "rain":
      return "🌧";
    case "storm":
      return "⛈";
    case "wind":
      return "🌬";
    default:
      return "☀";
  }
}
