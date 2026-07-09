import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { PageHero } from "../components/shared/PageHero";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { Stat } from "../components/ui/Stat";
import { companyStats, leadership, milestones } from "../data/company";

const infoSections = [
  {
    heading: "What we believe",
    paragraphs: [
      "Payments should be boring — instant, safe, and forgettable — so that everything they enable is not. That conviction drives products for the tea-stall owner, the daily commuter, the first-time investor, and the enterprise finance team alike.",
      "This page is part of an unofficial demo build; figures and profiles are fictional stand-ins for illustration.",
    ],
  },
];

export function AboutPage() {
  useDocumentTitle("About Us");

  return (
    <PageLayout>
      <PageHero
        tone="navy"
        title={
          <>
            Bringing <span className="text-paytm-cyan">every Indian</span> into the digital economy
          </>
        }
        subtitle="From mobile recharges in 2010 to UPI-first payments today — a platform for consumers and merchants across the country."
      />

      <section aria-label="Company stats" className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 rounded-2xl bg-card p-8 shadow-card sm:grid-cols-4">
          {companyStats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </section>

      <section aria-label="Milestones" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-xl font-bold text-paytm-navy">Our journey</h2>
        <ol className="mt-6 space-y-0">
          {milestones.map((m, i) => (
            <li key={m.year} className="relative flex gap-5 pb-8 last:pb-0">
              {i < milestones.length - 1 ? (
                <span aria-hidden="true" className="absolute left-[22px] top-12 h-full w-px bg-hairline" />
              ) : null}
              <span className="z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paytm-navy text-xs font-extrabold text-white">
                {m.year.slice(2)}
              </span>
              <div className="rounded-2xl bg-card p-5 shadow-card">
                <p className="text-xs font-bold text-paytm-cyan">{m.year}</p>
                <h3 className="mt-0.5 text-sm font-bold text-ink">{m.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">{m.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="Leadership" className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <h2 className="text-xl font-bold text-paytm-navy">Leadership (fictional demo roster)</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((leader) => (
            <li key={leader.id} className="flex gap-4 rounded-2xl bg-card p-5 shadow-card">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paytm-sky text-sm font-extrabold text-paytm-navy"
              >
                {leader.initials}
              </span>
              <div>
                <h3 className="text-sm font-bold text-ink">{leader.name}</h3>
                <p className="text-xs font-semibold text-paytm-cyan">{leader.role}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{leader.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <SeoTextBlock sections={infoSections} />
    </PageLayout>
  );
}
