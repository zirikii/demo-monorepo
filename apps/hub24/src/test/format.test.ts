import { describe, expect, it } from "vitest";
import {
  formatChange,
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
});

describe("number formatting", () => {
  it("groups thousands", () => {
    expect(formatNumber(350000)).toBe("350,000");
  });

  it("compacts large values", () => {
    expect(formatCompact(2300000)).toBe("2.3M");
  });

  it("renders percentages and signed change", () => {
    expect(formatPercent(18.42, 1)).toBe("18.4%");
    expect(formatChange(1.35)).toBe("+1.35%");
    expect(formatChange(-0.4)).toBe("-0.40%");
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
    expect(initials("Alex Chen")).toBe("AC");
  });

  it("pluralises with a formatted count", () => {
    expect(pluralise(1, "account")).toBe("1 account");
    expect(pluralise(1500, "account")).toBe("1,500 accounts");
  });

  it("slugifies titles", () => {
    expect(slugify("HUB24 Super: what changes?")).toBe("hub24-super-what-changes");
  });

  it("estimates reading time from word count", () => {
    expect(readingTime("word ".repeat(400))).toBe("2 min read");
  });
});
