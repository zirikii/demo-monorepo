import { describe, expect, it } from "vitest";
import {
  formatInr,
  formatIndianCompact,
  formatMobile,
  formatDuration,
  formatDate,
} from "../lib/format";

describe("formatInr", () => {
  it("formats whole rupees with Indian digit grouping", () => {
    expect(formatInr(123456)).toBe("₹1,23,456");
  });

  it("keeps paise when the amount has decimals", () => {
    expect(formatInr(99.5)).toBe("₹99.50");
  });

  it("honours an explicit decimals option", () => {
    expect(formatInr(7284.5, { decimals: 2 })).toBe("₹7,284.50");
  });
});

describe("formatIndianCompact", () => {
  it("uses Lakh above 1,00,000", () => {
    expect(formatIndianCompact(1_500_000)).toBe("15 Lakh");
  });

  it("uses Cr above 1,00,00,000", () => {
    expect(formatIndianCompact(2_00_00_000)).toBe("2 Cr");
  });

  it("uses K for thousands", () => {
    expect(formatIndianCompact(50_000)).toBe("50K");
  });
});

describe("formatMobile", () => {
  it("splits a 10-digit number 5+5", () => {
    expect(formatMobile("9876543210")).toBe("98765 43210");
  });

  it("returns input untouched when not 10 digits", () => {
    expect(formatMobile("12345")).toBe("12345");
  });
});

describe("formatDuration", () => {
  it("renders hours and zero-padded minutes", () => {
    expect(formatDuration(135)).toBe("2h 15m");
    expect(formatDuration(125)).toBe("2h 05m");
  });
});

describe("formatDate", () => {
  it("renders an en-IN medium date", () => {
    expect(formatDate("2026-07-08")).toMatch(/8 Jul 2026/);
  });
});
