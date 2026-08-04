import { describe, expect, it } from "vitest";
import { formatAud, formatRate, maskAccount } from "@/lib/format";
import { decodeSession, encodeSession, loginWithCredentials, clearSession } from "@/lib/auth";
import { monthlyRepayment } from "@/lib/loanMath";

describe("format", () => {
  it("formats AUD", () => {
    expect(formatAud(12.5)).toContain("12.50");
  });

  it("formats rates", () => {
    expect(formatRate(5.99)).toBe("5.99% p.a.");
  });

  it("masks account numbers", () => {
    expect(maskAccount("12345678")).toBe("•••• 5678");
  });
});

describe("auth", () => {
  it("round-trips session encoding", () => {
    const user = { email: "a@example.com", name: "Alex", customerNumber: "123" };
    expect(decodeSession(encodeSession(user))).toEqual(user);
  });

  it("logs in with any credentials", () => {
    clearSession();
    const user = loginWithCredentials("admin@example.com", "demo");
    expect(user.email).toBe("admin@example.com");
    expect(user.name).toBeTruthy();
  });
});

describe("loanMath", () => {
  it("computes a positive monthly repayment", () => {
    const monthly = monthlyRepayment(650000, 5.99, 30);
    expect(monthly).toBeGreaterThan(3000);
    expect(monthly).toBeLessThan(5000);
  });
});
