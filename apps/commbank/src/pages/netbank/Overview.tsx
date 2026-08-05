import { Link } from "react-router-dom";
import { NetBankLayout } from "@/components/netbank/NetBankLayout";
import { AccountRow } from "@/components/netbank/AccountRow";
import { TransactionList } from "@/components/netbank/TransactionList";
import { spendCategoriesThisMonth } from "@/data/netbank";
import { useAuth } from "@/hooks/useAuth";
import { useBanking } from "@/hooks/useBanking";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatCurrency, formatCurrencyWhole } from "@/lib/format";

export function NetBankOverviewPage() {
  useDocumentTitle("My home — NetBank");
  const { user } = useAuth();
  const { accounts, transactions } = useBanking();

  const deposits = accounts.filter((account) =>
    ["transaction", "savings", "term-deposit"].includes(account.kind),
  );
  const lending = accounts.filter((account) => ["credit", "home-loan"].includes(account.kind));

  const totalDeposits = deposits.reduce((sum, account) => sum + account.balance, 0);
  const totalLending = lending.reduce((sum, account) => sum + account.balance, 0);
  const maxSpend = Math.max(...spendCategoriesThisMonth.map((entry) => entry.amount));

  const recent = transactions.slice(0, 8);

  return (
    <NetBankLayout
      title={`Good afternoon, ${user?.name.split(" ")[0] ?? "there"}`}
      intro="Here's a snapshot of your accounts. All balances are fictional demo data."
    >
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-extrabold text-ink">Deposit accounts</h2>
            <ul className="mt-3 space-y-3">
              {deposits.map((account) => (
                <AccountRow key={account.id} account={account} />
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-ink">Credit cards and loans</h2>
            <ul className="mt-3 space-y-3">
              {lending.map((account) => (
                <AccountRow key={account.id} account={account} />
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-lg font-extrabold text-ink">Recent transactions</h2>
              <Link
                to={`/netbank/accounts/${deposits[0]?.id ?? "smart-access"}`}
                className="focus-cba text-sm font-bold text-ink underline underline-offset-4"
              >
                View all
              </Link>
            </div>
            <div className="mt-3">
              <TransactionList transactions={recent} />
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-cba-lg bg-ink p-6 text-surface">
            <p className="text-[13px] uppercase tracking-wider text-surface/60">Total savings</p>
            <p className="mt-1 text-3xl font-extrabold text-cba-yellow">
              {formatCurrency(totalDeposits)}
            </p>
            <p className="mt-4 border-t border-surface/20 pt-4 text-[13px] uppercase tracking-wider text-surface/60">
              Total owing
            </p>
            <p className="mt-1 text-2xl font-extrabold">{formatCurrency(Math.abs(totalLending))}</p>
          </div>

          <div className="rounded-cba-lg bg-surface p-6 shadow-cba">
            <h2 className="text-base font-extrabold text-ink">Spend this month</h2>
            <ul className="mt-4 space-y-3">
              {spendCategoriesThisMonth.map((entry) => (
                <li key={entry.category}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-ink-soft">{entry.category}</span>
                    <span className="font-bold tabular-nums text-ink">
                      {formatCurrencyWhole(entry.amount)}
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-deep"
                  >
                    <div
                      className="h-full rounded-full bg-cba-yellow"
                      style={{ width: `${Math.round((entry.amount / maxSpend) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-cba-lg bg-cba-yellow p-6">
            <h2 className="text-base font-extrabold text-ink">CommBank Yello</h2>
            <p className="mt-1 text-2xl font-extrabold text-ink">{user?.yelloTier ?? "Gold"}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              You have offers waiting. See your tier benefits and activate cashback offers.
            </p>
            <Link
              to="/netbank/yello"
              className="focus-cba mt-4 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-surface"
            >
              View Yello
            </Link>
          </div>
        </aside>
      </div>
    </NetBankLayout>
  );
}
