import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { customerStories } from "@/data/customers";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function CustomersPage() {
  useDocumentTitle("Customer stories");
  return (
    <PageLayout>
      <PageHero eyebrow="Customers" title="Customer stories" description="Real outcomes from teams running Employment OS." />
      <Section>
        <div className="container-eh grid gap-4 md:grid-cols-2">
          {customerStories.map((story) => (
            <Link key={story.slug} to={`/customers/${story.slug}`} className="focus-eh rounded-eh-lg border border-line bg-white p-6 shadow-eh hover:shadow-eh-lift">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eh-purple">{story.industry}</p>
              <h2 className="mt-2 text-xl font-bold">{story.company}</h2>
              <p className="mt-2 text-sm text-ink-soft">{story.headline}</p>
              <p className="mt-4 text-sm font-semibold text-ink">{story.metric}</p>
            </Link>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
