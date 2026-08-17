import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { SITE } from "@/data/site";

interface LegalDoc {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

const DOCS: Record<string, LegalDoc> = {
  "privacy-policy": {
    title: "Privacy policy",
    intro:
      "This demonstration site stores a session token and a cookie-notice flag in your browser. It collects nothing else and transmits nothing anywhere.",
    sections: [
      {
        heading: "What this demo stores",
        body: "A base64-encoded demo session describing which sample account you signed in as, and a flag recording that you dismissed the cookie notice. Both live in localStorage and are cleared when you log out or clear site data.",
      },
      {
        heading: "What a real policy would cover",
        body: "The real HUB24 privacy policy explains how personal information is collected, used and disclosed across its platform, superannuation and accounting products, how to access or correct your information, and how to make a complaint.",
      },
      {
        heading: "Contact",
        body: `In the real world, privacy enquiries would go to ${SITE.email}. Nothing sent to this demo is monitored.`,
      },
    ],
  },
  "terms-of-use": {
    title: "Website terms of use",
    intro:
      "This site is an unofficial demonstration build created to showcase a website clone. It is not operated by HUB24 Limited.",
    sections: [
      {
        heading: "No relationship",
        body: SITE.disclaimer,
      },
      {
        heading: "No financial product advice",
        body: "Nothing on this site is financial product advice, an offer, or an invitation to acquire any financial product. All products, figures, documents and accounts shown are fictional.",
      },
      {
        heading: "Availability",
        body: "The demo is provided as-is with no warranty of availability, accuracy or fitness for any purpose.",
      },
    ],
  },
  "financial-services-guide": {
    title: "Financial services guide",
    intro:
      "A financial services guide explains who provides a financial service, what services are offered, how they are paid, and how to complain.",
    sections: [
      {
        heading: "This is a demo",
        body: "No financial services are provided through this site and no licensee stands behind it. This page exists to mirror the structure of the real website.",
      },
      {
        heading: "In the real world",
        body: SITE.regulatory,
      },
    ],
  },
  "whistleblower-policy": {
    title: "Whistleblower policy",
    intro:
      "A whistleblower policy sets out how disclosures about misconduct are made, who can receive them, and the protections that apply to the discloser.",
    sections: [
      {
        heading: "Scope",
        body: "In a real policy this covers current and former employees, officers, contractors, suppliers and their relatives, and describes eligible disclosures.",
      },
      {
        heading: "Protections",
        body: "Real policies describe confidentiality, protection from detriment, and the process for investigating a disclosure.",
      },
      {
        heading: "This demo",
        body: "No disclosure channel exists here. This page is illustrative only.",
      },
    ],
  },
};

export default function LegalPage() {
  const { doc } = useParams<{ doc: string }>();
  const legal = doc ? DOCS[doc] : undefined;

  if (!legal) {
    return <Navigate to="/legals/privacy-policy" replace />;
  }

  return (
    <PageLayout title={legal.title}>
      <PageHero
        eyebrow="Legals"
        title={legal.title}
        body={legal.intro}
        crumbs={[{ label: "Home", to: "/" }, { label: "Legals" }, { label: legal.title }]}
      />

      <Section>
        <div className="flex max-w-3xl flex-col gap-8">
          {legal.sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-2">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-strong">
                {section.heading}
              </h2>
              <p className="text-lg leading-relaxed text-ink-soft">{section.body}</p>
            </div>
          ))}
          <p className="rounded-hub-lg border border-line bg-surface-tint p-5 text-sm text-ink-faint">
            Last updated for the demo build on 17 August 2026.
          </p>
        </div>
      </Section>
    </PageLayout>
  );
}
