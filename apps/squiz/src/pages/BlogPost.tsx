import { useParams } from "react-router-dom";
import { Clock } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { PostCard } from "@/components/shared/PostCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { posts, getPost } from "@/data/posts";
import { NotFoundPage } from "./NotFound";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;
  if (!post) return <NotFoundPage />;

  const more = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const fallback = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const related = more.length > 0 ? more : fallback;

  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Blog", to: "/blog" }, { label: post.title }]} />
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
        <header>
          <div className="flex flex-wrap items-center gap-3">
            <Badge tint={post.tint}>{post.category}</Badge>
            <span className="inline-flex items-center gap-1.5 text-sm text-ink-faint">
              <Clock className="size-3.5" aria-hidden />
              {post.readMinutes} min read
            </span>
            <span className="text-sm text-ink-faint">{formatDate(post.date)}</span>
          </div>
          <h1 className="mt-5 text-3xl font-semibold leading-tight text-navy sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{post.excerpt}</p>
          <div className="mt-6 flex items-center gap-3 border-b border-cream-deep pb-8">
            <span className="flex size-11 items-center justify-center rounded-full bg-navy font-heading text-sm font-semibold text-mint">
              {post.author.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div className="text-sm">
              <p className="font-semibold text-navy">{post.author.name}</p>
              <p className="text-ink-faint">{post.author.role}</p>
            </div>
          </div>
        </header>

        {post.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-2xl font-semibold text-navy">{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </section>
        ))}
      </article>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <SectionHeading title="Keep reading" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <CtaSection />
    </PageLayout>
  );
}
