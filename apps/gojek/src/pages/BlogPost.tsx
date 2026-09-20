import { Navigate, useParams } from "react-router-dom";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { FeatureList } from "@/components/marketing/FeatureList";
import { PostCard } from "@/components/marketing/PostCard";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { findPost } from "@/data/posts";
import { formatDateLong, formatReadingTime, initials } from "@/lib/format";
import { relatedPosts } from "@/lib/posts";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? findPost(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const related = relatedPosts(post);

  return (
    <PageLayout title={post.title}>
      <section className="bg-night text-white">
        <div className="container-go flex flex-col gap-8 py-14 sm:py-16 lg:py-20">
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Blogs & News", to: "/blog" },
              { label: post.category, to: `/blog?category=${post.category}` },
            ]}
          />

          <div className="animate-go-rise flex flex-col gap-5">
            <Badge tone="inverse">{post.category}</Badge>
            <h1 className="display-go max-w-3xl text-4xl sm:text-5xl">{post.title}</h1>
            <p className="max-w-2xl text-lg text-white/70">{post.excerpt}</p>

            <div className="mt-2 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sm font-extrabold"
              >
                {initials(post.author)}
              </span>
              <span className="flex flex-col text-sm">
                <span className="font-extrabold text-white">{post.author}</span>
                <span className="text-white/55">{post.authorRole}</span>
              </span>
              <span className="ml-auto text-right text-sm text-white/55">
                <time dateTime={post.publishedOn}>{formatDateLong(post.publishedOn)}</time>
                <span className="block">{formatReadingTime(post.readingMinutes)}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <article className="flex flex-col gap-10">
          {post.sections.map((section, index) => (
            <div key={section.heading ?? index} className="flex flex-col gap-4">
              {section.heading ? (
                <h2 className="text-2xl font-extrabold tracking-tight text-ink-strong">
                  {section.heading}
                </h2>
              ) : null}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? <FeatureList items={section.bullets} /> : null}
              {section.quote ? (
                <blockquote className="border-l-4 border-go-green bg-surface-tint px-6 py-5 text-lg leading-relaxed font-semibold text-ink-strong italic">
                  {section.quote}
                </blockquote>
              ) : null}
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-2 border-t border-line pt-8">
            <span className="text-xs font-extrabold tracking-[0.16em] text-ink-ghost uppercase">
              Tags
            </span>
            {post.tags.map((tag) => (
              <Badge key={tag} tone="neutral">
                #{tag}
              </Badge>
            ))}
          </div>
        </article>
      </Section>

      {related.length > 0 ? (
        <Section tone="tint" width="wide">
          <SectionHeading eyebrow="Keep reading" title="Related stories" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {related.map((entry) => (
              <PostCard key={entry.slug} post={entry} />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand />
    </PageLayout>
  );
}
