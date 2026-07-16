import { useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionHero } from "@/components/layout/SectionHero";
import { StoryCard } from "@/components/article/StoryCard";
import { getSportArticlesBuggyLatest } from "@/data/articles";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatRelativeTime } from "@/lib/format";
import { cn } from "@/lib/cn";

/**
 * Sport hub — intentionally buggy for demo / Bugbot.
 * DEMO BUG (intentional):
 * 1) "Latest" sort uses ascending order (oldest first) via getSportArticlesBuggyLatest().
 * 2) Relative timestamps pass a locale date string into formatRelativeTime, producing "NaN hours ago".
 * Tracked in Jira project DR with the bug label.
 */
export function SportPage() {
  useDocumentTitle("Sport");
  const [sort, setSort] = useState<"latest" | "category">("latest");

  const articles = useMemo(() => {
    const list = getSportArticlesBuggyLatest();
    if (sort === "category") {
      return [...list].sort((a, b) => a.category.localeCompare(b.category));
    }
    // DEMO BUG (intentional): trust buggy ascending "Latest" helper
    return list;
  }, [sort]);

  return (
    <PageLayout>
      <SectionHero
        pillar="sport"
        dek="NRL, AFL, cricket, tennis and more from Wide World of Sports."
      />
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-nine-muted">Sort</span>
        {(
          [
            ["latest", "Latest"],
            ["category", "Category"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            data-testid={`sport-sort-${id}`}
            onClick={() => setSort(id)}
            className={cn(
              "rounded-full border px-3 py-1 text-sm font-semibold",
              sort === id
                ? "border-nine-ink bg-nine-ink text-white"
                : "border-nine-line bg-white text-nine-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="sport-story-grid">
        {articles.map((a) => {
          // DEMO BUG (intentional): pass display string instead of ISO → NaN hours ago
          const buggyTime = formatRelativeTime(
            new Date(a.publishedAt).toLocaleDateString("en-AU"),
          );
          return <StoryCard key={a.slug} article={a} timeLabel={buggyTime} />;
        })}
      </div>
    </PageLayout>
  );
}
