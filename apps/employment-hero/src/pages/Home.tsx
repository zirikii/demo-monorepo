import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { HomeHero } from "@/components/marketing/HomeHero";
import { LogoMarquee } from "@/components/marketing/LogoMarquee";
import { AudienceGrid } from "@/components/marketing/AudienceGrid";
import { PlatformTabs } from "@/components/marketing/PlatformTabs";
import { TestimonialWall } from "@/components/marketing/TestimonialWall";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stat } from "@/components/ui/Stat";
import { getCaseStudy } from "@/data/caseStudies";
import { heroForceModes, heroFoundation, heroStats, homeFaqs } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function HomePage() {
  useDocumentTitle("Employment. Intelligently Run.");
  const spotlight = getCaseStudy("tasmanian-oyster-co");

  return (
    <SiteLayout>
      <HomeHero />
      <LogoMarquee />

      <Section>
        <SectionHeading
          eyebrow="Employment OS"
          title="The AI Employment Operating System that runs employment for you"
          blurb="One platform for everyone who touches employment — the business that hires, the person who works there, and the candidate who has not started yet."
          align="center"
        />
        <AudienceGrid />
      </Section>

      <Section tone="purple">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionHeading
            eyebrow="HeroForce"
            title="Not just a system of record. An AI-powered system of action."
            blurb="HeroForce runs end-to-end employment for you, so you can focus on everything else."
            tone="light"
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {heroForceModes.map((mode) => (
              <Link
                key={mode.title}
                to={mode.to}
                className="focus-eh group flex flex-col justify-between rounded-eh-lg bg-white/10 p-6 backdrop-blur-sm transition hover:bg-white/18"
              >
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{mode.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{mode.body}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-eh-lime">
                  Explore HeroForce
                  <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-8 border-t border-white/15 pt-10 md:grid-cols-4">
          {heroStats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} tone="light" />
          ))}
        </dl>
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="Built on AI"
          title="Built on AI to take action, not just surface information."
          blurb="Employment OS does not only show you what to do next. It helps you do it, and it leaves the decision with a person."
          align="center"
        />
        <PlatformTabs />
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Giving back"
              title={heroFoundation.title}
              blurb={heroFoundation.body}
            />
            <ButtonLink to="/hero-foundation" className="mt-8">
              Partner with us
            </ButtonLink>
          </div>
          <dl className="grid grid-cols-3 gap-6 rounded-eh-xl bg-eh-purple-wash p-8">
            {heroFoundation.stats.map((stat) => (
              <Stat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </dl>
        </div>
      </Section>

      {spotlight ? (
        <Section tone="wash">
          <SectionHeading eyebrow="Customer spotlight" title={spotlight.company} />
          <div className="mt-10 grid gap-8 rounded-eh-xl border border-eh-line bg-white p-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <blockquote className="font-display text-2xl leading-snug font-semibold text-eh-ink">
                “{spotlight.quote}”
              </blockquote>
              <p className="mt-5 text-sm text-eh-ink-faint">
                {spotlight.quoteAuthor}, {spotlight.quoteRole} · {spotlight.location}
              </p>
              <Link
                to={`/case-studies/${spotlight.slug}`}
                className="focus-eh mt-6 inline-flex items-center gap-2 text-sm font-semibold text-eh-purple hover:underline"
              >
                Read the full story <ArrowRight size={15} />
              </Link>
            </div>
            <dl className="grid gap-5 rounded-eh-lg bg-eh-surface-tint p-6">
              {spotlight.results.map((result) => (
                <div key={result.label} className="flex items-baseline justify-between gap-4">
                  <dd className="font-display text-2xl font-bold text-eh-purple">{result.value}</dd>
                  <dt className="text-right text-xs text-eh-ink-faint">{result.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Section>
      ) : null}

      <Section>
        <SectionHeading
          eyebrow="Customers"
          title="What teams say once the admin disappears"
          align="center"
        />
        <TestimonialWall />
      </Section>

      <Section tone="tint">
        <SectionHeading title="Frequently asked questions" align="center" />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion items={homeFaqs} />
        </div>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}
