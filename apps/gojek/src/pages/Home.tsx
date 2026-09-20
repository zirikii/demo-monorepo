import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { AppMockup } from "@/components/marketing/AppMockup";
import { CtaBand } from "@/components/marketing/CtaBand";
import { FeatureList } from "@/components/marketing/FeatureList";
import { OpenSourceCard } from "@/components/marketing/OpenSourceCard";
import { PostCard } from "@/components/marketing/PostCard";
import { ProductCard } from "@/components/marketing/ProductCard";
import { StoryCard } from "@/components/marketing/StoryCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatTile } from "@/components/ui/StatTile";
import { EMPLOYEE_STORIES } from "@/data/culture";
import { OPEN_SOURCE_FACTS, OPEN_SOURCE_INTRO, OPEN_SOURCE_PROJECTS } from "@/data/opensource";
import { PRODUCT_CATEGORIES, productsByCategory } from "@/data/products";
import { HERO_STATS, PLATFORM_STATS } from "@/data/site";
import { latestPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = latestPosts(3);

  return (
    <PageLayout title="3 countries. 20+ products. One platform.">
      <section className="bg-night text-white">
        <div className="container-go-wide grid gap-12 py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:py-28">
          <div className="animate-go-rise flex flex-col gap-7">
            <span className="text-xs font-extrabold tracking-[0.2em] text-go-green-soft uppercase">
              Gojek Tech
            </span>
            <h1 className="display-go text-5xl sm:text-6xl lg:text-[4.75rem]">
              3 countries.
              <br />
              20+ products.
              <br />
              <span className="text-go-green-soft">One on-demand platform.</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">
              Rides, deliveries, payments, and merchant tools, built by squads who own their
              services from the first design document through to the pager.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink to="/join-us" size="lg">
                Join us
              </ButtonLink>
              <ButtonLink
                to="/products"
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10"
              >
                Explore the products
              </ButtonLink>
            </div>
          </div>

          <AppMockup />
        </div>

        <div className="container-go-wide grid gap-4 pb-20 sm:grid-cols-2 lg:grid-cols-4">
          {HERO_STATS.map((stat) => (
            <StatTile
              key={stat.label}
              value={stat.value}
              label={stat.label}
              detail={stat.detail}
              tone="dark"
            />
          ))}
        </div>
      </section>

      <Section width="wide">
        <SectionHeading
          eyebrow="The portfolio"
          title="More than twenty products serving millions of customers every day"
          body="Six families of products share one identity, one wallet, and one allocation layer. Each category below links through to what the teams behind it actually build."
          action={
            <ButtonLink to="/products" variant="secondary">
              All products
            </ButtonLink>
          }
        />

        <div className="mt-14 flex flex-col gap-14">
          {PRODUCT_CATEGORIES.map((category) => (
            <div key={category.id} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 border-t border-line pt-6">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: category.accent }}
                  />
                  <h3 className="text-2xl font-extrabold tracking-tight text-ink-strong">
                    {category.name}
                  </h3>
                </div>
                <p className="max-w-2xl text-sm text-ink-soft">{category.blurb}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {productsByCategory(category.id).map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="tint" width="wide">
        <SectionHeading
          eyebrow="Scale"
          title="Our tech carries a country's Tuesday"
          body="These are the numbers the platform teams design against. Peak is not an abstraction here; it arrives at 11am and again at sunset."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORM_STATS.map((stat) => (
            <StatTile key={stat.label} value={stat.value} label={stat.label} detail={stat.detail} />
          ))}
        </div>
      </Section>

      <Section tone="dark" width="wide">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Open source"
              tone="dark"
              title={
                <>
                  We <span className="text-go-green-soft">❤︎</span> open source.
                </>
              }
              body={OPEN_SOURCE_INTRO}
            />
            <FeatureList items={OPEN_SOURCE_FACTS} tone="dark" />
            <ButtonLink to="/open-source" variant="inverse" className="self-start">
              Browse the repositories
            </ButtonLink>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {OPEN_SOURCE_PROJECTS.slice(0, 4).map((project) => (
              <OpenSourceCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </Section>

      <Section width="wide">
        <SectionHeading
          eyebrow="Life@Gojek"
          title="Small teams, real ownership, and a very short feedback loop"
          body="Our engineers ship to a platform they can watch working on the street outside the office. That proximity shapes how we hire, review, and operate."
          action={
            <ButtonLink to="/life-at-gojek" variant="secondary">
              Life@Gojek
            </ButtonLink>
          }
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {EMPLOYEE_STORIES.map((story) => (
            <StoryCard key={story.name} story={story} />
          ))}
        </div>
      </Section>

      <Section tone="tint" width="wide">
        <SectionHeading
          eyebrow="Blogs & News"
          title="How we do what we do"
          body="Engineering write-ups, product decisions, and the occasional honest retrospective."
          action={
            <Link
              to="/blog"
              className="focus-go inline-flex items-center gap-2 text-sm font-bold text-go-green"
            >
              All stories
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          }
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
