import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { RESOURCES } from "@/data/resources";
import { formatDate } from "@/lib/format";

export default function ResourcesPage() {
  return (
    <PageLayout title="Resources">
      <PageHero
        eyebrow="Learn"
        title="Best practices for unstoppable teams"
        body="Reports, ebooks, and events on agents, collections, and the Teamwork Graph."
        crumbs={[{ label: "Home", to: "/" }, { label: "Resources" }]}
      />
      <Section>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((resource) => (
            <li key={resource.slug}>
              <Link
                to={`/resources/${resource.slug}`}
                className="focus-atl flex h-full flex-col gap-3 rounded-atl-lg border border-line p-6 hover:border-atl-blue"
              >
                <span className="text-xs font-bold tracking-[0.12em] text-atl-blue uppercase">
                  {resource.type}
                </span>
                <h2 className="text-xl font-extrabold">{resource.title}</h2>
                <p className="text-sm leading-relaxed text-ink-soft">{resource.excerpt}</p>
                <p className="mt-auto pt-2 text-xs text-ink-faint">
                  {formatDate(resource.publishedOn)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </PageLayout>
  );
}
