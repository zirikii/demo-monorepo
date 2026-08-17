import { Link, Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { newsBySlug } from "@/data/news";
import { formatLongDate } from "@/lib/format";

export default function NewsPostPage() {
  const { slug = "" } = useParams();
  const post = newsBySlug(slug);
  if (!post) return <Navigate to="/news" replace />;

  return (
    <PageLayout title={post.title}>
      <Section className="py-12 md:py-16">
        <Link to="/news" className="text-sm font-semibold text-hub-teal hover:underline">
          ← All news
        </Link>
        <p className="mt-6 text-xs font-bold tracking-[0.14em] text-hub-teal uppercase">
          {post.category} · {formatLongDate(post.date)}
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold">{post.title}</h1>
        <div className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-soft">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
