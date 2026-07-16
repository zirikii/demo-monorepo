import { Link } from "react-router-dom";
import { articles } from "@/data/articles";

const breaking = articles.filter((a) => a.live);

export function BreakingTicker() {
  if (breaking.length === 0) return null;
  const items = [...breaking, ...breaking];
  return (
    <div className="border-b border-line bg-nine-ink text-white">
      <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-1.5 sm:px-6">
        <span className="flex shrink-0 items-center gap-1.5 rounded-sm bg-live px-2 py-0.5 text-[11px] font-black uppercase tracking-wide">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white" aria-hidden="true" />
          Breaking
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
            {items.map((a, i) => (
              <Link
                key={`${a.slug}-${i}`}
                to={`/article/${a.slug}`}
                className="text-sm font-medium text-white/90 hover:text-white"
              >
                {a.title}
                <span className="mx-4 text-white/30" aria-hidden="true">
                  •
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
