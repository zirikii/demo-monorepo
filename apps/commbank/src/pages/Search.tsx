import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { searchIndex } from "@/data/searchIndex";
import { searchDocs } from "@/lib/search";
import { popularSearches } from "@/data/nav";

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  useDocumentTitle(query ? `Search results for "${query}"` : "Search");

  const results = useMemo(() => searchDocs(searchIndex, query).slice(0, 40), [query]);

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Search" }]} />
      <PageHero
        eyebrow="Search"
        title={query ? `Results for "${query}"` : "Search CommBank"}
        description={
          query
            ? `${results.length} ${results.length === 1 ? "result" : "results"} across products, rates, support and the newsroom.`
            : "Search across products, rates, tools, support articles and the newsroom."
        }
        tone="light"
      />

      <section className="py-12">
        <div className="container-page">
          <form
            className="mb-10 flex max-w-2xl gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              const value = String(new FormData(event.currentTarget).get("q") ?? "").trim();
              setParams(value ? { q: value } : {});
            }}
          >
            <label htmlFor="search-page-input" className="sr-only">
              Search CommBank
            </label>
            <input
              id="search-page-input"
              name="q"
              defaultValue={query}
              placeholder="Search CommBank"
              className="w-full rounded-lg border border-line-strong px-4 py-3 text-base outline-none focus:border-black focus:ring-2 focus:ring-black/15"
            />
            <button
              type="submit"
              className="focus-ring rounded-full bg-cba-yellow px-6 py-3 text-sm font-semibold text-black hover:bg-cba-yellow-deep"
            >
              Search
            </button>
          </form>

          {!query ? (
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
                Popular searches
              </p>
              <ul className="flex flex-wrap gap-2">
                {popularSearches.map((item) => (
                  <li key={item.to + item.label}>
                    <Link
                      to={item.to}
                      className="focus-ring inline-flex rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-soft hover:border-black hover:text-black"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : results.length === 0 ? (
            <EmptyState
              title="No results found"
              description={`We couldn't find anything matching "${query}". Try a different term, or browse from the homepage.`}
              action={<ButtonLink to="/">Back to homepage</ButtonLink>}
            />
          ) : (
            <ul className="divide-y divide-line border-y border-line">
              {results.map((result) => (
                <li key={result.to + result.title}>
                  <Link
                    to={result.to}
                    className="focus-ring block py-5 transition-colors hover:bg-surface-tint"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-bold text-black underline-offset-4 hover:underline">
                        {result.title}
                      </h2>
                      <Badge tone="neutral">{result.category}</Badge>
                    </div>
                    <p className="mt-1.5 max-w-3xl text-sm text-ink-soft">{result.description}</p>
                    <p className="mt-1.5 text-xs text-ink-muted">commbank.com.au{result.to}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
