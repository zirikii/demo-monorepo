import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { FeatureList } from "@/components/marketing/FeatureList";
import { OpenSourceCard } from "@/components/marketing/OpenSourceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OPEN_SOURCE_FACTS, OPEN_SOURCE_INTRO, OPEN_SOURCE_PROJECTS } from "@/data/opensource";

export default function OpenSourcePage() {
  return (
    <PageLayout title="Open source">
      <PageHero
        eyebrow="Open source"
        title="Tools we rely on, published so somebody else can rely on them too"
        body={OPEN_SOURCE_INTRO}
        aside={<FeatureList items={OPEN_SOURCE_FACTS} tone="dark" />}
      />

      <Section tone="dark" width="wide">
        <SectionHeading
          eyebrow="Repositories"
          tone="dark"
          title="What we maintain in public"
          body="Fictional repositories for this demo. Each one has a maintainer rota and a published response target."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OPEN_SOURCE_PROJECTS.map((project) => (
            <OpenSourceCard key={project.name} project={project} />
          ))}
        </div>
      </Section>

      <Section width="wide">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-strong">
              How we decide to open-source something
            </h2>
            <FeatureList
              items={[
                "It has carried production traffic for at least two quarters",
                "A named team is willing to maintain it in public, not just publish it",
                "Its configuration surface makes sense outside our own infrastructure",
                "We can document the operational failure modes honestly",
              ]}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-strong">
              What we ask of contributors
            </h2>
            <FeatureList
              items={[
                "Open an issue before a large change so nobody wastes a weekend",
                "Include a test that would have caught the bug you are fixing",
                "Keep the public API boring; surprises are expensive downstream",
                "Expect a first response within three working days",
              ]}
            />
          </div>
        </div>
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
