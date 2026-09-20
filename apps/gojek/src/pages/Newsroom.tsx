import { ArrowUpRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { news } from "@/data/news";
import { formatDate } from "@/lib/format";

export function NewsroomPage() {
  const [featured, ...rest] = news;

  return (
    <PageLayout title="Newsroom — Gojek (Demo)">
      <PageHero
        eyebrow="Newsroom"
        title="Stories from across the platform"
        description="Product launches, engineering deep-dives and the impact we're making across the region."
      />

      <Container className="py-12">
        {featured ? (
          <a
            href="#"
            className="group grid gap-6 rounded-3xl border border-line bg-card p-6 transition-colors hover:border-gojek sm:p-8 lg:grid-cols-2 lg:items-center"
          >
            <div className="flex aspect-[16/10] items-center justify-center rounded-2xl bg-gojek-tint">
              <img src="/brand/solv-green.svg" alt="" className="h-20 w-auto opacity-80" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-ink-faint">
                <Badge className="border-gojek/30 text-gojek">{featured.category}</Badge>
                <span>{formatDate(featured.date)}</span>
                <span>· {featured.readMinutes} min read</span>
              </div>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{featured.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-gojek">
                Read story
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </div>
          </a>
        ) : null}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <a
              key={article.id}
              href="#"
              className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-ink-faint">
                <Badge>{article.category}</Badge>
                <span>{formatDate(article.date)}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-snug text-ink">{article.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                {article.excerpt}
              </p>
              <span className="mt-4 text-sm font-semibold text-ink-faint">
                {article.readMinutes} min read
              </span>
            </a>
          ))}
        </div>
      </Container>
    </PageLayout>
  );
}
