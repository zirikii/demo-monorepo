import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRIVATE_INVEST } from "@/data/products";

export default function PrivateInvestPage() {
  return (
    <PageLayout title="HUB24 Private Invest">
      <PageHero
        eyebrow="Private wealth"
        title={PRIVATE_INVEST.name}
        body={PRIVATE_INVEST.summary}
        actions={
          <>
            <ButtonLink to="/bdm-team">For advisers — contact a BDM</ButtonLink>
            <ButtonLink to="/hub24-for-clients" variant="inverse">
              For advised clients
            </ButtonLink>
          </>
        }
      />
      <Section>
        <SectionHeading title="A premium wealth experience for high-net-worth investors" />
        <ul className="grid gap-4 md:grid-cols-2">
          {PRIVATE_INVEST.bullets.map((item) => (
            <li key={item} className="rounded-hub-lg border border-line p-5 leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </PageLayout>
  );
}
