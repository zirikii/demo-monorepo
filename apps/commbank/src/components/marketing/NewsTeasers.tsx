import { Link } from "react-router-dom";
import { latestArticles } from "@/data/articles";
import { formatDate } from "@/lib/format";
import { Badge } from "../ui/Badge";

export function NewsTeasers({ limit = 3 }: { limit?: number }) {
  return (
    <section className="py-12 sm:py-16">
      <div className="container-cba">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Latest from CommBank
            <span aria-hidden="true" className="mt-2 block h-1 w-16 bg-cba-yellow" />
          </h2>
          <Link
            to="/newsroom"
            className="focus-cba text-sm font-bold text-ink underline underline-offset-4"
          >
            Visit the newsroom
          </Link>
        </div>

        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {latestArticles.slice(0, limit).map((article) => (
            <li key={article.slug}>
              <Link
                to={`/newsroom/${article.slug}`}
                className="focus-cba flex h-full flex-col rounded-cba-lg border border-line-soft bg-surface p-6 transition-shadow hover:shadow-cba-lift"
              >
                <Badge tone={article.category === "Security" ? "critical" : "muted"}>
                  {article.category}
                </Badge>
                <h3 className="mt-3 text-lg font-bold leading-snug text-ink">{article.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                  {article.standfirst}
                </p>
                <p className="mt-4 text-[13px] text-ink-faint">
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
