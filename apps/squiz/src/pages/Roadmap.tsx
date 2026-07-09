import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { Badge } from "@/components/ui/Badge";
import { roadmap } from "@/data/company";

export function RoadmapPage() {
  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Product roadmap" }]} />
      <PageHero
        eyebrow="Product roadmap"
        title="What we're building — now, next, and later"
        copy="The platform ships on a monthly release cadence. This public roadmap shows the bigger bets; specifics and dates firm up as work approaches."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-3">
          {roadmap.map((column) => (
            <div key={column.horizon}>
              <div className="flex items-baseline gap-3">
                <h2 className="font-heading text-2xl font-semibold text-navy">{column.horizon}</h2>
                <span className="text-sm text-ink-faint">{column.caption}</span>
              </div>
              <div className="mt-6 space-y-4">
                {column.items.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-cream-deep bg-card p-6 shadow-card">
                    <Badge tint="outline">{item.product}</Badge>
                    <h3 className="mt-3 text-lg font-semibold text-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-2xl text-sm text-ink-faint">
          Demo note: this roadmap is illustrative. Plans shift as we learn from customers — items on
          the “Later” horizon are research directions, not commitments.
        </p>
      </section>
      <CtaSection
        title="Want to shape the roadmap?"
        copy="Customer feedback drives prioritization. Bring your use case to a product briefing."
        primaryLabel="Book a briefing"
      />
    </PageLayout>
  );
}
