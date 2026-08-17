import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ShareholderNav } from "@/components/marketing/ShareholderNav";
import { StatBand } from "@/components/marketing/StatBand";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DIVIDENDS, SHARE_PRICE_HISTORY, SHARE_SNAPSHOT } from "@/data/shareholder";
import { SITE } from "@/data/site";
import {
  formatBillions,
  formatCurrency,
  formatDate,
  formatMonthYear,
  formatNumber,
  formatSignedPercent,
} from "@/lib/format";

const CLOSES = SHARE_PRICE_HISTORY.map((point) => point.close);
const MIN = Math.min(...CLOSES);
const MAX = Math.max(...CLOSES);

export default function SharePricePage() {
  return (
    <PageLayout title="Share price">
      <PageHero
        eyebrow="Shareholder Centre"
        title="Share price and dividends"
        body={`${SHARE_SNAPSHOT.exchange}:${SHARE_SNAPSHOT.code} — twelve months of month-end closes and the dividend history.`}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Shareholder Centre", to: "/shareholder-centre/overview/" },
          { label: "Share price" },
        ]}
      />

      <ShareholderNav />

      <Section tone="tint">
        <StatBand
          items={[
            { value: formatCurrency(SHARE_SNAPSHOT.price), label: "Last price" },
            {
              value: formatSignedPercent(SHARE_SNAPSHOT.changePercent),
              label: "Day change",
              note: `${formatCurrency(SHARE_SNAPSHOT.change)} per share`,
            },
            { value: formatBillions(SHARE_SNAPSHOT.marketCap), label: "Market capitalisation" },
            { value: formatNumber(SHARE_SNAPSHOT.volume), label: "Volume traded" },
          ]}
        />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Twelve months"
          title="Month-end closing price"
          body="Illustrative demo data. Nothing on this page is a real or delayed market quote."
        />

        <Card className="mt-10">
          <div className="flex h-64 items-end gap-2">
            {SHARE_PRICE_HISTORY.map((point, index) => {
              const height = ((point.close - MIN) / (MAX - MIN)) * 82 + 18;
              const last = index === SHARE_PRICE_HISTORY.length - 1;
              return (
                <div key={point.month} className="flex flex-1 flex-col items-center justify-end gap-2">
                  <span className="text-[0.7rem] font-semibold text-ink-faint">
                    {point.close.toFixed(2)}
                  </span>
                  <div
                    className={last ? "w-full rounded-t-sm bg-h24-teal" : "w-full rounded-t-sm bg-h24-tint-strong"}
                    style={{ height: `${height}%` }}
                    title={`${formatMonthYear(`${point.month}-01`)} · ${formatCurrency(point.close)}`}
                  />
                  <span className="text-[0.7rem] text-ink-ghost">
                    {formatMonthYear(`${point.month}-01`)}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Dividends" title="Dividend history" />
        <DataTable
          className="mt-8"
          caption="HUB24 Limited dividend history"
          rowKey={(dividend) => dividend.period}
          rows={[...DIVIDENDS]}
          columns={[
            {
              key: "period",
              header: "Period",
              render: (dividend) => <span className="font-semibold text-ink-strong">{dividend.period}</span>,
            },
            {
              key: "amount",
              header: "Amount per share",
              align: "right",
              render: (dividend) => formatCurrency(dividend.amount),
            },
            { key: "franking", header: "Franking", align: "right", render: (dividend) => dividend.franking },
            {
              key: "paid",
              header: "Payment date",
              align: "right",
              render: (dividend) => formatDate(dividend.paid),
            },
          ]}
        />

        <Card className="mt-8">
          <p className="text-[0.95rem] leading-relaxed text-ink-soft">
            Shareholder enquiries relating to an existing holding in HUB24 — including payment
            instructions, tax file numbers and address changes — are handled by {SITE.registryName}.
            Call <strong className="font-semibold text-ink-strong">{SITE.registryPhone}</strong>.
          </p>
        </Card>
      </Section>
    </PageLayout>
  );
}
