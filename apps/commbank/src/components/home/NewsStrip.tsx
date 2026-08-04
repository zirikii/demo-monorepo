import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { articles } from "@/data/articles";
import { formatDate } from "@/lib/format";

export function NewsStrip() {
  return (
    <section className="py-16">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Newsroom" title="Latest from CommBank" />
          <Link
            to="/newsroom"
            className="focus-ring rounded text-sm font-semibold text-black underline underline-offset-4"
          >
            View all articles
          </Link>
        </div>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <li key={article.slug}>
              <Link
                to={`/newsroom/${article.slug}`}
                className="focus-ring flex h-full flex-col rounded-2xl border border-line p-6 transition-shadow hover:shadow-card"
              >
                <Badge tone="neutral" className="self-start">
                  {article.category}
                </Badge>
                <h3 className="mt-3 text-lg font-bold leading-snug text-black">{article.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-soft">{article.standfirst}</p>
                <p className="mt-4 text-xs text-ink-muted">
                  {formatDate(article.published)} · {article.readMinutes} min read
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
