import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { LinkCard } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BLOG_POSTS, getPost } from "@/data/blog";
import { formatDate, readingTime } from "@/lib/format";

export default function BlogPostPage() {
  const { slug = "" } = useParams();
  const post = getPost(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const related = BLOG_POSTS.filter(
    (candidate) => candidate.slug !== post.slug && candidate.category === post.category,
  ).slice(0, 3);

  return (
    <PageLayout title={post.title}>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        body={post.excerpt}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Blog", to: "/blog" },
          { label: post.title },
        ]}
      />

      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-4 border-b border-line pb-6">
            <Avatar name={post.author} />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-ink-strong">{post.author}</span>
              <span className="text-sm text-ink-faint">{post.authorRole}</span>
            </div>
            <span className="ml-auto text-sm text-ink-faint">
              {formatDate(post.publishedOn)} · {readingTime(post.body.join(" "))}
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-6">
            {post.body.map((paragraph, index) => (
              <p key={index} className="text-[1.08rem] leading-[1.75] text-ink">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
            {post.tags.map((tag) => (
              <Badge key={tag} tone="neutral">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Section>

      {related.length ? (
        <Section tone="tint">
          <SectionHeading eyebrow="More in this category" title={post.category} className="mb-10" />
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <LinkCard key={item.slug} to={`/blog/${item.slug}`} className="flex flex-col gap-3">
                <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">{item.title}</h3>
                <p className="flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{item.excerpt}</p>
                <span className="text-sm text-ink-faint">{formatDate(item.publishedOn)}</span>
              </LinkCard>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand />
    </PageLayout>
  );
}
