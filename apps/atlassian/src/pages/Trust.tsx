import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";

export default function TrustPage() {
  return (
    <PageLayout title="Trust">
      <PageHero
        eyebrow="Trust"
        title="Secure, compliant, and reliable by design"
        body="This page is a demo stand-in for the public trust centre. Nothing here is an official attestation."
        crumbs={[{ label: "Home", to: "/" }, { label: "Trust" }]}
      />
      <Section>
        <ul className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Security",
              body: "Encryption in transit and at rest, admin controls, and audit logs in the mock workspace.",
            },
            {
              title: "Compliance",
              body: "Designed around common frameworks (SOC 2, ISO 27001, GDPR) as marketing copy only.",
            },
            {
              title: "Reliability",
              body: "Cloud SLAs up to 99.95% on Enterprise — not measured in this demo.",
            },
          ].map((item) => (
            <li key={item.title} className="rounded-atl-lg border border-line p-6">
              <h2 className="text-xl font-extrabold">{item.title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>
    </PageLayout>
  );
}
