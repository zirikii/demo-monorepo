import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { CapabilityCard } from "@/components/shared/CapabilityCard";
import { StoryCard } from "@/components/shared/StoryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getIndustry } from "@/data/industries";
import { getCapability } from "@/data/capabilities";
import { getStory } from "@/data/stories";
import { NotFoundPage } from "./NotFound";

export function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const industry = slug ? getIndustry(slug) : undefined;
  if (!industry) return <NotFoundPage />;

  const caps = industry.capabilities
    .map((s) => getCapability(s))
    .filter((c) => c !== undefined);
  const story = industry.storySlug ? getStory(industry.storySlug) : undefined;

  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Industries", to: "/industries" }, { label: industry.name }]} />
      <PageHero
        eyebrow={industry.name}
        eyebrowTint={industry.tint}
        title={industry.heroTitle}
        copy={industry.heroCopy}
      >
        <Button to="/book-a-call" size="lg" withArrow>
          Talk to a sector expert
        </Button>
        <Button to="/customer-stories" variant="secondary" size="lg">
          See customer stories
        </Button>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading eyebrow="Challenges we solve" title={`What ${industry.name.toLowerCase()} teams bring to us`} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {industry.challenges.map((challenge) => (
            <div key={challenge.title} className="rounded-2xl border border-cream-deep bg-card p-7 shadow-card">
              <h3 className="text-lg font-semibold text-navy">{challenge.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{challenge.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy py-16 text-white squiz-lines-dark lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {industry.outcomes.map(({ stat, label }) => (
              <div key={label}>
                <p className="font-heading text-5xl font-semibold text-mint">{stat}</p>
                <p className="mt-2 text-sm text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading eyebrow="Capabilities" title={`Where ${industry.name.toLowerCase()} teams start`} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {caps.map((c) => (
            <CapabilityCard key={c.slug} capability={c} />
          ))}
        </div>
      </section>

      {story && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <SectionHeading eyebrow="Customer story" title="Proof from the sector" />
          <div className="mt-10 max-w-xl">
            <StoryCard story={story} />
          </div>
        </section>
      )}

      <CtaSection />
    </PageLayout>
  );
}
