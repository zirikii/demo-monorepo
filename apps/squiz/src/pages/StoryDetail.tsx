import { useParams } from "react-router-dom";
import { Quote } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { StoryCard } from "@/components/shared/StoryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { stories, getStory } from "@/data/stories";
import { NotFoundPage } from "./NotFound";

export function StoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const story = slug ? getStory(slug) : undefined;
  if (!story) return <NotFoundPage />;

  const more = stories.filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <PageLayout>
      <Breadcrumbs
        crumbs={[{ label: "Customer stories", to: "/customer-stories" }, { label: story.customer }]}
      />
      <PageHero eyebrow={story.industryLabel} eyebrowTint={story.tint} title={story.title} copy={story.summary}>
        <div className="flex flex-wrap gap-2">
          {story.products.map((p) => (
            <Badge key={p} tint="outline">
              {p}
            </Badge>
          ))}
        </div>
      </PageHero>

      <section className="bg-navy py-14 text-white squiz-lines-dark">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {story.stats.map(({ stat, label }) => (
            <div key={label}>
              <p className="font-heading text-4xl font-semibold text-mint sm:text-5xl">{stat}</p>
              <p className="mt-2 text-sm text-white/70">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        {story.body.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="text-2xl font-semibold text-navy">{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </section>
        ))}

        <figure className="relative mt-12 rounded-3xl bg-cream-alt p-8 sm:p-10">
          <Quote className="absolute -top-5 left-8 size-10 rounded-xl bg-mint p-2 text-navy" aria-hidden />
          <blockquote className="text-xl font-medium leading-relaxed text-navy">
            “{story.quote.text}”
          </blockquote>
          <figcaption className="mt-5 text-sm text-ink-soft">
            <span className="font-semibold text-navy">{story.quote.name}</span> — {story.quote.role}
          </figcaption>
        </figure>
      </article>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <SectionHeading title="More customer stories" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      </section>

      <CtaSection />
    </PageLayout>
  );
}
