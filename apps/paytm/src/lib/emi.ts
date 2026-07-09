export interface EmiBreakdown {
  monthlyEmi: number;
  totalInterest: number;
  totalPayable: number;
}

/**
 * Standard reducing-balance EMI:
 * EMI = P * r * (1+r)^n / ((1+r)^n - 1), r = annual rate / 12 / 100.
 */
export function calculateEmi(
  principal: number,
  annualRatePct: number,
  tenureMonths: number,
): EmiBreakdown {
  if (principal <= 0 || tenureMonths <= 0) {
    return { monthlyEmi: 0, totalInterest: 0, totalPayable: 0 };
  }
  if (annualRatePct === 0) {
    const emi = principal / tenureMonths;
    return { monthlyEmi: emi, totalInterest: 0, totalPayable: principal };
  }
  const r = annualRatePct / 12 / 100;
  const factor = Math.pow(1 + r, tenureMonths);
  const emi = (principal * r * factor) / (factor - 1);
  const totalPayable = emi * tenureMonths;
  return {
    monthlyEmi: emi,
    totalInterest: totalPayable - principal,
    totalPayable,
  };
}
