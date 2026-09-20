import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import type { Post } from "@/data/types";
import { formatDate, formatReadingTime } from "@/lib/format";
import { cn } from "@/lib/cn";

export function PostCard({ post, tone = "light" }: { post: Post; tone?: "light" | "dark" }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-4 rounded-go-lg p-6 transition",
        tone === "dark"
          ? "bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
          : "border border-line bg-white hover:-translate-y-1 hover:shadow-go-lift",
      )}
    >
      <div className="flex items-center gap-3">
        <Badge tone={tone === "dark" ? "inverse" : "brand"}>{post.category}</Badge>
        <span className={cn("text-xs", tone === "dark" ? "text-white/50" : "text-ink-faint")}>
          {formatReadingTime(post.readingMinutes)}
        </span>
      </div>

      <h3
        className={cn(
          "text-xl leading-snug font-extrabold tracking-tight",
          tone === "dark" ? "text-white" : "text-ink-strong",
        )}
      >
        <Link to={`/blog/${post.slug}`} className="focus-go hover:text-go-green">
          {post.title}
        </Link>
      </h3>

      <p
        className={cn(
          "text-sm leading-relaxed",
          tone === "dark" ? "text-white/65" : "text-ink-soft",
        )}
      >
        {post.excerpt}
      </p>

      <div
        className={cn(
          "mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-xs font-semibold",
          tone === "dark" ? "text-white/45" : "text-ink-faint",
        )}
      >
        <span>{post.author}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={post.publishedOn}>{formatDate(post.publishedOn)}</time>
      </div>
    </article>
  );
}
