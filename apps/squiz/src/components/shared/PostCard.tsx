import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { tintBg } from "@/lib/tints";
import type { BlogPost } from "@/data/posts";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const categoryIcons: Record<BlogPost["category"], string> = {
  "AI & Search": "Sparkles",
  Accessibility: "Accessibility",
  "DXP Strategy": "Layers",
  Content: "PenLine",
  Product: "Blocks",
};

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream-deep bg-card shadow-card transition-shadow hover:shadow-float"
    >
      <div className={cn("flex h-40 items-center justify-center", tintBg[post.tint])}>
        <Icon name={categoryIcons[post.category]} className="size-12 text-navy/70" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <Badge tint={post.tint}>{post.category}</Badge>
          <span className="inline-flex items-center gap-1 text-xs text-ink-faint">
            <Clock className="size-3" aria-hidden />
            {post.readMinutes} min read
          </span>
        </div>
        <h3 className="mt-3 flex-1 text-lg font-semibold leading-snug text-navy group-hover:underline">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
          Read article
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
