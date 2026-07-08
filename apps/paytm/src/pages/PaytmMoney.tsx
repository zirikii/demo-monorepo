import { TrendingUp } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { PageHero } from "../components/shared/PageHero";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { Stat } from "../components/ui/Stat";
import { moneyProducts } from "../data/finance";

const infoSections = [
  {
    heading: "Investing that stays out of your way",
    paragraphs: [
      "Flat-fee broking, direct mutual funds, and a research view that puts price, fundamentals, and your positions on one screen. Whether it's a first SIP or an options strategy, the flow is the same: search, review, confirm.",
      "This demo describes the product surface only — no orders, market data feeds, or advice are real here.",
    ],
  },
];

export function PaytmMoneyPage() {
  useDocumentTitle("Paytm Money — Stocks, Mutual Funds & More");

  return (
    <PageLayout>
      <PageHero
        tone="navy"
        title={
          <>
            Pay less, <span className="text-paytm-cyan">trade more</span>
          </>
        }
        subtitle="Stocks, mutual funds, IPOs, F&O, NPS, and ETFs — flat-fee broking with margin trading at 7.99%* p.a. (illustrative)."
      >
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
          <TrendingUp aria-hidden="true" className="h-4 w-4 text-paytm-cyan" />
          Margin Trading Facility on 1,200+ stocks
        </div>
      </PageHero>

      <section aria-label="Highlights" className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 rounded-2xl bg-card p-8 shadow-card sm:grid-cols-4">
          <Stat value="₹20" label="flat per order" />
          <Stat value="0%" label="commission direct MFs" />
          <Stat value="4x" label="buying power with MTF" />
          <Stat value="2 taps" label="to apply for IPOs" />
        </div>
      </section>

      <section aria-label="Products" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {moneyProducts.map((p) => (
            <li key={p.id} className="rounded-2xl bg-card p-6 shadow-card">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-base font-bold text-ink">{p.label}</h2>
                <p className="text-right">
                  <span className="block text-lg font-extrabold text-paytm-navy">{p.stat}</span>
                  <span className="block text-[10px] text-ink-faint">{p.statLabel}</span>
                </p>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">{p.blurb}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[10px] leading-relaxed text-ink-faint">
          *Illustrative demo rate. Investments in securities are subject to market risks; this demo
          places no real orders and offers no investment advice.
        </p>
      </section>

      <SeoTextBlock sections={infoSections} />
    </PageLayout>
  );
}
