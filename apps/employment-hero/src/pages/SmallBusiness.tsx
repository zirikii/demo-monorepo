import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";


export function SmallBusinessPage() {
  useDocumentTitle("Small business");
  return (
    <PageLayout>
      <PageHero eyebrow="Solutions" title="Small business" description="HR and payroll that punch above their weight for teams under 200." actions={<ButtonLink to="/request-demo">Request a demo</ButtonLink>} />
      <Section>
        <div className="container-eh prose-like max-w-3xl space-y-4 text-[15px] leading-relaxed text-ink-soft">
          <p>HR and payroll that punch above their weight for teams under 200.</p>
          <p>This unofficial demo mirrors Employment Hero marketing structure with local seed data. Explore related pages from the header navigation or jump to <Link to="/pricing" className="font-semibold text-eh-purple underline">pricing</Link>.</p>
        </div>
      </Section>
    </PageLayout>
  );
}
