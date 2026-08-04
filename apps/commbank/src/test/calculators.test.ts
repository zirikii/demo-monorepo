import { describe, expect, it } from "vitest";
import {
  calculateBorrowingPower,
  calculateRepayment,
  calculateSavingsGoal,
  convertCurrency,
} from "@/lib/calculators";

describe("calculateRepayment", () => {
  it("amortises a standard monthly loan", () => {
    const result = calculateRepayment({
      principal: 650000,
      annualRate: 5.89,
      years: 30,
      frequency: "monthly",
    });

    expect(result.numberOfRepayments).toBe(360);
    expect(result.repayment).toBeCloseTo(3851.23, 1);
    expect(result.totalRepaid).toBeCloseTo(result.repayment * 360, 5);
    expect(result.totalInterest).toBeCloseTo(result.totalRepaid - 650000, 5);
  });

  it("charges a smaller amount more often when paid fortnightly", () => {
    const monthly = calculateRepayment({
      principal: 500000,
      annualRate: 6,
      years: 25,
      frequency: "monthly",
    });
    const fortnightly = calculateRepayment({
      principal: 500000,
      annualRate: 6,
      years: 25,
      frequency: "fortnightly",
    });

    expect(fortnightly.repayment).toBeLessThan(monthly.repayment);
    expect(fortnightly.numberOfRepayments).toBe(650);
  });

  it("leaves the principal outstanding on interest-only payments", () => {
    const result = calculateRepayment({
      principal: 600000,
      annualRate: 6,
      years: 5,
      frequency: "monthly",
      interestOnly: true,
    });

    expect(result.repayment).toBeCloseTo(3000, 5);
    expect(result.totalInterest).toBeCloseTo(180000, 5);
    expect(result.totalRepaid).toBeCloseTo(780000, 5);
  });

  it("splits the principal evenly at a zero interest rate", () => {
    const result = calculateRepayment({
      principal: 12000,
      annualRate: 0,
      years: 1,
      frequency: "monthly",
    });

    expect(result.repayment).toBeCloseTo(1000, 5);
    expect(result.totalInterest).toBeCloseTo(0, 5);
  });

  it("returns zeroes for a zero principal", () => {
    expect(
      calculateRepayment({ principal: 0, annualRate: 6, years: 30, frequency: "monthly" }),
    ).toEqual({ repayment: 0, totalRepaid: 0, totalInterest: 0, numberOfRepayments: 0 });
  });
});

describe("calculateBorrowingPower", () => {
  it("scales with income", () => {
    const base = {
      monthlyExpenses: 3200,
      existingRepayments: 450,
      dependants: 1,
      assessmentRate: 8.89,
      years: 30,
    };
    const lower = calculateBorrowingPower({ ...base, annualIncome: 120000 });
    const higher = calculateBorrowingPower({ ...base, annualIncome: 200000 });

    expect(higher).toBeGreaterThan(lower);
    expect(lower).toBeGreaterThan(0);
  });

  it("returns zero when expenses exceed income", () => {
    expect(
      calculateBorrowingPower({
        annualIncome: 40000,
        monthlyExpenses: 5000,
        existingRepayments: 1000,
        dependants: 3,
        assessmentRate: 8.89,
        years: 30,
      }),
    ).toBe(0);
  });
});

describe("calculateSavingsGoal", () => {
  it("compounds monthly and separates interest from contributions", () => {
    const result = calculateSavingsGoal({
      initialDeposit: 5000,
      monthlyDeposit: 800,
      annualRate: 5,
      months: 24,
    });

    expect(result.contributed).toBe(5000 + 800 * 24);
    expect(result.interestEarned).toBeGreaterThan(0);
    expect(result.balance).toBeCloseTo(result.contributed + result.interestEarned, 5);
  });

  it("earns nothing at a zero rate", () => {
    const result = calculateSavingsGoal({
      initialDeposit: 1000,
      monthlyDeposit: 100,
      annualRate: 0,
      months: 12,
    });

    expect(result.interestEarned).toBeCloseTo(0, 5);
    expect(result.balance).toBeCloseTo(2200, 5);
  });
});

describe("convertCurrency", () => {
  it("applies the mid-market rate with no margin", () => {
    expect(convertCurrency(1000, 0.6584)).toBeCloseTo(658.4, 5);
  });

  it("returns less than the mid-market amount once a retail margin applies", () => {
    const mid = convertCurrency(1000, 0.6584);
    const retail = convertCurrency(1000, 0.6584, 3.5);

    expect(retail).toBeLessThan(mid);
    expect(retail).toBeCloseTo(mid * 0.965, 5);
  });
});
