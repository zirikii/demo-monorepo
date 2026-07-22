import { describe, expect, it } from "vitest";
import { formatAud, formatShortDate } from "@/lib/utils/format";

describe("formatAud", () => {
  it("omits cents for whole-dollar amounts by default", () => {
    expect(formatAud(49)).toBe("$49.00".replace(".00", ""));
  });

  it("keeps cents when asked", () => {
    expect(formatAud(49, { cents: true })).toBe("$49.00");
  });

  it("shows cents for fractional amounts", () => {
    expect(formatAud(19.99)).toBe("$19.99");
  });
});

describe("formatShortDate", () => {
  it("formats an ISO date in en-AU day/month/year order", () => {
    expect(formatShortDate("2026-03-09T00:00:00.000Z")).toMatch(/Mar 2026/);
  });
});
