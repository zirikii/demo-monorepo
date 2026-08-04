const currency = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  minimumFractionDigits: 2,
});

const date = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatAud(value: number): string {
  return currency.format(value);
}

export function formatDate(value: string): string {
  return date.format(new Date(`${value}T12:00:00`));
}

export function formatAccountNumber(value: string): string {
  return value.replace(/(\d{4})(?=\d)/g, "$1 ");
}
