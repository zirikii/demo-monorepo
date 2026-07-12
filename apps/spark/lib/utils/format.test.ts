import { describe, expect, it } from "vitest";
import { formatNzd, formatShortDate } from "@/lib/utils/format";

describe("formatNzd", () => {
  it("formats whole dollars", () => {
    expect(formatNzd(29)).toMatch(/\$29/);
  });

  it("can force cents", () => {
    expect(formatNzd(129.5, { cents: true })).toMatch(/129\.50/);
  });
});

describe("formatShortDate", () => {
  it("formats ISO dates for en-NZ", () => {
    const out = formatShortDate("2026-07-20T00:00:00.000Z");
    expect(out).toMatch(/2026/);
  });
});
