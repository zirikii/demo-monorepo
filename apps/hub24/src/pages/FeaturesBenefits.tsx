import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { AwardStrip } from "@/components/marketing/AwardStrip";
import { CtaBand } from "@/components/marketing/CtaBand";
import { MenuComparison } from "@/components/marketing/MenuComparison";
import { PlatformMockup } from "@/components/marketing/PlatformMockup";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FEATURE_BENEFITS } from "@/data/features";

export default function FeaturesBenefitsPage() {
  return (
    <PageLayout title="HUB24 Platform features & benefits">
      <PageHero
        eyebrow="HUB24 Platform"
        title="Features &amp; benefits"
        body="We're committed to delivering solutions that cater to the diverse needs of your clients, regardless of investment complexity — from managed portfolio technology to SMSFs and high net worth capability."
        crumbs={[{ label: "Home", to: "/" }, { label: "Features & benefits" }]}
        actions={
          <ButtonLink to="/contact-us#demo" variant="inverse">
            Book a platform walkthrough
          </ButtonLink>
        }
        aside={<PlatformMockup />}
      />

      <Section>
        <SectionHeading
          eyebrow="Productivity"
          title="10 ways to drive productivity and reduce complexity"
          body="Each of these exists because advisers told us where the time goes."
        />
        <ol className="mt-10 grid gap-6 md:grid-cols-2">
          {FEATURE_BENEFITS.map((feature) => (
            <li key={feature.number}>
              <Card className="flex h-full gap-4">
                <FeatureIcon name={feature.icon} />
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-extrabold tracking-[0.16em] text-hub-teal-dark">
                    {String(feature.number).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">
                    {feature.title}
                  </h3>
                  <p className="text-ink-soft">{feature.body}</p>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="menus" tone="tint">
        <SectionHeading
          eyebrow="Investment menus"
          title="Three menus, one account"
          body="Every client is different, so the platform offers three investment menus. Clients can move between them as their needs change while keeping the same account and underlying investments."
        />
        <div className="mt-10">
          <MenuComparison />
        </div>
        <p className="mt-4 text-sm text-ink-faint">
          Demo comparison. Refer to the relevant product disclosure documents for the real fee and
          availability detail.
        </p>
      </Section>

      <Section>
        <SectionHeading eyebrow="Recognition" title="Rated by the advisers who use it" />
        <div className="mt-10">
          <AwardStrip limit={8} />
        </div>
      </Section>

      <CtaBand
        title="See the platform in action"
        body="A business development manager can walk your team through trading, tax optimisation and reporting on live demo data."
        primary={{ label: "Request a walkthrough", to: "/contact-us#demo" }}
        secondary={{ label: "Read product documents", to: "/product-documents" }}
      />
    </PageLayout>
  );
}
