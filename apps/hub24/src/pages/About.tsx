import { PageHero } from "@/components/marketing/PageHero";
import { StatBand } from "@/components/marketing/StatBand";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { CardBody, CardHeading, LinkCard } from "@/components/ui/Card";
import { ABOUT, GROUP_BRANDS } from "@/data/group";

export default function AboutPage() {
  return (
    <PageLayout title="About us">
      <PageHero eyebrow="About HUB24" title="Empowering better financial futures" body={ABOUT.intro} />
      <Section>
        <p className="max-w-3xl text-lg leading-relaxed text-ink-soft">{ABOUT.belief}</p>
        <p className="mt-6 max-w-3xl leading-relaxed text-ink-soft">{ABOUT.history}</p>
      </Section>
      <StatBand />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <LinkCard to="/class">
            <CardHeading>{GROUP_BRANDS.class.name}</CardHeading>
            <CardBody className="mt-2">{GROUP_BRANDS.class.summary}</CardBody>
          </LinkCard>
          <LinkCard to="/myprosperity">
            <CardHeading>{GROUP_BRANDS.myprosperity.name}</CardHeading>
            <CardBody className="mt-2">{GROUP_BRANDS.myprosperity.summary}</CardBody>
          </LinkCard>
        </div>
      </Section>
    </PageLayout>
  );
}
