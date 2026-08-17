import { describe, expect, it } from "vitest";
import {
  formatBillions,
  formatCurrency,
  formatCurrencyWhole,
  formatDate,
  formatMonthYear,
  formatNumber,
  formatPercent,
  formatSignedCurrency,
  formatSignedPercent,
  formatUnits,
  initials,
  pluralise,
  readingTime,
  slugify,
} from "@/lib/format";

describe("currency formatting", () => {
  it("renders cents for holding-level amounts", () => {
    expect(formatCurrency(1234.5)).toBe("$1,234.50");
  });

  it("drops cents for headline balances", () => {
    expect(formatCurrencyWhole(1_874_320.44)).toBe("$1,874,320");
  });

  it("signs gains and losses explicitly", () => {
    expect(formatSignedCurrency(500)).toBe("+$500.00");
    expect(formatSignedCurrency(-500)).toBe("−$500.00");
  });

  it("quotes funds under administration in billions", () => {
    expect(formatBillions(164_300_000_000)).toBe("$164.3b");
    expect(formatBillions(24_800_000_000)).toBe("$24.8b");
  });
});

describe("number formatting", () => {
  it("groups thousands", () => {
    expect(formatNumber(5649)).toBe("5,649");
  });

  it("keeps fractional units without padding whole ones", () => {
    expect(formatUnits(142_880.4)).toBe("142,880.4");
    expect(formatUnits(1450)).toBe("1,450");
  });

  it("formats percentages to two places by default", () => {
    expect(formatPercent(9.4)).toBe("9.40%");
    expect(formatPercent(9.4, 1)).toBe("9.4%");
  });

  it("signs percentage movements", () => {
    expect(formatSignedPercent(1.22)).toBe("+1.22%");
    expect(formatSignedPercent(-1.22)).toBe("−1.22%");
  });
});

describe("date formatting", () => {
  /**
   * ISO calendar dates must not shift a day in negative-offset timezones, which is what
   * happens if they are parsed as UTC midnight.
   */
  it("keeps the calendar day", () => {
    expect(formatDate("2026-08-14")).toBe("14 Aug 2026");
    // 30 June is the FUA reporting date and must never roll back to 29 June.
    expect(formatDate("2026-06-30").startsWith("30 ")).toBe(true);
  });

  it("renders month and year for chart axes", () => {
    expect(formatMonthYear("2026-08-01")).toBe("Aug 2026");
  });
});

describe("text helpers", () => {
  it("builds two-letter initials", () => {
    expect(initials("Margaret Whitlam")).toBe("MW");
    expect(initials("Daniel Okonjo Adeyemi")).toBe("DO");
  });

  it("pluralises with a grouped count", () => {
    expect(pluralise(1, "client")).toBe("1 client");
    expect(pluralise(1200, "client")).toBe("1,200 clients");
  });

  it("slugifies titles", () => {
    expect(slugify("HUB24 Invest & Super")).toBe("hub24-invest-super");
  });

  it("estimates reading time from word count", () => {
    expect(readingTime("word ".repeat(400))).toBe("2 min read");
  });
});
