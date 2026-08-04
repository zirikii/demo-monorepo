/** Standard principal & interest monthly repayment (AUD). */
export function monthlyRepayment(principal: number, annualRatePct: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  const monthlyRate = annualRatePct / 100 / 12;
  const n = years * 12;
  if (monthlyRate === 0) return principal / n;
  const factor = Math.pow(1 + monthlyRate, n);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export function totalInterest(principal: number, annualRatePct: number, years: number): number {
  const monthly = monthlyRepayment(principal, annualRatePct, years);
  return monthly * years * 12 - principal;
}
