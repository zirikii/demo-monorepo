import { describe, expect, it } from "vitest";
import {
  formatGb,
  formatMonthly,
  formatNzd,
  formatNzdCents,
  pluralise,
  usagePercent,
} from "../format";

describe("formatNzd", () => {
  it("formats whole-dollar amounts", () => {
    expect(formatNzd(65)).toBe("$65");
    expect(formatNzd(0)).toBe("$0");
  });
});

describe("formatNzdCents", () => {
  it("formats amounts with two decimals", () => {
    expect(formatNzdCents(65)).toBe("$65.00");
    expect(formatNzdCents(65.5)).toBe("$65.50");
  });
});

describe("formatMonthly", () => {
  it("appends a per-month suffix", () => {
    expect(formatMonthly(85)).toBe("$85/mth");
  });
});

describe("formatGb", () => {
  it("keeps integers whole and rounds fractions to one decimal", () => {
    expect(formatGb(20)).toBe("20GB");
    expect(formatGb(34.567)).toBe("34.6GB");
  });
});

describe("usagePercent", () => {
  it("returns 0 for endless (0 allowance) plans", () => {
    expect(usagePercent(34, 0)).toBe(0);
  });

  it("computes and clamps a percentage", () => {
    expect(usagePercent(10, 20)).toBe(50);
    expect(usagePercent(30, 20)).toBe(100);
  });
});

describe("pluralise", () => {
  it("handles singular and plural", () => {
    expect(pluralise(1, "day")).toBe("1 day");
    expect(pluralise(3, "day")).toBe("3 days");
  });
});
