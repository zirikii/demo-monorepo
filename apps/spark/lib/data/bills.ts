import type { Bill } from "@/lib/types";
import { readData } from "./store";

export async function getBills(): Promise<Bill[]> {
  const bills = await readData<Bill[]>("bills");
  return [...bills].sort((a, b) => (a.issuedAt < b.issuedAt ? 1 : -1));
}

export async function getOutstandingBillCount(): Promise<number> {
  const bills = await getBills();
  return bills.filter((b) => b.status !== "Paid").length;
}
