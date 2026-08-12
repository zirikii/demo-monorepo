import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { ButtonLink } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function ProductsIndexPage() {
  useDocumentTitle("Products");
  return (
    <PageLayout>
      <PageHero eyebrow="Products" title="The Employment Operating System" description="Hiring, HR, payroll, benefits and learning — designed to share one people record." actions={<ButtonLink to="/products/employment-os">Explore Employment OS</ButtonLink>} />
      <Section><div className="container-eh"><FeatureGrid limit={7} /></div></Section>
    </PageLayout>
  );
}
