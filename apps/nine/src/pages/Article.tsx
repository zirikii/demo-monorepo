import { Link, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { StoryImage } from "@/components/article/StoryImage";
import { StoryCard } from "@/components/article/StoryCard";
import { Badge } from "@/components/ui/Badge";
import { getArticle, relatedArticles, type Pillar } from "@/data/articles";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatLongDate, titleCase } from "@/lib/format";
import { NotFoundPage } from "@/pages/NotFound";

export function ArticlePage({ pillar }: { pillar: Pillar }) {
  const { slug = "" } = useParams();
  const article = getArticle(slug);
  const valid = article && article.pillar === pillar;

  useDocumentTitle(valid ? article.title : "Not found");

  if (!valid || !article) {
    return <NotFoundPage />;
  }

  const related = relatedArticles(article);

  return (
    <PageLayout>
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-nine-blue">
          <Link to="/" className="text-nine-muted no-underline hover:text-nine-blue">
            Home
          </Link>
          <span className="mx-2 text-nine-line">/</span>
          <Link to={`/${pillar}`} className="no-underline hover:underline">
            {titleCase(pillar)}
          </Link>
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone="cyan">{article.category}</Badge>
          {article.isBreaking && <Badge tone="breaking">Breaking</Badge>}
          {article.isLive && <Badge tone="live">Live</Badge>}
        </div>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl">{article.title}</h1>
        <p className="mt-3 text-lg text-nine-muted">{article.dek}</p>
        <p className="mt-4 text-sm text-nine-muted">
          By <span className="font-semibold text-nine-ink">{article.author}</span> ·{" "}
          {formatLongDate(article.publishedAt)}
        </p>
        <div className="mt-6 overflow-hidden rounded-lg">
          <StoryImage article={article} large />
        </div>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-nine-ink/90">
          {article.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 font-display text-2xl font-bold">Related</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((a) => (
              <StoryCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </PageLayout>
  );
}
