import { describe, expect, it } from "vitest";
import {
  SERVICEABILITY_BUFFER,
  calculateBorrowingPower,
  calculateLvr,
  calculateRepayments,
  calculateSavingsGoal,
  convertCurrency,
  requiresLmi,
} from "@/lib/calculators";

describe("calculateRepayments", () => {
  it("amortises a $650,000 loan at 5.89% over 30 years", () => {
    const result = calculateRepayments({
      amount: 650000,
      annualRate: 5.89,
      years: 30,
      frequency: "monthly",
      type: "principal-and-interest",
    });

    // Hand-checked against the standard annuity formula P·i / (1 − (1+i)^−n).
    expect(result.perPeriod).toBeCloseTo(3851.23, 1);
    expect(result.periods).toBe(360);
    expect(result.totalInterest).toBeCloseTo(736442.46, 1);
  });

  it("charges only interest on an interest-only loan", () => {
    const result = calculateRepayments({
      amount: 600000,
      annualRate: 6,
      years: 5,
      frequency: "monthly",
      type: "interest-only",
    });

    expect(result.perPeriod).toBeCloseTo(3000, 5);
    expect(result.totalRepaid).toBeCloseTo(780000, 5);
  });

  it("scales the repayment down for weekly and fortnightly frequencies", () => {
    const base = {
      amount: 500000,
      annualRate: 6,
      years: 30,
      type: "principal-and-interest",
    } as const;
    const monthly = calculateRepayments({ ...base, frequency: "monthly" });
    const fortnightly = calculateRepayments({ ...base, frequency: "fortnightly" });
    const weekly = calculateRepayments({ ...base, frequency: "weekly" });

    expect(fortnightly.perPeriod).toBeLessThan(monthly.perPeriod);
    expect(weekly.perPeriod).toBeLessThan(fortnightly.perPeriod);
    expect(weekly.periods).toBe(1560);
  });

  it("splits the principal evenly at a zero rate", () => {
    const result = calculateRepayments({
      amount: 120000,
      annualRate: 0,
      years: 10,
      frequency: "monthly",
      type: "principal-and-interest",
    });

    expect(result.perPeriod).toBeCloseTo(1000, 5);
    expect(result.totalInterest).toBeCloseTo(0, 5);
  });

  it("returns zeroes for a loan with no amount", () => {
    const result = calculateRepayments({
      amount: 0,
      annualRate: 5,
      years: 30,
      frequency: "monthly",
      type: "principal-and-interest",
    });

    expect(result.perPeriod).toBe(0);
    expect(result.totalRepaid).toBe(0);
  });
});

describe("calculateBorrowingPower", () => {
  it("capitalises the monthly surplus at the buffered rate", () => {
    const capacity = calculateBorrowingPower({
      annualIncome: 120000,
      partnerIncome: 0,
      dependants: 0,
      monthlyExpenses: 2600,
      monthlyCommitments: 400,
      annualRate: 5.89,
      years: 30,
    });

    expect(capacity).toBeGreaterThan(500000);
    expect(capacity).toBeLessThan(700000);
    expect(capacity % 1000).toBe(0);
  });

  it("reduces capacity when dependants are added", () => {
    const base = {
      annualIncome: 120000,
      partnerIncome: 0,
      dependants: 0,
      monthlyExpenses: 2600,
      monthlyCommitments: 400,
      annualRate: 5.89,
      years: 30,
    };

    expect(calculateBorrowingPower({ ...base, dependants: 3 })).toBeLessThan(
      calculateBorrowingPower(base),
    );
  });

  it("returns zero when expenses exceed net income", () => {
    expect(
      calculateBorrowingPower({
        annualIncome: 40000,
        partnerIncome: 0,
        dependants: 2,
        monthlyExpenses: 3000,
        monthlyCommitments: 900,
        annualRate: 5.89,
        years: 30,
      }),
    ).toBe(0);
  });

  it("applies a three percent serviceability buffer", () => {
    expect(SERVICEABILITY_BUFFER).toBe(3);
  });
});

describe("calculateSavingsGoal", () => {
  it("compounds monthly with end-of-month contributions", () => {
    const result = calculateSavingsGoal({
      initialDeposit: 5000,
      monthlyDeposit: 800,
      annualRate: 5.2,
      months: 24,
    });

    expect(result.contributed).toBe(24200);
    expect(result.balance).toBeGreaterThan(result.contributed);
    expect(result.interestEarned).toBeCloseTo(result.balance - result.contributed, 8);
  });

  it("earns nothing at a zero rate", () => {
    const result = calculateSavingsGoal({
      initialDeposit: 1000,
      monthlyDeposit: 100,
      annualRate: 0,
      months: 12,
    });

    expect(result.balance).toBeCloseTo(2200, 8);
    expect(result.interestEarned).toBeCloseTo(0, 8);
  });
});

describe("foreign exchange and LVR", () => {
  it("converts AUD at the supplied board rate", () => {
    expect(convertCurrency(1000, 0.657).converted).toBeCloseTo(657, 8);
  });

  it("computes the loan to value ratio", () => {
    expect(calculateLvr(650000, 850000)).toBeCloseTo(76.470588, 5);
    expect(calculateLvr(100000, 0)).toBe(0);
  });

  it("flags LMI above an 80% LVR", () => {
    expect(requiresLmi(650000, 850000)).toBe(false);
    expect(requiresLmi(760000, 850000)).toBe(true);
  });
});
