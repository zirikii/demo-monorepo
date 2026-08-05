import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { pluralise } from "@/lib/format";
import { searchSite } from "@/lib/search";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initial);

  useDocumentTitle(initial ? `Search results for ${initial}` : "Search");
  const results = useMemo(() => searchSite(initial), [initial]);

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Search" }]} />
      <PageHero eyebrow="Search" title="Search CommBank" tone="light" />

      <Section>
        <form
          role="search"
          className="flex flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            setSearchParams(query ? { q: query } : {}, { replace: true });
          }}
        >
          <label className="sr-only" htmlFor="results-search">
            Search CommBank
          </label>
          <div className="relative flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-ghost"
            />
            <input
              id="results-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products, rates and support"
              className="focus-cba w-full rounded-full border border-line bg-surface py-3 pl-12 pr-4 text-[15px]"
            />
          </div>
          <button
            type="submit"
            className="focus-cba rounded-full bg-ink px-8 py-3 text-[15px] font-bold text-surface hover:bg-ink-strong"
          >
            Search
          </button>
        </form>

        <p className="mt-5 text-sm text-ink-faint" aria-live="polite">
          {initial
            ? `${pluralise(results.length, "result")} for "${initial}"`
            : "Enter a search term to begin."}
        </p>

        <div className="mt-4">
          {initial && results.length === 0 ? (
            <EmptyState
              title="No results found"
              body="Try a different term, or browse our support FAQs and product pages."
            />
          ) : (
            <ul className="divide-y divide-line-soft">
              {results.map((result) => (
                <li key={result.id} className="py-5">
                  <Badge tone="muted">{result.kind}</Badge>
                  <h2 className="mt-2 text-lg font-bold">
                    <Link
                      to={result.to}
                      className="focus-cba text-ink underline underline-offset-4"
                    >
                      {result.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{result.summary}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      <HelpBlock />
    </PageLayout>
  );
}
