import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { Icon } from "@/components/ui/Icon";
import { industries } from "@/data/industries";
import { tintBg } from "@/lib/tints";
import { cn } from "@/lib/cn";

export function IndustriesPage() {
  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Industries" }]} />
      <PageHero
        eyebrow="Industries"
        title="Built for service-led organizations"
        copy="Where digital is the front door to real services — education, government, health, finance, and utilities — Squiz has been the platform behind the experience since 1998."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              to={`/industries/${industry.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-cream-deep bg-card p-7 shadow-card transition-shadow hover:shadow-float"
            >
              <span className={cn("flex size-12 items-center justify-center rounded-xl text-navy", tintBg[industry.tint])}>
                <Icon name={industry.icon} className="size-6" />
              </span>
              <h2 className="mt-4 text-xl font-semibold text-navy group-hover:underline">
                {industry.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-ink-faint">{industry.tagline}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{industry.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                Explore {industry.name.toLowerCase()}
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
