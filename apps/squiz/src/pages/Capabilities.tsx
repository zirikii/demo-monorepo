import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { CapabilityCard } from "@/components/shared/CapabilityCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { capabilities } from "@/data/capabilities";

const groups = [
  "Create & manage",
  "Search & discovery",
  "Data & optimization",
  "Connect & extend",
] as const;

export function CapabilitiesPage() {
  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Products", to: "/products/digital-experience-platform" }, { label: "Capabilities" }]} />
      <PageHero
        eyebrow="Capabilities"
        title="Every capability in the Squiz DXP"
        copy="Enterprise-grade capabilities designed for speed, agility, and ease of use — built together so they share one data model."
      />
      {groups.map((group) => {
        const items = capabilities.filter((c) => c.group === group);
        if (items.length === 0) return null;
        return (
          <section key={group} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
            <SectionHeading title={group} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((c) => (
                <CapabilityCard key={c.slug} capability={c} />
              ))}
            </div>
          </section>
        );
      })}
      <CtaSection />
    </PageLayout>
  );
}
