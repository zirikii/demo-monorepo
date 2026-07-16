import { Link } from "react-router-dom";
import { PlayCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { timeAgo, readTimeLabel } from "@/lib/format";
import { pillars } from "@/data/pillars";
import type { Article } from "@/data/types";
import { ArticleImage } from "./ArticleImage";
import { Badge } from "../ui/Badge";

type Variant = "lead" | "standard" | "compact" | "text";

type Props = {
  article: Article;
  variant?: Variant;
  className?: string;
  showPillar?: boolean;
};

export function ArticleCard({
  article,
  variant = "standard",
  className,
  showPillar = false,
}: Props) {
  const to = `/article/${article.slug}`;
  const pillar = pillars[article.pillar];

  const kicker = (
    <div className="flex flex-wrap items-center gap-1.5">
      {article.live ? <Badge tone="live">● Live</Badge> : null}
      {showPillar ? (
        <Link to={pillar.to} className={cn("text-[11px] font-bold uppercase tracking-wide", pillar.text)}>
          {pillar.label}
        </Link>
      ) : (
        <span className={cn("text-[11px] font-bold uppercase tracking-wide", pillar.text)}>
          {article.category}
        </span>
      )}
      {article.sponsored ? <Badge tone="sponsored">Sponsored</Badge> : null}
    </div>
  );

  const meta = (
    <p className="mt-2 text-xs text-ink-faint">
      {article.author} · {timeAgo(article.publishedAt)} · {readTimeLabel(article.readMinutes)}
    </p>
  );

  if (variant === "text") {
    return (
      <article className={cn("border-b border-line-soft py-3 last:border-0", className)}>
        {kicker}
        <h3 className="mt-1 text-[15px] font-bold leading-snug text-ink hover:text-nine-deep">
          <Link to={to}>{article.title}</Link>
        </h3>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className={cn("group flex gap-3", className)}>
        <Link to={to} className="shrink-0">
          <ArticleImage article={article} label={false} className="h-16 w-24 rounded-md sm:h-[70px] sm:w-28" />
        </Link>
        <div className="min-w-0">
          {kicker}
          <h3 className="mt-1 line-clamp-3 text-sm font-bold leading-snug text-ink group-hover:text-nine-deep">
            <Link to={to}>{article.title}</Link>
          </h3>
        </div>
      </article>
    );
  }

  if (variant === "lead") {
    return (
      <article className={cn("group", className)}>
        <Link to={to} className="block">
          <ArticleImage article={article} className="aspect-[16/9] w-full rounded-lg" />
        </Link>
        <div className="mt-3">
          {kicker}
          <h2 className="mt-1.5 text-2xl font-black leading-[1.1] tracking-tight text-ink group-hover:text-nine-deep sm:text-[32px]">
            <Link to={to}>{article.title}</Link>
          </h2>
          <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-ink-soft">
            {article.standfirst}
          </p>
          {meta}
        </div>
      </article>
    );
  }

  return (
    <article className={cn("group flex flex-col", className)}>
      <Link to={to} className="block">
        <div className="relative">
          <ArticleImage article={article} className="aspect-[16/9] w-full rounded-md" />
          {article.pillar === "entertainment" || article.live ? (
            <PlayCircle
              className="absolute bottom-2 right-2 h-6 w-6 text-white/90 drop-shadow"
              aria-hidden="true"
            />
          ) : null}
        </div>
      </Link>
      <div className="mt-2.5">
        {kicker}
        <h3 className="mt-1 line-clamp-3 text-base font-bold leading-snug text-ink group-hover:text-nine-deep">
          <Link to={to}>{article.title}</Link>
        </h3>
        {meta}
      </div>
    </article>
  );
}
