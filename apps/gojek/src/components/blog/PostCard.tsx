import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import type { BlogPost } from "@/data/types";
import { formatDate } from "@/lib/format";

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="border-b border-white/8 py-8">
      <p className="text-xs text-go-faint">
        {formatDate(post.date)} · {post.minutes} min read
      </p>
      <h3 className="mt-2 text-2xl font-semibold">
        <Link to={`/blog/${post.slug}`} className="hover:text-go-green">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 max-w-3xl text-go-muted">{post.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </article>
  );
}
