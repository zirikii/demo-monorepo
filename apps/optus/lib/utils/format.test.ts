import { describe, expect, it } from "vitest";
import { formatAud, formatShortDate } from "@/lib/utils/format";

describe("formatAud", () => {
  it("formats whole dollars in AUD", () => {
    expect(formatAud(49)).toMatch(/\$49/);
  });

  it("can force cents", () => {
    expect(formatAud(129.5, { cents: true })).toMatch(/129\.50/);
  });
});

describe("formatShortDate", () => {
  it("formats ISO dates for en-AU", () => {
    const out = formatShortDate("2026-07-20T00:00:00.000Z");
    expect(out).toMatch(/2026/);
  });
});
