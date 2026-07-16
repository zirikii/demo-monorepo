import { Link } from "react-router-dom";
import type { Article } from "@/data/articles";
import { formatRelativeTime } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { StoryImage } from "@/components/article/StoryImage";

export function LeadStory({ article }: { article: Article }) {
  return (
    <article className="animate-[fade-up_0.5s_ease-out_both]">
      <Link to={`/${article.pillar}/${article.slug}`} className="group grid gap-4 no-underline lg:grid-cols-2">
        <StoryImage article={article} large className="rounded-lg" />
        <div className="flex flex-col justify-center">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge tone="cyan">{article.category}</Badge>
            {article.isBreaking && <Badge tone="breaking">Breaking</Badge>}
            {article.isLive && <Badge tone="live">Live</Badge>}
            <span className="text-xs text-nine-muted">{formatRelativeTime(article.publishedAt)}</span>
          </div>
          <h1 className="font-display text-3xl font-bold leading-[1.1] text-nine-ink group-hover:text-nine-blue sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-3 max-w-xl text-base text-nine-muted sm:text-lg">{article.dek}</p>
          <p className="mt-4 text-sm font-medium text-nine-ink">By {article.author}</p>
        </div>
      </Link>
    </article>
  );
}
