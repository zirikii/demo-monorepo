import { useMemo, useState } from "react";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Field";
import { PORTFOLIOS } from "@/data/portfolios";
import { formatCompact, formatPercent } from "@/lib/format";

export default function ManagedPortfoliosPage() {
  const [menu, setMenu] = useState("all");
  const rows = useMemo(
    () => PORTFOLIOS.filter((row) => menu === "all" || row.menu === menu),
    [menu],
  );

  return (
    <PageLayout title="Managed portfolios">
      <PageHero
        eyebrow="Managed portfolios"
        title="Innovative managed portfolios empowering advisers"
        body="Ready-made and licensee models across Discover, Core and Choice — with rebalancing, tax optimisation and netting on Australia’s Best Platform."
      />
      <Section>
        <div className="mb-6 max-w-xs">
          <label htmlFor="menu-filter" className="mb-1.5 block text-sm font-semibold">
            Menu
          </label>
          <Select id="menu-filter" value={menu} onChange={(event) => setMenu(event.target.value)}>
            <option value="all">All menus</option>
            <option value="Discover">Discover</option>
            <option value="Core">Core</option>
            <option value="Choice">Choice</option>
          </Select>
        </div>
        <div className="overflow-x-auto rounded-hub-lg border border-line">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-surface-tint text-xs tracking-wide text-ink-faint uppercase">
              <tr>
                <th className="px-4 py-3">Portfolio</th>
                <th className="px-4 py-3">Manager</th>
                <th className="px-4 py-3">Menu</th>
                <th className="px-4 py-3">Risk</th>
                <th className="px-4 py-3">YTD</th>
                <th className="px-4 py-3">FUM</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-line">
                  <td className="px-4 py-3 font-semibold">{row.name}</td>
                  <td className="px-4 py-3 text-ink-soft">{row.manager}</td>
                  <td className="px-4 py-3">
                    <Badge>{row.menu}</Badge>
                  </td>
                  <td className="px-4 py-3">{row.risk}</td>
                  <td className="px-4 py-3">{formatPercent(row.ytd, 1)}</td>
                  <td className="px-4 py-3">{formatCompact(row.fum)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-ink-faint">Dummy performance. Not a recommendation.</p>
      </Section>
      <CtaBand />
    </PageLayout>
  );
}
