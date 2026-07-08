import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { PageHero } from "../components/shared/PageHero";
import { FaqSection } from "../components/shared/FaqSection";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { EmiCalculator } from "../components/finance/EmiCalculator";
import { loanProducts } from "../data/finance";
import { loanFaqs } from "../data/faqs";

const steps = [
  { n: "1", title: "Check your offer", body: "A soft eligibility check shows your pre-approved amount without touching your score." },
  { n: "2", title: "Pick amount & tenure", body: "Use the calculator to land on an EMI that fits your month." },
  { n: "3", title: "e-Sign & receive funds", body: "Digital KYC and mandate setup — funds land the same day for pre-approved users." },
];

const infoSections = [
  {
    heading: "Personal loans without the paper chase",
    paragraphs: [
      "Whether it's a medical bill, a wedding, or a move to a new city, a personal loan should be a decision you can size precisely. The calculator on this page runs real reducing-balance math so the EMI you see is the EMI you'd pay — adjust amount, rate, and tenure until it fits.",
      "Rates and offers shown in this demo are illustrative; the real product fetches personalised offers from lending partners.",
    ],
  },
];

export function PersonalLoanPage() {
  useDocumentTitle("Personal Loan & EMI Calculator");

  return (
    <PageLayout>
      <PageHero
        title={
          <>
            Personal loans, <span className="text-paytm-cyan">sized to your month</span>
          </>
        }
        subtitle="Check offers with a soft inquiry, plan EMIs with a live calculator, and get funds the same day."
      />

      <section aria-label="Loan products" className="mx-auto max-w-7xl px-4 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-3">
          {loanProducts.map((loan) => (
            <li key={loan.id} className="rounded-2xl bg-card p-6 shadow-card">
              <h2 className="text-sm font-bold text-ink">{loan.label}</h2>
              <p className="mt-3 text-2xl font-extrabold text-paytm-navy">{loan.maxAmount}</p>
              <p className="text-xs text-ink-soft">maximum amount</p>
              <dl className="mt-4 space-y-1 text-xs text-ink-soft">
                <div className="flex justify-between">
                  <dt>Interest from</dt>
                  <dd className="font-semibold text-ink">{loan.rateFrom}% p.a.</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Tenure</dt>
                  <dd className="font-semibold text-ink">{loan.tenure}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="EMI calculator" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <EmiCalculator />
      </section>

      <section aria-label="How it works" className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <h2 className="text-xl font-bold text-paytm-navy">Three steps to funds</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl bg-card p-6 shadow-card">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paytm-cyan text-sm font-extrabold text-white">
                {s.n}
              </span>
              <h3 className="mt-3 text-sm font-bold text-ink">{s.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <FaqSection faqs={loanFaqs} />
      <SeoTextBlock sections={infoSections} />
    </PageLayout>
  );
}
