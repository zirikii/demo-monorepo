import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { NetBankLayout } from "@/components/netbank/NetBankLayout";
import { TransactionList } from "@/components/netbank/TransactionList";
import { TextField } from "@/components/ui/Field";
import { FilterChips } from "@/components/ui/Tabs";
import { ButtonLink } from "@/components/ui/Button";
import { useBanking } from "@/hooks/useBanking";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatBalance, formatBsb, formatRate } from "@/lib/format";
import { matchesQuery } from "@/lib/search";
import { NotFoundPage } from "../NotFound";

export function AccountDetailPage() {
  const { accountId } = useParams<{ accountId: string }>();
  const { accounts, transactions } = useBanking();
  const account = accounts.find((item) => item.id === accountId);
  useDocumentTitle(account?.name ?? "Account");

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const accountTransactions = useMemo(
    () => transactions.filter((transaction) => transaction.accountId === accountId),
    [transactions, accountId],
  );

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(accountTransactions.map((item) => item.category))).sort()],
    [accountTransactions],
  );

  const visible = useMemo(
    () =>
      accountTransactions.filter((transaction) => {
        if (category !== "All" && transaction.category !== category) return false;
        return matchesQuery([transaction.description, transaction.category], query);
      }),
    [accountTransactions, category, query],
  );

  if (!account) return <NotFoundPage />;

  return (
    <NetBankLayout title={account.name}>
      <Link
        to="/netbank"
        className="focus-ring mb-6 inline-block rounded text-sm font-semibold text-black underline underline-offset-4"
      >
        Back to accounts
      </Link>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border-2 border-black bg-surface p-6">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">Balance</p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-black">
            {formatBalance(account.balance)}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">Available</p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-black">
            {formatBalance(account.available)}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">Details</p>
          <p className="mt-2 text-sm text-ink-soft">
            {account.bsb
              ? `BSB ${formatBsb(account.bsb)} · Account ${account.number}`
              : `Card ending ${account.number}`}
          </p>
          {account.interestRate ? (
            <p className="mt-1 text-sm text-ink-soft">Rate {formatRate(account.interestRate)}</p>
          ) : null}
          {account.limit ? (
            <p className="mt-1 text-sm text-ink-soft">Limit {formatBalance(account.limit)}</p>
          ) : null}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-end gap-6">
        <TextField
          label="Search transactions"
          placeholder="e.g. Woolworths"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full max-w-xs"
        />
        <div>
          <p className="mb-2 text-sm font-semibold text-black">Category</p>
          <FilterChips
            options={categories}
            value={category}
            onChange={setCategory}
            ariaLabel="Filter transactions by category"
          />
        </div>
      </div>

      <p className="mb-4 text-sm text-ink-soft" role="status">
        Showing <strong className="text-black">{visible.length}</strong> of{" "}
        {accountTransactions.length} transactions
      </p>

      <TransactionList transactions={visible} />

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink to="/netbank/transfer">Transfer from this account</ButtonLink>
        <ButtonLink to="/netbank/statements" variant="outline">
          View statements
        </ButtonLink>
      </div>
    </NetBankLayout>
  );
}
