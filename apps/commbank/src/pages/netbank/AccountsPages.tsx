import { CreditCard, Search, WalletCards } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { accounts, transactions } from "@/data/banking";
import { formatAccountNumber, formatAud, formatDate } from "@/lib/format";

export function AccountsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Accounts</h1>
      <p className="mt-2 text-cba-ink-soft">A complete view of your fictional accounts.</p>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {accounts.map((account) => (
          <Link key={account.id} className="surface-card group p-6 hover:border-cba-ink" to={`/netbank/accounts/${account.id}`}>
            <div className="flex items-start justify-between">
              <span className="rounded-xl bg-cba-yellow p-3">
                {account.type === "credit" ? <CreditCard aria-hidden="true" /> : <WalletCards aria-hidden="true" />}
              </span>
              <span className="text-sm font-semibold group-hover:underline">View activity</span>
            </div>
            <h2 className="mt-5 text-xl font-bold">{account.name}</h2>
            <p className="mt-1 text-xs text-cba-muted">{account.bsb ? `BSB ${account.bsb} · ` : ""}{formatAccountNumber(account.number)}</p>
            <p className="mt-6 text-2xl font-bold">{formatAud(account.balance)}</p>
            <p className="mt-1 text-xs text-cba-muted">Current balance · {formatAud(account.available)} available</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function AccountDetailPage() {
  const { id } = useParams();
  const account = accounts.find((item) => item.id === id);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = useMemo(
    () => ["All", ...new Set(transactions.filter((item) => item.accountId === id).map((item) => item.category))],
    [id],
  );
  const visible = useMemo(
    () =>
      transactions.filter(
        (item) =>
          item.accountId === id &&
          (category === "All" || item.category === category) &&
          `${item.description} ${item.reference}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [category, id, query],
  );
  if (!account) return <Navigate replace to="/netbank/accounts" />;

  return (
    <div>
      <Link className="text-sm font-semibold underline" to="/netbank/accounts">← All accounts</Link>
      <div className="mt-5 rounded-2xl bg-cba-ink p-6 text-white sm:p-8">
        <p className="text-sm text-white/65">{account.name}</p>
        <h1 className="mt-2 text-3xl font-bold">{formatAud(account.balance)}</h1>
        <p className="mt-4 text-xs text-white/65">{account.bsb ? `BSB ${account.bsb} · ` : ""}{formatAccountNumber(account.number)}</p>
      </div>
      <section className="mt-7 surface-card overflow-hidden">
        <div className="border-b border-cba-line p-5">
          <h2 className="text-xl font-bold">Transactions</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_220px]">
            <label className="relative">
              <span className="sr-only">Search transactions</span>
              <Search aria-hidden="true" className="absolute left-3 top-3 h-5 w-5 text-cba-muted" />
              <input
                className="field pl-11"
                placeholder="Search merchant or reference"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <label>
              <span className="sr-only">Filter by category</span>
              <select className="field" value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.map((value) => <option key={value}>{value}</option>)}
              </select>
            </label>
          </div>
        </div>
        <p className="px-5 pt-4 text-xs text-cba-muted" aria-live="polite">{visible.length} transactions</p>
        <ul className="divide-y divide-cba-line">
          {visible.map((transaction) => (
            <li key={transaction.id} className="grid gap-2 px-5 py-4 sm:grid-cols-[120px_1fr_auto] sm:items-center">
              <time className="text-xs text-cba-muted">{formatDate(transaction.date)}</time>
              <div><p className="text-sm font-semibold">{transaction.description}</p><p className="mt-1 text-xs text-cba-muted">{transaction.category} · {transaction.reference}</p></div>
              <strong className={transaction.amount > 0 ? "text-cba-positive" : ""}>{formatAud(transaction.amount)}</strong>
            </li>
          ))}
        </ul>
        {visible.length === 0 ? <p className="p-8 text-center text-cba-muted">No transactions match those filters.</p> : null}
      </section>
    </div>
  );
}
