import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { FaqSection } from "@/components/shared/FaqSection";
import { StoryCard } from "@/components/shared/StoryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { getStory } from "@/data/stories";

const searchModes = [
  {
    icon: "Search",
    title: "Keyword Search",
    copy: "Relevance-tuned enterprise search across websites, PDFs, databases, and third-party systems — with synonyms, best bets, and analytics.",
    to: "/products/capabilities/keyword-search",
  },
  {
    icon: "MessageSquareText",
    title: "Conversational Search",
    copy: "A chat-style experience that answers questions directly from your approved content, with citations users can verify.",
    to: "/products/capabilities/conversational-search",
  },
  {
    icon: "Sparkles",
    title: "AI Readiness Auditor",
    copy: "See how external AI engines interpret your content, and get a prioritized plan to earn more citations.",
    to: "/products/capabilities/ai-readiness-auditor",
  },
];

const searchStats = [
  { stat: "70+", label: "ranking signals behind every result" },
  { stat: "82%", label: "of questions resolved without a click-through" },
  { stat: "45%", label: "fewer search-related support tickets" },
  { stat: "6 wks", label: "typical time from contract to launch" },
];

const searchFaqs = [
  {
    q: "Does Funnelback require the Squiz CMS?",
    a: "No. Funnelback is platform-agnostic — it crawls and indexes any website or repository, whatever CMS you run, and can be deployed without any replatforming.",
  },
  {
    q: "How do conversational answers stay accurate?",
    a: "Answers are generated exclusively from your indexed, approved content and always carry citations. When the index can't support an answer, the assistant says so rather than guessing.",
  },
  {
    q: "What can we learn from search data?",
    a: "Query analytics show what your audience asks in their own words — top queries, zero-result searches, and unanswered questions — which is direct input for your content plan.",
  },
];

export function ProductSearchPage() {
  const story = getStory("greenfield-university-conversational-search");
  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Products" }, { label: "Squiz Funnelback Search" }]} />
      <PageHero
        eyebrow="Squiz Funnelback Search"
        eyebrowTint="blue"
        title="From question to answer, faster than ever"
        copy="Users spend too much time hunting for information that should be at their fingertips. Funnelback combines proven keyword relevance with AI-generated conversational answers — grounded in your content, everywhere your audience searches."
      >
        <Button to="/book-a-call" size="lg" withArrow>
          See it on your content
        </Button>
        <Button
          to="/products/capabilities/conversational-search"
          variant="secondary"
          size="lg"
        >
          Explore Conversational Search
        </Button>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          eyebrow="Three layers"
          title="One search platform, three ways to win"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {searchModes.map((mode) => (
            <div
              key={mode.title}
              className="rounded-2xl border border-cream-deep bg-card p-7 shadow-card"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-badge-blue text-navy">
                <Icon name={mode.icon} className="size-5" />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-navy">{mode.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{mode.copy}</p>
              <Button to={mode.to} variant="ghost" className="mt-4 px-0" withArrow>
                Learn more
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy py-16 text-white squiz-lines-dark lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {searchStats.map(({ stat, label }) => (
              <div key={label}>
                <p className="font-heading text-5xl font-semibold text-mint">{stat}</p>
                <p className="mt-2 text-sm text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {story && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <SectionHeading eyebrow="Customer story" title="Search in the wild" />
          <div className="mt-10 max-w-xl">
            <StoryCard story={story} />
          </div>
        </section>
      )}

      <FaqSection items={searchFaqs} />
      <CtaSection
        title="Hear it answer your audience's questions"
        copy="Bring your top fifty queries to a demo and watch Funnelback handle them live."
      />
    </PageLayout>
  );
}
