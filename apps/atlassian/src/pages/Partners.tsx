import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";

export default function PartnersPage() {
  return (
    <PageLayout title="Partners">
      <PageHero
        eyebrow="Partners"
        title="Consulting, training, and customisation"
        body="Solution partners help you design the system of work. This directory is a demo list."
        crumbs={[{ label: "Resources", to: "/resources" }, { label: "Partners" }]}
      />
      <Section>
        <ul className="grid gap-4 md:grid-cols-3">
          {["Harbourline Advisory", "Ledgerline Cloud", "Northbridge Atlassian Practice"].map((name) => (
            <li key={name} className="rounded-atl-lg border border-line p-6">
              <h2 className="text-xl font-extrabold">{name}</h2>
              <p className="mt-2 text-sm text-ink-soft">Platinum Solution Partner · Cloud, Data Center, Guard</p>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand primaryLabel="Contact us" primaryTo="/contact" />
    </PageLayout>
  );
}
