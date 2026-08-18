import { Download, TrendingUp } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrendChart } from "@/components/ui/TrendChart";
import { ANNOUNCEMENTS, KEY_DATES, SHARE_INFO } from "@/data/company";
import type { Announcement } from "@/data/types";
import { longDate, shortDate, signedPercent } from "@/lib/format";

const PRICE_HISTORY = [
  { label: "Sep", value: 74.2 },
  { label: "Oct", value: 76.8 },
  { label: "Nov", value: 79.4 },
  { label: "Dec", value: 78.1 },
  { label: "Jan", value: 82.6 },
  { label: "Feb", value: 85.2 },
  { label: "Mar", value: 84.1 },
  { label: "Apr", value: 87.9 },
  { label: "May", value: 89.4 },
  { label: "Jun", value: 88.2 },
  { label: "Jul", value: 90.8 },
  { label: "Aug", value: 92.14 },
];

export default function ShareholderCentrePage() {
  const columns: Column<Announcement>[] = [
    { key: "date", header: "Date", render: (row) => shortDate(row.date) },
    {
      key: "title",
      header: "Announcement",
      render: (row) => <span className="font-semibold text-ink-strong">{row.title}</span>,
    },
    {
      key: "kind",
      header: "Type",
      render: (row) => (
        <Badge tone={row.kind === "Market sensitive" ? "caution" : "neutral"}>{row.kind}</Badge>
      ),
    },
    { key: "pages", header: "Pages", align: "right", render: (row) => row.pages },
    {
      key: "action",
      header: "",
      align: "right",
      render: (row) => (
        <button
          type="button"
          onClick={() => window.alert(`Demo only — "${row.title}" is not a real announcement.`)}
          className="focus-hub inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-bold text-hub-blue transition hover:border-hub-blue"
        >
          <Download aria-hidden className="h-3.5 w-3.5" />
          PDF
        </button>
      ),
    },
  ];

  return (
    <PageLayout title="Shareholder centre">
      <PageHero
        eyebrow="Investors"
        title="HUB24 Limited shareholder centre"
        body="Company announcements, results, key dates and registry information for shareholders."
        crumbs={[{ label: "Home", to: "/" }, { label: "Shareholder centre" }]}
        aside={
          <Card tone="navy" className="border border-white/15">
            <span className="text-xs font-extrabold tracking-[0.16em] text-hub-teal-soft uppercase">
              {SHARE_INFO.ticker}
            </span>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-4xl font-extrabold tracking-tight">
                ${SHARE_INFO.price.toFixed(2)}
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-hub-teal-soft">
                <TrendingUp aria-hidden className="h-4 w-4" />
                {signedPercent(SHARE_INFO.changePercent, 1)}
              </span>
            </div>
            <dl className="mt-6 grid gap-3 border-t border-white/15 pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-white/70">Market capitalisation</dt>
                <dd className="font-bold">{SHARE_INFO.marketCap}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/70">Shares on issue</dt>
                <dd className="font-bold">{SHARE_INFO.sharesOnIssue}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/70">Financial year end</dt>
                <dd className="font-bold">{SHARE_INFO.financialYearEnd}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/70">Share registry</dt>
                <dd className="font-bold">{SHARE_INFO.registry}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-white/60">
              Illustrative demo price as at {longDate(SHARE_INFO.asAt)}. Not market data.
            </p>
          </Card>
        }
      />

      <Section>
        <SectionHeading eyebrow="Share price" title="Twelve month price history (demo)" />
        <Card className="mt-8">
          <TrendChart points={PRICE_HISTORY} title="HUB24 demo share price over twelve months" />
        </Card>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="ASX" title="Announcements" />
        <DataTable
          className="mt-8"
          caption="ASX announcements"
          columns={columns}
          rows={ANNOUNCEMENTS}
          rowKey={(row) => row.date + row.title}
        />
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Calendar" title="Key dates" />
            <ul className="mt-6 flex flex-col gap-3">
              {KEY_DATES.map((item) => (
                <li
                  key={item.date}
                  className="flex items-center justify-between gap-4 rounded-hub border border-line bg-white px-5 py-4"
                >
                  <span className="font-semibold text-ink-strong">{item.event}</span>
                  <span className="text-sm font-bold text-hub-blue">{shortDate(item.date)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Registry" title="Manage your shareholding" />
            <Card className="mt-6 flex flex-col gap-4">
              <p className="text-ink-soft">
                Shareholders update payment instructions, communication preferences and holding
                details directly with the share registry.
              </p>
              <dl className="grid gap-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-faint">Registry</dt>
                  <dd className="font-bold text-ink-strong">{SHARE_INFO.registry}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-faint">Investor enquiries</dt>
                  <dd className="font-bold text-ink-strong">1300 508 797</dd>
                </div>
              </dl>
              <p className="text-sm text-ink-faint">
                Demo content — no registry integration exists in this build.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Investor relations enquiries"
        body="Our investor relations team responds to shareholder and analyst questions."
        primary={{ label: "Contact investor relations", to: "/contact-us" }}
        secondary={{ label: "Read media releases", to: "/insights?category=Media+release" }}
      />
    </PageLayout>
  );
}
