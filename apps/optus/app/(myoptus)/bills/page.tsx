import type { Metadata } from "next";
import { readJson } from "@/lib/data/json-store";
import type { Bill } from "@/lib/types";
import { formatAud, formatShortDate } from "@/lib/utils/format";
import { BillsTable } from "@/components/myoptus/bills-table";

export const metadata: Metadata = {
  title: "Bills",
};

export default async function BillsPage() {
  const bills = await readJson<Bill[]>("bills.json");
  const due = bills.find((b) => b.status === "Due");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-optus-ink">Bills & payments</h2>
        <p className="mt-1 text-sm text-optus-ink-soft">
          View your billing history and manage payments.
        </p>
      </div>

      {due ? (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-optus-yellow bg-optus-yellow-light p-5">
          <div>
            <p className="text-sm font-semibold text-optus-ink">
              {due.period} bill due {formatShortDate(due.dueDate)}
            </p>
            <p className="text-2xl font-bold text-optus-ink">
              {formatAud(due.amount, { cents: true })}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-md bg-optus-ink px-5 text-sm font-semibold text-white hover:bg-optus-ink/90"
          >
            Pay now
          </button>
        </div>
      ) : null}

      <BillsTable bills={bills} />
    </div>
  );
}
