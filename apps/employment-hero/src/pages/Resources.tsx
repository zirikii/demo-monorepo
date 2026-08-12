import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";


export function ResourcesPage() {
  useDocumentTitle("Resources");
  return (
    <PageLayout>
      <PageHero eyebrow="Resources" title="Resources" description="Guides, templates and product updates for HR and payroll leaders." actions={<ButtonLink to="/request-demo">Request a demo</ButtonLink>} />
      <Section>
        <div className="container-eh prose-like max-w-3xl space-y-4 text-[15px] leading-relaxed text-ink-soft">
          <p>Guides, templates and product updates for HR and payroll leaders.</p>
          <p>This unofficial demo mirrors Employment Hero marketing structure with local seed data. Explore related pages from the header navigation or jump to <Link to="/pricing" className="font-semibold text-eh-purple underline">pricing</Link>.</p>
        </div>
      </Section>
    </PageLayout>
  );
}
