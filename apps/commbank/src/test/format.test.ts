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
  pluralise,
  slugify,
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
