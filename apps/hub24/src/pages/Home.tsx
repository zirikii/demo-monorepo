import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AudiencePicker } from "@/components/marketing/AudiencePicker";
import { CtaBand } from "@/components/marketing/CtaBand";
import { StatBand } from "@/components/marketing/StatBand";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CardBody, CardHeading, LinkCard } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { audienceById } from "@/data/audiences";
import { FEATURES } from "@/data/products";
import { NEWS } from "@/data/news";
import { TESTIMONIALS } from "@/data/testimonials";
import type { AudienceId } from "@/data/types";
import { formatDate } from "@/lib/format";

const SOLUTIONS = [
  {
    title: "Advisers, private wealth and licensees",
    body: "Do business your way, empowered by technology that provides efficiencies to support business growth and the delivery of advice for your clients.",
    to: "/hub24-for-advisers",
    label: "HUB24 for advisers",
  },
  {
    title: "Advised clients",
    body: "Learn how your adviser can connect you to market-leading super, pension, investment and insurance solutions, including managed portfolio technology.",
    to: "/hub24-for-clients",
    label: "HUB24 for clients",
  },
  {
    title: "Investment managers",
    body: "Learn how our market-leading technology can empower your investment management expertise through ManagerHUB and a broad adviser network.",
    to: "/hub24-for-investment-managers",
    label: "HUB24 for managers",
  },
];

export default function HomePage() {
  const [audienceId, setAudienceId] = useState<AudienceId>("adviser");
  const audience = audienceById(audienceId);

  return (
    <PageLayout title="Empowering better financial futures together">
      <section className="bg-hub-navy-deep text-white">
        <div className="container-hub grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="animate-hub-rise flex flex-col gap-8">
            <p className="text-xs font-bold tracking-[0.18em] text-hub-teal-soft uppercase">
              {audience.heroKicker}
            </p>
            <h1 className="font-serif text-4xl leading-[1.1] font-bold text-balance-hub md:text-6xl">
              Empowering better financial futures, together.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/75">{audience.heroBody}</p>
            <AudiencePicker value={audienceId} onChange={setAudienceId} />
            <div className="flex flex-wrap gap-3">
              <ButtonLink to={audience.cta.to} size="lg">
                {audience.cta.label}
              </ButtonLink>
              <ButtonLink to="/about-us" variant="inverse" size="lg">
                Learn more about HUB24
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-hub-xl border border-white/10 bg-hub-navy-mid p-6">
            <p className="text-xs font-bold tracking-[0.16em] text-hub-teal-soft uppercase">I am looking for</p>
            <ul className="mt-4 flex flex-col">
              {audience.lookingFor.map((item) => (
                <li key={item.to + item.label}>
                  <Link
                    to={item.to}
                    className="focus-hub flex items-center justify-between gap-3 border-b border-white/10 py-3 text-sm font-semibold text-white/90 hover:text-white"
                  >
                    {item.label}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 text-hub-teal-bright" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <StatBand />

      <Section>
        <SectionHeading
          eyebrow="Innovation that delivers"
          title="We’re creating Australia’s Best Platform, together"
          body="We believe in the value of advice and enabling accessible financial advice to more Australians. We’re continually investing in products that drive productivity in your business and enhance the value of your advice — all in one place."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="rounded-hub-lg border border-line bg-surface-tint p-6">
              <h3 className="text-lg font-bold text-ink-strong">{feature.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{feature.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Solutions for you" title="HUB24 for the way you work" />
        <div className="grid gap-6 lg:grid-cols-3">
          {SOLUTIONS.map((card) => (
            <LinkCard key={card.to} to={card.to}>
              <p className="text-xs font-bold tracking-[0.14em] text-hub-teal uppercase">HUB24 for</p>
              <CardHeading className="mt-2">{card.title}</CardHeading>
              <CardBody className="mt-3">{card.body}</CardBody>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-hub-teal">
                {card.label}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </LinkCard>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-hub-teal-soft uppercase">Shareholder Centre</p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">Welcome to the HUB24 Limited Shareholder Centre</h2>
            <p className="mt-4 text-lg text-white/75">
              Are you a HUB24 shareholder or thinking about investing in HUB24? Company announcements, governance and a dummy ASX:HUB quote live here.
            </p>
            <ButtonLink to="/shareholders" variant="inverse" className="mt-8">
              Open Shareholder Centre
            </ButtonLink>
          </div>
          <blockquote className="rounded-hub-xl border border-white/10 bg-white/5 p-8">
            <p className="font-serif text-xl leading-relaxed">“{TESTIMONIALS[0]!.quote}”</p>
            <footer className="mt-6 text-sm text-white/70">
              <strong className="text-white">{TESTIMONIALS[0]!.name}</strong> — {TESTIMONIALS[0]!.role}
            </footer>
          </blockquote>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Latest" title="News & press from HUB24" />
        <div className="grid gap-6 md:grid-cols-3">
          {NEWS.slice(0, 3).map((post) => (
            <LinkCard key={post.slug} to={`/news/${post.slug}`}>
              <p className="text-xs font-bold tracking-[0.12em] text-hub-teal uppercase">
                {post.category} · {formatDate(post.date)}
              </p>
              <CardHeading className="mt-2">{post.title}</CardHeading>
              <CardBody className="mt-3">{post.excerpt}</CardBody>
            </LinkCard>
          ))}
        </div>
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
