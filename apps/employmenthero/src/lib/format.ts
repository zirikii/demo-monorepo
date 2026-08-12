const AUD = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const AUD_WHOLE = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const COMPACT = new Intl.NumberFormat("en-AU", {
  notation: "compact",
  maximumFractionDigits: 1,
});

/** Money with cents — pay runs, superannuation, tax withheld. */
export function formatCurrency(amount: number): string {
  return AUD.format(amount);
}

/** Money without cents — plan prices, headline savings figures. */
export function formatCurrencyWhole(amount: number): string {
  return AUD_WHOLE.format(amount);
}

export function formatCompact(value: number): string {
  return COMPACT.format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-AU").format(value);
}

export function formatPercent(value: number, fractionDigits = 0): string {
  return `${value.toFixed(fractionDigits)}%`;
}

/**
 * Dates in the seed data are plain ISO calendar dates (`2026-07-14`). Passing those to
 * `new Date()` parses them as UTC midnight, which rolls back a day in negative-offset
 * timezones, so build the date from its parts instead.
 */
function toLocalDate(iso: string): Date {
  const [datePart = ""] = iso.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  if (!year || !month || !day) return new Date(iso);
  return new Date(year, month - 1, day);
}

export function formatDate(iso: string): string {
  return toLocalDate(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatLongDate(iso: string): string {
  return toLocalDate(iso).toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatMonthYear(iso: string): string {
  return toLocalDate(iso).toLocaleDateString("en-AU", { month: "long", year: "numeric" });
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function pluralise(count: number, singular: string, plural = `${singular}s`): string {
  return `${formatNumber(count)} ${count === 1 ? singular : plural}`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function readingTime(body: string): string {
  const words = body.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}
