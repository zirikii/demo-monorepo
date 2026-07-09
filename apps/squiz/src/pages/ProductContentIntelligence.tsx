import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { FaqSection } from "@/components/shared/FaqSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

const steps = [
  {
    icon: "Search",
    title: "1. Crawl",
    copy: "Point Content Intelligence at your domains. It scans every page on a schedule — no tags, integrations, or CMS changes required.",
  },
  {
    icon: "Sparkles",
    title: "2. Score",
    copy: "Every page gets an AI-visibility score and a WCAG conformance check, weighted by traffic and task criticality.",
  },
  {
    icon: "ClipboardList",
    title: "3. Prioritize",
    copy: "Findings become an ordered fix list — the enrolment form's missing label outranks a contrast nit on an archive page.",
  },
  {
    icon: "TrendingUp",
    title: "4. Improve",
    copy: "Editor-friendly guidance links each issue to the exact element. Trend lines show leadership the progress curve.",
  },
];

const audits = [
  {
    icon: "Sparkles",
    title: "AI Readiness Auditor",
    badge: "NEW",
    copy: "See how AI engines parse your pages — structure, clarity, metadata, answerability — and what to improve first to earn citations.",
    to: "/products/capabilities/ai-readiness-auditor",
  },
  {
    icon: "Accessibility",
    title: "Accessibility Auditor",
    badge: "NEW",
    copy: "Continuous WCAG 2.2 scanning across your whole estate, ranked by real user impact rather than raw issue counts.",
    to: "/products/capabilities/accessibility-auditor",
  },
];

const ciFaqs = [
  {
    q: "Do we need to be a Squiz DXP customer?",
    a: "No — Content Intelligence analyses any public website, whatever CMS it runs on. Many teams start here and adopt other products later.",
  },
  {
    q: "How is this different from a one-off audit?",
    a: "Consultant audits decay the moment content changes. Content Intelligence rescans continuously, tracks trends, and keeps the fix queue current between formal audits.",
  },
  {
    q: "Automated accessibility checks can't catch everything, can they?",
    a: "Correct — automation covers roughly half of WCAG criteria. The auditor flags what needs human review and tracks manual findings alongside automated ones so nothing falls through.",
  },
];

export function ProductContentIntelligencePage() {
  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Products" }, { label: "Squiz Content Intelligence" }]} />
      <PageHero
        eyebrow="Squiz Content Intelligence — NEW"
        eyebrowTint="purple"
        title="AI-ready content starts here"
        copy="See how AI systems understand your site, uncover accessibility and structure gaps, and get a prioritized plan to improve visibility and performance — no integrations or CMS changes required."
      >
        <Button to="/book-a-call" size="lg" withArrow>
          Get your first audit
        </Button>
        <Button to="/demos" variant="secondary" size="lg">
          Watch the demo
        </Button>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading eyebrow="How it works" title="From crawl to prioritized plan in one session" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.title} className="rounded-2xl border border-cream-deep bg-card p-6 shadow-card">
              <span className="flex size-11 items-center justify-center rounded-xl bg-badge-purple text-navy">
                <Icon name={step.icon} className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream-alt py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Two auditors"
            title="Accessibility and AI readiness are the same discipline"
            copy="Everything that helps a language model parse your page also helps a screen-reader user. Content Intelligence audits both from one crawl."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {audits.map((audit) => (
              <div key={audit.title} className="rounded-2xl border border-cream-deep bg-card p-8 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-badge-purple text-navy">
                    <Icon name={audit.icon} className="size-6" />
                  </span>
                  <Badge tint="mint">{audit.badge}</Badge>
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-navy">{audit.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{audit.copy}</p>
                <Button to={audit.to} variant="ghost" className="mt-5 px-0" withArrow>
                  Explore the auditor
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={ciFaqs} />
      <CtaSection
        title="Make your content unmissable to AI search"
        copy="Run the first audit on your live site — results land the same day."
        primaryLabel="Get started"
      />
    </PageLayout>
  );
}
