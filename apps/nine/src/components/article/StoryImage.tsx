import type { Article } from "@/data/articles";
import { cn } from "@/lib/cn";

export function StoryImage({
  article,
  className,
  large,
}: {
  article: Pick<Article, "imageTone" | "imageLabel" | "title">;
  className?: string;
  large?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-nine-ink text-white",
        large ? "min-h-56 sm:min-h-72" : "aspect-[16/10]",
        className,
      )}
      style={{
        background: `linear-gradient(145deg, ${article.imageTone} 0%, #070720 85%)`,
      }}
      role="img"
      aria-label={article.title}
    >
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(0,190,255,0.45), transparent 45%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.12), transparent 40%)",
      }} />
      <span className="absolute bottom-3 left-3 rounded bg-black/35 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-sm">
        {article.imageLabel}
      </span>
    </div>
  );
}
