import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { StoryCard } from "@/components/article/StoryCard";
import { Button } from "@/components/ui/Button";
import { searchArticles } from "@/data/articles";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function SearchPage() {
  const [params] = useSearchParams();
  const initial = params.get("q") ?? "";
  const [q, setQ] = useState(initial);
  const navigate = useNavigate();
  useDocumentTitle(initial ? `Search: ${initial}` : "Search");

  const results = searchArticles(params.get("q") ?? "");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : "/search");
  };

  return (
    <PageLayout>
      <h1 className="font-display text-4xl font-bold">Search</h1>
      <form onSubmit={onSubmit} className="mt-4 flex max-w-xl gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search headlines, authors, topics"
          className="flex-1 rounded-md border border-nine-line px-3 py-2 text-sm outline-none focus:border-nine-cyan"
          aria-label="Search query"
        />
        <Button type="submit">Search</Button>
      </form>
      <p className="mt-4 text-sm text-nine-muted">
        {results.length} result{results.length === 1 ? "" : "s"}
        {params.get("q") ? (
          <>
            {" "}
            for “{params.get("q")}”
          </>
        ) : null}
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((a) => (
          <StoryCard key={a.slug} article={a} />
        ))}
      </div>
      {results.length === 0 && (
        <p className="mt-8 text-nine-muted">
          Nothing matched. Try <Link to="/news">News</Link> or <Link to="/sport">Sport</Link>.
        </p>
      )}
    </PageLayout>
  );
}
