import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { PageHero } from "../components/shared/PageHero";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { supportTopics, escalationLadder } from "../data/support";

const infoSections = [
  {
    heading: "Help that actually helps",
    paragraphs: [
      "Most issues — a pending payment, a plan that didn't activate — resolve in the guided flows above without waiting for a human. When you do need one, support runs 24x7 in the app, and every conversation carries your ticket history so you never repeat yourself.",
      "Remember: support staff never ask for OTPs, UPI PINs, or remote-access apps. Anyone who does is not support.",
    ],
  },
];

export function SupportPage() {
  useDocumentTitle("24x7 Help & Support");

  return (
    <PageLayout>
      <PageHero
        title={
          <>
            We&apos;re here, <span className="text-paytm-cyan">24x7</span>
          </>
        }
        subtitle="Find answers by topic, or escalate formally if something stays unresolved — the ladder below shows exactly how."
      />

      <section aria-label="Help topics" className="mx-auto max-w-7xl px-4 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {supportTopics.map((topic) => (
            <li key={topic.id}>
              <button
                type="button"
                className="flex w-full items-start gap-4 rounded-2xl bg-card p-5 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-float"
              >
                <span aria-hidden="true" className="text-2xl">
                  {topic.emoji}
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink">{topic.title}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-ink-soft">{topic.blurb}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Escalation ladder" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-xl font-bold text-paytm-navy">Grievance escalation ladder</h2>
        <ol className="mt-6 grid gap-4 lg:grid-cols-4">
          {escalationLadder.map((step) => (
            <li key={step.level} className="rounded-2xl bg-card p-6 shadow-card">
              <p className="text-xs font-extrabold uppercase tracking-wide text-paytm-cyan">{step.level}</p>
              <h3 className="mt-2 text-sm font-bold text-ink">{step.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{step.body}</p>
              <p className="mt-3 rounded-lg bg-surface px-3 py-1.5 text-[11px] font-semibold text-ink-soft">
                SLA: {step.sla}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <SeoTextBlock sections={infoSections} />
    </PageLayout>
  );
}
