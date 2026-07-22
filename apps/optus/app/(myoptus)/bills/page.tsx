import { BillsTable } from "@/components/myoptus/bills-table";
import { readJson } from "@/lib/data/json-store";
import type { Bill } from "@/lib/types";

export default async function BillsPage() {
  const bills = await readJson<Bill[]>("bills.json");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-optus-ink">Bills</h2>
        <p className="mt-1 text-sm text-optus-ink/70">
          Invoice history with pagination — dummy AUD amounts only.
        </p>
      </div>
      <BillsTable bills={bills} />
    </div>
  );
}
