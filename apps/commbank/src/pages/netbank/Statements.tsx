import { useMemo, useState } from "react";
import { FileText } from "lucide-react";
import { NetBankLayout } from "@/components/netbank/NetBankLayout";
import { FilterChips } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { useBanking } from "@/hooks/useBanking";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { seedStatements } from "@/data/netbank";
import { formatDate } from "@/lib/format";

export function StatementsPage() {
  useDocumentTitle("Statements");
  const { accounts } = useBanking();
  const [accountFilter, setAccountFilter] = useState("All");

  const options = useMemo(
    () => [
      "All",
      ...accounts
        .filter((account) => seedStatements.some((item) => item.accountId === account.id))
        .map((account) => account.name),
    ],
    [accounts],
  );

  const visible = useMemo(() => {
    if (accountFilter === "All") return seedStatements;
    const account = accounts.find((item) => item.name === accountFilter);
    return seedStatements.filter((statement) => statement.accountId === account?.id);
  }, [accountFilter, accounts]);

  return (
    <NetBankLayout title="Statements">
      <div className="mb-6">
        <p className="mb-2 text-sm font-semibold text-black">Account</p>
        <FilterChips
          options={options}
          value={accountFilter}
          onChange={setAccountFilter}
          ariaLabel="Filter statements by account"
        />
      </div>

      <p className="mb-4 text-sm text-ink-soft" role="status">
        Showing <strong className="text-black">{visible.length}</strong> of {seedStatements.length}{" "}
        statements
      </p>

      {visible.length === 0 ? (
        <EmptyState
          title="No statements for that account"
          description="Choose a different account to see its statement history."
        />
      ) : (
        <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
          {visible.map((statement) => {
            const account = accounts.find((item) => item.id === statement.accountId);
            return (
              <li key={statement.id} className="flex items-center gap-4 px-5 py-4">
                <FileText aria-hidden="true" className="h-5 w-5 shrink-0 text-ink-muted" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-black">{account?.name}</p>
                  <p className="text-sm text-ink-soft">{statement.period}</p>
                </div>
                <div className="shrink-0 text-right text-xs text-ink-muted">
                  <p>Issued {formatDate(statement.issued)}</p>
                  <p>PDF · {statement.sizeKb} KB</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-8 text-xs text-ink-muted">
        Statement documents are not generated in this demo — only the list of statements exists.
      </p>
    </NetBankLayout>
  );
}
