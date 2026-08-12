import { describe, expect, it } from "vitest";
import {
  formatCompact,
  formatCurrency,
  formatCurrencyWhole,
  formatDate,
  formatMonthYear,
  formatNumber,
  formatPercent,
  initials,
  pluralise,
  readingTime,
  slugify,
} from "@/lib/format";

describe("currency formatting", () => {
  it("renders AUD with cents", () => {
    expect(formatCurrency(148920.4)).toBe("$148,920.40");
  });

  it("renders whole dollars without cents", () => {
    expect(formatCurrencyWhole(45000)).toBe("$45,000");
  });

  it("handles zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });
});

describe("number formatting", () => {
  it("groups thousands", () => {
    expect(formatNumber(350000)).toBe("350,000");
  });

  it("compacts large values", () => {
    expect(formatCompact(2300000)).toBe("2.3M");
  });

  it("renders percentages", () => {
    expect(formatPercent(18.42, 1)).toBe("18.4%");
    expect(formatPercent(94)).toBe("94%");
  });
});

describe("date formatting", () => {
  it("keeps the calendar day regardless of timezone offset", () => {
    expect(formatDate("2026-08-19")).toBe("19 Aug 2026");
  });

  it("renders month and year", () => {
    expect(formatMonthYear("2026-08-19")).toBe("August 2026");
  });
});

describe("text helpers", () => {
  it("builds two-letter initials", () => {
    expect(initials("Priya Raman")).toBe("PR");
    expect(initials("Sam")).toBe("S");
  });

  it("pluralises with a formatted count", () => {
    expect(pluralise(1, "employee")).toBe("1 employee");
    expect(pluralise(1500, "employee")).toBe("1,500 employees");
  });

  it("slugifies titles", () => {
    expect(slugify("Payday Super: what changes?")).toBe("payday-super-what-changes");
  });

  it("estimates reading time from word count", () => {
    expect(readingTime("word ".repeat(400))).toBe("2 min read");
  });
});
