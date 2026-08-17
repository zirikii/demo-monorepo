import { Link, Navigate, useParams } from "react-router-dom";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { clientById } from "@/data/clients";
import { formatCurrency, formatPercent } from "@/lib/format";

export default function ClientDetailPage() {
  const { id = "" } = useParams();
  const client = clientById(id);
  if (!client) return <Navigate to="/adviserhub/clients" replace />;

  return (
    <PortalLayout title={client.name} description={`${client.id} · ${client.product}`}>
      <Link to="/adviserhub/clients" className="mb-4 inline-block text-sm font-semibold text-hub-teal hover:underline">
        ← All clients
      </Link>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs text-ink-faint uppercase">Balance</p>
          <p className="mt-2 font-serif text-3xl font-bold">{formatCurrency(client.balance)}</p>
        </Card>
        <Card>
          <p className="text-xs text-ink-faint uppercase">Cash</p>
          <p className="mt-2 font-serif text-3xl font-bold">{formatCurrency(client.cash)}</p>
        </Card>
        <Card>
          <p className="text-xs text-ink-faint uppercase">YTD</p>
          <p className="mt-2 font-serif text-3xl font-bold">{formatPercent(client.ytd, 1)}</p>
        </Card>
      </div>
      <Card className="mt-6">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-ink-faint uppercase">Adviser</dt>
            <dd className="font-semibold">{client.adviser}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-faint uppercase">Practice</dt>
            <dd className="font-semibold">{client.practice}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-faint uppercase">Menu</dt>
            <dd>
              <Badge>{client.menu}</Badge>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-ink-faint uppercase">State</dt>
            <dd className="font-semibold">{client.state}</dd>
          </div>
        </dl>
      </Card>
    </PortalLayout>
  );
}
