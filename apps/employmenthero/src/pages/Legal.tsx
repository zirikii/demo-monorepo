import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { DISCLAIMER } from "@/data/site";

interface LegalPageProps {
  variant: "privacy" | "terms";
}

const CONTENT = {
  privacy: {
    title: "Privacy policy",
    intro:
      "This demo build does not collect, transmit or store personal information on any server. This page exists so the site structure matches the real thing.",
    sections: [
      {
        heading: "What this demo stores",
        body: "A mock session token, a cookie-banner acknowledgement and any settings you toggle are written to your browser's localStorage. Clearing site data removes all of it.",
      },
      {
        heading: "What it never does",
        body: "No analytics, no tracking pixels, no third-party scripts and no network requests carrying anything you type. Every form on this site resolves locally.",
      },
      {
        heading: "Demo data",
        body: "Employees, candidates, pay runs and customer stories in this build are invented. Names, businesses and figures do not describe real people or organisations.",
      },
      {
        heading: "The real policy",
        body: "For Employment Hero's actual privacy practices, refer to the privacy policy published on employmenthero.com. This page is not a substitute for it.",
      },
    ],
  },
  terms: {
    title: "Terms of service",
    intro:
      "These terms describe how this demonstration build may be used. They are not the terms governing the real Employment Hero platform.",
    sections: [
      {
        heading: "Purpose",
        body: "This build exists to demonstrate interface and workflow patterns. It is not a product, not a service and not available for commercial use.",
      },
      {
        heading: "Mock authentication",
        body: "The login and sign-up flows are simulated and are intentionally insecure. They must never be reused for anything other than demonstration.",
      },
      {
        heading: "No warranty",
        body: "The demo is provided as-is with no warranty of any kind. Figures, rates and compliance statements shown are illustrative and must not be relied on.",
      },
      {
        heading: "Trade marks",
        body: "Employment Hero and related marks belong to their owner. They appear here only to demonstrate visual fidelity.",
      },
    ],
  },
} as const;

export default function LegalPage({ variant }: LegalPageProps) {
  const content = CONTENT[variant];

  return (
    <PageLayout title={content.title}>
      <PageHero
        eyebrow="Legal"
        title={content.title}
        body={content.intro}
        crumbs={[{ label: "Home", to: "/" }, { label: content.title }]}
        tone="tint"
      />

      <Section tone="white">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          {content.sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-2">
              <h2 className="text-xl font-extrabold tracking-tight text-ink-strong">
                {section.heading}
              </h2>
              <p className="text-[1.02rem] leading-relaxed text-ink-soft">{section.body}</p>
            </div>
          ))}
          <p className="rounded-eh-lg border border-line bg-surface-tint px-6 py-5 text-sm text-ink-faint">
            {DISCLAIMER}
          </p>
        </div>
      </Section>
    </PageLayout>
  );
}
