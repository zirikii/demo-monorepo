import { describe, expect, it } from "vitest";
import {
  formatCurrency,
  formatCurrencyWhole,
  formatDate,
  formatInitials,
  formatLongDate,
  formatNumber,
  formatPercent,
  formatReadingTime,
  pluralise,
} from "@/lib/format";

describe("currency formatting", () => {
  it("formats an amount in Australian dollars with cents", () => {
    expect(formatCurrency(58420.5)).toBe("$58,420.50");
  });

  it("drops the cents for whole-dollar display", () => {
    expect(formatCurrencyWhole(132000)).toBe("$132,000");
  });

  it("rounds a fractional average to the nearest dollar", () => {
    expect(formatCurrencyWhole(91733.33)).toBe("$91,733");
  });
});

describe("date formatting", () => {
  it("formats a seed date without shifting the day", () => {
    expect(formatDate("2026-08-13")).toBe("13 Aug 2026");
  });

  it("formats the first of a month, which is where UTC parsing usually slips", () => {
    expect(formatDate("2026-01-01")).toBe("1 Jan 2026");
  });

  it("spells the month out in long form", () => {
    expect(formatLongDate("2026-07-28")).toBe("28 July 2026");
  });

  it("returns the input unchanged when it is not a date", () => {
    expect(formatDate("not-a-date")).toBe("not-a-date");
  });
});

describe("misc formatting", () => {
  it("groups thousands", () => {
    expect(formatNumber(9105)).toBe("9,105");
  });

  it("formats a percentage to one decimal by default", () => {
    expect(formatPercent(41.6666)).toBe("41.7%");
  });

  it("takes the first letter of the first two names", () => {
    expect(formatInitials("Ava Thompson")).toBe("AT");
    expect(formatInitials("Mei Lin Chua")).toBe("ML");
    expect(formatInitials("Prince")).toBe("P");
  });

  it("labels reading time", () => {
    expect(formatReadingTime(8)).toBe("8 min read");
  });

  it("pluralises based on the count", () => {
    expect(pluralise(1, "role")).toBe("1 role");
    expect(pluralise(10, "role")).toBe("10 roles");
    expect(pluralise(2, "case study", "case studies")).toBe("2 case studies");
  });
});
