import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { Icon } from "@/components/ui/Icon";
import { useCases } from "@/data/useCases";
import { tintBg } from "@/lib/tints";
import { cn } from "@/lib/cn";

export function UseCasesPage() {
  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Use cases" }]} />
      <PageHero
        eyebrow="Use cases"
        title="Start with the outcome, not the feature list"
        copy="Six journeys teams most often hire Squiz DXP for — each with the concrete steps and capabilities behind it."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <Link
              key={useCase.slug}
              to={`/use-cases/${useCase.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-cream-deep bg-card p-7 shadow-card transition-shadow hover:shadow-float"
            >
              <span className={cn("flex size-12 items-center justify-center rounded-xl text-navy", tintBg[useCase.tint])}>
                <Icon name={useCase.icon} className="size-6" />
              </span>
              <h2 className="mt-4 text-lg font-semibold leading-snug text-navy group-hover:underline">
                {useCase.name}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{useCase.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                See how it works
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <CtaSection />
    </PageLayout>
  );
}
