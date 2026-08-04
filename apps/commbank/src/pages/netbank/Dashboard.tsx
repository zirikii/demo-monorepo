import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { NetBankLayout } from "@/components/netbank/NetBankLayout";
import { AccountTile } from "@/components/netbank/AccountTile";
import { TransactionList } from "@/components/netbank/TransactionList";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/hooks/useAuth";
import { useBanking } from "@/hooks/useBanking";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { quickLinks } from "@/data/netbank";
import { readSettings } from "@/lib/storage";
import { formatBalance } from "@/lib/format";

const groups = [
  { kind: "transaction", heading: "Everyday accounts" },
  { kind: "savings", heading: "Savings" },
  { kind: "credit", heading: "Credit cards" },
  { kind: "loan", heading: "Home loans" },
  { kind: "super", heading: "Superannuation" },
] as const;

export function NetBankDashboardPage() {
  useDocumentTitle("NetBank home");
  const { user } = useAuth();
  const { accounts, transactions } = useBanking();
  const hidden = readSettings().hideBalances;

  const netPosition = accounts
    .filter((account) => account.kind !== "super")
    .reduce((total, account) => total + account.balance, 0);

  return (
    <NetBankLayout title={`Good day, ${user?.name.split(" ")[0] ?? "there"}`}>
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border-2 border-black bg-surface p-6">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
            Net position
          </p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-black">
            {hidden ? "••••••" : formatBalance(netPosition)}
          </p>
          <p className="mt-1 text-xs text-ink-muted">Excludes superannuation</p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
            CommBank Yello
          </p>
          <Badge tone="yellow" className="mt-2">
            {user?.yelloTier}
          </Badge>
          <Link
            to="/netbank/yello"
            className="focus-ring mt-3 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-black hover:underline"
          >
            See your offers
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
            Quick links
          </p>
          <ul className="mt-3 space-y-1.5">
            {quickLinks.slice(0, 3).map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="focus-ring rounded text-sm text-ink-soft hover:text-black hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="space-y-8">
        {groups.map((group) => {
          const items = accounts.filter((account) => account.kind === group.kind);
          if (items.length === 0) return null;
          return (
            <div key={group.kind}>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">
                {group.heading}
              </h2>
              <ul className="grid gap-3">
                {items.map((account) => (
                  <li key={account.id}>
                    <AccountTile account={account} hidden={hidden} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <section className="mt-10">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">
            Recent transactions
          </h2>
          <Link
            to="/netbank/accounts/smart-access"
            className="focus-ring rounded text-sm font-semibold text-black underline underline-offset-4"
          >
            View all
          </Link>
        </div>
        <TransactionList transactions={transactions.slice(0, 8)} />
      </section>
    </NetBankLayout>
  );
}
