const audFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const audWholeFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const longDateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatCurrency(amount: number): string {
  return audFormatter.format(amount);
}

export function formatCurrencyWhole(amount: number): string {
  return audWholeFormatter.format(amount);
}

/** Balances render as "-$120.50" rather than "($120.50)" to match NetBank. */
export function formatBalance(amount: number): string {
  const formatted = audFormatter.format(Math.abs(amount));
  return amount < 0 ? `-${formatted}` : formatted;
}

export function formatSignedCurrency(amount: number): string {
  const formatted = audFormatter.format(Math.abs(amount));
  return amount < 0 ? `-${formatted}` : `+${formatted}`;
}

export function formatRate(rate: number): string {
  return `${rate.toFixed(2)}% p.a.`;
}

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export function formatLongDate(iso: string): string {
  return longDateFormatter.format(new Date(iso));
}

/** Masks all but the last four digits, e.g. "5520 •••• •••• 8842". */
export function maskCardNumber(last4: string, bin = "5520"): string {
  return `${bin} •••• •••• ${last4}`;
}

export function formatBsb(bsb: string): string {
  const digits = bsb.replace(/\D/g, "").padStart(6, "0").slice(0, 6);
  return `${digits.slice(0, 3)}-${digits.slice(3)}`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
