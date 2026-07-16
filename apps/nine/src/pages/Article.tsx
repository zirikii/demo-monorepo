import { Link, useParams } from "react-router-dom";
import { Clock, Share2 } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { ArticleImage } from "@/components/article/ArticleImage";
import { ArticleCard } from "@/components/article/ArticleCard";
import { MostPopular } from "@/components/sections/MostPopular";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { findArticle, relatedArticles } from "@/data/articles";
import { pillars } from "@/data/pillars";
import { formatDateTime, readTimeLabel } from "@/lib/format";
import { NotFoundPage } from "./NotFound";

export function ArticlePage() {
  const { slug } = useParams();
  const article = slug ? findArticle(slug) : undefined;
  useDocumentTitle(article ? article.title : "Article");

  if (!article) return <NotFoundPage />;

  const pillar = pillars[article.pillar];
  const related = relatedArticles(article);

  return (
    <PageLayout>
      <article className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs font-semibold text-ink-faint">
          <Link to="/" className="hover:text-nine-deep">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link to={pillar.to} className={pillar.text}>
            {pillar.label}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink-soft">{article.category}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {article.live ? <Badge tone="live">● Live</Badge> : null}
              <span className={`text-xs font-bold uppercase tracking-wide ${pillar.text}`}>
                {article.category}
              </span>
            </div>
            <h1 className="mt-2 text-3xl font-black leading-[1.08] tracking-tight text-ink sm:text-[42px]">
              {article.title}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft">{article.standfirst}</p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-y border-line py-3">
              <div className="text-sm">
                <p className="font-bold text-ink">{article.author}</p>
                <p className="text-ink-faint">{article.authorTitle}</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-ink-faint">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {readTimeLabel(article.readMinutes)}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 font-semibold text-nine-deep hover:underline"
                >
                  <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Share
                </button>
              </div>
            </div>

            <ArticleImage article={article} className="mt-5 aspect-[16/9] w-full rounded-lg" />
            <p className="mt-1.5 text-xs text-ink-faint">
              {formatDateTime(article.publishedAt)} · Demo imagery
            </p>

            <div className="prose-nine mt-6 space-y-4 text-[17px] leading-8 text-ink">
              {article.body.map((para, i) => (
                <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:font-black first-letter:leading-[0.85] first-letter:text-nine-deep" : undefined}>
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="space-y-5">
            <MostPopular />
          </aside>
        </div>

        {related.length > 0 ? (
          <section className="mt-12 border-t border-line pt-8">
            <SectionHeader title={`More in ${pillar.label}`} pillar={article.pillar} to={pillar.to} />
            <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </PageLayout>
  );
}
