import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { LogoWall } from "@/components/marketing/LogoWall";
import { PortfolioMockup } from "@/components/marketing/PortfolioMockup";
import { StatBand } from "@/components/marketing/StatBand";
import { TestimonialCard } from "@/components/marketing/TestimonialCard";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeading, LinkCard } from "@/components/ui/Card";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AUDIENCES } from "@/data/audiences";
import { INSIGHTS } from "@/data/insights";
import { PLATFORM_FEATURES } from "@/data/products";
import { GROUP_METRICS } from "@/data/site";
import { TESTIMONIALS } from "@/data/testimonials";
import { FEATURE_ICONS } from "@/components/marketing/icons";
import { formatBillions, formatDate, formatNumber } from "@/lib/format";

const HOME_AUDIENCES = ["advisers", "advised-clients", "investment-managers"] as const;

export default function HomePage() {
  const featured = INSIGHTS.filter((insight) => insight.featured);
  const recent = INSIGHTS.filter((insight) => !insight.featured).slice(0, 2);

  return (
    <PageLayout title="Empowering better financial futures, together">
      <section className="relative overflow-hidden bg-h24-navy text-white">
        <div
          aria-hidden
          className="absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full bg-h24-teal/20 blur-3xl"
        />
        <div className="container-h24-wide relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-h24-rise flex flex-col gap-6">
            <span className="w-fit rounded-full border border-white/20 px-3 py-1 text-xs font-bold tracking-[0.16em] text-h24-aqua uppercase">
              Australia&apos;s best platform
            </span>
            <h1 className="text-balance-h24 font-display text-4xl font-semibold md:text-[3.6rem] md:leading-[1.04]">
              Empowering better financial futures, together.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-h24-sky">
              We believe in the value of advice and enabling accessible financial advice to more
              Australians. We&apos;re continually investing in innovative products and solutions that
              drive productivity in your business and enhance the value of your advice — all in one
              place.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink to="/features-benefits/" size="lg">
                Explore the platform
              </ButtonLink>
              <ButtonLink to="/hub24-for-advisers/" variant="outline" size="lg">
                HUB24 for advisers
              </ButtonLink>
            </div>
            <p className="text-sm text-h24-sky">
              Administering{" "}
              <strong className="font-semibold text-white">
                {formatBillions(GROUP_METRICS.totalFua)}
              </strong>{" "}
              for {formatNumber(GROUP_METRICS.activeAdvisers)} active advisers.
            </p>
          </div>

          <PortfolioMockup className="animate-h24-rise" />
        </div>
      </section>

      <Section tone="tint" wide>
        <StatBand
          items={[
            {
              value: formatBillions(GROUP_METRICS.totalFua),
              label: "Total funds under administration",
              note: "Up 20% year on year",
            },
            {
              value: formatBillions(GROUP_METRICS.platformFua),
              label: "Platform FUA",
              note: "Up 24% year on year",
            },
            {
              value: formatBillions(GROUP_METRICS.netInflows),
              label: "FY26 platform net inflows",
              note: "Record organic growth",
            },
            {
              value: formatNumber(GROUP_METRICS.activeAdvisers),
              label: "Active advisers",
              note: `${GROUP_METRICS.marketSharePercent}% market share`,
            },
          ]}
        />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Solutions for you"
          title="We're creating Australia's best platform, together"
          body="Advisers, private wealth practices, licensees, investment managers and advised clients each need something different from a platform. Start where you fit."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {HOME_AUDIENCES.map((slug) => {
            const audience = AUDIENCES.find((item) => item.slug === slug)!;
            return (
              <LinkCard key={audience.slug} to={audience.path} className="flex h-full flex-col gap-4">
                <span className="text-xs font-bold tracking-[0.16em] text-h24-teal-dark uppercase">
                  HUB24 for
                </span>
                <CardHeading className="text-2xl">{audience.navLabel}</CardHeading>
                <CardBody className="flex-1">{audience.intro}</CardBody>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-h24-teal-dark">
                  Learn more
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </span>
              </LinkCard>
            );
          })}
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link to="/hub24-for-brokers/" className="focus-h24 font-semibold text-h24-teal-dark hover:underline">
            HUB24 for private wealth
          </Link>
          <Link to="/hub24-for-licensees/" className="focus-h24 font-semibold text-h24-teal-dark hover:underline">
            HUB24 for licensees
          </Link>
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Innovation that delivers"
              title="One platform for every client segment"
              body="From cost-effective managed portfolios through to uncapped term deposits and OTC bond trading, the capability scales with the complexity of the client."
            />
            <CheckList
              items={[
                "Managed portfolio functionality rated best in market by advisers",
                "Discover, Core and Choice menus so pricing follows the client",
                "SMSF Access for clients who want their own structure",
                "Engage reporting across custodial and non-custodial assets",
              ]}
            />
            <ButtonLink to="/features-benefits/" className="w-fit">
              Features &amp; benefits
            </ButtonLink>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {PLATFORM_FEATURES.slice(0, 4).map((feature) => (
              <Card key={feature.slug} className="flex flex-col gap-4">
                <FeatureIcon icon={FEATURE_ICONS[feature.icon]} />
                <CardHeading>{feature.eyebrow}</CardHeading>
                <CardBody>{feature.body}</CardBody>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <LogoWall />
      </Section>

      <Section tone="navy">
        <SectionHeading
          eyebrow="What practices tell us"
          title="Advice businesses, in their words"
          tone="dark"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Insights"
            title="Connecting you to the latest industry thinking"
            body="Commentary from our team and leading advice experts."
          />
          <ButtonLink to="/insights/" variant="secondary">
            All insights
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[...featured, ...recent].map((insight) => (
            <LinkCard
              key={insight.slug}
              to={`/insights/${insight.slug}/`}
              className="flex h-full flex-col gap-3"
            >
              <span className="text-xs font-bold tracking-[0.16em] text-h24-teal-dark uppercase">
                {insight.category}
              </span>
              <CardHeading>{insight.title}</CardHeading>
              <CardBody className="flex-1">{insight.excerpt}</CardBody>
              <span className="text-xs text-ink-faint">
                {insight.author} · {formatDate(insight.published)}
              </span>
            </LinkCard>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Let's talk about how our market-leading platform can help you"
        body="Submit your details and one of our team will be in touch. Advisers can also speak directly to their local Business Development Manager."
      />
    </PageLayout>
  );
}
