import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { AgentShowcase } from "@/components/marketing/AgentShowcase";
import { AppMockup } from "@/components/marketing/AppMockup";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { LogoWall } from "@/components/marketing/LogoWall";
import { PillarGrid, type Pillar } from "@/components/marketing/PillarGrid";
import { StatBand } from "@/components/marketing/StatBand";
import { TestimonialCard } from "@/components/marketing/TestimonialCard";
import { ButtonLink } from "@/components/ui/Button";
import { LinkCard } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BLOG_POSTS } from "@/data/blog";
import { CASE_STUDIES } from "@/data/caseStudies";
import { HOMEPAGE_TESTIMONIALS } from "@/data/testimonials";
import { formatDate } from "@/lib/format";

const PILLARS: Pillar[] = [
  {
    title: "Hiring",
    body: "AI helps you shortlist, schedule and move candidates forward automatically, drawing on a pool of 2.3 million ready-to-work Australians.",
    to: "/products/hiring",
    icon: "search",
  },
  {
    title: "HR",
    body: "Policies, documents and people ops that don't just sit there. Employment OS triggers the next action when something changes.",
    to: "/products/hr-software",
    icon: "users",
  },
  {
    title: "Payroll",
    body: "Payroll that runs itself. From validations to submissions, we handle the workflow — not just the data entry.",
    to: "/products/payroll-software",
    icon: "wallet",
  },
  {
    title: "Benefits",
    body: "Engage, retain and reward great people with big business benefits, delivered through the Employment Hero Work app.",
    to: "/products/work-app",
    icon: "heart",
  },
];

const LIFECYCLE = [
  {
    step: "01",
    title: "Attract and hire",
    body: "Match against the talent pool, screen with the Recruitment Agent, and send a compliant offer in a day.",
  },
  {
    step: "02",
    title: "Onboard and comply",
    body: "The signed contract creates the employee, the payroll profile, the training plan and the Work app invitation.",
  },
  {
    step: "03",
    title: "Roster and pay",
    body: "Clock-ins become interpreted hours, exceptions surface before approval, and STP lodges on schedule.",
  },
  {
    step: "04",
    title: "Grow and retain",
    body: "Reviews, learning, recognition and benefits that give people a reason to stay past the first ninety days.",
  },
];

export default function HomePage() {
  const featuredStudy = CASE_STUDIES[0]!;
  const latestPosts = BLOG_POSTS.slice(0, 3);

  return (
    <PageLayout title="AI Employment Operating System">
      <section className="bg-eh-purple-deep text-white">
        <div className="container-eh grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-extrabold tracking-[0.1em] text-eh-violet-soft uppercase">
              <Sparkles aria-hidden className="h-3.5 w-3.5" />
              Powered by Hero AI
            </span>
            <h1 className="text-balance-eh text-4xl font-extrabold tracking-tight md:text-[3.7rem] md:leading-[1.03]">
              Every part of employment, intelligently run
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-eh-violet-soft">
              Australia&apos;s AI-powered Employment Operating System for payroll, HR, recruitment and
              benefits — with intelligent agents to support your team. Or hand it all over to us with
              HeroForce, end-to-end employment done for you.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <ButtonLink to="/request-a-demo" variant="inverse" size="lg">
                Request a demo
              </ButtonLink>
              <ButtonLink
                to="/pricing"
                variant="secondary"
                size="lg"
                className="border-white/40 bg-transparent text-white hover:border-white hover:text-white"
              >
                See pricing
              </ButtonLink>
            </div>
            <p className="text-sm text-eh-violet-soft">
              No credit card required · Set up in an afternoon · Cancel any time
            </p>
          </div>
          <AppMockup />
        </div>
      </section>

      <Section tone="white" className="py-12 md:py-14">
        <LogoWall />
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="Employment OS"
          title="The AI Employment Operating System that runs employment for you"
          body="The world's first Employment Operating System, bringing hiring, HR, payroll and benefits under one roof — and replacing an average of four disconnected tools."
          align="center"
          className="mx-auto mb-14 items-center"
        />
        <PillarGrid pillars={PILLARS} />
      </Section>

      <Section tone="deep">
        <StatBand />
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="System of action"
              title="Not a system of record. A system that acts."
              body="An HRIS stores what happened. Employment OS decides what happens next — holding the employment record, the workflows that act on it, and the agents that execute them in one place."
            />
            <CheckList
              items={[
                "One employee record from application through to offboarding",
                "Fair Work award interpretation applied to every pay run",
                "Compliance obligations maintained as legislation changes",
                "Reporting that refreshes with each pay cycle",
              ]}
            />
            <ButtonLink to="/products/employment-os" className="w-fit">
              Explore Employment OS
              <ArrowRight aria-hidden className="h-4 w-4" />
            </ButtonLink>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {LIFECYCLE.map((item) => (
              <li key={item.step} className="rounded-eh-lg border border-line bg-surface-tint p-6">
                <span className="text-sm font-extrabold text-eh-purple">{item.step}</span>
                <h3 className="mt-2 text-lg font-extrabold text-ink-strong">{item.title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="Hero AI"
          title="Agents that do the work, not just answer questions"
          body="Hero AI is the intelligence layer powering agentic features across the employment lifecycle. Every agent drafts and recommends; a person always approves."
          className="mb-12"
        />
        <AgentShowcase />
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Customer stories"
          title="Australian businesses running ahead"
          className="mb-12"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {HOMEPAGE_TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>

        <div className="mt-12 grid gap-8 rounded-eh-xl border border-line bg-surface-tint p-8 md:grid-cols-[1.2fr_0.8fr] md:p-10">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-extrabold tracking-[0.14em] text-eh-purple uppercase">
              {featuredStudy.industry} · {featuredStudy.location}
            </span>
            <h3 className="text-2xl font-extrabold tracking-tight text-ink-strong md:text-3xl">
              {featuredStudy.company}
            </h3>
            <p className="text-[1.02rem] leading-relaxed text-ink-soft">{featuredStudy.summary}</p>
            <Link
              to={`/case-studies/${featuredStudy.slug}`}
              className="focus-eh inline-flex w-fit items-center gap-1.5 text-sm font-bold text-eh-purple hover:underline"
            >
              Read the story
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
            {featuredStudy.results.map((result) => (
              <div key={result.label} className="rounded-eh border border-line bg-white px-5 py-4">
                <p className="text-2xl font-extrabold text-ink-strong">{result.value}</p>
                <p className="text-sm text-ink-faint">{result.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="From the blog" title="Fresh from the resource hub" className="mb-12" />
        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <LinkCard key={post.slug} to={`/blog/${post.slug}`} className="flex flex-col gap-3">
              <span className="text-xs font-extrabold tracking-[0.12em] text-eh-purple uppercase">
                {post.category}
              </span>
              <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">{post.title}</h3>
              <p className="flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{post.excerpt}</p>
              <span className="text-sm text-ink-faint">{formatDate(post.publishedOn)}</span>
            </LinkCard>
          ))}
        </div>
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
