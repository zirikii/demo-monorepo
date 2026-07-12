/** NZD + telco formatting helpers for the Spark demo. */

const nzdWhole = new Intl.NumberFormat("en-NZ", {
  style: "currency",
  currency: "NZD",
  maximumFractionDigits: 0,
});

const nzdCents = new Intl.NumberFormat("en-NZ", {
  style: "currency",
  currency: "NZD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Format a whole-dollar NZD amount, e.g. 65 -> "$65". */
export function formatNzd(amount: number): string {
  return nzdWhole.format(amount);
}

/** Format an NZD amount with cents, e.g. 65.5 -> "$65.50". */
export function formatNzdCents(amount: number): string {
  return nzdCents.format(amount);
}

/** Render a monthly price, e.g. "$65/mth". */
export function formatMonthly(amount: number): string {
  return `${formatNzd(amount)}/mth`;
}

/** Short absolute date, e.g. "12 Jul 2026". */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Month + year, e.g. "July 2026". */
export function formatMonth(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NZ", {
    month: "long",
    year: "numeric",
  });
}

/** Format a data amount in GB, e.g. 12.5 -> "12.5GB". */
export function formatGb(gb: number): string {
  return `${Number.isInteger(gb) ? gb : gb.toFixed(1)}GB`;
}

/** Pluralise a noun based on count, e.g. pluralise(1, "day") -> "1 day". */
export function pluralise(count: number, noun: string, plural?: string): string {
  const word = count === 1 ? noun : (plural ?? `${noun}s`);
  return `${count} ${word}`;
}

/** Percentage of an allowance used, clamped 0–100. Returns 0 for endless plans. */
export function usagePercent(used: number, allowance: number): number {
  if (allowance <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((used / allowance) * 100)));
}
