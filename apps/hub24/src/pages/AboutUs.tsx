import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { StatBand } from "@/components/marketing/StatBand";
import { ButtonLink } from "@/components/ui/Button";
import { Card, LinkCard } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRODUCTS } from "@/data/products";

const GROUP_BRANDS = ["hub24-invest", "class", "myprosperity", "hubconnect"];

const VALUES = [
  {
    title: "We believe in the value of advice",
    body: "Advice changes financial outcomes. Our job is to remove the friction between an adviser's judgement and its delivery.",
  },
  {
    title: "Innovation that delivers",
    body: "We invest in capability that measurably reduces effort — not features that only demonstrate well.",
  },
  {
    title: "Together with the industry",
    body: "Platform, accounting and portal technology only compound in value when they are built to connect.",
  },
];

export default function AboutUsPage() {
  const brands = GROUP_BRANDS.map((slug) =>
    PRODUCTS.find((product) => product.slug === slug),
  ).filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <PageLayout title="About us">
      <PageHero
        eyebrow="About HUB24"
        title="Empowering better financial futures"
        body="HUB24 Group leads the wealth industry as a provider of integrated platform, technology and data solutions. By collaborating with the industry we help solve key challenges and enable the delivery of accessible financial advice."
        crumbs={[{ label: "Home", to: "/" }, { label: "About us" }]}
        actions={
          <>
            <ButtonLink to="/leadership" variant="inverse">
              Meet the leadership team
            </ButtonLink>
            <ButtonLink
              to="/careers"
              variant="ghost"
              className="border border-white/40 text-white hover:bg-white/10"
            >
              Careers
            </ButtonLink>
          </>
        }
      />

      <Section tone="tint">
        <StatBand />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="What we believe"
          title="Why the group exists"
          body="Our solutions include the HUB24 Platform, leading SMSF software Class, and myprosperity's client portal technology."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {VALUES.map((value) => (
            <Card key={value.title} className="flex h-full flex-col gap-3">
              <h3 className="text-xl font-extrabold tracking-tight text-ink-strong">
                {value.title}
              </h3>
              <p className="text-ink-soft">{value.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="The group" title="Brands inside HUB24 Group" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand) => (
            <LinkCard
              key={brand.slug}
              to={`/product/${brand.slug}`}
              className="flex h-full flex-col gap-2"
            >
              <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">
                {brand.name}
              </h3>
              <p className="text-sm text-ink-soft">{brand.summary}</p>
            </LinkCard>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="History" title="How we got here" />
        <ol className="mt-10 flex flex-col gap-5 border-l border-line pl-6">
          {[
            {
              year: "2007",
              event: "HUB24 Limited is founded to build a better investment platform.",
            },
            { year: "2009", event: "Class pioneers cloud-based SMSF administration." },
            {
              year: "2016",
              event: "Managed portfolio capability becomes the platform's defining strength.",
            },
            { year: "2021", event: "Class and NowInfinity join the group." },
            { year: "2022", event: "myprosperity joins, adding client portal technology." },
            { year: "2025", event: "HUB24 Private Invest launches for wholesale clients." },
            { year: "2026", event: "myhub introduced as an integrated advice ecosystem concept." },
          ].map((item) => (
            <li key={item.year} className="relative">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-hub-teal" />
              <span className="text-sm font-extrabold tracking-[0.14em] text-hub-teal-dark">
                {item.year}
              </span>
              <p className="text-ink-soft">{item.event}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-ink-faint">
          Timeline simplified for the demo; dates are approximate rather than authoritative.
        </p>
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
