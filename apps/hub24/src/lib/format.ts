const AUD = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

const AUD_CENTS = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const NUMBER = new Intl.NumberFormat("en-AU");

const DATE_LONG = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const DATE_SHORT = new Intl.DateTimeFormat("en-AU", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function currency(value: number): string {
  return AUD.format(value);
}

export function currencyCents(value: number): string {
  return AUD_CENTS.format(value);
}

/** Platform balances are quoted in billions on the marketing site and in dollars in AdviserHUB. */
export function billions(value: number): string {
  return `$${(value / 1_000_000_000).toFixed(1)}b`;
}

export function compactCurrency(value: number): string {
  if (Math.abs(value) >= 1_000_000_000) return billions(value);
  if (Math.abs(value) >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}m`;
  if (Math.abs(value) >= 1_000) return `$${(value / 1_000).toFixed(0)}k`;
  return currency(value);
}

export function number(value: number): string {
  return NUMBER.format(value);
}

export function percent(value: number, fractionDigits = 1): string {
  return `${value.toFixed(fractionDigits)}%`;
}

/** Performance and net-flow figures always carry an explicit sign in AdviserHUB. */
export function signedPercent(value: number, fractionDigits = 2): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(fractionDigits)}%`;
}

export function signedCurrency(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${AUD.format(Math.abs(value))}`;
}

export function longDate(iso: string): string {
  return DATE_LONG.format(new Date(`${iso}T00:00:00`));
}

export function shortDate(iso: string): string {
  return DATE_SHORT.format(new Date(`${iso}T00:00:00`));
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function readingTime(words: number): string {
  return `${Math.max(1, Math.round(words / 200))} min read`;
}
