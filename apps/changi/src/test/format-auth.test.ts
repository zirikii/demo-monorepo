import { describe, expect, it } from "vitest";
import { decodeSession, encodeSession } from "@/lib/auth";
import { formatPoints, statusTone } from "@/lib/format";

describe("auth session", () => {
  it("round-trips a demo user", () => {
    const user = {
      email: "traveller@example.com",
      name: "Alex",
      points: 1000,
      memberSince: "2024-01-01",
    };
    const token = encodeSession(user);
    expect(decodeSession(token)).toEqual(user);
  });

  it("returns null for bad tokens", () => {
    expect(decodeSession("not-valid")).toBeNull();
    expect(decodeSession(null)).toBeNull();
  });
});

describe("formatters", () => {
  it("formats points", () => {
    expect(formatPoints(4280)).toBe("4,280");
  });

  it("maps status tones", () => {
    expect(statusTone("On Time")).toBe("ok");
    expect(statusTone("Delayed")).toBe("warn");
    expect(statusTone("Boarding")).toBe("info");
  });
});
