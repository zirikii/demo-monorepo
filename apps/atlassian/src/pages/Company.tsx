import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { SITE } from "@/data/site";

export default function CompanyPage() {
  return (
    <PageLayout title="About Atlassian">
      <PageHero
        eyebrow="Company"
        title="Unleash the potential of every team"
        body={`${SITE.name} was founded in ${SITE.founded}. Headquarters: ${SITE.headquarters}.`}
        crumbs={[{ label: "Home", to: "/" }, { label: "Company" }]}
      />
      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: "Team first", body: "We build for the way people actually work together — not the org chart on a slide." },
            { title: "Open company, no bullshit", body: "Say what you mean, write it down, and leave the work where the next person can find it." },
            { title: "Play, as a team", body: "The best software comes from people who still like working with each other on Friday." },
          ].map((value) => (
            <article key={value.title} className="rounded-atl-lg border border-line p-6">
              <h2 className="text-xl font-extrabold">{value.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{value.body}</p>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand title="Come work with us" primaryLabel="See careers" primaryTo="/careers" />
    </PageLayout>
  );
}
