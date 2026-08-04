import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Card";
import { FilterChips } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { articles, findArticle } from "@/data/articles";
import { formatLongDate } from "@/lib/format";
import { NotFoundPage } from "./NotFound";

const categories = ["All", "Newsroom", "Economic insights", "Security", "Property", "Business"];

export function NewsroomPage() {
  useDocumentTitle("Newsroom");
  const [category, setCategory] = useState("All");

  const visible = useMemo(
    () => articles.filter((article) => category === "All" || article.category === category),
    [category],
  );

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Newsroom" }]} />
      <PageHero
        eyebrow="Newsroom"
        title="News, insights and announcements"
        description="Product announcements, economic insights and security updates from CommBank."
        tone="light"
      />

      <section className="py-14">
        <div className="container-page">
          <FilterChips
            options={categories}
            value={category}
            onChange={setCategory}
            ariaLabel="Filter articles by category"
          />
          <p className="mt-4 text-sm text-ink-soft" role="status">
            Showing <strong className="text-black">{visible.length}</strong> of {articles.length}{" "}
            articles
          </p>

          {visible.length === 0 ? (
            <EmptyState
              title="No articles in that category"
              description="Choose a different category to browse the newsroom."
            />
          ) : (
            <ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((article) => (
                <li key={article.slug}>
                  <Link
                    to={`/newsroom/${article.slug}`}
                    className="focus-ring flex h-full flex-col rounded-2xl border border-line p-6 transition-shadow hover:shadow-card"
                  >
                    <Badge tone="neutral" className="self-start">
                      {article.category}
                    </Badge>
                    <h2 className="mt-3 text-lg font-bold leading-snug text-black">
                      {article.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm text-ink-soft">{article.standfirst}</p>
                    <p className="mt-4 text-xs text-ink-muted">
                      {formatLongDate(article.published)} · {article.readMinutes} min read
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <ThingsYouShouldKnow>
        <p>
          Articles are fabricated demo content and do not represent real CommBank announcements.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? findArticle(slug) : undefined;
  useDocumentTitle(article?.title ?? "Article");

  if (!article) return <NotFoundPage />;

  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Newsroom", to: "/newsroom" }, { label: article.category }]} />

      <article className="py-12">
        <div className="container-page max-w-3xl">
          <Badge tone="yellow">{article.category}</Badge>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-ink-soft">{article.standfirst}</p>
          <p className="mt-4 border-b border-line pb-6 text-sm text-ink-muted">
            {formatLongDate(article.published)} · {article.readMinutes} min read
          </p>
          <div className="mt-7 space-y-5 text-base leading-relaxed text-ink-soft">
            {article.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      <section className="border-t border-line bg-surface-tint py-14">
        <div className="container-page">
          <SectionHeading title="More from the newsroom" />
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  to={`/newsroom/${item.slug}`}
                  className="focus-ring flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-card"
                >
                  <Badge tone="neutral" className="self-start">
                    {item.category}
                  </Badge>
                  <h3 className="mt-3 text-base font-bold leading-snug text-black">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">{item.standfirst}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink to="/newsroom" variant="outline">
              Back to newsroom
            </ButtonLink>
          </div>
        </div>
      </section>

      <ThingsYouShouldKnow>
        <p>This article is fabricated demo content.</p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
