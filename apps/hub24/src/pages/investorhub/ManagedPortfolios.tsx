import { PanelCard } from "@/components/portal/PanelCard";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { INVESTOR_NAV } from "@/components/portal/nav";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeading } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { MODELS, PRACTICE } from "@/data/platform";
import { usePortfolio } from "@/hooks/usePortfolio";
import { formatCurrencyWhole, formatPercent } from "@/lib/format";
import { valueHolding } from "@/lib/portfolio";

export default function InvestorManagedPortfoliosPage() {
  const { holdings } = usePortfolio();
  const modelHoldings = holdings.filter((holding) => holding.kind === "Managed portfolio");

  const held = MODELS.map((model) => {
    const matching = modelHoldings.filter((holding) => holding.code === model.code);
    const value = matching.reduce((total, holding) => total + valueHolding(holding).value, 0);
    return { model, value, count: matching.length };
  }).filter((entry) => entry.count > 0);

  const totalModelValue = held.reduce((total, entry) => total + entry.value, 0);

  return (
    <PortalLayout
      portal="InvestorHUB"
      nav={INVESTOR_NAV}
      contextLabel="Adviser"
      contextValue={PRACTICE.name}
      contextNote={PRACTICE.afsl}
      title="Managed portfolios"
      description="The models your adviser has implemented for you"
    >
      {held.length === 0 ? (
        <EmptyState
          title="No managed portfolios held"
          body="Your adviser can implement a managed portfolio against any of your accounts."
        />
      ) : (
        <div className="grid gap-6">
          <PanelCard title="Your models" description={`${formatCurrencyWhole(totalModelValue)} invested across ${held.length} models`}>
            <ul className="flex flex-col divide-y divide-line-soft">
              {held.map((entry) => (
                <li key={entry.model.code} className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex-1 font-semibold text-ink-strong">{entry.model.name}</span>
                    <Badge tone="neutral">{entry.model.riskProfile}</Badge>
                    <span className="font-semibold tabular-nums text-ink-strong">
                      {formatCurrencyWhole(entry.value)}
                    </span>
                  </div>
                  <ProgressBar
                    value={(entry.value / totalModelValue) * 100}
                    label={`${entry.model.name} share of managed portfolio holdings`}
                  />
                  <p className="text-xs text-ink-faint">
                    {entry.model.manager} · {formatPercent(entry.value ? (entry.value / totalModelValue) * 100 : 0, 1)} of
                    your models
                  </p>
                </li>
              ))}
            </ul>
          </PanelCard>

          <div className="grid gap-6 lg:grid-cols-2">
            {held.map((entry) => (
              <Card key={entry.model.code} className="flex flex-col gap-4">
                <div>
                  <span className="text-xs font-bold tracking-[0.12em] text-ink-ghost uppercase">
                    {entry.model.code}
                  </span>
                  <CardHeading className="mt-1">{entry.model.name}</CardHeading>
                  <CardBody className="mt-2 text-sm">{entry.model.objective}</CardBody>
                </div>

                <dl className="grid grid-cols-3 gap-3 rounded-h24 bg-surface-tint p-4 text-center text-sm">
                  <div>
                    <dt className="text-xs text-ink-faint">1 year</dt>
                    <dd className="font-semibold text-positive">
                      {formatPercent(entry.model.oneYearReturn)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-faint">3 year p.a.</dt>
                    <dd className="font-semibold text-ink-strong">
                      {formatPercent(entry.model.threeYearReturn)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-faint">5 year p.a.</dt>
                    <dd className="font-semibold text-ink-strong">
                      {formatPercent(entry.model.fiveYearReturn)}
                    </dd>
                  </div>
                </dl>

                <div>
                  <p className="text-xs font-bold tracking-[0.12em] text-ink-ghost uppercase">
                    Target allocation
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {entry.model.allocation.map((slice) => (
                      <li key={slice.assetClass} className="flex items-center gap-3 text-sm">
                        <span className="flex-1 truncate text-ink-soft">{slice.assetClass}</span>
                        <span className="w-12 text-right font-semibold tabular-nums text-ink-strong">
                          {slice.weight}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <p className="mt-8 text-xs text-ink-faint">
        Performance figures are invented for a demonstration build and are not indicative of any real
        product.
      </p>
    </PortalLayout>
  );
}
