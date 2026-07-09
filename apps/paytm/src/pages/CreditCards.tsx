import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { PageHero } from "../components/shared/PageHero";
import { FaqSection } from "../components/shared/FaqSection";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { SuccessModal } from "../components/shared/SuccessModal";
import { useDisclosure } from "../hooks/useDisclosure";
import { creditCards } from "../data/finance";
import { formatInr } from "../lib/format";
import { useState } from "react";

const ccFaqs = [
  { q: "How long does approval take?", a: "Eligible applicants typically get an in-principle decision in minutes and a virtual card on approval; the physical card follows by post." },
  { q: "Is there a joining fee?", a: "Depends on the card — the lineup includes lifetime-free options as well as premium cards whose fees are offset by milestone rewards." },
  { q: "Will applying affect my credit score?", a: "The eligibility check is a soft inquiry. A hard inquiry happens only when you submit a full application with the issuing bank." },
];

const steps = [
  { n: "1", title: "Check eligibility", body: "Share basic details for a soft check that doesn't touch your credit score." },
  { n: "2", title: "Pick your card", body: "Compare rewards, fees, and lounge benefits side by side." },
  { n: "3", title: "Complete video KYC", body: "A few minutes with your PAN and address proof — fully digital." },
  { n: "4", title: "Start spending", body: "Use the instant virtual card while the physical one ships." },
];

const infoSections = [
  {
    heading: "One destination for credit cards",
    paragraphs: [
      "Compare co-branded cards across banks with transparent reward math — no fine-print surprises. Track your application in real time, and manage the card (bills, limits, conversions to EMI) from the same app you pay with. The cards, fees, and rewards on this page are illustrative demo content.",
    ],
  },
];

export function CreditCardsPage() {
  useDocumentTitle("Credit Cards");
  const [pickedCard, setPickedCard] = useState(creditCards[0].name);
  const success = useDisclosure();

  return (
    <PageLayout>
      <PageHero
        title={
          <>
            One destination for <span className="text-paytm-cyan">credit cards</span>
          </>
        }
        subtitle="Compare, apply, and manage — with assured cashback, milestone rewards, and instant virtual cards."
      />

      <section aria-label="Card lineup" className="mx-auto max-w-7xl px-4 sm:px-6">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {creditCards.map((card) => (
            <li key={card.id} className="flex flex-col rounded-2xl bg-card p-5 shadow-card">
              <div
                aria-hidden="true"
                style={{ backgroundImage: `linear-gradient(135deg, ${card.gradient.from}, ${card.gradient.to})` }}
                className="flex h-36 flex-col justify-between rounded-xl p-4 text-white"
              >
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider opacity-90">
                  <span>{card.network}</span>
                  <span className="h-6 w-8 rounded bg-white/25" />
                </div>
                <p className="text-sm font-extrabold">{card.name}</p>
              </div>
              <p className="mt-4 text-sm font-bold text-paytm-navy">{card.highlight}</p>
              <ul className="mt-2 flex-1 space-y-1.5">
                {card.perks.map((perk) => (
                  <li key={perk} className="text-xs text-ink-soft">
                    • {perk}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between gap-2">
                <Badge tone={card.annualFee === 0 ? "green" : "neutral"}>
                  {card.annualFee === 0 ? "Lifetime free" : `${formatInr(card.annualFee)}/yr`}
                </Badge>
                <Button
                  size="sm"
                  onClick={() => {
                    setPickedCard(card.name);
                    success.open();
                  }}
                >
                  Apply Now
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="How it works" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-xl font-bold text-paytm-navy">From application to first swipe</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl bg-card p-6 shadow-card">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paytm-sky text-sm font-extrabold text-paytm-navy">
                {s.n}
              </span>
              <h3 className="mt-3 text-sm font-bold text-ink">{s.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <FaqSection faqs={ccFaqs} />
      <SeoTextBlock sections={infoSections} />

      <SuccessModal
        open={success.isOpen}
        onClose={success.close}
        title="Application Started"
        lines={[
          { label: "Card", value: pickedCard },
          { label: "Status", value: "Eligibility check (simulated)" },
          { label: "Next step", value: "Video KYC — demo ends here" },
        ]}
      />
    </PageLayout>
  );
}
