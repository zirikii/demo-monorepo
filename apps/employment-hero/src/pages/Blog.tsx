import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function BlogIndexPage() {
  useDocumentTitle("Blog");
  return (
    <PageLayout>
      <PageHero eyebrow="Resources" title="Blog" description="Guides for HR, payroll and hiring leaders." />
      <Section>
        <div className="container-eh grid gap-4 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="focus-eh rounded-eh-lg border border-line bg-white p-6 shadow-eh">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eh-purple">{post.category}</p>
              <h2 className="mt-2 text-xl font-bold">{post.title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{post.excerpt}</p>
              <p className="mt-4 text-xs text-ink-faint">{post.author} · {formatDate(post.date)}</p>
            </Link>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
