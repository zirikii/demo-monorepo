import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";

const APPS = [
  { name: "Tempo Timesheets", category: "Time tracking", rating: "4.6" },
  { name: "ScriptRunner", category: "Automation", rating: "4.7" },
  { name: "Structure", category: "Project management", rating: "4.8" },
  { name: "Zephyr Scale", category: "Testing", rating: "4.5" },
  { name: "Draw.io", category: "Diagrams", rating: "4.7" },
  { name: "Slack for Jira", category: "Communication", rating: "4.4" },
];

export default function MarketplacePage() {
  return (
    <PageLayout title="Marketplace">
      <PageHero
        eyebrow="Marketplace"
        title="Thousands of apps for Jira, Confluence, and more"
        body="Names below are well-known Marketplace categories used as demo cards. Installing does nothing."
        crumbs={[{ label: "Products", to: "/software" }, { label: "Marketplace" }]}
      />
      <Section>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {APPS.map((app) => (
            <li key={app.name} className="rounded-atl-lg border border-line p-6">
              <p className="text-xs font-bold tracking-[0.12em] text-ink-ghost uppercase">{app.category}</p>
              <h2 className="mt-2 text-xl font-extrabold">{app.name}</h2>
              <p className="mt-2 text-sm text-ink-faint">{app.rating} / 5</p>
            </li>
          ))}
        </ul>
      </Section>
    </PageLayout>
  );
}
