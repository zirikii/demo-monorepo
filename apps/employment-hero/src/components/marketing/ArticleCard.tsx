import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import type { Article } from "@/data/types";
import { formatDate, formatReadingTime } from "@/lib/format";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="focus-eh group flex flex-col rounded-eh-lg border border-eh-line bg-white p-6 transition hover:border-eh-purple hover:shadow-eh-lift"
    >
      <Badge tone="purple">{article.category}</Badge>
      <h3 className="mt-4 text-lg leading-snug font-semibold text-eh-ink group-hover:text-eh-purple">
        {article.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-eh-ink-soft">{article.excerpt}</p>
      <p className="mt-5 text-xs text-eh-ink-faint">
        {article.author} · {formatDate(article.publishedAt)} ·{" "}
        {formatReadingTime(article.readingMinutes)}
      </p>
    </Link>
  );
}
