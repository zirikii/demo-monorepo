import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { PageHero } from "../components/shared/PageHero";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { FaqSection } from "../components/shared/FaqSection";
import { Button } from "../components/ui/Button";
import { SuccessModal } from "../components/shared/SuccessModal";
import { useDisclosure } from "../hooks/useDisclosure";
import { goldRates } from "../data/finance";
import { formatInr } from "../lib/format";
import { useState } from "react";

const goldFaqs = [
  { q: "Where is my gold stored?", a: "Purchases are backed by physical 24K gold held in insured, audited vaults by the custodian partner. You can sell anytime or request coin delivery." },
  { q: "What's the minimum I can buy?", a: "You can start with as little as ₹10 — fractional grams are credited to your locker instantly." },
  { q: "Are these live rates?", a: "The rates on this page are demo figures. The real product streams live buy/sell prices that refresh every few minutes." },
];

const perks = [
  { title: "Start at ₹10", body: "Buy fractional grams whenever you like — no lockers, no making charges." },
  { title: "24K 999.9 purity", body: "Every gram is certified and fully insured in the custodian's vault." },
  { title: "Sell anytime", body: "Liquidate at live rates and receive money straight to your bank." },
  { title: "Gold SIP", body: "Automate a daily, weekly, or monthly purchase and build holdings quietly." },
];

const infoSections = [
  {
    heading: "Digital gold, minus the drama",
    paragraphs: [
      "Owning gold no longer means lockers and making charges. Buy certified 24K gold in any amount, watch it in your portfolio next to your other investments, and sell the moment you choose. For gifting, send grams to family in seconds — a tradition, upgraded.",
    ],
  },
];

export function GoldPage() {
  useDocumentTitle("Digital Gold");
  const [gramsInput, setGramsInput] = useState("1");
  const success = useDisclosure();

  const grams = Number(gramsInput) || 0;
  const buyRate = goldRates[0].buyPerGram;

  return (
    <PageLayout>
      <PageHero
        title={
          <>
            Digital Gold — <span className="text-paytm-cyan">24K, from ₹10</span>
          </>
        }
        subtitle="Buy, sell, and gift certified gold instantly, stored in insured vaults until you want delivery."
      />

      <section aria-label="Live rates" className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-ink">Today&apos;s Rates</h2>
              <p className="text-[10px] uppercase tracking-wide text-ink-faint">Demo rates · indicative</p>
            </div>
            <table className="mt-4 w-full text-sm">
              <thead>
                <tr className="border-b border-hairline text-left text-xs text-ink-faint">
                  <th className="pb-2 font-medium">Metal</th>
                  <th className="pb-2 font-medium">Purity</th>
                  <th className="pb-2 text-right font-medium">Buy /g</th>
                  <th className="pb-2 text-right font-medium">Sell /g</th>
                </tr>
              </thead>
              <tbody>
                {goldRates.map((rate) => (
                  <tr key={rate.metal} className="border-b border-hairline last:border-0">
                    <td className="py-3 font-bold text-ink">{rate.metal}</td>
                    <td className="py-3 text-ink-soft">{rate.purity}</td>
                    <td className="py-3 text-right font-semibold text-paytm-navy">
                      {formatInr(rate.buyPerGram, { decimals: 2 })}
                    </td>
                    <td className="py-3 text-right text-ink-soft">
                      {formatInr(rate.sellPerGram, { decimals: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <form
            aria-label="Buy gold"
            className="rounded-2xl bg-gradient-to-br from-[#fff7e0] to-[#ffedb8] p-6 shadow-card"
            onSubmit={(e) => {
              e.preventDefault();
              if (grams > 0) success.open();
            }}
          >
            <h2 className="text-sm font-bold text-ink">Buy Gold Now</h2>
            <label className="mt-4 block">
              <span className="text-xs font-medium text-ink-soft">Grams</span>
              <input
                inputMode="decimal"
                value={gramsInput}
                onChange={(e) => setGramsInput(e.target.value.replace(/[^\d.]/g, ""))}
                className="mt-1 w-full border-b border-amber-300 bg-transparent pb-2 text-lg font-extrabold text-ink outline-none focus:border-paytm-cyan"
              />
            </label>
            <p className="mt-4 text-xs text-ink-soft">You pay</p>
            <p className="text-2xl font-extrabold text-paytm-navy">
              {formatInr(Math.round(grams * buyRate))}
            </p>
            <Button type="submit" className="mt-5 w-full" disabled={grams <= 0}>
              Buy (Demo)
            </Button>
          </form>
        </div>
      </section>

      <section aria-label="Why digital gold" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk) => (
            <li key={perk.title} className="rounded-2xl bg-card p-6 shadow-card">
              <h2 className="text-sm font-bold text-ink">{perk.title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{perk.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <FaqSection faqs={goldFaqs} />
      <SeoTextBlock sections={infoSections} />

      <SuccessModal
        open={success.isOpen}
        onClose={success.close}
        title="Gold Purchased"
        lines={[
          { label: "Quantity", value: `${grams} g (24K 999.9)` },
          { label: "Rate", value: `${formatInr(buyRate, { decimals: 2 })}/g` },
          { label: "Amount", value: formatInr(Math.round(grams * buyRate)) },
        ]}
      />
    </PageLayout>
  );
}
