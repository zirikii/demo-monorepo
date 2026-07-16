import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { ArticleGrid } from "@/components/sections/ArticleGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { searchArticles } from "@/data/articles";

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const initial = params.get("q") ?? "";
  const [term, setTerm] = useState(initial);
  useDocumentTitle(initial ? `Search: ${initial}` : "Search");

  const results = useMemo(() => searchArticles(initial), [initial]);

  return (
    <PageLayout>
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-black tracking-tight text-ink">Search</h1>
        <form
          className="mt-4 flex max-w-xl gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setParams(term.trim() ? { q: term.trim() } : {});
          }}
        >
          <div className="relative flex-1">
            <SearchIcon
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
              aria-hidden="true"
            />
            <label className="sr-only" htmlFor="search-input">
              Search nine.com.au
            </label>
            <input
              id="search-input"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search news, sport, lifestyle…"
              className="w-full rounded-full border border-line bg-card py-2.5 pl-9 pr-4 text-sm outline-none ring-nine-deep focus:ring-2"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-nine-deep px-6 py-2 text-sm font-semibold text-white hover:bg-nine-ink"
          >
            Search
          </button>
        </form>

        <div className="mt-8">
          {initial ? (
            <p className="mb-5 text-sm text-ink-soft">
              {results.length} result{results.length === 1 ? "" : "s"} for{" "}
              <span className="font-bold text-ink">&ldquo;{initial}&rdquo;</span>
            </p>
          ) : null}

          {!initial ? (
            <EmptyState
              title="Search nine.com.au"
              description="Find the latest stories across news, sport, lifestyle, travel, entertainment and shopping."
              icon={<SearchIcon className="h-8 w-8" aria-hidden="true" />}
            />
          ) : results.length === 0 ? (
            <EmptyState
              title="No results found"
              description={`We couldn't find anything for "${initial}". Try a different search.`}
              icon={<SearchIcon className="h-8 w-8" aria-hidden="true" />}
            />
          ) : (
            <ArticleGrid articles={results} columns={3} showPillar />
          )}
        </div>
      </div>
    </PageLayout>
  );
}
