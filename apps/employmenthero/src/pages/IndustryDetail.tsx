import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { TestimonialCard } from "@/components/marketing/TestimonialCard";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LinkCard } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stat } from "@/components/ui/Stat";
import { CASE_STUDIES } from "@/data/caseStudies";
import { getIndustry, INDUSTRIES } from "@/data/solutions";
import { TESTIMONIALS } from "@/data/testimonials";

export default function IndustryDetailPage() {
  const { slug = "" } = useParams();
  const industry = getIndustry(slug);

  if (!industry) {
    return <Navigate to="/solutions" replace />;
  }

  const index = INDUSTRIES.indexOf(industry);
  const testimonial = TESTIMONIALS[index % TESTIMONIALS.length]!;
  const relatedStudies = CASE_STUDIES.filter(
    (study) => study.industry.toLowerCase() === industry.name.toLowerCase(),
  ).slice(0, 2);

  return (
    <PageLayout title={`${industry.name} solutions`}>
      <PageHero
        eyebrow={`${industry.name} solutions`}
        title={industry.headline}
        body={industry.intro}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Solutions", to: "/solutions" },
          { label: industry.name },
        ]}
        actions={
          <ButtonLink to="/request-a-demo" variant="inverse" size="lg">
            Request a demo
          </ButtonLink>
        }
        aside={
          <Card className="border-white/15 bg-white/5 text-white">
            <Stat value={industry.stat.value} label={industry.stat.label} tone="dark" />
            <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
              {industry.awards.map((award) => (
                <Badge key={award} tone="neutral" className="bg-white/10 text-white">
                  {award}
                </Badge>
              ))}
            </div>
          </Card>
        }
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="What we solve"
              title={`The ${industry.name.toLowerCase()} problems we hear most`}
            />
            <CheckList items={industry.painPoints} />
          </div>
          <TestimonialCard testimonial={testimonial} />
        </div>
      </Section>

      {relatedStudies.length ? (
        <Section tone="tint">
          <SectionHeading eyebrow="Customer stories" title={`${industry.name} in practice`} className="mb-10" />
          <div className="grid gap-5 md:grid-cols-2">
            {relatedStudies.map((study) => (
              <LinkCard key={study.slug} to={`/case-studies/${study.slug}`} className="flex flex-col gap-3">
                <h3 className="text-xl font-extrabold tracking-tight text-ink-strong">{study.company}</h3>
                <p className="text-sm text-ink-faint">{study.headcount}</p>
                <p className="flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{study.summary}</p>
              </LinkCard>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        title={`Ready to fix ${industry.name.toLowerCase()} employment?`}
        body="We'll map your awards, headcount and sites in a 30-minute session and show you exactly what changes."
      />
    </PageLayout>
  );
}
