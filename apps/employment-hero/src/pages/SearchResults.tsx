import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { blogPosts } from "@/data/blog";
import { products } from "@/data/products";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function SearchResultsPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  useDocumentTitle(q ? `Search: ${q}` : "Search");
  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [] as { title: string; to: string; type: string }[];
    const productHits = products.filter((p) => `${p.name} ${p.tagline}`.toLowerCase().includes(needle)).map((p) => ({ title: p.name, to: `/products/${p.slug}`, type: "Product" }));
    const blogHits = blogPosts.filter((p) => `${p.title} ${p.excerpt}`.toLowerCase().includes(needle)).map((p) => ({ title: p.title, to: `/blog/${p.slug}`, type: "Blog" }));
    return [...productHits, ...blogHits];
  }, [q]);

  return (
    <PageLayout>
      <PageHero title="Search" description="Find products and articles in this demo." />
      <Section>
        <div className="container-eh max-w-2xl">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              setParams({ q: String(fd.get("q") ?? "") });
            }}
          >
            <input name="q" defaultValue={q} placeholder="Try payroll, leave, hiring…" className="focus-eh flex-1 rounded-full border border-line px-4 py-2.5" />
            <button type="submit" className="focus-eh rounded-full bg-eh-purple px-5 py-2.5 text-sm font-semibold text-white">Search</button>
          </form>
          <ul className="mt-8 space-y-3">
            {results.map((r) => (
              <li key={r.to} className="rounded-eh-md border border-line bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase text-ink-faint">{r.type}</p>
                <Link to={r.to} className="font-semibold text-eh-purple hover:underline">{r.title}</Link>
              </li>
            ))}
            {q && results.length === 0 ? <li className="text-sm text-ink-soft">No matches for “{q}”.</li> : null}
          </ul>
        </div>
      </Section>
    </PageLayout>
  );
}
