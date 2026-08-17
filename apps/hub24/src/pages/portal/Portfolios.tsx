import { PortalLayout } from "@/components/portal/PortalLayout";
import { Badge } from "@/components/ui/Badge";
import { PORTFOLIOS } from "@/data/portfolios";
import { formatCompact, formatPercent } from "@/lib/format";

export default function PortfoliosPage() {
  return (
    <PortalLayout title="Managed portfolios" description="Models available to Harbourline">
      <div className="overflow-x-auto rounded-hub-lg border border-line bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-surface-tint text-xs tracking-wide text-ink-faint uppercase">
            <tr>
              <th className="px-4 py-3">Portfolio</th>
              <th className="px-4 py-3">Manager</th>
              <th className="px-4 py-3">Menu</th>
              <th className="px-4 py-3">YTD</th>
              <th className="px-4 py-3">Fee</th>
              <th className="px-4 py-3">FUM</th>
            </tr>
          </thead>
          <tbody>
            {PORTFOLIOS.map((row) => (
              <tr key={row.id} className="border-t border-line">
                <td className="px-4 py-3 font-semibold">{row.name}</td>
                <td className="px-4 py-3">{row.manager}</td>
                <td className="px-4 py-3">
                  <Badge>{row.menu}</Badge>
                </td>
                <td className="px-4 py-3">{formatPercent(row.ytd, 1)}</td>
                <td className="px-4 py-3">{row.feeBps} bps</td>
                <td className="px-4 py-3">{formatCompact(row.fum)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalLayout>
  );
}
