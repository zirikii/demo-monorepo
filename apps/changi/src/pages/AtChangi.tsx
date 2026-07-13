import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { terminals } from "@/data/terminals";

export function AtChangiPage() {
  useDocumentTitle("At Changi");
  return (
    <PageLayout>
      <PageHero
        title="At Changi"
        subtitle="Terminal guides, transport, special assistance, and Jewel Changi Airport."
        crumbs={[{ label: "At Changi" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {terminals.map((t) => (
            <article key={t.id} className="rounded-2xl border border-line bg-card p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-purple">{t.code}</p>
              <h2 className="mt-1 text-xl font-black text-ink-deep">{t.name}</h2>
              <p className="mt-2 text-sm text-ink-soft">{t.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {t.highlights.map((h) => (
                  <li key={h} className="rounded-full bg-sand px-3 py-1 text-xs font-bold text-ink-soft">{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-line bg-sand p-6">
          <h2 className="text-xl font-black text-ink-deep">Jewel Changi Airport</h2>
          <p className="mt-2 max-w-3xl text-sm text-ink-soft">
            Connected to Terminals 1–3, Jewel is home to the HSBC Rain Vortex, Canopy Park, and hundreds of
            dining and retail outlets — a destination whether you are flying or visiting.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
