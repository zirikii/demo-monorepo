import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { PostCard } from "@/components/shared/PostCard";
import { posts } from "@/data/posts";
import { cn } from "@/lib/cn";

const categories = ["All", "AI & Search", "Accessibility", "DXP Strategy", "Content", "Product"] as const;

export function BlogPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const visible = category === "All" ? posts : posts.filter((p) => p.category === category);

  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Blog" }]} />
      <PageHero
        eyebrow="Blog"
        title="Stories, news and insights"
        copy="Original demo articles on the themes digital teams care about: AI search, accessibility, DXP strategy, and content operations."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter posts by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                category === c ? "bg-navy text-mint" : "bg-card text-navy hover:bg-cream-deep/60",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      <CtaSection />
    </PageLayout>
  );
}
