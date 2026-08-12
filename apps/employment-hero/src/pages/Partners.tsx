import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stat } from "@/components/ui/Stat";
import { partnerDirectory, partnerTiers } from "@/data/company";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function PartnerNetworkPage() {
  useDocumentTitle("Partner network");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Partners"
        title="Help your clients save time and stay compliant."
        blurb="Accountants, bookkeepers and advisers use Employment Hero to take payroll and HR off their clients' desks — and off their own."
        tone="purple"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Partner network" }]}
      >
        <ButtonLink to="/contact" variant="inverse">
          Become a partner
        </ButtonLink>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Programs" title="Two ways to partner" align="center" />
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {partnerTiers.map((tier) => (
            <div key={tier.name} className="rounded-eh-lg border border-eh-line bg-white p-7">
              <h2 className="font-display text-2xl font-bold text-eh-ink">{tier.name}</h2>
              <p className="mt-2 text-sm text-eh-ink-soft">{tier.blurb}</p>
              <ul className="mt-6 space-y-3">
                {tier.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-eh-ink-soft">
                    <Check size={15} strokeWidth={3} className="mt-0.5 shrink-0 text-eh-purple" />
                    {point}
                  </li>
                ))}
              </ul>
              <ButtonLink to={tier.to} variant="secondary" className="mt-7 w-full">
                Learn more
              </ButtonLink>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading title="What partners get out of it" align="center" />
        <dl className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          <Stat value="35%" label="lower cost to serve" />
          <Stat value="90" label="payrolls migrated in a quarter" />
          <Stat value="1" label="platform across every client" />
          <Stat value="24/7" label="partner escalation path" />
        </dl>
      </Section>

      <CtaBand
        title="Talk to the partner team."
        blurb="We will map your client base and show you where the migration effort actually sits."
        primaryLabel="Get in touch"
        primaryTo="/contact"
        secondaryLabel="Find a partner"
        secondaryTo="/partner-directory"
      />
    </SiteLayout>
  );
}

export function ReferralPartnerPage() {
  useDocumentTitle("Referral partner program");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Partner program"
        title="Refer a client, share the upside."
        blurb="Make the introduction and we handle the demo, the onboarding and the support. You keep the relationship."
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Partner network", to: "/partner-network" },
          { label: "Referral partners" },
        ]}
      />

      <Section>
        <SectionHeading eyebrow="How it works" title="Three steps" />
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Introduce the client",
              body: "Submit a referral through the partner dashboard with a sentence of context.",
            },
            {
              title: "We take it from there",
              body: "Our team runs the demo, scopes the migration and handles onboarding end to end.",
            },
            {
              title: "Share the revenue",
              body: "You receive a share of first-year revenue, tracked in the same dashboard.",
            },
          ].map((step, index) => (
            <li key={step.title} className="rounded-eh-lg border border-eh-line bg-white p-6">
              <span className="grid size-9 place-items-center rounded-full bg-eh-purple font-display text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-eh-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-eh-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand
        title="Ready to refer your first client?"
        primaryLabel="Join the program"
        primaryTo="/contact"
        secondaryLabel="Compare programs"
        secondaryTo="/partner-network"
      />
    </SiteLayout>
  );
}

export function CertifiedPartnerPage() {
  useDocumentTitle("Certified partner program");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Partner program"
        title="Own the sale, the onboarding and the support."
        blurb="Certified partners run the whole relationship, at a higher margin, with training and escalation behind them."
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Partner network", to: "/partner-network" },
          { label: "Certified partners" },
        ]}
      />

      <Section>
        <SectionHeading eyebrow="What is included" title="Everything you need to deliver" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Certification training",
              body: "Platform, payroll and award interpretation training for your whole practice.",
            },
            {
              title: "Migration playbooks",
              body: "Templates for the client types you serve most, tested across hundreds of moves.",
            },
            {
              title: "Higher margin",
              body: "A larger share of revenue in exchange for owning delivery and first-line support.",
            },
            {
              title: "Dedicated partner manager",
              body: "One named contact who knows your book and your team.",
            },
            {
              title: "Priority escalation",
              body: "A direct path into support when a client issue needs to move quickly.",
            },
            {
              title: "Directory listing",
              body: "Appear in the partner directory for businesses searching in your area.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-eh-lg border border-eh-line bg-white p-6">
              <h3 className="text-lg font-semibold text-eh-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-eh-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Apply to become certified."
        primaryLabel="Start the conversation"
        primaryTo="/contact"
        secondaryLabel="Partner directory"
        secondaryTo="/partner-directory"
      />
    </SiteLayout>
  );
}

export function PartnerDirectoryPage() {
  useDocumentTitle("Partner directory");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Partner directory"
        title="Find an adviser who knows the platform."
        blurb="Accountants and bookkeepers who have migrated clients onto Employment Hero and support them day to day."
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Partner network", to: "/partner-network" },
          { label: "Directory" },
        ]}
      />

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partnerDirectory.map((partner) => (
            <div key={partner.name} className="rounded-eh-lg border border-eh-line bg-white p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold text-eh-ink">{partner.name}</h2>
                <Badge tone={partner.tier === "Certified" ? "purple" : "neutral"}>
                  {partner.tier}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-eh-ink-soft">{partner.speciality}</p>
              <p className="mt-3 text-xs text-eh-ink-faint">{partner.location}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-eh-ink-faint">
          Not listed yet?{" "}
          <Link
            to="/partner-network"
            className="focus-eh font-semibold text-eh-purple hover:underline"
          >
            Join the partner network
          </Link>
          .
        </p>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}
