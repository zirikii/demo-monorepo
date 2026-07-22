/** Format AUD amounts for Optus plan cards and bills (en-AU locale). */
export function formatAud(amount: number, opts?: { cents?: boolean }): string {
  const fractionDigits = opts?.cents ? 2 : amount % 1 === 0 ? 0 : 2;
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}

export function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

/** Kick-off time for Optus Sport fixtures, in AEST. */
export function formatKickoff(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Australia/Sydney",
  }).format(new Date(iso));
}
