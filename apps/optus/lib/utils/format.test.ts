import { describe, expect, it } from "vitest";
import { formatAud, formatPercent, formatShortDate } from "./format";

describe("format utils", () => {
  it("formats AUD values", () => {
    expect(formatAud(49)).toBe("$49");
    expect(formatAud(148.5, { cents: true })).toBe("$148.50");
  });

  it("formats dates and percentages for Australia", () => {
    expect(formatShortDate("2026-08-05")).toBe("5 Aug 2026");
    expect(formatPercent(0.62)).toBe("62%");
  });
});
