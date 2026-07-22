import { describe, expect, it } from "vitest";
import { clampPercent, formatAud, formatShortDate } from "@/lib/utils/format";

describe("formatAud", () => {
  it("formats whole dollars", () => {
    expect(formatAud(59)).toMatch(/\$59/);
  });

  it("can force cents", () => {
    expect(formatAud(89.5, { cents: true })).toMatch(/89\.50/);
  });
});

describe("formatShortDate", () => {
  it("formats ISO dates for en-AU", () => {
    const out = formatShortDate("2026-07-20T00:00:00.000Z");
    expect(out).toMatch(/2026/);
  });
});

describe("clampPercent", () => {
  it("clamps out-of-range values", () => {
    expect(clampPercent(-5)).toBe(0);
    expect(clampPercent(140)).toBe(100);
    expect(clampPercent(62.4)).toBe(62);
  });
});
