import { describe, expect, it } from "vitest";
import {
  formatBalance,
  formatBsb,
  formatCurrency,
  formatCurrencyWhole,
  formatDate,
  formatRate,
  formatSignedCurrency,
  maskCardNumber,
  slugify,
} from "@/lib/format";

describe("currency formatters", () => {
  it("formats AUD with two decimal places", () => {
    expect(formatCurrency(4218.6)).toBe("$4,218.60");
  });

  it("formats whole dollars without cents", () => {
    expect(formatCurrencyWhole(486230.11)).toBe("$486,230");
  });

  it("renders negative balances with a leading minus rather than brackets", () => {
    expect(formatBalance(-1284.55)).toBe("-$1,284.55");
    expect(formatBalance(1284.55)).toBe("$1,284.55");
  });

  it("signs transaction amounts", () => {
    expect(formatSignedCurrency(-142.85)).toBe("-$142.85");
    expect(formatSignedCurrency(4820)).toBe("+$4,820.00");
  });
});

describe("banking formatters", () => {
  it("formats a rate to two decimals with the p.a. suffix", () => {
    expect(formatRate(5.9)).toBe("5.90% p.a.");
  });

  it("formats a BSB with a hyphen", () => {
    expect(formatBsb("062000")).toBe("062-000");
    expect(formatBsb("062-014")).toBe("062-014");
  });

  it("masks all but the last four digits of a card", () => {
    expect(maskCardNumber("8842", "5520")).toBe("5520 •••• •••• 8842");
  });

  it("formats dates in en-AU day-month-year order", () => {
    expect(formatDate("2026-08-03")).toBe("3 Aug 2026");
  });
});

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("CommBank Yello Gold")).toBe("commbank-yello-gold");
  });

  it("trims leading and trailing separators", () => {
    expect(slugify("  Rates & fees!  ")).toBe("rates-fees");
  });
});
