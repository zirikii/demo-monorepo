/** Format NZD amounts for Spark plan cards and bills. */
export function formatNzd(amount: number, opts?: { cents?: boolean }): string {
  const fractionDigits = opts?.cents ? 2 : amount % 1 === 0 ? 0 : 2;
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}

export function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat("en-NZ", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}
