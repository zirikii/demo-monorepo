import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { getArticle, latestArticles } from "@/data/articles";
import { cn } from "@/lib/cn";
import { formatDateLong } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { NotFoundPage } from "./NotFound";

const categories = ["All", "Newsroom", "Economic insights", "Security", "Community"] as const;

export function NewsroomPage() {
  useDocumentTitle("Newsroom");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const results =
    category === "All"
      ? latestArticles
      : latestArticles.filter((article) => article.category === category);

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Newsroom" }]} />
      <PageHero
        eyebrow="Newsroom"
        title="News, insights and announcements"
        intro="Rate announcements, economic insights from CommBank Economics, security alerts and community updates."
      />

      <Section>
        <div className="flex flex-wrap gap-2">
          {categories.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={category === option}
              onClick={() => setCategory(option)}
              className={cn(
                "focus-cba rounded-full border px-4 py-2 text-sm font-bold transition-colors",
                category === option
                  ? "border-ink bg-ink text-surface"
                  : "border-line bg-surface text-ink hover:bg-surface-tint",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {results.length === 0 ? (
            <EmptyState
              title="No articles yet"
              body="Check back soon for updates in this category."
            />
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {results.map((article) => (
                <li key={article.slug}>
                  <Link
                    to={`/newsroom/${article.slug}`}
                    className="focus-cba flex h-full flex-col rounded-cba-lg border border-line-soft p-6 transition-shadow hover:shadow-cba-lift"
                  >
                    <Badge tone={article.category === "Security" ? "critical" : "muted"}>
                      {article.category}
                    </Badge>
                    <h2 className="mt-3 text-lg font-bold leading-snug text-ink">
                      {article.title}
                    </h2>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
                      {article.standfirst}
                    </p>
                    <p className="mt-4 text-[13px] text-ink-faint">
                      {formatDateLong(article.published)} · {article.readMinutes} min read
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      <HelpBlock />
    </PageLayout>
  );
}

export function ArticlePage() {
  const { slug = "" } = useParams();
  const article = getArticle(slug);
  useDocumentTitle(article?.title ?? "Article not found");

  if (!article) return <NotFoundPage />;

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Newsroom", to: "/newsroom" }, { label: article.title }]} />

      <article>
        <header className="bg-surface-tint py-12">
          <div className="container-cba max-w-3xl">
            <Badge tone={article.category === "Security" ? "critical" : "yellow"}>
              {article.category}
            </Badge>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-[40px]">
              {article.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{article.standfirst}</p>
            <p className="mt-5 text-[13px] text-ink-faint">
              {article.author} · {formatDateLong(article.published)} · {article.readMinutes} min
              read
            </p>
          </div>
        </header>

        <div className="container-cba max-w-3xl py-12">
          {article.body.map((paragraph) => (
            <p key={paragraph} className="mb-5 text-[17px] leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}
          <Link
            to="/newsroom"
            className="focus-cba inline-block text-[15px] font-bold text-ink underline underline-offset-4"
          >
            Back to the newsroom
          </Link>
        </div>
      </article>

      <HelpBlock />
    </PageLayout>
  );
}
