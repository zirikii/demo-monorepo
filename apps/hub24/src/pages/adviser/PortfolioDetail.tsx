import { Navigate, useParams } from "react-router-dom";
import { AdviserLayout } from "@/components/adviser/AdviserLayout";
import { PanelCard } from "@/components/adviser/PanelCard";
import { StatTile } from "@/components/adviser/StatTile";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { DonutChart } from "@/components/ui/DonutChart";
import { portfolioBySlug } from "@/data/adviser";
import { compactCurrency, currency, number, percent, signedPercent } from "@/lib/format";

interface TopHolding {
  code: string;
  name: string;
  weight: number;
}

export default function AdviserPortfolioDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const portfolio = slug ? portfolioBySlug(slug) : undefined;

  if (!portfolio) {
    return <Navigate to="/adviserhub/portfolios" replace />;
  }

  const columns: Column<TopHolding>[] = [
    {
      key: "name",
      header: "Holding",
      render: (row) => (
        <span className="flex flex-col">
          <span className="font-bold text-ink-strong">{row.name}</span>
          <span className="text-xs text-ink-faint">{row.code}</span>
        </span>
      ),
    },
    { key: "weight", header: "Weight", align: "right", render: (row) => percent(row.weight) },
  ];

  return (
    <AdviserLayout
      title={portfolio.name}
      subtitle={`${portfolio.manager} · ${portfolio.menu} menu`}
      actions={
        <ButtonLink to="/adviserhub/trading" size="sm" className="hidden sm:inline-flex">
          Trade this model
        </ButtonLink>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="1 year return"
          value={signedPercent(portfolio.oneYearReturn)}
          trend="up"
          delta="Demo data"
        />
        <StatTile label="3 year p.a." value={signedPercent(portfolio.threeYearReturn)} />
        <StatTile label="5 year p.a." value={signedPercent(portfolio.fiveYearReturn)} />
        <StatTile
          label="Funds under management"
          value={compactCurrency(portfolio.fua)}
          note={`${number(portfolio.accounts)} accounts`}
        />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_1fr]">
        <PanelCard title="Strategic asset allocation">
          <DonutChart
            title={`Asset allocation for ${portfolio.name}`}
            slices={portfolio.allocation.map((entry) => ({
              label: entry.assetClass,
              value: entry.weight,
            }))}
          />
        </PanelCard>

        <PanelCard title="Model details">
          <dl className="flex flex-col gap-4">
            <div>
              <dt className="text-xs font-extrabold tracking-[0.12em] text-ink-ghost uppercase">
                Objective
              </dt>
              <dd className="mt-1 text-ink-soft">{portfolio.objective}</dd>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-extrabold tracking-[0.12em] text-ink-ghost uppercase">
                  Risk profile
                </dt>
                <dd className="mt-1 font-bold text-ink-strong">{portfolio.riskProfile}</dd>
              </div>
              <div>
                <dt className="text-xs font-extrabold tracking-[0.12em] text-ink-ghost uppercase">
                  Investment menu
                </dt>
                <dd className="mt-1">
                  <Badge tone="blue">{portfolio.menu}</Badge>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-extrabold tracking-[0.12em] text-ink-ghost uppercase">
                  Management fee
                </dt>
                <dd className="mt-1 font-bold text-ink-strong">
                  {percent(portfolio.managementFee, 2)} p.a.
                </dd>
              </div>
              <div>
                <dt className="text-xs font-extrabold tracking-[0.12em] text-ink-ghost uppercase">
                  Minimum investment
                </dt>
                <dd className="mt-1 font-bold text-ink-strong">
                  {currency(portfolio.minimumInvestment)}
                </dd>
              </div>
            </div>
          </dl>
        </PanelCard>
      </div>

      <div className="mt-6">
        <PanelCard title="Top holdings">
          <DataTable
            caption={`Top holdings in ${portfolio.name}`}
            columns={columns}
            rows={portfolio.topHoldings}
            rowKey={(row) => row.code}
          />
        </PanelCard>
      </div>
    </AdviserLayout>
  );
}
