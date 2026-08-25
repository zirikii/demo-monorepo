import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ButtonLink } from "@/components/ui/Button";

export default function EnterprisePage() {
  return (
    <PageLayout title="Enterprise">
      <PageHero
        eyebrow="Enterprise"
        title="The system of work, at organisation scale"
        body="Unlimited sites, Atlassian Guard, centralised user management, and a 99.95% uptime SLA."
        crumbs={[{ label: "Home", to: "/" }, { label: "Enterprise" }]}
        actions={<ButtonLink to="/contact">Talk to sales</ButtonLink>}
      />
      <Section>
        <ul className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Atlassian Guard",
              body: "Company-wide visibility, security policies, and control across Cloud.",
            },
            {
              title: "Unlimited sites",
              body: "Isolate brands or regions without losing a shared user directory.",
            },
            {
              title: "Enterprise support",
              body: "24/7 coverage with named contacts and priority incident response.",
            },
          ].map((item) => (
            <li key={item.title} className="rounded-atl-lg border border-line p-6">
              <h2 className="text-xl font-extrabold">{item.title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand primaryLabel="Contact sales" primaryTo="/contact" />
    </PageLayout>
  );
}
