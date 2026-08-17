import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card } from "@/components/ui/Card";
import { PORTFOLIOS } from "@/data/portfolios";
import { formatCompact, formatPercent } from "@/lib/format";

export default function ManagerDashboardPage() {
  const mine = PORTFOLIOS.filter((row) => row.manager.includes("Southridge"));

  return (
    <PortalLayout title="ManagerHUB" description="Southridge Asset Management">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs text-ink-faint uppercase">Models</p>
          <p className="mt-2 font-serif text-3xl font-bold">{mine.length}</p>
        </Card>
        <Card>
          <p className="text-xs text-ink-faint uppercase">FUM</p>
          <p className="mt-2 font-serif text-3xl font-bold">
            {formatCompact(mine.reduce((sum, row) => sum + row.fum, 0))}
          </p>
        </Card>
        <Card>
          <p className="text-xs text-ink-faint uppercase">Avg YTD</p>
          <p className="mt-2 font-serif text-3xl font-bold">
            {formatPercent(mine.reduce((sum, row) => sum + row.ytd, 0) / mine.length, 1)}
          </p>
        </Card>
      </div>
      <ul className="mt-6 divide-y divide-line rounded-hub-lg border border-line bg-white">
        {mine.map((row) => (
          <li key={row.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="font-semibold">{row.name}</p>
              <p className="text-xs text-ink-faint">{row.menu}</p>
            </div>
            <p className="text-sm">{formatPercent(row.ytd, 1)}</p>
          </li>
        ))}
      </ul>
    </PortalLayout>
  );
}
