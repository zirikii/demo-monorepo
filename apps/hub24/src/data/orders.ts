export interface OrderRow {
  id: string;
  accountId: string;
  client: string;
  security: string;
  side: "Buy" | "Sell";
  status: "Open" | "Filled" | "Cancelled";
  value: number;
  placed: string;
}

export const ORDERS: OrderRow[] = [
  { id: "ORD-88421", accountId: "HUB-010420", client: "Amelia Nguyen", security: "VAS", side: "Buy", status: "Filled", value: 25000, placed: "2026-08-14" },
  { id: "ORD-88422", accountId: "HUB-010421", client: "Ben Patel", security: "Southridge Diversified 70", side: "Buy", status: "Open", value: 80000, placed: "2026-08-15" },
  { id: "ORD-88423", accountId: "HUB-010424", client: "Elena Rossi", security: "BHP", side: "Sell", status: "Filled", value: 14200, placed: "2026-08-12" },
  { id: "ORD-88424", accountId: "HUB-010427", client: "Hugo Kowalski", security: "IVV", side: "Buy", status: "Open", value: 36000, placed: "2026-08-16" },
  { id: "ORD-88425", accountId: "HUB-010430", client: "Keira Chen", security: "Murray Cash Plus", side: "Buy", status: "Filled", value: 50000, placed: "2026-08-11" },
  { id: "ORD-88426", accountId: "HUB-010433", client: "Noah Williams", security: "CSL", side: "Sell", status: "Cancelled", value: 9800, placed: "2026-08-10" },
  { id: "ORD-88427", accountId: "HUB-010436", client: "Quinn Ahmed", security: "Discover Growth Index", side: "Buy", status: "Open", value: 22000, placed: "2026-08-16" },
  { id: "ORD-88428", accountId: "HUB-010440", client: "Uma Santos", security: "AUD term deposit 6m", side: "Buy", status: "Filled", value: 100000, placed: "2026-08-08" },
];
