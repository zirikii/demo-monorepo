import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ShareholderNav } from "@/components/marketing/ShareholderNav";
import { StatBand } from "@/components/marketing/StatBand";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ANNOUNCEMENTS, FINANCIAL_HISTORY } from "@/data/shareholder";
import { formatBillions, formatCurrencyWhole, formatDate, formatNumber } from "@/lib/format";

const MAX_FUA = Math.max(...FINANCIAL_HISTORY.map((year) => year.totalFua));

export default function FinancialResultsPage() {
  const latest = FINANCIAL_HISTORY[FINANCIAL_HISTORY.length - 1]!;
  const resultsAnnouncements = ANNOUNCEMENTS.filter(
    (announcement) => announcement.category === "Results" || announcement.category === "Presentation",
  );

  return (
    <PageLayout title="Financial results">
      <PageHero
        eyebrow="Shareholder Centre"
        title="Financial results"
        body="Five years of funds under administration, net inflows, adviser growth and underlying earnings."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Shareholder Centre", to: "/shareholder-centre/overview/" },
          { label: "Financial results" },
        ]}
      />

      <ShareholderNav />

      <Section tone="tint">
        <StatBand
          items={[
            { value: formatBillions(latest.totalFua), label: `${latest.year} total FUA` },
            { value: formatBillions(latest.platformFua), label: "Platform FUA" },
            { value: formatBillions(latest.netInflows), label: "Platform net inflows" },
            {
              value: formatCurrencyWhole(latest.underlyingEbitda),
              label: "Underlying EBITDA",
            },
          ]}
        />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Trend"
          title="Funds under administration by year"
          body="Platform FUA is custodial administration; PARS is non-custodial administration and reporting."
        />

        <Card className="mt-10">
          <div className="flex items-end justify-between gap-4 md:gap-8">
            {FINANCIAL_HISTORY.map((year) => {
              const platformHeight = (year.platformFua / MAX_FUA) * 100;
              const parsHeight = (year.parsFua / MAX_FUA) * 100;
              return (
                <div key={year.year} className="flex flex-1 flex-col items-center gap-3">
                  <span className="text-xs font-semibold text-ink-faint">
                    {formatBillions(year.totalFua)}
                  </span>
                  <div className="flex h-56 w-full max-w-16 flex-col justify-end gap-0.5">
                    <div
                      className="w-full rounded-t-sm bg-h24-aqua"
                      style={{ height: `${parsHeight}%` }}
                      title={`PARS ${formatBillions(year.parsFua)}`}
                    />
                    <div
                      className="w-full bg-h24-teal"
                      style={{ height: `${platformHeight}%` }}
                      title={`Platform ${formatBillions(year.platformFua)}`}
                    />
                  </div>
                  <span className="text-sm font-semibold text-ink-strong">{year.year}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap gap-5 border-t border-line pt-4 text-xs">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-h24-teal" />
              Platform FUA
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-h24-aqua" />
              PARS FUA
            </span>
          </div>
        </Card>

        <DataTable
          className="mt-10"
          caption="HUB24 Group financial history"
          rowKey={(year) => year.year}
          rows={FINANCIAL_HISTORY.slice().reverse()}
          columns={[
            {
              key: "year",
              header: "Year",
              render: (year) => <span className="font-semibold text-ink-strong">{year.year}</span>,
            },
            { key: "total", header: "Total FUA", align: "right", render: (year) => formatBillions(year.totalFua) },
            {
              key: "platform",
              header: "Platform FUA",
              align: "right",
              render: (year) => formatBillions(year.platformFua),
            },
            { key: "pars", header: "PARS FUA", align: "right", render: (year) => formatBillions(year.parsFua) },
            {
              key: "flows",
              header: "Net inflows",
              align: "right",
              render: (year) => formatBillions(year.netInflows),
            },
            {
              key: "advisers",
              header: "Advisers",
              align: "right",
              render: (year) => formatNumber(year.advisers),
            },
            {
              key: "ebitda",
              header: "Underlying EBITDA",
              align: "right",
              render: (year) => formatCurrencyWhole(year.underlyingEbitda),
            },
          ]}
        />
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Documents" title="Results announcements and presentations" />
        <ul className="mt-8 divide-y divide-line rounded-h24-lg border border-line bg-white">
          {resultsAnnouncements.map((announcement) => (
            <li key={announcement.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
              <span className="w-24 shrink-0 text-sm text-ink-faint">
                {formatDate(announcement.date)}
              </span>
              <span className="flex-1 text-[0.95rem] font-medium text-ink-strong">
                {announcement.title}
              </span>
              <span className="text-xs text-ink-ghost">Demo only</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-ink-faint">
          FY26 figures reflect the Q4 FY26 market update. Every number on this page is reproduced for
          a demonstration build and should not be relied on.
        </p>
      </Section>
    </PageLayout>
  );
}
