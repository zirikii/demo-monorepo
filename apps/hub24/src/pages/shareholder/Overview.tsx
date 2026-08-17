import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ShareholderNav } from "@/components/marketing/ShareholderNav";
import { StatBand } from "@/components/marketing/StatBand";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeading } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ANNOUNCEMENTS, SHARE_SNAPSHOT } from "@/data/shareholder";
import { GROUP_METRICS, SITE } from "@/data/site";
import { formatBillions, formatCurrency, formatDate, formatNumber, formatSignedPercent } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function ShareholderOverviewPage() {
  const latest = ANNOUNCEMENTS.slice(0, 6);
  const up = SHARE_SNAPSHOT.change >= 0;

  return (
    <PageLayout title="Shareholder Centre">
      <PageHero
        eyebrow="Shareholder Centre"
        title="Welcome to the HUB24 Limited Shareholder Centre"
        body="Are you a HUB24 shareholder or thinking about investing in HUB24? You can find everything you need to know about our company here."
        crumbs={[{ label: "Home", to: "/" }, { label: "Shareholder Centre" }]}
        aside={
          <Card className="bg-white/95">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-ink-ghost uppercase">
                  {SHARE_SNAPSHOT.exchange}:{SHARE_SNAPSHOT.code}
                </p>
                <p className="font-display text-3xl font-semibold text-h24-navy">
                  {formatCurrency(SHARE_SNAPSHOT.price)}
                </p>
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                  up ? "bg-positive-tint text-positive" : "bg-critical-tint text-critical",
                )}
              >
                {up ? (
                  <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight aria-hidden className="h-3.5 w-3.5" />
                )}
                {formatSignedPercent(SHARE_SNAPSHOT.changePercent)}
              </span>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
              <div>
                <dt className="text-ink-faint">Day range</dt>
                <dd className="font-semibold text-ink-strong">
                  {formatCurrency(SHARE_SNAPSHOT.dayLow)} – {formatCurrency(SHARE_SNAPSHOT.dayHigh)}
                </dd>
              </div>
              <div>
                <dt className="text-ink-faint">Volume</dt>
                <dd className="font-semibold text-ink-strong">{formatNumber(SHARE_SNAPSHOT.volume)}</dd>
              </div>
              <div>
                <dt className="text-ink-faint">Market cap</dt>
                <dd className="font-semibold text-ink-strong">
                  {formatBillions(SHARE_SNAPSHOT.marketCap)}
                </dd>
              </div>
              <div>
                <dt className="text-ink-faint">Index</dt>
                <dd className="font-semibold text-ink-strong">{SHARE_SNAPSHOT.index}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-ink-ghost">
              Illustrative demo price as at {formatDate(SHARE_SNAPSHOT.asAt)}. Delayed and invented.
            </p>
          </Card>
        }
      />

      <ShareholderNav />

      <Section>
        <SectionHeading
          eyebrow="The company"
          title="About HUB24 Limited"
          body="HUB24 Limited is listed on the Australian Securities Exchange (ASX:HUB) and includes the award-winning HUB24 platform, HUBconnect — which provides data and technology solutions to the advice industry — Class Pty Limited, a pioneer in cloud-based wealth accounting solutions, and myprosperity, a leading provider of client portals for accountants and financial advisers."
        />
        <StatBand
          className="mt-10"
          items={[
            { value: formatBillions(GROUP_METRICS.totalFua), label: "Total FUA", note: "Up 20% YoY" },
            { value: formatBillions(GROUP_METRICS.platformFua), label: "Platform FUA", note: "Up 24% YoY" },
            { value: formatBillions(GROUP_METRICS.parsFua), label: "PARS FUA", note: "Up 5% YoY" },
            {
              value: formatNumber(GROUP_METRICS.activeAdvisers),
              label: "Active advisers",
              note: "Up 11% YoY",
            },
          ]}
        />
      </Section>

      <Section tone="tint">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="ASX" title="Latest announcements" />
          <ButtonLink to="/shareholder-centre/asx-announcements/" variant="secondary">
            All announcements
          </ButtonLink>
        </div>
        <ul className="mt-8 divide-y divide-line rounded-h24-lg border border-line bg-white">
          {latest.map((announcement) => (
            <li key={announcement.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
              <span className="w-24 shrink-0 text-sm text-ink-faint">
                {formatDate(announcement.date)}
              </span>
              <span className="flex-1 text-[0.95rem] font-medium text-ink-strong">
                {announcement.title}
              </span>
              {announcement.priceSensitive ? <Badge tone="caution">Price sensitive</Badge> : null}
              <Badge tone="neutral">{announcement.category}</Badge>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading eyebrow="Contacts" title="Who to talk to" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="flex flex-col gap-2">
            <CardHeading>Investor relations</CardHeading>
            <CardBody>
              Enquiries relating to an investment in HUB24 shares, results and market updates.
            </CardBody>
            <ButtonLink to="/contact-us/" variant="secondary" size="sm" className="mt-3 w-fit">
              Contact us
            </ButtonLink>
          </Card>
          <Card className="flex flex-col gap-2">
            <CardHeading>Share registry</CardHeading>
            <CardBody>
              Enquiries about an existing shareholding — holdings, payments and address changes — go to{" "}
              {SITE.registryName}.
            </CardBody>
            <p className="mt-3 text-sm font-semibold text-h24-teal-dark">
              Call {SITE.registryPhone}
            </p>
          </Card>
        </div>
      </Section>

      <CtaBand
        eyebrow="Reporting"
        title="Dig into the numbers"
        body="Five years of funds under administration, net inflows and adviser growth are charted in the financial results section."
        primary={{ label: "Financial results", to: "/shareholder-centre/financial-results/" }}
        secondary={{ label: "Corporate governance", to: "/shareholder-centre/corporate-governance/" }}
      />
    </PageLayout>
  );
}
