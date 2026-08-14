import { Link } from "react-router-dom";
import type { Article } from "@/data/articles";
import { formatRelativeTime } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { StoryImage } from "@/components/article/StoryImage";
import { cn } from "@/lib/cn";

export function StoryCard({
  article,
  compact,
  className,
}: {
  article: Article;
  compact?: boolean;
  className?: string;
}) {
  const href = `/${article.pillar}/${article.slug}`;
  const time = formatRelativeTime(article.publishedAt);

  return (
    <article className={cn("story-lift animate-[fade-up_0.45s_ease-out_both] group", className)}>
      <Link to={href} className="block no-underline">
        {!compact && <StoryImage article={article} className="rounded-md" />}
        <div className={cn(!compact && "pt-3")}>
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <Badge tone="cyan">{article.category}</Badge>
            {article.isBreaking && <Badge tone="breaking">Breaking</Badge>}
            {article.isLive && <Badge tone="live">Live</Badge>}
            <span className="text-xs text-nine-muted">{time}</span>
          </div>
          <h3
            className={cn(
              "font-display font-bold leading-snug text-nine-ink group-hover:text-nine-blue",
              compact ? "text-base" : "text-lg sm:text-xl",
            )}
          >
            {article.title}
          </h3>
          {!compact && <p className="mt-1.5 line-clamp-2 text-sm text-nine-muted">{article.dek}</p>}
        </div>
      </Link>
    </article>
  );
}
