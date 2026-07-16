import { cn } from "@/lib/cn";
import { gradientStyle } from "@/lib/format";
import type { Article } from "@/data/types";

type Props = {
  article: Article;
  className?: string;
  label?: boolean;
};

/**
 * Lightweight editorial image placeholder. The demo ships no external
 * photography, so each card gets a deterministic on-brand gradient with the
 * category kicker overlaid — enough to read as a news thumbnail.
 */
export function ArticleImage({ article, className, label = true }: Props) {
  return (
    <div
      className={cn("relative overflow-hidden bg-surface-deep", className)}
      style={gradientStyle(article.slug, article.pillar)}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
      {label ? (
        <span className="absolute bottom-2 left-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white/90 drop-shadow">
          {article.category}
        </span>
      ) : null}
    </div>
  );
}
