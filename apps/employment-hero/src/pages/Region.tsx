import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { NotFoundPage } from "./NotFound";

const regions: Record<string, { name: string; blurb: string }> = {
  au: { name: "Australia", blurb: "STP Phase 2 ready payroll, Fair Work-aligned leave and local support for Australian employers." },
  nz: { name: "New Zealand", blurb: "Payday filing, KiwiSaver and Holidays Act-aware workflows for NZ businesses." },
  uk: { name: "United Kingdom", blurb: "RTI payroll, auto-enrolment support and UK employment templates for growing companies." },
  sg: { name: "Singapore", blurb: "CPF-aware payroll and MOM-friendly employment records for Singapore teams." },
};

export function RegionPage() {
  const { code = "" } = useParams();
  const region = regions[code];
  useDocumentTitle(region ? `Employment Hero ${region.name}` : "Region");
  if (!region) return <NotFoundPage />;
  return (
    <PageLayout>
      <PageHero eyebrow="Regions" title={`Employment Hero in ${region.name}`} description={region.blurb} actions={<ButtonLink to="/request-demo">Request a demo</ButtonLink>} />
      <Section>
        <div className="container-eh max-w-3xl text-ink-soft leading-relaxed">
          <p>{region.blurb}</p>
          <p className="mt-4">Explore pricing, products and customer stories from the main navigation — regional packaging may vary in the real product.</p>
        </div>
      </Section>
    </PageLayout>
  );
}
