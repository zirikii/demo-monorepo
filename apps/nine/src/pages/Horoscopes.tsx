import { PageLayout } from "@/components/layout/PageLayout";
import { horoscopes } from "@/data/horoscopes";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function HoroscopesPage() {
  useDocumentTitle("Horoscopes");
  return (
    <PageLayout>
      <h1 className="font-display text-4xl font-bold">Horoscopes</h1>
      <p className="mt-2 text-nine-muted">Daily notes for every sign — original demo copy.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {horoscopes.map((h) => (
          <article key={h.sign} className="rounded-lg border border-nine-line p-4">
            <h2 className="font-display text-2xl font-bold text-nine-ink">{h.sign}</h2>
            <p className="text-xs font-semibold uppercase tracking-wider text-nine-blue">{h.dates}</p>
            <p className="mt-3 text-sm text-nine-muted">{h.blurb}</p>
          </article>
        ))}
      </div>
    </PageLayout>
  );
}
