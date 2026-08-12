import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ProductGrid } from "@/components/marketing/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stat } from "@/components/ui/Stat";
import { products } from "@/data/products";
import { heroStats } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function ProductsPage() {
  useDocumentTitle("Products");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Products"
        title="Every part of employment, intelligently run."
        blurb="Hiring, HR, payroll and employee experience share the same records, the same workflows and the same audit trail — so nothing has to be re-entered between them."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Products" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/request-a-demo">Request a demo</ButtonLink>
          <ButtonLink to="/pricing" variant="secondary">
            See pricing
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="The platform"
          title="Seven products. One employment record."
          blurb="Start with the piece that hurts most today. The rest connect to it without a migration project."
        />
        <ProductGrid items={products} />
      </Section>

      <Section tone="purple">
        <SectionHeading
          title="What the platform handles at scale"
          align="center"
          tone="light"
        />
        <dl className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {heroStats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} tone="light" />
          ))}
        </dl>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}
