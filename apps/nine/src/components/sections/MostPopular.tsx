import { Link } from "react-router-dom";
import { findArticle } from "@/data/articles";
import { trendingSlugs } from "@/data/trending";
import { pillars } from "@/data/pillars";
import { cn } from "@/lib/cn";

export function MostPopular() {
  const items = trendingSlugs.map(findArticle).filter((a) => a !== undefined);
  return (
    <section className="rounded-xl border border-line bg-card p-5">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-black tracking-tight text-ink">
        <span className="h-5 w-1.5 rounded-full bg-nine-deep" />
        Most read
      </h2>
      <ol className="divide-y divide-line-soft">
        {items.map((article, i) => (
          <li key={article.slug} className="flex gap-3 py-2.5">
            <span className="w-6 shrink-0 text-2xl font-black leading-none text-nine">
              {i + 1}
            </span>
            <div>
              <span className={cn("text-[11px] font-bold uppercase tracking-wide", pillars[article.pillar].text)}>
                {pillars[article.pillar].label}
              </span>
              <h3 className="text-sm font-bold leading-snug text-ink hover:text-nine-deep">
                <Link to={`/article/${article.slug}`}>{article.title}</Link>
              </h3>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
