import { describe, expect, it } from "vitest";
import { calculateMonthlyRepayment } from "@/lib/calculator";
import { decodeSession, encodeSession, type DemoProfile } from "@/lib/auth";
import { formatAccountNumber, formatAud, formatDate } from "@/lib/format";

describe("demo sessions", () => {
  it("round-trips a profile without a password", () => {
    const profile: DemoProfile = {
      clientNumber: "12345678",
      name: "Alex Morgan",
      initials: "AM",
      lastLogin: "4 August 2026",
    };
    expect(decodeSession(encodeSession(profile))).toEqual(profile);
    expect(encodeSession(profile)).not.toContain("demo");
  });

  it("rejects invalid or incomplete tokens", () => {
    expect(decodeSession("not-base64")).toBeNull();
    expect(decodeSession(btoa("{}"))).toBeNull();
    expect(decodeSession(null)).toBeNull();
  });
});

describe("Australian formatters", () => {
  it("formats AUD, dates and account numbers", () => {
    expect(formatAud(6842.18)).toMatch(/\$6,842\.18/);
    expect(formatDate("2026-08-04")).toBe("4 Aug 2026");
    expect(formatAccountNumber("12345678")).toBe("1234 5678");
  });
});

describe("home loan calculator", () => {
  it("calculates principal-and-interest monthly repayments", () => {
    expect(calculateMonthlyRepayment(1000, 12, 1)).toBeCloseTo(88.85, 2);
    expect(calculateMonthlyRepayment(120000, 0, 10)).toBe(1000);
    expect(calculateMonthlyRepayment(0, 6, 30)).toBe(0);
  });
});
