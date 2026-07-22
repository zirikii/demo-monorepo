import { BillsTable } from "@/components/myoptus/bills-table";
import { readJson } from "@/lib/data/json-store";
import type { Bill } from "@/lib/types";

export default async function BillsPage() {
  const bills = await readJson<Bill[]>("bills.json");
  return <div><h2 className="text-2xl font-black text-optus-ink">Bills</h2><p className="mt-1 text-sm text-optus-ink/70">Recent account statements (demo JSON).</p><div className="mt-8"><BillsTable bills={bills} /></div></div>;
}
