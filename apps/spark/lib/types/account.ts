export type UsageKind = "data" | "calls" | "text" | "roaming";

export interface UsageRecord {
  id: string;
  date: string; // ISO
  kind: UsageKind;
  description: string;
  /** Numeric amount in the record's unit. */
  amount: number;
  unit: "GB" | "min" | "txt";
  location?: string;
}

export type BillStatus = "Paid" | "Due" | "Overdue";

export interface BillItem {
  label: string;
  amount: number;
}

export interface Bill {
  id: string;
  period: string; // e.g. "March 2026"
  issuedAt: string; // ISO
  dueAt: string; // ISO
  amount: number; // NZD total
  status: BillStatus;
  items: BillItem[];
}

/** The signed-in account's current state (plan + connected add-ons). */
export interface Account {
  planId: string;
  activeAddOnIds: string[];
  /** Data allowance for the current cycle in GB (0 = endless). */
  dataAllowanceGb: number;
  dataUsedGb: number;
  /** Cycle reset date, ISO. */
  cycleResetAt: string;
  balanceOwing: number;
}
