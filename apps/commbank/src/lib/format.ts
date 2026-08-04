const aud = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

const audCompact = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

const dateShort = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatAud(amount: number): string {
  return aud.format(amount);
}

export function formatAudCompact(amount: number): string {
  return audCompact.format(amount);
}

export function formatDate(iso: string): string {
  return dateShort.format(new Date(iso));
}

export function formatRate(rate: number): string {
  return `${rate.toFixed(2)}% p.a.`;
}

export function maskAccount(number: string): string {
  if (number.length <= 4) return number;
  return `•••• ${number.slice(-4)}`;
}
