import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { CapabilityCard } from "@/components/shared/CapabilityCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getUseCase } from "@/data/useCases";
import { getCapability } from "@/data/capabilities";
import { NotFoundPage } from "./NotFound";

export function UseCaseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const useCase = slug ? getUseCase(slug) : undefined;
  if (!useCase) return <NotFoundPage />;

  const caps = useCase.capabilities.map((s) => getCapability(s)).filter((c) => c !== undefined);

  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Use cases", to: "/use-cases" }, { label: useCase.name }]} />
      <PageHero
        eyebrow="Use case"
        eyebrowTint={useCase.tint}
        title={useCase.heroTitle}
        copy={useCase.heroCopy}
      >
        <Button to="/book-a-call" size="lg" withArrow>
          Scope it with an expert
        </Button>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading eyebrow="The playbook" title="How teams get there" />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2">
          {useCase.steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-cream-deep bg-card p-7 shadow-card">
              <span className="flex size-9 items-center justify-center rounded-full bg-navy font-heading text-sm font-semibold text-mint">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{step.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <SectionHeading eyebrow="Capabilities involved" title="The pieces that power it" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caps.map((c) => (
            <CapabilityCard key={c.slug} capability={c} />
          ))}
        </div>
      </section>

      <CtaSection />
    </PageLayout>
  );
}
