export type RepaymentFrequency = "weekly" | "fortnightly" | "monthly";
export type RepaymentType = "principal-and-interest" | "interest-only";

export const paymentsPerYear: Record<RepaymentFrequency, number> = {
  weekly: 52,
  fortnightly: 26,
  monthly: 12,
};

export type RepaymentInput = {
  amount: number;
  annualRate: number;
  years: number;
  frequency: RepaymentFrequency;
  type: RepaymentType;
};

export type RepaymentResult = {
  perPeriod: number;
  totalRepaid: number;
  totalInterest: number;
  periods: number;
};

/**
 * Standard amortising repayment. Interest-only loans repay the rate on the full
 * balance each period, with the principal still owing at the end of the term.
 */
export function calculateRepayments({
  amount,
  annualRate,
  years,
  frequency,
  type,
}: RepaymentInput): RepaymentResult {
  const perYear = paymentsPerYear[frequency];
  const periods = Math.round(years * perYear);
  const periodRate = annualRate / 100 / perYear;

  if (amount <= 0 || periods <= 0) {
    return { perPeriod: 0, totalRepaid: 0, totalInterest: 0, periods: Math.max(periods, 0) };
  }

  if (type === "interest-only") {
    const perPeriod = amount * periodRate;
    const totalInterest = perPeriod * periods;
    return { perPeriod, totalRepaid: totalInterest + amount, totalInterest, periods };
  }

  const perPeriod =
    periodRate === 0
      ? amount / periods
      : (amount * periodRate) / (1 - Math.pow(1 + periodRate, -periods));
  const totalRepaid = perPeriod * periods;
  return { perPeriod, totalRepaid, totalInterest: totalRepaid - amount, periods };
}

export type BorrowingPowerInput = {
  annualIncome: number;
  partnerIncome: number;
  dependants: number;
  monthlyExpenses: number;
  monthlyCommitments: number;
  annualRate: number;
  years: number;
};

/**
 * Serviceability estimate: net monthly surplus is capitalised at an assessment
 * rate 3.00% above the product rate, matching the APRA serviceability buffer.
 */
export const SERVICEABILITY_BUFFER = 3;

export function calculateBorrowingPower({
  annualIncome,
  partnerIncome,
  dependants,
  monthlyExpenses,
  monthlyCommitments,
  annualRate,
  years,
}: BorrowingPowerInput): number {
  const grossMonthly = (annualIncome + partnerIncome) / 12;
  const netMonthly = grossMonthly * 0.72;
  const dependantCost = dependants * 550;
  const surplus = netMonthly - monthlyExpenses - monthlyCommitments - dependantCost;
  if (surplus <= 0) return 0;

  const monthlyRate = (annualRate + SERVICEABILITY_BUFFER) / 100 / 12;
  const periods = Math.round(years * 12);
  if (monthlyRate === 0) return Math.round(surplus * periods);

  const capacity = (surplus * (1 - Math.pow(1 + monthlyRate, -periods))) / monthlyRate;
  return Math.max(0, Math.round(capacity / 1000) * 1000);
}

export type SavingsGoalInput = {
  initialDeposit: number;
  monthlyDeposit: number;
  annualRate: number;
  months: number;
};

export type SavingsGoalResult = {
  balance: number;
  contributed: number;
  interestEarned: number;
};

/** Monthly compounding with contributions made at the end of each month. */
export function calculateSavingsGoal({
  initialDeposit,
  monthlyDeposit,
  annualRate,
  months,
}: SavingsGoalInput): SavingsGoalResult {
  const monthlyRate = annualRate / 100 / 12;
  let balance = initialDeposit;
  for (let i = 0; i < months; i += 1) {
    balance = balance * (1 + monthlyRate) + monthlyDeposit;
  }
  const contributed = initialDeposit + monthlyDeposit * months;
  return { balance, contributed, interestEarned: balance - contributed };
}

export type ForeignExchangeResult = {
  converted: number;
  rate: number;
};

/** Converts AUD into a target currency at the supplied board rate. */
export function convertCurrency(amountAud: number, rate: number): ForeignExchangeResult {
  return { converted: amountAud * rate, rate };
}

/** Lenders' Mortgage Insurance applies once the loan exceeds 80% of the value. */
export function calculateLvr(loanAmount: number, propertyValue: number): number {
  if (propertyValue <= 0) return 0;
  return (loanAmount / propertyValue) * 100;
}

export function requiresLmi(loanAmount: number, propertyValue: number): boolean {
  return calculateLvr(loanAmount, propertyValue) > 80;
}
