import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { FaqSection } from "@/components/shared/FaqSection";
import { CapabilityCard } from "@/components/shared/CapabilityCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { capabilities, getCapability } from "@/data/capabilities";
import { tintBg } from "@/lib/tints";
import { cn } from "@/lib/cn";
import { NotFoundPage } from "./NotFound";

export function CapabilityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const capability = slug ? getCapability(slug) : undefined;
  if (!capability) return <NotFoundPage />;

  const related = capabilities.filter((c) => c.group === capability.group && c.slug !== capability.slug).slice(0, 3);

  return (
    <PageLayout>
      <Breadcrumbs
        crumbs={[
          { label: "Capabilities", to: "/products/capabilities" },
          { label: capability.name },
        ]}
      />
      <PageHero
        eyebrow={capability.badge ? `${capability.name} — NEW` : capability.name}
        eyebrowTint={capability.tint}
        title={capability.heroTitle}
        copy={capability.heroCopy}
      >
        <Button to="/book-a-call" size="lg" withArrow>
          Book a call
        </Button>
        <Button to="/demos" variant="secondary" size="lg">
          Watch a demo
        </Button>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading eyebrow="Key features" title={`What ${capability.name} gives your team`} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {capability.features.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-cream-deep bg-card p-7 shadow-card">
              <span className={cn("flex size-11 items-center justify-center rounded-xl text-navy", tintBg[capability.tint])}>
                <Icon name={capability.icon} className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy">{feature.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{feature.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <FaqSection items={capability.faqs} />

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <SectionHeading title="Related capabilities" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CapabilityCard key={c.slug} capability={c} />
            ))}
          </div>
        </section>
      )}

      <CtaSection />
    </PageLayout>
  );
}
