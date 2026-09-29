import { Award, HandHeart, Leaf } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AppPromo } from "@/components/marketing/AppPromo";
import { BundleOffers } from "@/components/marketing/BundleOffers";
import { HelpTeaser } from "@/components/marketing/HelpTeaser";
import { HomeHero } from "@/components/marketing/HomeHero";
import { ProductTiles } from "@/components/marketing/ProductTiles";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const pillars = [
  {
    Icon: Award,
    title: "Award-winning service",
    body: "Recognised at the 2025 Customer Service Institute of Australia awards for service excellence.",
  },
  {
    Icon: Leaf,
    title: "Greener choices",
    body: "Add GreenPower, go Carbon Neutral or join our Virtual Power Plant with a home battery.",
  },
  {
    Icon: HandHeart,
    title: "Here when it's tough",
    body: "Our Staying Connected program offers payment plans, extensions and hardship support.",
  },
];

export function HomePage() {
  useDocumentTitle("Electricity, Gas, Internet and Mobile");
  return (
    <PageLayout>
      <HomeHero />

      <Section eyebrow="Residential" title="What are you looking for?">
        <ProductTiles />
      </Section>

      <Section tone="tint" eyebrow="Offers" title="Bundle more with AGL and save" intro="Join AGL for energy and save on nbn® and mobile every month.">
        <BundleOffers />
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-agl-lg border border-line-soft p-6">
              <Icon className="h-8 w-8 text-agl-blue" aria-hidden="true" />
              <h3 className="mt-3 text-xl font-extrabold text-ink">{title}</h3>
              <p className="mt-1.5 text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="pb-14 lg:pb-20">
        <div className="container-agl">
          <AppPromo />
        </div>
      </section>

      <section className="pb-14 lg:pb-20" id="assistant">
        <div className="container-agl">
          <HelpTeaser />
        </div>
      </section>

      <Section tone="tint" id="neighbourhood">
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-sm font-extrabold tracking-wider text-agl-teal-ink uppercase">AGL Neighbourhood</p>
            <h2 className="mt-2 text-3xl font-extrabold text-ink">Energy tips from people like you</h2>
            <p className="mt-2 text-ink-soft">
              Join our online community to swap energy-saving ideas, ask questions and hear first about new products.
            </p>
          </div>
          <div className="flex gap-3 lg:justify-end">
            <ButtonLink to="/help#neighbourhood">Join the community</ButtonLink>
            <ButtonLink to="/about" variant="secondary">
              About AGL
            </ButtonLink>
          </div>
        </div>
      </Section>

      <section aria-labelledby="important-info" className="border-t border-line-soft py-10">
        <div className="container-agl text-xs text-ink-faint">
          <h2 id="important-info" className="mb-2 text-sm font-bold text-ink-soft">
            Important information
          </h2>
          <p>
            Bill credits: up to $300 in total ($150 electricity and $150 gas) for new customers who join Value Saver online and stay 90
            days. nbn® and mobile discounts apply while you hold an active AGL residential energy account. Prices shown are illustrative
            for this unofficial demo and do not reflect real AGL offers.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
