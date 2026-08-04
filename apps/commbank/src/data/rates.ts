export type RateRow = {
  product: string;
  rate: number;
  comparison?: number;
  note: string;
  category: "savings" | "home" | "personal" | "term";
};

export const rateRows: RateRow[] = [
  { product: "NetBank Saver (demo)", rate: 4.5, comparison: 4.52, note: "Variable — balances up to $50k", category: "savings" },
  { product: "GoalSaver (demo)", rate: 4.65, comparison: 4.67, note: "Bonus conditions may apply", category: "savings" },
  { product: "Term deposit 6 months (demo)", rate: 4.2, note: "Fixed — interest at maturity", category: "term" },
  { product: "Term deposit 12 months (demo)", rate: 4.05, note: "Fixed — interest at maturity", category: "term" },
  { product: "Home loan variable OO P&I (demo)", rate: 5.99, comparison: 6.1, note: "Owner-occupier illustration", category: "home" },
  { product: "Home loan fixed 2yr OO (demo)", rate: 5.69, comparison: 6.05, note: "Fixed period then reverts", category: "home" },
  { product: "Personal loan fixed (demo)", rate: 9.99, comparison: 10.4, note: "Secured/unsecured varies", category: "personal" },
  { product: "Car loan (demo)", rate: 8.49, comparison: 8.9, note: "New & used vehicles", category: "personal" },
];
