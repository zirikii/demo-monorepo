import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";

type Section = { heading: string; body: string };

function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: Section[];
}) {
  return (
    <PageLayout title={`${title} — Gojek (Demo)`}>
      <PageHero eyebrow="Legal" title={title} description={`Last updated ${updated}.`} />
      <Container className="max-w-3xl py-12">
        <div className="mb-8 rounded-xl bg-surface px-4 py-3 text-sm text-ink-soft">
          This is placeholder text for an unofficial demo. It is not a real legal document.
        </div>
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold text-ink">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{section.body}</p>
            </section>
          ))}
        </div>
      </Container>
    </PageLayout>
  );
}

const privacySections: Section[] = [
  {
    heading: "Information we collect",
    body: "In this demo we collect nothing. In a real product this section would describe account details, usage data and device information used to provide services.",
  },
  {
    heading: "How we use information",
    body: "Real services use data to operate the marketplace, personalise experiences, prevent fraud and meet legal obligations. This demo simply stores your session in your browser.",
  },
  {
    heading: "Your choices",
    body: "You can clear your demo session at any time by signing out, which removes the locally-stored session token.",
  },
];

const termsSections: Section[] = [
  {
    heading: "Acceptance of terms",
    body: "By using this demo you acknowledge it is an unofficial recreation for illustration only, not affiliated with Gojek or the GoTo Group.",
  },
  {
    heading: "Use of the service",
    body: "The demo does not process real orders, payments or personal data. All figures, products and partners shown are illustrative.",
  },
  {
    heading: "Limitation of liability",
    body: "The demo is provided as-is with no warranties. It exists to showcase a front-end experience only.",
  },
];

export function PrivacyPage() {
  return <LegalPage title="Privacy policy" updated="January 2026" sections={privacySections} />;
}

export function TermsPage() {
  return <LegalPage title="Terms of service" updated="January 2026" sections={termsSections} />;
}
