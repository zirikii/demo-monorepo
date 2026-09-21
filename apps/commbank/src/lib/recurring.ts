import { parseDateOnly } from "@/lib/format";
import type { RecurringFrequency } from "@/data/types";

function toIso(date: Date): string {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

/** Advances a calendar day by one payment interval. */
export function addFrequency(iso: string, frequency: RecurringFrequency): string {
  const date = parseDateOnly(iso);
  switch (frequency) {
    case "weekly":
      date.setDate(date.getDate() + 7);
      return toIso(date);
    case "fortnightly":
      date.setDate(date.getDate() + 14);
      return toIso(date);
    case "monthly": {
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      const nextMonth = month + 1;
      const nextYear = year + Math.floor(nextMonth / 12);
      const normalizedMonth = nextMonth % 12;
      const clampedDay = Math.min(day, daysInMonth(nextYear, normalizedMonth));
      return toIso(new Date(nextYear, normalizedMonth, clampedDay));
    }
    default: {
      const _exhaustive: never = frequency;
      return _exhaustive;
    }
  }
}

/**
 * First occurrence of `anchorDay` (day-of-month from anchorIso) on or after afterIso.
 * Used to seed monthly GoalSaver deposits on the 18th without catch-up on load.
 */
export function nextDateAfter(
  anchorIso: string,
  frequency: RecurringFrequency,
  afterIso: string,
): string {
  if (frequency === "weekly" || frequency === "fortnightly") {
    let candidate = anchorIso;
    while (candidate <= afterIso) {
      candidate = addFrequency(candidate, frequency);
    }
    return candidate;
  }

  const anchor = parseDateOnly(anchorIso);
  const after = parseDateOnly(afterIso);
  const anchorDay = anchor.getDate();
  let year = after.getFullYear();
  let month = after.getMonth();
  const maxDay = daysInMonth(year, month);
  const day = Math.min(anchorDay, maxDay);
  let candidate = toIso(new Date(year, month, day));
  if (candidate <= afterIso) {
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
    const nextMax = daysInMonth(year, month);
    candidate = toIso(new Date(year, month, Math.min(anchorDay, nextMax)));
  }
  return candidate;
}

export function compareIso(a: string, b: string): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export function isOnOrBefore(iso: string, referenceIso: string): boolean {
  return compareIso(iso, referenceIso) <= 0;
}

export const frequencyLabels: Record<RecurringFrequency, string> = {
  weekly: "Weekly",
  fortnightly: "Fortnightly",
  monthly: "Monthly",
};
