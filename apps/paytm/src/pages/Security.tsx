import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { PageHero } from "../components/shared/PageHero";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { securityPractices, safetyTips } from "../data/support";

const infoSections = [
  {
    heading: "Security is a habit, not a feature",
    paragraphs: [
      "Every layer described above exists because money deserves paranoia: bind the device, tokenise the card, score the transaction, audit the stack, and reward the researcher who finds the gap first. The practices listed here describe the approach this demo models.",
    ],
  },
];

export function SecurityPage() {
  useDocumentTitle("Security & Trust");

  return (
    <PageLayout>
      <PageHero
        tone="navy"
        title={
          <>
            Bank-grade security, <span className="text-paytm-cyan">every single payment</span>
          </>
        }
        subtitle="How the platform protects your money and data — and how you can protect yourself."
      />

      <section aria-label="Security practices" className="mx-auto max-w-7xl px-4 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {securityPractices.map((p) => (
            <li key={p.id} className="rounded-2xl bg-card p-6 shadow-card">
              <span aria-hidden="true" className="text-2xl">
                {p.emoji}
              </span>
              <h2 className="mt-3 text-sm font-bold text-ink">{p.title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Safety tips" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-xl font-bold text-paytm-navy">Be safe. Be vigilant.</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {safetyTips.map((tip) => (
            <li key={tip.title} className="rounded-2xl border border-warning/40 bg-warning/5 p-5">
              <h3 className="text-sm font-bold text-ink">{tip.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{tip.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <SeoTextBlock sections={infoSections} />
    </PageLayout>
  );
}
