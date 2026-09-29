const LOCALE = "en-AU";
const TIME_ZONE = "Australia/Sydney";

const currency = new Intl.NumberFormat(LOCALE, { style: "currency", currency: "AUD" });
const wholeCurrency = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number, { whole = false } = {}): string {
  return (whole ? wholeCurrency : currency).format(amount);
}

/** Cents-per-unit rates, e.g. 24.15 → "24.15c". Trailing zeros are kept to two places. */
export function formatCents(cents: number): string {
  return `${cents.toFixed(2)}c`;
}

/** Parses a plain calendar date (YYYY-MM-DD) at noon so it can't slip a day across time zones. */
function parseDay(isoDate: string): Date {
  return new Date(`${isoDate}T12:00:00Z`);
}

export function formatDate(isoDate: string, style: "short" | "long" = "long"): string {
  return new Intl.DateTimeFormat(LOCALE, {
    day: "numeric",
    month: style === "long" ? "long" : "short",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(parseDay(isoDate));
}

export function formatDayMonth(isoDate: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    day: "numeric",
    month: "short",
    timeZone: TIME_ZONE,
  }).format(parseDay(isoDate));
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat(LOCALE, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  }).format(date);
}

export function formatKwh(kwh: number): string {
  return `${new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 1 }).format(kwh)} kWh`;
}

export function formatPercentChange(current: number, previous: number): string {
  if (previous === 0) return "n/a";
  const change = ((current - previous) / previous) * 100;
  const rounded = Math.round(change);
  return `${rounded > 0 ? "+" : ""}${rounded}%`;
}

/** Australian phone numbers as AGL prints them: 131 245, 1300 659 925, 13 13 88. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function daysUntil(isoDate: string, from: Date = new Date()): number {
  const target = parseDay(isoDate).getTime();
  const start = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate(), 12);
  return Math.round((target - start) / 86_400_000);
}
