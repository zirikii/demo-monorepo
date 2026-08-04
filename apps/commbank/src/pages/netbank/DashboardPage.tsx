import { ArrowRight, CreditCard, Landmark, Lightbulb, ReceiptText, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { accounts, transactions } from "@/data/banking";
import { formatAud, formatDate } from "@/lib/format";

const quickActions = [
  { label: "Transfer money", to: "/netbank/transfer", icon: Send },
  { label: "Pay a bill", to: "/netbank/bpay", icon: ReceiptText },
  { label: "Manage cards", to: "/netbank/cards", icon: CreditCard },
  { label: "View statements", to: "/netbank/statements", icon: Landmark },
] as const;

export function DashboardPage() {
  const assets = accounts.filter((account) => account.balance > 0).reduce((sum, account) => sum + account.balance, 0);
  return (
    <div>
      <p className="text-sm text-cba-muted">Tuesday, 4 August 2026</p>
      <h1 className="mt-1 text-3xl font-bold">Good afternoon, Alex</h1>
      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        <div className="surface-card p-6 sm:col-span-2">
          <p className="text-sm text-cba-muted">Total savings and transaction balances</p>
          <p className="mt-2 text-3xl font-bold">{formatAud(assets)}</p>
          <p className="mt-3 text-xs text-cba-muted">Excludes credit and home loan balances</p>
        </div>
        <div className="rounded-2xl bg-cba-yellow p-6">
          <Lightbulb aria-hidden="true" className="h-6 w-6" />
          <p className="mt-4 font-bold">You’re on track</p>
          <p className="mt-2 text-sm">Your emergency buffer grew by $500 this month.</p>
        </div>
      </div>
      <section className="mt-8">
        <div className="flex items-end justify-between">
          <div><p className="text-sm font-semibold text-cba-positive">Your money</p><h2 className="mt-1 text-2xl font-bold">Accounts</h2></div>
          <Link className="flex items-center gap-1 text-sm font-semibold" to="/netbank/accounts">View all <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {accounts.map((account) => (
            <Link key={account.id} to={`/netbank/accounts/${account.id}`} className="surface-card p-5 hover:border-cba-ink">
              <div className="flex justify-between gap-4">
                <div><p className="font-bold">{account.name}</p><p className="mt-1 text-xs text-cba-muted">•••• {account.number.slice(-4)}</p></div>
                <div className="text-right"><p className="font-bold">{formatAud(account.balance)}</p><p className="mt-1 text-xs text-cba-muted">Current balance</p></div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="surface-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-cba-line p-5">
            <h2 className="text-xl font-bold">Recent activity</h2>
            <Link className="text-sm font-semibold underline" to="/netbank/accounts/smart-access">Search transactions</Link>
          </div>
          <ul>
            {transactions.slice(0, 5).map((transaction) => (
              <li key={transaction.id} className="flex items-center justify-between gap-3 border-b border-cba-line px-5 py-4 last:border-0">
                <div><p className="text-sm font-semibold">{transaction.description}</p><p className="mt-1 text-xs text-cba-muted">{formatDate(transaction.date)} · {transaction.category}</p></div>
                <strong className={transaction.amount > 0 ? "text-cba-positive" : ""}>{formatAud(transaction.amount)}</strong>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold">Quick actions</h2>
          <div className="mt-3 grid gap-3">
            {quickActions.map(({ label, to, icon: Icon }) => (
              <Link key={to} to={to} className="surface-card flex items-center gap-3 p-4 text-sm font-semibold">
                <Icon aria-hidden="true" className="h-5 w-5 text-cba-positive" />{label}<ArrowRight aria-hidden="true" className="ml-auto h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
