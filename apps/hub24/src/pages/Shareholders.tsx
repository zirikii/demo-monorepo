import { PageHero } from "@/components/marketing/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ANNOUNCEMENTS, GOVERNANCE, SHARE_QUOTE } from "@/data/shareholders";
import { formatChange, formatCurrency, formatDate, formatNumber } from "@/lib/format";

export default function ShareholdersPage() {
  return (
    <PageLayout title="Shareholder Centre">
      <PageHero
        eyebrow="ASX:HUB"
        title="HUB24 Limited Shareholder Centre"
        body="Dummy quote and announcements for the unofficial demo. Not live market data and not an invitation to invest."
      />
      <Section>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-hub-lg bg-hub-navy-deep p-8 text-white">
            <p className="text-xs font-bold tracking-[0.16em] text-hub-teal-soft uppercase">
              {SHARE_QUOTE.exchange}:{SHARE_QUOTE.code}
            </p>
            <p className="mt-3 font-serif text-5xl font-bold">{formatCurrency(SHARE_QUOTE.last)}</p>
            <p className="mt-2 text-hub-teal-soft">
              {formatChange(SHARE_QUOTE.changePct)} ({SHARE_QUOTE.change > 0 ? "+" : ""}
              {SHARE_QUOTE.change.toFixed(2)})
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-white/50">Open</dt>
                <dd>{formatCurrency(SHARE_QUOTE.open)}</dd>
              </div>
              <div>
                <dt className="text-white/50">High / low</dt>
                <dd>
                  {formatCurrency(SHARE_QUOTE.high)} / {formatCurrency(SHARE_QUOTE.low)}
                </dd>
              </div>
              <div>
                <dt className="text-white/50">Volume</dt>
                <dd>{formatNumber(SHARE_QUOTE.volume)}</dd>
              </div>
              <div>
                <dt className="text-white/50">Mkt cap</dt>
                <dd>${SHARE_QUOTE.mktCap}</dd>
              </div>
            </dl>
            <p className="mt-6 text-xs text-white/40">As at {formatDate(SHARE_QUOTE.asAt)} · delayed dummy data</p>
          </div>
          <div>
            <SectionHeading title="Governance" />
            <ul className="space-y-2">
              {GOVERNANCE.map((item) => (
                <li key={item} className="rounded-hub border border-line px-4 py-3 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section tone="tint">
        <SectionHeading title="Announcements" />
        <ul className="divide-y divide-line border-y border-line bg-white">
          {ANNOUNCEMENTS.map((item) => (
            <li key={item.title} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-ink-faint">{formatDate(item.date)}</p>
              </div>
              <Badge tone="navy">{item.type}</Badge>
            </li>
          ))}
        </ul>
      </Section>
    </PageLayout>
  );
}
