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

const NUMBER = new Intl.NumberFormat("en-AU");

const DATE_SHORT = new Intl.DateTimeFormat("en-AU", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const DATE_LONG = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const DATE_DAY = new Intl.DateTimeFormat("en-AU", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

/**
 * Transactions, articles and customer records store a calendar day as `YYYY-MM-DD`,
 * not an instant. ECMAScript parses a bare date-only string as UTC midnight, which
 * renders as the previous day anywhere west of UTC, so build the Date from its parts
 * and let it sit at local midnight instead.
 */
export function parseDateOnly(iso: string): Date {
  const [year = 0, month = 1, day = 1] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Today's calendar day in the visitor's own timezone. `toISOString()` would give the
 * UTC day, filing an early-morning Sydney transfer under the day before.
 */
export function todayIso(now = new Date()): string {
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/** Formats a dollar amount, e.g. `$1,234.50`. Negatives render as `-$12.00`. */
export function formatCurrency(amount: number): string {
  return AUD.format(amount);
}

/** Formats a dollar amount without cents, e.g. `$650,000`. */
export function formatCurrencyWhole(amount: number): string {
  return AUD_WHOLE.format(Math.round(amount));
}

/** Signed amount used in transaction lists, e.g. `+$120.00` / `-$52.40`. */
export function formatSignedCurrency(amount: number): string {
  const formatted = AUD.format(Math.abs(amount));
  return amount < 0 ? `-${formatted}` : `+${formatted}`;
}

export function formatNumber(value: number): string {
  return NUMBER.format(value);
}

/** Renders a rate as CommBank does on rate tables, e.g. `5.20% p.a.`. */
export function formatRate(rate: number, suffix = "p.a."): string {
  return `${rate.toFixed(2)}% ${suffix}`.trim();
}

export function formatPercent(rate: number, fractionDigits = 2): string {
  return `${rate.toFixed(fractionDigits)}%`;
}

export function formatDate(iso: string): string {
  return DATE_SHORT.format(parseDateOnly(iso));
}

export function formatDateLong(iso: string): string {
  return DATE_LONG.format(parseDateOnly(iso));
}

export function formatDayLabel(iso: string): string {
  return DATE_DAY.format(parseDateOnly(iso));
}

/** Masks an account number the way NetBank does: `06 2000 •••• 4471`. */
export function maskAccountNumber(bsb: string, accountNumber: string): string {
  const tail = accountNumber.slice(-4);
  return `${bsb} •••• ${tail}`;
}

/** Masks a card PAN, e.g. `•••• •••• •••• 8842`. */
export function maskCardNumber(pan: string): string {
  const digits = pan.replace(/\D/g, "");
  return `•••• •••• •••• ${digits.slice(-4)}`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function pluralise(count: number, singular: string, plural = `${singular}s`): string {
  return `${formatNumber(count)} ${count === 1 ? singular : plural}`;
}
