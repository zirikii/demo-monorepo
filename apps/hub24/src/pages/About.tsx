import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { StatBand } from "@/components/marketing/StatBand";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeading, LinkCard } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GROUP_BRANDS, TIMELINE, VALUES } from "@/data/company";
import { GROUP_METRICS, SITE } from "@/data/site";
import { formatBillions, formatNumber } from "@/lib/format";

export default function AboutPage() {
  return (
    <PageLayout title="About us">
      <PageHero
        eyebrow="About HUB24"
        title="Empowering better financial futures"
        body="HUB24 Group (ASX:HUB) leads the wealth industry as the best provider of integrated platform, technology and data solutions — and we're not done yet."
        crumbs={[{ label: "Home", to: "/" }, { label: "About us" }]}
        actions={
          <>
            <ButtonLink to="/about-us/leadership/" size="lg">
              Meet the leadership team
            </ButtonLink>
            <ButtonLink to="/about-us/careers/" variant="outline" size="lg">
              Careers
            </ButtonLink>
          </>
        }
      />

      <Section tone="tint">
        <StatBand
          items={[
            { value: formatBillions(GROUP_METRICS.totalFua), label: "Funds under administration" },
            { value: formatNumber(GROUP_METRICS.employees), label: "Employees (FTE)" },
            { value: "2007", label: "Established" },
            { value: SITE.ticker, label: "Listed on the ASX", note: "S&P/ASX 100" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Our purpose"
            title="Empowering better financial futures, together"
            body="At HUB24 we believe in the value of advice. By collaborating with the industry and leveraging our technology and data expertise, we're helping to solve key challenges to enable the delivery of accessible financial advice for more Australians."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {VALUES.map((value) => (
              <Card key={value.title} className="flex flex-col gap-2">
                <CardHeading className="text-base">{value.title}</CardHeading>
                <CardBody className="text-sm">{value.body}</CardBody>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="Our brands"
          title="One group, five businesses"
          body="Our solutions include Australia's best platform HUB24, leading SMSF software Class, NowInfinity's documentation and compliance tools, myprosperity's client portal technology and HUBconnect's data solutions."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {GROUP_BRANDS.map((brand) => (
            <LinkCard key={brand.slug} to="/group/" className="flex h-full flex-col gap-3">
              <span className="text-xs font-bold tracking-[0.16em] text-h24-teal-dark uppercase">
                {brand.descriptor}
              </span>
              <CardHeading className="text-2xl">{brand.name}</CardHeading>
              <CardBody className="flex-1">{brand.body}</CardBody>
            </LinkCard>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Our history" title="How we got here" />
        <ol className="mt-10 flex flex-col gap-0 border-l-2 border-line pl-8">
          {TIMELINE.map((entry) => (
            <li key={entry.year} className="relative pb-8 last:pb-0">
              <span
                aria-hidden
                className="absolute top-1.5 -left-[41px] h-4 w-4 rounded-full border-4 border-white bg-h24-teal"
              />
              <p className="font-display text-lg font-semibold text-h24-navy">{entry.year}</p>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">{entry.event}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand
        eyebrow="Investors"
        title="Thinking about investing in HUB24?"
        body="Everything you need to know about HUB24 Limited is in the Shareholder Centre — results, announcements and corporate governance."
        primary={{ label: "Shareholder Centre", to: "/shareholder-centre/overview/" }}
        secondary={{ label: "Sustainability", to: "/about-us/sustainability/" }}
      />
    </PageLayout>
  );
}
