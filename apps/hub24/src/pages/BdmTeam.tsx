import { PageHero } from "@/components/marketing/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { BDM_TEAM } from "@/data/bdm";

export default function BdmTeamPage() {
  return (
    <PageLayout title="BDM team">
      <PageHero
        eyebrow="Distribution"
        title="Chat to your local BDM"
        body="Rated Best BDM Support by advisers. Dummy contacts only — please do not call these numbers expecting a real HUB24 desk."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BDM_TEAM.map((person) => (
            <article key={person.email} className="rounded-hub-lg border border-line p-5">
              <h2 className="text-lg font-bold">{person.name}</h2>
              <p className="text-sm text-hub-teal">{person.role}</p>
              <p className="mt-2 text-sm text-ink-soft">{person.region}</p>
              <p className="mt-3 text-sm">{person.phone}</p>
              <p className="text-sm text-ink-faint">{person.email}</p>
            </article>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
