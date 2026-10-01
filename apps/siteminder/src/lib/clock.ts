function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function toLocalIso(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
}

/**
 * Property-local time `days` from today. Bookings and demand events are dated relative to the demo's
 * clock so there's always an arrival tonight and an event this week, whatever day the demo runs.
 */
export function daysFromToday(days: number, time: string, base: Date = new Date()): string {
  const [h, m] = time.split(":").map(Number);
  const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + days, h ?? 19, m ?? 30);
  return toLocalIso(d);
}

export function parseLocal(iso: string): Date {
  return new Date(iso);
}

export function hoursUntil(iso: string, from: Date = new Date()): number {
  return (parseLocal(iso).getTime() - from.getTime()) / 3_600_000;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
