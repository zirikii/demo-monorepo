import { describe, expect, it } from "vitest";
import { formatAud, formatShortDate } from "@/lib/utils/format";

describe("formatAud", () => {
  it("formats whole dollars without cents by default", () => {
    expect(formatAud(55)).toBe("$55");
  });

  it("formats cents when requested", () => {
    expect(formatAud(89.5, { cents: true })).toBe("$89.50");
  });
});

describe("formatShortDate", () => {
  it("formats ISO dates in en-AU", () => {
    const out = formatShortDate("2026-07-14T00:00:00.000Z");
    expect(out).toMatch(/2026/);
  });
});
