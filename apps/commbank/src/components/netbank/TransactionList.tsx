import { EmptyState } from "@/components/ui/EmptyState";
import type { Transaction } from "@/data/netbank";
import { formatDate, formatSignedCurrency } from "@/lib/format";
import { cn } from "@/lib/cn";

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        title="No transactions to show"
        description="Try clearing the search or choosing a different category."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
      <table className="w-full min-w-[560px] text-left text-sm">
        <caption className="sr-only">Transactions</caption>
        <thead>
          <tr className="border-b border-line bg-surface-tint text-xs uppercase tracking-wide text-ink-muted">
            <th scope="col" className="px-5 py-3 font-semibold">
              Date
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              Description
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              Category
            </th>
            <th scope="col" className="px-5 py-3 text-right font-semibold">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="whitespace-nowrap px-5 py-3.5 text-ink-muted">
                {formatDate(transaction.date)}
              </td>
              <th scope="row" className="px-5 py-3.5 font-medium text-black">
                {transaction.description}
              </th>
              <td className="px-5 py-3.5 text-ink-soft">{transaction.category}</td>
              <td
                className={cn(
                  "whitespace-nowrap px-5 py-3.5 text-right font-semibold tabular-nums",
                  transaction.amount < 0 ? "text-ink" : "text-positive",
                )}
              >
                {formatSignedCurrency(transaction.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
