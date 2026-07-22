/** Format AUD amounts for Optus plan cards and bills. */
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
