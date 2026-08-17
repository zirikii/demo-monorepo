import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Select, TextInput } from "@/components/ui/Field";
import { CLIENTS, filterClients } from "@/data/clients";
import { formatCurrency, formatPercent } from "@/lib/format";

export default function ClientsPage() {
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState("all");
  const rows = useMemo(() => filterClients(CLIENTS, query, product), [query, product]);

  return (
    <PortalLayout title="Clients" description="Search the Harbourline book" actions={<Badge>{rows.length} accounts</Badge>}>
      <div className="mb-5 grid gap-3 md:grid-cols-[1fr_220px]">
        <TextInput
          aria-label="Search clients"
          placeholder="Search name, account ID or adviser"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Select aria-label="Filter by product" value={product} onChange={(event) => setProduct(event.target.value)}>
          <option value="all">All products</option>
          <option value="Super">Super</option>
          <option value="Pension">Pension</option>
          <option value="Invest">Invest</option>
          <option value="Private Invest">Private Invest</option>
        </Select>
      </div>
      {rows.length === 0 ? (
        <EmptyState title="No accounts match" body="Try another name, HUB account ID, or clear the product filter." />
      ) : (
        <div className="overflow-x-auto rounded-hub-lg border border-line bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-surface-tint text-xs tracking-wide text-ink-faint uppercase">
              <tr>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Menu</th>
                <th className="px-4 py-3">Balance</th>
                <th className="px-4 py-3">YTD</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((client) => (
                <tr key={client.id} className="border-t border-line">
                  <td className="px-4 py-3">
                    <Link to={`/adviserhub/clients/${client.id}`} className="font-semibold text-hub-teal hover:underline">
                      {client.name}
                    </Link>
                    <p className="text-xs text-ink-faint">{client.id}</p>
                  </td>
                  <td className="px-4 py-3">{client.product}</td>
                  <td className="px-4 py-3">{client.menu}</td>
                  <td className="px-4 py-3">{formatCurrency(client.balance)}</td>
                  <td className="px-4 py-3">{formatPercent(client.ytd, 1)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={client.status === "Open" ? "positive" : "caution"}>{client.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PortalLayout>
  );
}
