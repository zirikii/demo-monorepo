import { Link } from "react-router-dom";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CLIENTS } from "@/data/clients";
import { ORDERS } from "@/data/orders";
import { formatCompact, formatCurrency, formatPercent } from "@/lib/format";

export default function AdviserDashboardPage() {
  const fum = CLIENTS.reduce((sum, client) => sum + client.balance, 0);
  const pending = CLIENTS.filter((client) => client.status === "Pending").length;

  return (
    <PortalLayout title="Practice overview" description="Harbourline Wealth · AdviserHUB">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <p className="text-xs font-bold tracking-[0.12em] text-ink-faint uppercase">Book FUM</p>
          <p className="mt-2 font-serif text-3xl font-bold">{formatCompact(fum)}</p>
        </Card>
        <Card>
          <p className="text-xs font-bold tracking-[0.12em] text-ink-faint uppercase">Accounts</p>
          <p className="mt-2 font-serif text-3xl font-bold">{CLIENTS.length}</p>
        </Card>
        <Card>
          <p className="text-xs font-bold tracking-[0.12em] text-ink-faint uppercase">Pending</p>
          <p className="mt-2 font-serif text-3xl font-bold">{pending}</p>
        </Card>
        <Card>
          <p className="text-xs font-bold tracking-[0.12em] text-ink-faint uppercase">Open orders</p>
          <p className="mt-2 font-serif text-3xl font-bold">
            {ORDERS.filter((order) => order.status === "Open").length}
          </p>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card padded={false}>
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="font-bold">Recent accounts</h2>
            <Link to="/adviserhub/clients" className="text-sm font-semibold text-hub-teal hover:underline">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-line">
            {CLIENTS.slice(0, 6).map((client) => (
              <li key={client.id}>
                <Link
                  to={`/adviserhub/clients/${client.id}`}
                  className="flex items-center justify-between gap-3 px-6 py-3 hover:bg-surface-tint"
                >
                  <div>
                    <p className="font-semibold">{client.name}</p>
                    <p className="text-xs text-ink-faint">
                      {client.id} · {client.product}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatCurrency(client.balance)}</p>
                    <p className="text-xs text-ink-faint">{formatPercent(client.ytd, 1)} YTD</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
        <Card padded={false}>
          <div className="px-6 py-4">
            <h2 className="font-bold">Orders</h2>
          </div>
          <ul className="divide-y divide-line">
            {ORDERS.slice(0, 6).map((order) => (
              <li key={order.id} className="flex items-center justify-between gap-3 px-6 py-3">
                <div>
                  <p className="font-semibold">{order.security}</p>
                  <p className="text-xs text-ink-faint">
                    {order.client} · {order.side}
                  </p>
                </div>
                <Badge tone={order.status === "Filled" ? "positive" : order.status === "Open" ? "info" : "neutral"}>
                  {order.status}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </PortalLayout>
  );
}
