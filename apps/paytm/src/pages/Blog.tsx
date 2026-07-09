import { useState } from "react";
import { Clock } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { PageHero } from "../components/shared/PageHero";
import { Badge } from "../components/ui/Badge";
import { blogPosts, blogCategories } from "../data/company";
import { formatDate } from "../lib/format";
import { cn } from "../lib/cn";

export function BlogPage() {
  useDocumentTitle("Blog");
  const [category, setCategory] = useState("All");

  const visible = category === "All" ? blogPosts : blogPosts.filter((p) => p.category === category);

  return (
    <PageLayout>
      <PageHero
        title={
          <>
            Stories from the <span className="text-paytm-cyan">payments frontline</span>
          </>
        }
        subtitle="Product deep-dives, engineering notes, and safety guides — written for this demo build."
      />

      <section aria-label="Blog posts" className="mx-auto max-w-7xl px-4 sm:px-6">
        <div role="group" aria-label="Filter posts" className="flex flex-wrap gap-2">
          {["All", ...blogCategories].map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={category === cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-bold transition-colors",
                category === cat
                  ? "border-paytm-navy bg-paytm-navy text-white"
                  : "border-hairline bg-card text-ink-soft hover:border-paytm-navy/50",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <li key={post.id}>
              <article className="flex h-full flex-col rounded-2xl bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-float">
                <div className="flex items-center justify-between gap-2">
                  <Badge tone="cyan">{post.category}</Badge>
                  <span className="text-[10px] text-ink-faint">{formatDate(post.date)}</span>
                </div>
                <h2 className="mt-3 text-base font-bold leading-snug text-ink">{post.title}</h2>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-soft">{post.excerpt}</p>
                <p className="mt-4 flex items-center gap-1.5 text-xs text-ink-faint">
                  <Clock aria-hidden="true" className="h-3.5 w-3.5" /> {post.minutes} min read
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </PageLayout>
  );
}
