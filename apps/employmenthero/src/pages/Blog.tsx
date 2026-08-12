import { useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { LinkCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tabs } from "@/components/ui/Tabs";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/data/blog";
import { formatDate, readingTime } from "@/lib/format";

const TABS = ["All", ...BLOG_CATEGORIES] as const;
type Tab = (typeof TABS)[number];

export default function BlogPage() {
  const [category, setCategory] = useState<Tab>("All");

  const posts = useMemo(
    () => (category === "All" ? BLOG_POSTS : BLOG_POSTS.filter((post) => post.category === category)),
    [category],
  );

  return (
    <PageLayout title="Blog">
      <PageHero
        eyebrow="Blog"
        title="Employment, explained"
        body="Payroll compliance, hiring economics and the practical side of keeping a team together."
        crumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]}
      />

      <Section tone="white">
        <Tabs tabs={TABS} active={category} onChange={setCategory} label="Blog category" className="mb-10" />

        {posts.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <LinkCard key={post.slug} to={`/blog/${post.slug}`} className="flex flex-col gap-3">
                <span className="text-xs font-extrabold tracking-[0.12em] text-eh-purple uppercase">
                  {post.category}
                </span>
                <h2 className="text-lg font-extrabold tracking-tight text-ink-strong">{post.title}</h2>
                <p className="flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{post.excerpt}</p>
                <span className="text-sm text-ink-faint">
                  {post.author} · {formatDate(post.publishedOn)} ·{" "}
                  {readingTime(post.body.join(" "))}
                </span>
              </LinkCard>
            ))}
          </div>
        ) : (
          <EmptyState title="Nothing here yet" body="Choose another category to see more articles." />
        )}
      </Section>

      <CtaBand
        title="Want this in your inbox?"
        body="The Employment Hero newsletter covers award changes, ATO deadlines and hiring data for Australian employers."
        primaryLabel="Talk to us"
        primaryTo="/contact"
        secondaryLabel="Browse resources"
        secondaryTo="/resources"
      />
    </PageLayout>
  );
}
