import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { experiences } from "@/data/experiences";

export function ExperiencePage() {
  useDocumentTitle("Experience");
  return (
    <PageLayout>
      <PageHero
        title="Experience"
        subtitle="Art, nature, play, and quiet moments that make Changi a destination in itself."
        crumbs={[{ label: "Experience" }]}
      />
      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {experiences.map((e) => (
          <article key={e.id} className="rounded-2xl border border-line bg-card p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-purple">{e.category}</p>
            <h2 className="mt-1 text-lg font-black text-ink-deep">{e.title}</h2>
            <p className="mt-1 text-xs font-bold text-ink-faint">{e.location}</p>
            <p className="mt-2 text-sm text-ink-soft">{e.summary}</p>
          </article>
        ))}
      </section>
    </PageLayout>
  );
}
