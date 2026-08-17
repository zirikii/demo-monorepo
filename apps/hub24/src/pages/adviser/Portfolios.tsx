import { useState } from "react";
import { Link } from "react-router-dom";
import { AdviserLayout } from "@/components/adviser/AdviserLayout";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Tabs } from "@/components/ui/Tabs";
import { MANAGED_PORTFOLIOS, type ManagedPortfolio } from "@/data/adviser";
import { compactCurrency, currency, number, percent, signedPercent } from "@/lib/format";

const MENUS = ["All", "Discover", "Core", "Choice"];

export default function AdviserPortfoliosPage() {
  const [menu, setMenu] = useState("All");
  const portfolios =
    menu === "All" ? MANAGED_PORTFOLIOS : MANAGED_PORTFOLIOS.filter((item) => item.menu === menu);

  const columns: Column<ManagedPortfolio>[] = [
    {
      key: "name",
      header: "Portfolio",
      render: (row) => (
        <span className="flex flex-col">
          <Link
            to={`/adviserhub/portfolios/${row.slug}`}
            className="focus-hub font-bold text-ink-strong hover:text-hub-blue"
          >
            {row.name}
          </Link>
          <span className="text-xs text-ink-faint">{row.manager}</span>
        </span>
      ),
    },
    { key: "menu", header: "Menu", render: (row) => <Badge tone="blue">{row.menu}</Badge> },
    { key: "risk", header: "Risk profile", render: (row) => row.riskProfile },
    {
      key: "fee",
      header: "Management fee",
      align: "right",
      render: (row) => percent(row.managementFee, 2),
    },
    {
      key: "minimum",
      header: "Minimum",
      align: "right",
      render: (row) => currency(row.minimumInvestment),
    },
    {
      key: "one",
      header: "1 yr",
      align: "right",
      render: (row) => (
        <span className="font-semibold text-positive">{signedPercent(row.oneYearReturn)}</span>
      ),
    },
    {
      key: "five",
      header: "5 yr p.a.",
      align: "right",
      render: (row) => signedPercent(row.fiveYearReturn),
    },
    {
      key: "fua",
      header: "FUA",
      align: "right",
      render: (row) => (
        <span className="flex flex-col">
          <span className="font-bold text-ink-strong">{compactCurrency(row.fua)}</span>
          <span className="text-xs text-ink-faint">{number(row.accounts)} accounts</span>
        </span>
      ),
    },
  ];

  return (
    <AdviserLayout
      title="Managed portfolios"
      subtitle="Models available across the Discover, Core and Choice investment menus"
    >
      <Tabs
        label="Filter portfolios by investment menu"
        tabs={MENUS}
        active={menu}
        onChange={setMenu}
      />

      <DataTable
        className="mt-6"
        caption="Managed portfolio models"
        columns={columns}
        rows={portfolios}
        rowKey={(row) => row.slug}
        emptyMessage="No portfolios on this menu."
      />

      <p className="mt-4 text-sm text-ink-faint">
        Demo performance figures. Past performance is not an indicator of future performance — and
        none of these portfolios exist.
      </p>
    </AdviserLayout>
  );
}
