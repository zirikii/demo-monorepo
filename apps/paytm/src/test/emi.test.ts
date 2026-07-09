import { describe, expect, it } from "vitest";
import { calculateEmi } from "../lib/emi";

describe("calculateEmi", () => {
  it("matches the standard reducing-balance formula", () => {
    // ₹3,00,000 at 12% p.a. over 36 months — a well-known reference case.
    const { monthlyEmi, totalInterest, totalPayable } = calculateEmi(300_000, 12, 36);
    expect(Math.round(monthlyEmi)).toBe(9964);
    expect(Math.round(totalPayable)).toBe(Math.round(monthlyEmi * 36));
    expect(Math.round(totalInterest)).toBe(Math.round(totalPayable - 300_000));
  });

  it("handles a zero interest rate as simple division", () => {
    const { monthlyEmi, totalInterest } = calculateEmi(120_000, 0, 12);
    expect(monthlyEmi).toBe(10_000);
    expect(totalInterest).toBe(0);
  });

  it("returns zeros for degenerate inputs", () => {
    expect(calculateEmi(0, 12, 36).monthlyEmi).toBe(0);
    expect(calculateEmi(100000, 12, 0).totalPayable).toBe(0);
  });

  it("charges more total interest for longer tenures", () => {
    const short = calculateEmi(500_000, 11, 24).totalInterest;
    const long = calculateEmi(500_000, 11, 60).totalInterest;
    expect(long).toBeGreaterThan(short);
  });
});
