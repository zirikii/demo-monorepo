import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/home/Hero";
import { DifferenceStrip } from "@/components/home/DifferenceStrip";
import { ProductSpotlight } from "@/components/home/ProductSpotlight";
import { TestimonialBand } from "@/components/home/TestimonialBand";
import { CtaBand } from "@/components/home/CtaBand";
import { IndustryBadges } from "@/components/home/IndustryBadges";
import { PersonaTabs } from "@/components/home/PersonaTabs";
import { InsightsCarousel } from "@/components/home/InsightsCarousel";

export function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <DifferenceStrip />

      <ProductSpotlight
        eyebrow="Squiz DXP"
        eyebrowTint="mint"
        title="Turn marketing ideas into live experiences, fast"
        copy="Launch campaigns, personalize content, run tests, and update pages from one platform — no development bottlenecks. Marketers move faster across sites, intranets, and portals while developers focus on what's genuinely new."
        primaryCta={{ label: "Explore Squiz DXP", to: "/products/digital-experience-platform" }}
        secondaryCta={{ label: "See it in action", to: "/demos" }}
        story={{
          text: "Southbank University tripled user satisfaction when they moved their legacy CMS to Squiz DXP.",
          to: "/customer-stories/southbank-university",
        }}
        illustration={{
          icon: "Blocks",
          caption: "Visual Page Builder",
          bullets: [
            "Drag approved components into layouts",
            "Edit content inline, preview instantly",
            "Publish on schedule with workflow sign-off",
          ],
        }}
      />

      <ProductSpotlight
        eyebrow="Squiz Funnelback Search"
        eyebrowTint="blue"
        title="Give your audience the answers they need, wherever they search"
        copy="Proven keyword search, AI-powered conversational answers, and performance insight in one platform. Your content stays discoverable on your site, on Google, and inside AI assistants."
        primaryCta={{
          label: "Explore Funnelback Search",
          to: "/products/squiz-funnelback-search",
        }}
        secondaryCta={{
          label: "See Conversational Search",
          to: "/products/capabilities/conversational-search",
        }}
        story={{
          text: "Greenfield University transformed student experiences on their site with Conversational Search.",
          to: "/customer-stories/greenfield-university-conversational-search",
        }}
        illustration={{
          icon: "MessageSquareText",
          caption: "Conversational Search",
          bullets: [
            "Direct answers grounded in your content",
            "Citations back to the source page",
            "Transcripts reveal real audience demand",
          ],
        }}
        reversed
      />

      <ProductSpotlight
        eyebrow="Squiz Content Intelligence"
        eyebrowTint="purple"
        title="See how your website performs in AI engines"
        copy="Understand how AI systems read your site, uncover accessibility and structure gaps, and get a prioritized improvement plan — no integrations or CMS changes required."
        primaryCta={{ label: "Explore Content Intelligence", to: "/products/content-intelligence" }}
        illustration={{
          icon: "Sparkles",
          caption: "AI Readiness Report",
          bullets: [
            "Per-page AI visibility scoring",
            "WCAG issues ranked by user impact",
            "Ordered fix list your editors can action",
          ],
        }}
      />

      <TestimonialBand />
      <CtaBand />
      <IndustryBadges />
      <PersonaTabs />
      <InsightsCarousel />
    </PageLayout>
  );
}
