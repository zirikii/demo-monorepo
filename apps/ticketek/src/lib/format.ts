const currency = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" });
const dayDate = new Intl.DateTimeFormat("en-AU", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
const shortDate = new Intl.DateTimeFormat("en-AU", { weekday: "short", day: "numeric", month: "short" });
const longDate = new Intl.DateTimeFormat("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const time = new Intl.DateTimeFormat("en-AU", { hour: "numeric", minute: "2-digit", hour12: true });
const monthYear = new Intl.DateTimeFormat("en-AU", { month: "short", year: "numeric" });

export function formatCurrency(value: number): string {
  return currency.format(value);
}

function asDate(value: string | Date): Date {
  return typeof value === "string" ? new Date(value) : value;
}

/** "8:00pm" — Ticketek writes times lowercase without a space. */
export function formatTime(value: string | Date): string {
  return time.format(asDate(value)).replace(/\s/g, "").toLowerCase();
}

/** "Fri 20 Mar 2027" */
export function formatDate(value: string | Date): string {
  return dayDate.format(asDate(value)).replace(/,/g, "");
}

/** "Fri 20 Mar" */
export function formatShortDate(value: string | Date): string {
  return shortDate.format(asDate(value)).replace(/,/g, "");
}

/** "Friday 20 March 2027" */
export function formatLongDate(value: string | Date): string {
  return longDate.format(asDate(value)).replace(/,/g, "");
}

/** "Fri 20 Mar 2027, 8:00pm" */
export function formatDateTime(value: string | Date): string {
  return `${formatDate(value)}, ${formatTime(value)}`;
}

/** "Mar 2027" */
export function formatMonthYear(value: string | Date): string {
  return monthYear.format(asDate(value));
}

export function pluralise(count: number, one: string, many = `${one}s`): string {
  return `${count} ${count === 1 ? one : many}`;
}

/** Date range label for a multi-performance event, e.g. "Fri 20 Mar – Fri 2 Apr 2027". */
export function formatRange(dates: string[]): string {
  const sorted = [...dates].sort();
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  if (!first || !last) return "";
  if (first.slice(0, 10) === last.slice(0, 10)) return formatDate(first);
  return `${formatShortDate(first)} – ${formatDate(last)}`;
}
