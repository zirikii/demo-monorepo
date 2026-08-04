export function calculateMonthlyRepayment(
  principal: number,
  annualRatePercent: number,
  years: number,
): number {
  if (principal <= 0 || annualRatePercent < 0 || years <= 0) return 0;
  const payments = years * 12;
  const monthlyRate = annualRatePercent / 100 / 12;
  if (monthlyRate === 0) return principal / payments;
  return (principal * monthlyRate * (1 + monthlyRate) ** payments) /
    ((1 + monthlyRate) ** payments - 1);
}
