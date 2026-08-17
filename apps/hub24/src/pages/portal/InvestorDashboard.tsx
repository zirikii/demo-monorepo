import { Link } from "react-router-dom";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card } from "@/components/ui/Card";
import { CLIENTS } from "@/data/clients";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency, formatPercent } from "@/lib/format";

export default function InvestorDashboardPage() {
  const { user } = useAuth();
  const household = CLIENTS.filter((client) => client.name.includes("Nair") || client.adviser === "Alex Chen").slice(0, 3);
  const accounts = household.length ? household : CLIENTS.slice(0, 3);
  const total = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <PortalLayout title="Your investments" description={`${user?.name} · InvestorHUB`}>
      <Card className="bg-hub-navy-deep text-white">
        <p className="text-xs font-bold tracking-[0.12em] text-hub-teal-soft uppercase">Total account balance</p>
        <p className="mt-2 font-serif text-4xl font-bold">{formatCurrency(total)}</p>
        <p className="mt-2 text-sm text-white/70">Dummy household view for the demo.</p>
      </Card>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {accounts.map((account) => (
          <Link key={account.id} to={`/investorhub/accounts/${account.id}`} className="focus-hub">
            <Card className="h-full transition hover:border-hub-teal">
              <p className="text-xs text-ink-faint uppercase">{account.product}</p>
              <p className="mt-2 font-bold">{account.name}</p>
              <p className="mt-3 font-serif text-2xl">{formatCurrency(account.balance)}</p>
              <p className="text-sm text-ink-soft">{formatPercent(account.ytd, 1)} YTD</p>
            </Card>
          </Link>
        ))}
      </div>
    </PortalLayout>
  );
}
