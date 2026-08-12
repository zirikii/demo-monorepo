import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { getPost } from "@/data/blog";
import { formatDate } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { NotFoundPage } from "./NotFound";

export function BlogPostPage() {
  const { slug = "" } = useParams();
  const post = getPost(slug);
  useDocumentTitle(post?.title ?? "Article");
  if (!post) return <NotFoundPage />;
  return (
    <PageLayout>
      <PageHero eyebrow={post.category} title={post.title} description={`${post.author} · ${formatDate(post.date)}`} />
      <Section>
        <article className="container-eh max-w-3xl space-y-4 text-[16px] leading-relaxed text-ink-soft">
          <p>{post.excerpt}</p>
          <p>
            Growing teams outgrow spreadsheets and disconnected tools. Employment OS keeps hiring data, leave balances and pay inputs on one record so managers stop re-keying the same change three times.
          </p>
          <p>
            Use this article as a conversation starter with your people and finance leads — then explore the matching product pages for a deeper walkthrough.
          </p>
        </article>
      </Section>
    </PageLayout>
  );
}
