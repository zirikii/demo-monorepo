import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRICING_PLANS } from "@/data/pricing";
import { getBusinessSize } from "@/data/solutions";

export default function BusinessSizeDetailPage() {
  const { slug = "" } = useParams();
  const size = getBusinessSize(slug);

  if (!size) {
    return <Navigate to="/solutions" replace />;
  }

  const plan = PRICING_PLANS.find((candidate) => candidate.name === size.recommendedPlan);

  return (
    <PageLayout title={size.name}>
      <PageHero
        eyebrow={size.range}
        title={size.headline}
        body={size.intro}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Solutions", to: "/solutions" },
          { label: size.name },
        ]}
        actions={
          <ButtonLink to="/request-a-demo" variant="inverse" size="lg">
            Request a demo
          </ButtonLink>
        }
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="Priorities" title={`What matters at ${size.range}`} />
            <CheckList items={size.priorities} />
          </div>
          {plan ? (
            <Card className="flex flex-col gap-5">
              <span className="text-xs font-extrabold tracking-[0.12em] text-eh-purple uppercase">
                Recommended plan
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight text-ink-strong">{plan.name}</h3>
              <p className="text-4xl font-extrabold text-ink-strong">{plan.price}</p>
              <p className="text-sm text-ink-faint">{plan.priceNote}</p>
              <p className="text-[0.95rem] leading-relaxed text-ink-soft">{plan.positioning}</p>
              <ButtonLink to="/pricing" variant="secondary" className="w-full">
                Compare all plans
              </ButtonLink>
            </Card>
          ) : null}
        </div>
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
