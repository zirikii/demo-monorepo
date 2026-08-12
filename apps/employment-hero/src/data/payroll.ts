import type { PayRun } from "./types";

export const payRuns: PayRun[] = [
  { id: "pr-1", period: "1–15 Aug 2026", payDate: "2026-08-16", employees: 142, total: 486200, status: "Processing" },
  { id: "pr-2", period: "16–31 Jul 2026", payDate: "2026-08-01", employees: 140, total: 471850, status: "Paid" },
  { id: "pr-3", period: "1–15 Jul 2026", payDate: "2026-07-16", employees: 138, total: 468120, status: "Paid" },
  { id: "pr-4", period: "16–30 Jun 2026", payDate: "2026-07-01", employees: 136, total: 455900, status: "Paid" },
  { id: "pr-5", period: "1–15 Jun 2026", payDate: "2026-06-16", employees: 135, total: 452300, status: "Paid" },
  { id: "pr-6", period: "16–31 Aug 2026", payDate: "2026-09-01", employees: 144, total: 492000, status: "Draft" },
];
