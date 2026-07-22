import { readJson } from "@/lib/data/json-store";
import type { Bill } from "@/lib/types";
import { formatAud, formatShortDate } from "@/lib/utils/format";
import { BillsTable } from "@/components/myoptus/bills-table";

export default async function BillsPage() {
  const bills = await readJson<Bill[]>("bills.json");
  const due = bills.find((b) => b.status === "Due");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-optus-ink">Billing</h2>
        <p className="mt-1 text-sm text-optus-ink/70">View and pay your Optus bills.</p>
      </div>

      {due ? (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-amber-200 bg-amber-50 p-5">
          <div>
            <p className="text-sm font-semibold text-amber-900">
              {formatAud(due.amount, { cents: true })} due {formatShortDate(due.dueDate)}
            </p>
            <p className="text-xs text-amber-800">{due.service}</p>
          </div>
          <button
            type="button"
            className="focus-ring inline-flex h-10 items-center rounded-md bg-optus-teal px-4 text-sm font-semibold text-white hover:bg-optus-teal-dark"
          >
            Pay now
          </button>
        </div>
      ) : null}

      <BillsTable bills={bills} />
    </div>
  );
}
