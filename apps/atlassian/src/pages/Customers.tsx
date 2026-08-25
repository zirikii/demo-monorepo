import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { CUSTOMER_STORIES } from "@/data/stories";

export default function CustomersPage() {
  return (
    <PageLayout title="Customer stories">
      <PageHero
        eyebrow="Customers"
        title="How teams of the future ship faster"
        body="Discover how the teams of the future deliver measurable outcomes with Jira, Confluence, and Rovo."
        crumbs={[{ label: "Home", to: "/" }, { label: "Customers" }]}
      />
      <Section>
        <ul className="grid gap-4 md:grid-cols-2">
          {CUSTOMER_STORIES.map((story) => (
            <li key={story.slug}>
              <Link
                to={`/customers/${story.slug}`}
                className="focus-atl flex h-full flex-col gap-3 rounded-atl-lg border border-line p-6 hover:border-atl-blue"
              >
                <p className="text-xs font-bold tracking-[0.12em] text-atl-blue uppercase">
                  {story.industry} · {story.region}
                </p>
                <h2 className="text-2xl font-extrabold">{story.company}</h2>
                <p className="text-sm leading-relaxed text-ink-soft">{story.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </PageLayout>
  );
}
