export type RepaymentFrequency = "weekly" | "fortnightly" | "monthly";

export const periodsPerYear: Record<RepaymentFrequency, number> = {
  weekly: 52,
  fortnightly: 26,
  monthly: 12,
};

export type RepaymentInput = {
  principal: number;
  annualRate: number;
  years: number;
  frequency: RepaymentFrequency;
  interestOnly?: boolean;
};

export type RepaymentResult = {
  repayment: number;
  totalRepaid: number;
  totalInterest: number;
  numberOfRepayments: number;
};

/**
 * Standard amortisation. Interest-only payments cover the period's interest and leave the
 * principal untouched, so the balance is still owed at the end of the term.
 */
export function calculateRepayment({
  principal,
  annualRate,
  years,
  frequency,
  interestOnly = false,
}: RepaymentInput): RepaymentResult {
  const periods = periodsPerYear[frequency];
  const n = Math.round(years * periods);
  const i = annualRate / 100 / periods;

  if (principal <= 0 || n <= 0) {
    return { repayment: 0, totalRepaid: 0, totalInterest: 0, numberOfRepayments: 0 };
  }

  if (interestOnly) {
    const repayment = principal * i;
    const totalInterest = repayment * n;
    return {
      repayment,
      totalRepaid: totalInterest + principal,
      totalInterest,
      numberOfRepayments: n,
    };
  }

  const repayment = i === 0 ? principal / n : (principal * i) / (1 - Math.pow(1 + i, -n));
  const totalRepaid = repayment * n;

  return {
    repayment,
    totalRepaid,
    totalInterest: totalRepaid - principal,
    numberOfRepayments: n,
  };
}

export type BorrowingPowerInput = {
  annualIncome: number;
  monthlyExpenses: number;
  existingRepayments: number;
  dependants: number;
  assessmentRate: number;
  years: number;
};

/**
 * Indicative only. Serviceability uses an assessment rate above the advertised rate and a
 * per-dependant living-cost loading, which is how lenders buffer for rate rises.
 */
export function calculateBorrowingPower({
  annualIncome,
  monthlyExpenses,
  existingRepayments,
  dependants,
  assessmentRate,
  years,
}: BorrowingPowerInput): number {
  const netMonthlyIncome = (annualIncome * 0.72) / 12;
  const dependantLoading = dependants * 550;
  const surplus = netMonthlyIncome - monthlyExpenses - existingRepayments - dependantLoading;
  if (surplus <= 0) return 0;

  const i = assessmentRate / 100 / 12;
  const n = years * 12;
  const capacity = i === 0 ? surplus * n : (surplus * (1 - Math.pow(1 + i, -n))) / i;
  return Math.max(0, Math.round(capacity / 1000) * 1000);
}

export type SavingsGoalInput = {
  initialDeposit: number;
  monthlyDeposit: number;
  annualRate: number;
  months: number;
};

export function calculateSavingsGoal({
  initialDeposit,
  monthlyDeposit,
  annualRate,
  months,
}: SavingsGoalInput): { balance: number; interestEarned: number; contributed: number } {
  const i = annualRate / 100 / 12;
  let balance = initialDeposit;
  for (let month = 0; month < months; month += 1) {
    balance = balance * (1 + i) + monthlyDeposit;
  }
  const contributed = initialDeposit + monthlyDeposit * months;
  return { balance, interestEarned: balance - contributed, contributed };
}

/**
 * Retail FX includes a margin on the mid-market rate, so the customer always receives
 * slightly less than the headline rate implies.
 */
export function convertCurrency(amountAud: number, rate: number, marginPct = 0): number {
  return amountAud * rate * (1 - marginPct / 100);
}
