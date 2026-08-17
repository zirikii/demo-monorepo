import { Navigate, useParams } from "react-router-dom";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card } from "@/components/ui/Card";
import { clientById } from "@/data/clients";
import { formatCurrency, formatPercent } from "@/lib/format";

export default function InvestorAccountDetailPage() {
  const { id = "" } = useParams();
  const account = clientById(id);
  if (!account) return <Navigate to="/investorhub/accounts" replace />;

  return (
    <PortalLayout title={account.product} description={account.id}>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs text-ink-faint uppercase">Balance</p>
          <p className="mt-2 font-serif text-3xl font-bold">{formatCurrency(account.balance)}</p>
        </Card>
        <Card>
          <p className="text-xs text-ink-faint uppercase">Cash</p>
          <p className="mt-2 font-serif text-3xl font-bold">{formatCurrency(account.cash)}</p>
        </Card>
        <Card>
          <p className="text-xs text-ink-faint uppercase">Performance</p>
          <p className="mt-2 font-serif text-3xl font-bold">{formatPercent(account.ytd, 1)}</p>
        </Card>
      </div>
    </PortalLayout>
  );
}
