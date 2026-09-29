import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, TriangleAlert } from "lucide-react";
import { AskAssistantCard } from "@/components/help/AskAssistantCard";
import { CategoryIcon } from "@/components/help/CategoryIcon";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { helpCategories, searchHelp } from "@/data/help";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function HelpSupportPage() {
  useDocumentTitle("Help & Support");
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const [draft, setDraft] = useState(q);
  const results = searchHelp(q);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setParams(draft.trim() ? { q: draft.trim() } : {});
  };

  return (
    <PageLayout>
      <PageHero
        crumbs={[{ label: "Help & Support" }]}
        title="Help & Support"
        intro="Find answers, manage your account or get in touch."
        aside={
          <form onSubmit={submit} role="search" className="rounded-agl-lg bg-white p-5 shadow-agl-lift">
            <label htmlFor="help-search" className="text-sm font-bold text-ink-soft">
              How can we help?
            </label>
            <div className="relative mt-2">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
              <input
                id="help-search"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="e.g. direct debit, meter read, nbn"
                className="h-13 w-full rounded-full border border-line pr-28 pl-12 focus:border-agl-blue focus:ring-2 focus:ring-agl-blue/20 focus:outline-none"
              />
              <button type="submit" className="absolute top-1.5 right-1.5 h-10 rounded-full bg-agl-blue px-5 text-sm font-bold text-white hover:bg-agl-blue-hover">
                Search
              </button>
            </div>
          </form>
        }
      />

      {q && (
        <Section title={`Results for "${q}"`}>
          {results.length === 0 ? (
            <p className="text-ink-soft">No articles matched. Try the AGL Assistant — it understands plain English.</p>
          ) : (
            <ul className="grid gap-3 md:grid-cols-2">
              {results.map(({ category, article }) => (
                <li key={`${category.slug}/${article.slug}`}>
                  <Link to={`/help/${category.slug}/${article.slug}`} className="block rounded-agl border border-line-soft p-4 hover:border-agl-blue">
                    <span className="text-xs font-bold text-agl-teal-ink">{category.title}</span>
                    <span className="block font-extrabold text-ink">{article.title}</span>
                    <span className="block text-sm text-ink-soft">{article.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Section>
      )}

      <Section title="Browse help topics">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {helpCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/help/${category.slug}`}
                  className="flex h-full gap-4 rounded-agl-lg border border-line-soft bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-agl-blue hover:shadow-agl"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-agl-sky text-agl-blue">
                    <CategoryIcon icon={category.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-lg font-extrabold text-ink">{category.title}</span>
                    <span className="block text-sm text-ink-soft">{category.description}</span>
                    <span className="mt-2 block text-xs font-bold text-agl-blue">{category.articles.length} articles</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-4">
            <AskAssistantCard step="menu" label="Show me the help topics" title="Chat or talk to AGL Assistant" />
            <Link to="/help/emergencies-outages" className="flex items-start gap-3 rounded-agl-lg border-2 border-critical/30 bg-critical-bg p-5">
              <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-critical" aria-hidden="true" />
              <span>
                <span className="block font-extrabold text-critical">Emergencies and outages</span>
                <span className="block text-sm text-ink-soft">Power out, smell gas or on life support? Get help now.</span>
              </span>
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="tint" id="neighbourhood" title="AGL Neighbourhood" intro="Ask the community, share energy-saving tips and join product previews.">
        <p className="text-ink-soft">The Neighbourhood is moderated by AGL and open to all customers.</p>
      </Section>
    </PageLayout>
  );
}
