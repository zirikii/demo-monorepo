import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeading } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GROUP_BRANDS } from "@/data/company";

const SEGMENT_LINKS: Record<string, string> = {
  hub24: "/features-benefits/",
  class: "/product/class/",
  nowinfinity: "/product/class/",
  myprosperity: "/products-solutions/",
  hubconnect: "/product/hubconnect/",
};

export default function GroupPage() {
  return (
    <PageLayout title="Our brands">
      <PageHero
        eyebrow="HUB24 Group"
        title="One group, five businesses"
        body="HUB24 Limited is listed on the ASX under the code HUB and includes the award-winning HUB24 platform, the Class and NowInfinity businesses, HUBconnect and myprosperity."
        crumbs={[{ label: "Home", to: "/" }, { label: "Our brands" }]}
      />

      <Section>
        <SectionHeading
          eyebrow="Structure"
          title="How the Group reports"
          body="The Group reports across three operating segments plus Corporate: Platform, Portfolio Administration & Reporting Services (PARS), and Tech Solutions."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Platform",
              body: "The HUB24 platform — investment, superannuation and pension administration for advised clients.",
            },
            {
              name: "PARS",
              body: "Portfolio Administration & Reporting Services — non-custodial administration and reporting, including Engage.",
            },
            {
              name: "Tech Solutions",
              body: "Class, NowInfinity and HUBconnect — accounting, documentation, compliance and data software.",
            },
            {
              name: "Corporate",
              body: "Group support functions and strategic investments, including a minority shareholding in Count Limited (ASX:CUP).",
            },
          ].map((segment) => (
            <Card key={segment.name} className="flex flex-col gap-2 bg-surface-tint">
              <CardHeading className="text-base">{segment.name}</CardHeading>
              <CardBody className="text-sm">{segment.body}</CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Our brands" title="The businesses in the Group" />
        <div className="mt-10 flex flex-col gap-6">
          {GROUP_BRANDS.map((brand) => (
            <Card key={brand.slug} className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold tracking-[0.16em] text-h24-teal-dark uppercase">
                  {brand.descriptor}
                </span>
                <CardHeading className="text-2xl">{brand.name}</CardHeading>
                <CardBody>{brand.body}</CardBody>
                <ButtonLink
                  to={SEGMENT_LINKS[brand.slug] ?? "/products-solutions/"}
                  variant="secondary"
                  size="sm"
                  className="mt-2 w-fit"
                >
                  Learn more
                </ButtonLink>
              </div>
              <dl className="grid grid-cols-3 gap-4 self-start rounded-h24 bg-surface-tint p-5 text-center">
                {brand.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-xs text-ink-faint">{stat.label}</dt>
                    <dd className="mt-1 font-display text-lg font-semibold text-h24-navy">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow="Shareholders"
        title="Follow the Group's performance"
        body="Results, market updates and corporate governance are published in the Shareholder Centre."
        primary={{ label: "Shareholder Centre", to: "/shareholder-centre/overview/" }}
        secondary={{ label: "About HUB24", to: "/about-us/" }}
      />
    </PageLayout>
  );
}
