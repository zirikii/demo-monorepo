import type { Transaction } from "@/data/types";
import { cn } from "@/lib/cn";
import { formatDayLabel, formatSignedCurrency } from "@/lib/format";
import { EmptyState } from "../ui/EmptyState";

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        title="No transactions found"
        body="Try clearing the search or choosing a different category."
      />
    );
  }

  return (
    <ul className="divide-y divide-line-soft rounded-cba-lg bg-surface shadow-cba">
      {transactions.map((transaction) => (
        <li key={transaction.id} className="flex items-center gap-4 px-5 py-3.5">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold text-ink">
              {transaction.description}
              {transaction.pending ? (
                <span className="ml-2 rounded-full bg-surface-tint px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                  Pending
                </span>
              ) : null}
            </p>
            <p className="text-[13px] text-ink-faint">
              {formatDayLabel(transaction.date)} · {transaction.category}
            </p>
          </div>
          <p
            className={cn(
              "shrink-0 text-[15px] font-bold tabular-nums",
              transaction.amount < 0 ? "text-ink" : "text-positive",
            )}
          >
            {formatSignedCurrency(transaction.amount)}
          </p>
        </li>
      ))}
    </ul>
  );
}
