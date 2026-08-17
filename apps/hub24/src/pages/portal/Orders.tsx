import { PortalLayout } from "@/components/portal/PortalLayout";
import { Badge } from "@/components/ui/Badge";
import { ORDERS } from "@/data/orders";
import { formatCurrency, formatDate } from "@/lib/format";

export default function OrdersPage() {
  return (
    <PortalLayout title="Orders" description="Open, filled and cancelled">
      <div className="overflow-x-auto rounded-hub-lg border border-line bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-surface-tint text-xs tracking-wide text-ink-faint uppercase">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Security</th>
              <th className="px-4 py-3">Side</th>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((order) => (
              <tr key={order.id} className="border-t border-line">
                <td className="px-4 py-3 font-semibold">
                  {order.id}
                  <p className="text-xs font-normal text-ink-faint">{formatDate(order.placed)}</p>
                </td>
                <td className="px-4 py-3">{order.client}</td>
                <td className="px-4 py-3">{order.security}</td>
                <td className="px-4 py-3">{order.side}</td>
                <td className="px-4 py-3">{formatCurrency(order.value)}</td>
                <td className="px-4 py-3">
                  <Badge tone={order.status === "Filled" ? "positive" : order.status === "Open" ? "info" : "neutral"}>
                    {order.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalLayout>
  );
}
