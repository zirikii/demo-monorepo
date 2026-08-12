import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { LogoBar } from "@/components/marketing/LogoBar";
import { PricingCards } from "@/components/marketing/PricingCards";
import { TestimonialStrip } from "@/components/marketing/TestimonialStrip";
import { ButtonLink } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function HomePage() {
  useDocumentTitle("Employment Hero — Employment OS for HR, Payroll & Hiring (Demo)");
  return (
    <PageLayout>
      <section className="hero-atmosphere border-b border-line">
        <div className="container-eh grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="animate-fade-up">
            <img src="/brand/logo.svg" alt="Employment Hero" className="h-10 w-auto" />
            <h1 className="mt-6 max-w-xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
              Employment, finally on one operating system
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
              Hire, pay, manage and engage your people without juggling five HR tools. Built for Australian and global teams.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/request-demo" size="lg">Request a demo</ButtonLink>
              <ButtonLink to="/pricing" size="lg" variant="secondary">See pricing</ButtonLink>
            </div>
          </div>
          <div className="animate-fade-up relative overflow-hidden rounded-eh-lg hero-purple p-8 text-white shadow-eh-lift" style={{ animationDelay: "120ms" }}>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Employment OS</p>
            <p className="mt-4 text-2xl font-bold leading-snug">HR · Payroll · Hiring · Benefits</p>
            <ul className="mt-6 space-y-3 text-sm text-white/85">
              <li>Paperless onboarding in under 48 hours</li>
              <li>Pay runs with AI-assisted error checks</li>
              <li>Leave, timesheets and Work app self-service</li>
            </ul>
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10" />
          </div>
        </div>
      </section>

      <Section tone="soft">
        <div className="container-eh">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">Trusted by growing teams</p>
          <div className="mt-6"><LogoBar /></div>
        </div>
      </Section>

      <Section>
        <div className="container-eh">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight">Everything employment needs — connected</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">Explore the products inside Employment OS.</p>
          <div className="mt-10"><FeatureGrid /></div>
        </div>
      </Section>

      <Section tone="soft">
        <div className="container-eh">
          <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["1. Bring people in", "Post roles, collect candidates and issue digital contracts that land in Core HR."],
              ["2. Run employment", "Leave, timesheets, docs and policies stay in sync for managers and employees."],
              ["3. Pay with confidence", "Intelligent Payroll turns approved inputs into accurate, compliant pay runs."],
            ].map(([title, body]) => (
              <li key={title} className="rounded-eh-lg border border-line bg-white p-6 shadow-eh">
                <h3 className="text-lg font-bold text-eh-purple">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="container-eh">
          <h2 className="text-3xl font-bold tracking-tight">Teams that switched</h2>
          <div className="mt-8"><TestimonialStrip /></div>
        </div>
      </Section>

      <Section tone="soft">
        <div className="container-eh">
          <h2 className="text-3xl font-bold tracking-tight">Plans that scale with you</h2>
          <p className="mt-3 text-ink-soft">Start lean, then unlock payroll and the full Employment OS.</p>
          <div className="mt-10"><PricingCards /></div>
        </div>
      </Section>

      <Section tone="purple">
        <div className="container-eh text-center">
          <h2 className="text-3xl font-bold tracking-tight">See Employment OS in action</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">Book a walkthrough tailored to your HR, payroll and hiring stack.</p>
          <div className="mt-8 flex justify-center gap-3">
            <ButtonLink to="/request-demo" variant="white" size="lg">Request a demo</ButtonLink>
            <ButtonLink to="/contact" variant="secondary" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10">Contact sales</ButtonLink>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
