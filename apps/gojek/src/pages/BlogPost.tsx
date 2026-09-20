import { Link, Navigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { PageLayout } from "@/components/layout/PageLayout";
import { getPost } from "@/data/posts";
import { formatDate } from "@/lib/format";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;
  if (!post) return <Navigate to="/blog" replace />;

  return (
    <PageLayout title={post.title}>
      <article className="mx-auto max-w-3xl px-4 py-20">
        <Link to="/blog" className="text-sm text-go-green hover:underline">
          Blogs & News
        </Link>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-go-faint">
          {formatDate(post.date)} · {post.author}, {post.role} · {post.minutes} min read
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="mt-10 space-y-4 text-lg leading-relaxed text-go-muted">
          {post.body.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </article>
    </PageLayout>
  );
}
