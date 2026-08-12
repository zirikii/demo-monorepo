import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { ArticleCard } from "@/components/marketing/ArticleCard";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Tabs } from "@/components/ui/Tabs";
import { articleCategories, articles, getArticle, getLatestArticles } from "@/data/articles";
import { formatLongDate, formatReadingTime } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function BlogPage() {
  useDocumentTitle("Blog");
  const [category, setCategory] = useState("All");

  const filtered =
    category === "All" ? articles : articles.filter((article) => article.category === category);
  const sorted = [...filtered].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Blog"
        title="Practical writing about employment."
        blurb="Payroll compliance, hiring, and the parts of people management that nobody trains you for."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]}
      >
        <Tabs
          items={[
            { id: "All", label: "All" },
            ...articleCategories.map((item) => ({ id: item, label: item })),
          ]}
          active={category}
          onChange={setCategory}
          ariaLabel="Filter articles by category"
        />
      </PageHero>

      <Section className="pt-10">
        {sorted.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nothing published in that category yet"
            body="Choose another category to see what has been written recently."
          />
        )}
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}

export function ArticlePage() {
  const { slug = "" } = useParams();
  const article = getArticle(slug);

  useDocumentTitle(article?.title ?? "Blog");

  if (!article) return <Navigate to="/blog" replace />;

  const more = getLatestArticles(4)
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <SiteLayout>
      <article>
        <PageHero
          eyebrow={article.category}
          title={article.title}
          blurb={article.excerpt}
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Blog", to: "/blog" },
            { label: article.title },
          ]}
        >
          <div className="flex items-center gap-3">
            <Avatar name={article.author} />
            <span className="text-sm">
              <span className="block font-semibold text-eh-ink">{article.author}</span>
              <span className="block text-eh-ink-faint">
                {article.authorRole} · {formatLongDate(article.publishedAt)} ·{" "}
                {formatReadingTime(article.readingMinutes)}
              </span>
            </span>
          </div>
        </PageHero>

        <Section>
          <div className="mx-auto max-w-3xl space-y-6">
            {article.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-eh-ink-soft">
                {paragraph}
              </p>
            ))}

            <div className="mt-10 rounded-eh-lg border border-eh-line bg-eh-surface-tint p-6 text-sm leading-relaxed text-eh-ink-faint">
              This article is demo content written for an unofficial clone of employmenthero.com. It
              is general information only and is not legal, financial or employment advice.
            </div>
          </div>
        </Section>
      </article>

      <Section tone="tint">
        <SectionHeading eyebrow="Keep reading" title="More from the blog" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {more.map((item) => (
            <ArticleCard key={item.slug} article={item} />
          ))}
        </div>
        <Link
          to="/blog"
          className="focus-eh mt-8 inline-block text-sm font-semibold text-eh-purple hover:underline"
        >
          See all articles →
        </Link>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}

export function ComplianceCornerPage() {
  useDocumentTitle("Compliance corner");
  const compliance = articles.filter((article) => article.category === "Payroll & Compliance");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Compliance corner"
        title="Keep up with what changed."
        blurb="Award updates, superannuation obligations and employment law changes, written for the person who has to action them."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Compliance corner" }]}
      >
        <Badge tone="amber">Payday Super starts 1 July 2026</Badge>
      </PageHero>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {compliance.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}
