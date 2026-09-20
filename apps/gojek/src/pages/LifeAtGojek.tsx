import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { StoryCard } from "@/components/marketing/StoryCard";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BENEFITS, CULTURE_PRINCIPLES, EMPLOYEE_STORIES, WAYS_OF_WORKING } from "@/data/culture";

export default function LifeAtGojekPage() {
  return (
    <PageLayout title="Life@Gojek">
      <PageHero
        eyebrow="Life@Gojek"
        title="We believe failing is learning. If nothing is failing, we are not pushing hard enough."
        body="What it is actually like to build here: how we make decisions, how we protect focus, and what we give people so the work is sustainable."
        actions={
          <>
            <ButtonLink to="/join-us" size="lg">
              See open roles
            </ButtonLink>
            <ButtonLink
              to="/blog?category=Culture"
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10"
            >
              Culture writing
            </ButtonLink>
          </>
        }
      />

      <Section width="wide">
        <SectionHeading
          eyebrow="Culture"
          title="Six things we actually hold each other to"
          body="Not values on a wall. These are the tie-breakers we use when a decision is genuinely close."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CULTURE_PRINCIPLES.map((principle, index) => (
            <Card key={principle.title}>
              <CardBody className="flex flex-col gap-3">
                <span className="text-sm font-extrabold text-go-green">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">
                  {principle.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">{principle.body}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="tint" width="wide">
        <SectionHeading
          eyebrow="Ways of working"
          title="How the week is actually structured"
          body="Distributed teams need explicit rules. These are ours, and they are enforced by calendar, not by hope."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {WAYS_OF_WORKING.map((entry) => (
            <div key={entry.title} className="rounded-go-lg border border-line bg-white p-6">
              <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">
                {entry.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{entry.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section width="wide">
        <SectionHeading
          eyebrow="We care for you"
          title="Benefits that assume you have a life outside this"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="rounded-go-lg bg-surface-tint p-6">
              <h3 className="text-base font-extrabold text-ink-strong">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{benefit.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="tint" width="wide">
        <SectionHeading eyebrow="Our stories" title="In their words" />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {EMPLOYEE_STORIES.map((story) => (
            <StoryCard key={story.name} story={story} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
