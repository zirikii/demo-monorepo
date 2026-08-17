import { ArrowRight, LineChart, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { AwardStrip } from "@/components/marketing/AwardStrip";
import { CtaBand } from "@/components/marketing/CtaBand";
import { InsightCard } from "@/components/marketing/InsightCard";
import { LogoWall } from "@/components/marketing/LogoWall";
import { PlatformMockup } from "@/components/marketing/PlatformMockup";
import { ProductCard } from "@/components/marketing/ProductCard";
import { StatBand } from "@/components/marketing/StatBand";
import { Testimonial } from "@/components/marketing/Testimonial";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, LinkCard } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INSIGHTS } from "@/data/insights";
import { PRODUCTS } from "@/data/products";
import { SHARE_INFO } from "@/data/company";
import { SITE } from "@/data/site";
import { SOLUTIONS } from "@/data/solutions";
import { signedPercent } from "@/lib/format";

const AUDIENCE_CARDS = [
  {
    slug: "advisers",
    icon: Users,
    title: "Advisers, private wealth and licensees",
    body: "Do business your way, empowered by technology that provides efficiencies to support business growth and the delivery of advice for your clients.",
    cta: "Advisers",
  },
  {
    slug: "advised-clients",
    icon: LineChart,
    title: "Advised clients",
    body: "Learn how your adviser can connect you to a range of market-leading super, pension, investment and insurance solutions, including managed portfolio technology.",
    cta: "Advised clients",
  },
  {
    slug: "investment-managers",
    icon: TrendingUp,
    title: "Investment managers",
    body: "Learn how our market-leading technology can empower your investment management expertise and put your models in front of more advisers.",
    cta: "Investment managers",
  },
] as const;

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter((product) =>
    [
      "hub24-invest",
      "hub24-super",
      "managed-portfolios",
      "engage",
      "class",
      "myprosperity",
    ].includes(product.slug),
  );
  const latestInsights = INSIGHTS.slice(0, 3);
  const adviserSolution = SOLUTIONS[0];

  return (
    <PageLayout title="Empowering better financial futures together">
      <section className="bg-hub-navy text-white">
        <div className="container-hub grid gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="animate-hub-rise flex flex-col gap-6">
            <Badge tone="inverse">Australia&rsquo;s best platform, six years running</Badge>
            <h1 className="text-balance-hub text-4xl leading-[1.03] font-extrabold tracking-tight md:text-6xl">
              {SITE.tagline}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/80">
              We believe in the value of advice and enabling accessible financial advice to more
              Australians. We&rsquo;re continually investing in innovative products and solutions
              that drive productivity in your business and enhance the value of your advice, all in
              one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink to="/products-solutions" size="lg" variant="inverse">
                Explore products &amp; solutions
              </ButtonLink>
              <ButtonLink
                to="/features-benefits"
                size="lg"
                variant="ghost"
                className="border border-white/40 text-white hover:bg-white/10"
              >
                Features &amp; benefits
              </ButtonLink>
            </div>
            <p className="text-sm text-white/60">
              Unofficial demonstration build. All figures and accounts shown are fictional.
            </p>
          </div>

          <PlatformMockup />
        </div>
      </section>

      <Section tone="tint">
        <StatBand />
        <p className="mt-8 text-sm text-ink-faint">
          Illustrative demo figures. In the real world HUB24 reports platform funds under
          administration quarterly to the ASX.
        </p>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Innovation that delivers"
          title="One platform, connected to the rest of your practice"
          body="HUB24 leads the wealth industry as a provider of integrated platform, technology and data solutions. Through market-leading innovation we're delivering efficiencies that reduce complexity for you and your clients."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {AUDIENCE_CARDS.map((card) => (
            <LinkCard
              key={card.slug}
              to={`/solutions/${card.slug}`}
              className="flex h-full flex-col gap-4"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-hub bg-hub-tint text-hub-blue">
                <card.icon aria-hidden className="h-6 w-6" />
              </span>
              <span className="text-xs font-extrabold tracking-[0.16em] text-hub-teal-dark uppercase">
                HUB24 for
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight text-ink-strong">
                {card.title}
              </h3>
              <p className="flex-1 text-ink-soft">{card.body}</p>
              <span className="inline-flex items-center gap-2 font-bold text-hub-blue">
                {card.cta}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </span>
            </LinkCard>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Products &amp; solutions"
            title="Solutions that work together"
            body="The HUB24 Platform, Class and myprosperity are designed to work together to improve practice productivity and client engagement."
            className="max-w-3xl"
          />
          <ButtonLink to="/products-solutions" variant="secondary">
            Browse all products
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Recognition"
          title="We&rsquo;re creating Australia&rsquo;s best platform, together"
          body="Rated by advisers across platform functionality, product offering, reporting and support."
        />
        <div className="mt-10">
          <AwardStrip />
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {adviserSolution?.quote ? (
            <Testimonial
              body={adviserSolution.quote.body}
              name={adviserSolution.quote.name}
              role={adviserSolution.quote.role}
            />
          ) : null}
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Trusted by advice practices"
              title="Practices of every shape run on HUB24"
              body="From single-adviser practices to national licensee networks, the platform adapts to the way you already work."
            />
            <LogoWall />
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Insights"
            title="What&rsquo;s happening at HUB24"
            className="max-w-2xl"
          />
          <ButtonLink to="/insights" variant="secondary">
            All insights
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {latestInsights.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <Card
          tone="navy"
          className="flex flex-col gap-6 p-9 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex max-w-2xl flex-col gap-3">
            <span className="text-xs font-extrabold tracking-[0.16em] text-hub-teal-soft uppercase">
              Shareholder centre
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">Are you a HUB24 shareholder?</h2>
            <p className="text-white/80">
              Find company announcements, results, key dates and registry details in the shareholder
              centre.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <span className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold">${SHARE_INFO.price.toFixed(2)}</span>
              <span className="font-bold text-hub-teal-soft">
                {signedPercent(SHARE_INFO.changePercent, 1)}
              </span>
            </span>
            <span className="text-sm text-white/60">
              {SHARE_INFO.ticker} · demo price as at {SHARE_INFO.asAt}
            </span>
            <Link
              to="/shareholder-centre"
              className="focus-hub inline-flex items-center gap-2 font-bold text-white underline underline-offset-4"
            >
              Visit the shareholder centre
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
