import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { publicPages } from "@/data/publicPages";

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return publicPages.slice(0, 8);
    return publicPages.filter((page) =>
      [page.title, page.eyebrow, page.summary, ...page.highlights].join(" ").toLowerCase().includes(term),
    );
  }, [query]);

  return (
    <PublicLayout>
      <section className="bg-cba-ink py-16 text-white">
        <div className="container-page">
          <p className="font-semibold text-cba-yellow">Search</p>
          <h1 className="mt-3 text-4xl font-bold">What can we help you find?</h1>
          <form
            className="mt-8 flex max-w-2xl gap-2"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              setParams(query ? { q: query } : {});
            }}
          >
            <label className="sr-only" htmlFor="site-search">Search products and support</label>
            <input
              id="site-search"
              className="field text-cba-ink"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try ‘savings’, ‘travel’ or ‘security’"
            />
            <button className="rounded-full bg-cba-yellow px-5 text-cba-ink" type="submit" aria-label="Search">
              <Search aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>
      <section className="container-page py-14">
        <p className="text-sm text-cba-muted">{results.length} results</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {results.map((page) => (
            <Link key={page.path} className="surface-card p-6 hover:border-cba-ink" to={page.path}>
              <p className="text-sm font-semibold text-cba-positive">{page.eyebrow}</p>
              <h2 className="mt-2 text-xl font-bold">{page.title}</h2>
              <p className="mt-2 text-sm leading-6 text-cba-ink-soft">{page.summary}</p>
            </Link>
          ))}
        </div>
        {results.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-cba-neutral p-8">
            <h2 className="text-xl font-bold">No matching results</h2>
            <p className="mt-2 text-cba-ink-soft">Try a broader term or visit the support hub.</p>
          </div>
        ) : null}
      </section>
    </PublicLayout>
  );
}
