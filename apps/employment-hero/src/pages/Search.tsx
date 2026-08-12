import { Link, useSearchParams } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { searchSite } from "@/lib/search";
import { pluralise } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const results = searchSite(query);

  useDocumentTitle(query ? `Search: ${query}` : "Search");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Search"
        title={query ? `Results for “${query}”` : "Search"}
        blurb={
          query
            ? `${pluralise(results.length, "result")} across products, resources and case studies.`
            : "Search products, resources, case studies and jobs."
        }
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Search" }]}
      />

      <Section className="pt-10">
        {results.length ? (
          <ul className="space-y-4">
            {results.map((result) => (
              <li key={result.to}>
                <Link
                  to={result.to}
                  className="focus-eh group block rounded-eh-lg border border-eh-line bg-white p-6 transition hover:border-eh-purple hover:shadow-eh"
                >
                  <Badge tone="neutral">{result.kind}</Badge>
                  <h2 className="mt-3 text-lg font-semibold text-eh-ink group-hover:text-eh-purple">
                    {result.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-eh-ink-soft">
                    {result.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title={query ? "Nothing matched that search" : "Type something to search"}
            body="Try a product name like payroll, an industry like hospitality, or a topic like onboarding."
          />
        )}
      </Section>
    </SiteLayout>
  );
}
