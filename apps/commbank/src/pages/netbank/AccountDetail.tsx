import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Search } from "lucide-react";
import { NetBankLayout } from "@/components/netbank/NetBankLayout";
import { TransactionList } from "@/components/netbank/TransactionList";
import { SelectField } from "@/components/ui/Field";
import { useBanking } from "@/hooks/useBanking";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatCurrency, formatRate, maskAccountNumber, pluralise } from "@/lib/format";
import { NotFoundPage } from "../NotFound";

const categories = [
  "Groceries",
  "Transport",
  "Eating out",
  "Utilities",
  "Health",
  "Income",
  "Transfers",
  "Home",
  "Entertainment",
  "Education",
];

export function NetBankAccountDetailPage() {
  const { accountId = "" } = useParams();
  const { accounts, transactions } = useBanking();
  const account = accounts.find((item) => item.id === accountId);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  useDocumentTitle(account ? `${account.name} — NetBank` : "Account not found");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return transactions.filter((transaction) => {
      if (transaction.accountId !== accountId) return false;
      if (category !== "all" && transaction.category !== category) return false;
      if (!needle) return true;
      return (
        transaction.description.toLowerCase().includes(needle) ||
        transaction.merchant.toLowerCase().includes(needle)
      );
    });
  }, [transactions, accountId, query, category]);

  if (!account) return <NotFoundPage />;

  return (
    <NetBankLayout
      title={account.name}
      intro={`${maskAccountNumber(account.bsb, account.number)}${
        account.interestRate ? ` · ${formatRate(account.interestRate)}` : ""
      }`}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-start">
        <div className="space-y-4">
          <div className="rounded-cba-lg bg-surface p-6 shadow-cba">
            <p className="text-[13px] uppercase tracking-wider text-ink-faint">Balance</p>
            <p className="mt-1 text-3xl font-extrabold text-ink">
              {formatCurrency(account.balance)}
            </p>
            <p className="mt-4 text-[13px] uppercase tracking-wider text-ink-faint">Available</p>
            <p className="mt-1 text-xl font-bold text-ink">{formatCurrency(account.available)}</p>
            {account.creditLimit ? (
              <>
                <p className="mt-4 text-[13px] uppercase tracking-wider text-ink-faint">
                  Credit limit
                </p>
                <p className="mt-1 text-xl font-bold text-ink">
                  {formatCurrency(account.creditLimit)}
                </p>
              </>
            ) : null}
          </div>

          <div className="rounded-cba-lg bg-surface p-6 shadow-cba">
            <h2 className="text-base font-extrabold text-ink">Quick actions</h2>
            <ul className="mt-3 space-y-2">
              {[
                { to: "/netbank/transfer", label: "Transfer money" },
                { to: "/netbank/pay", label: "Pay someone or a bill" },
                { to: "/netbank/cards", label: "Manage cards" },
                { to: "/netbank/settings", label: "Statements & settings" },
              ].map((action) => (
                <li key={action.to}>
                  <Link
                    to={action.to}
                    className="focus-cba block rounded-cba px-3 py-2 text-[15px] font-semibold text-ink hover:bg-surface-tint"
                  >
                    {action.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
            <div>
              <label className="block text-sm font-bold text-ink" htmlFor="transaction-search">
                Search transactions
              </label>
              <div className="relative mt-1.5">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-ghost"
                />
                <input
                  id="transaction-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Merchant or description"
                  className="focus-cba w-full rounded-cba border border-line bg-surface py-2.5 pl-11 pr-3 text-[15px]"
                />
              </div>
            </div>
            <SelectField
              label="Category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="all">All categories</option>
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SelectField>
          </div>

          <p className="mt-4 text-sm text-ink-faint" aria-live="polite">
            {pluralise(results.length, "transaction")}
          </p>

          <div className="mt-3">
            <TransactionList transactions={results} />
          </div>
        </div>
      </div>
    </NetBankLayout>
  );
}
