import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PostCard } from "@/components/marketing/PostCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import { Tabs, type TabOption } from "@/components/ui/Tabs";
import { POSTS, POST_CATEGORIES } from "@/data/posts";
import type { PostCategory } from "@/data/types";
import { pluralise } from "@/lib/format";
import { pageCount, paginate } from "@/lib/jobs";
import { POSTS_PER_PAGE, filterPosts, sortPostsByDate } from "@/lib/posts";

function isPostCategory(value: string): value is PostCategory {
  return (POST_CATEGORIES as string[]).includes(value);
}

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") ?? "";
  const category = isPostCategory(categoryParam) ? categoryParam : "";

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const options = useMemo<TabOption[]>(
    () => [
      { id: "", label: "All", count: POSTS.length },
      ...POST_CATEGORIES.map((entry) => ({
        id: entry,
        label: entry,
        count: POSTS.filter((post) => post.category === entry).length,
      })),
    ],
    [],
  );

  const matches = useMemo(
    () => sortPostsByDate(filterPosts({ query, category })),
    [query, category],
  );

  const pages = pageCount(matches.length, POSTS_PER_PAGE);
  const currentPage = Math.min(page, pages);
  const visible = paginate(matches, currentPage, POSTS_PER_PAGE);

  function chooseCategory(next: string) {
    setPage(1);
    setSearchParams(next ? { category: next } : {}, { replace: true });
  }

  return (
    <PageLayout title="Blogs & News">
      <PageHero
        eyebrow="Blogs & News"
        title="Wondering how we do it all?"
        body="Engineering write-ups, product decisions, design research, and the retrospectives we would rather publish than repeat."
      />

      <Section width="wide">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Tabs
              options={options}
              value={category}
              onChange={chooseCategory}
              ariaLabel="Filter stories by category"
            />

            <div className="relative w-full lg:max-w-xs">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink-ghost"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Search stories"
                aria-label="Search stories"
                className="focus-go w-full rounded-full border border-line bg-white py-2.5 pr-4 pl-10 text-sm text-ink placeholder:text-ink-ghost"
              />
            </div>
          </div>

          <p className="text-sm font-semibold text-ink-faint">
            {pluralise(matches.length, "story", "stories")} found
          </p>
        </div>

        {visible.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No stories match that"
              body="Try a different keyword, or clear the category filter to see everything we have published."
              action={
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setQuery("");
                    chooseCategory("");
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            <div className="mt-12">
              <Pagination
                page={currentPage}
                pages={pages}
                onChange={setPage}
                label="Stories pagination"
              />
            </div>
          </>
        )}
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
