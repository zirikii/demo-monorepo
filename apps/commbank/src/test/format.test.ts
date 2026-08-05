import { describe, expect, it } from "vitest";
import {
  formatCurrency,
  formatCurrencyWhole,
  formatDate,
  formatNumber,
  formatPercent,
  formatRate,
  formatSignedCurrency,
  maskAccountNumber,
  maskCardNumber,
  parseDateOnly,
  pluralise,
  slugify,
  todayIso,
} from "@/lib/format";

describe("currency formatting", () => {
  it("formats AUD amounts with cents", () => {
    expect(formatCurrency(1234.5)).toBe("$1,234.50");
  });

  it("formats negative amounts", () => {
    expect(formatCurrency(-1284.55)).toBe("-$1,284.55");
  });

  it("rounds whole-dollar amounts", () => {
    expect(formatCurrencyWhole(649999.6)).toBe("$650,000");
  });

  it("prefixes signed amounts for transaction lists", () => {
    expect(formatSignedCurrency(-52.4)).toBe("-$52.40");
    expect(formatSignedCurrency(120)).toBe("+$120.00");
  });
});

describe("rate and number formatting", () => {
  it("renders rates the way CommBank rate tables do", () => {
    expect(formatRate(5.2)).toBe("5.20% p.a.");
    expect(formatRate(3.1, "")).toBe("3.10%");
  });

  it("formats percentages to the requested precision", () => {
    expect(formatPercent(76.47058, 1)).toBe("76.5%");
  });

  it("formats numbers using the en-AU locale", () => {
    expect(formatNumber(42815)).toBe("42,815");
  });

  it("pluralises counts", () => {
    expect(pluralise(1, "result")).toBe("1 result");
    expect(pluralise(3, "result")).toBe("3 results");
    expect(pluralise(2, "branch", "branches")).toBe("2 branches");
  });
});

describe("date-only values", () => {
  // These are calendar days, not instants. Mixing UTC and local parsing shifts them
  // by a day either side of UTC, so both halves are asserted in local terms.
  it("parses a date-only string as a local calendar day, not UTC midnight", () => {
    const parsed = parseDateOnly("2026-08-03");

    expect(parsed.getFullYear()).toBe(2026);
    expect(parsed.getMonth()).toBe(7);
    expect(parsed.getDate()).toBe(3);
    expect(parsed.getHours()).toBe(0);
  });

  it("tolerates a malformed date-only string without throwing", () => {
    expect(() => parseDateOnly("")).not.toThrow();
  });

  it("stamps today using the local calendar day just after local midnight", () => {
    // 00:30 local is still the previous day in UTC east of Greenwich, which is how an
    // early-morning Sydney transfer used to be filed under the day before.
    expect(todayIso(new Date(2026, 7, 5, 0, 30))).toBe("2026-08-05");
  });

  it("stamps today using the local calendar day just before local midnight", () => {
    // 23:30 local has already rolled over in UTC west of Greenwich.
    expect(todayIso(new Date(2026, 7, 5, 23, 30))).toBe("2026-08-05");
  });

  it("zero-pads single-digit months and days", () => {
    expect(todayIso(new Date(2026, 0, 9, 12, 0))).toBe("2026-01-09");
  });

  it("round-trips a stamped day back through the formatter", () => {
    const stamped = todayIso(new Date(2026, 7, 5, 0, 30));

    expect(formatDate(stamped)).toMatch(/05 Aug 2026/);
  });
});

describe("dates and masking", () => {
  it("formats dates in en-AU short form", () => {
    expect(formatDate("2026-08-03")).toMatch(/03 Aug 2026/);
  });

  it("masks account numbers to the last four digits", () => {
    expect(maskAccountNumber("062 000", "10442871")).toBe("062 000 •••• 2871");
  });

  it("masks card PANs to the last four digits", () => {
    expect(maskCardNumber("5520 0000 0000 8842")).toBe("•••• •••• •••• 8842");
  });

  it("slugifies product names", () => {
    expect(slugify("Home Loan Wealth Package")).toBe("home-loan-wealth-package");
  });
});
