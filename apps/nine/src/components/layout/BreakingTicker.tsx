import { Link } from "react-router-dom";
import { getBreaking } from "@/data/articles";

export function BreakingTicker() {
  const items = getBreaking();
  if (items.length === 0) return null;
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden border-b border-nine-ink/10 bg-nine-ink text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-1.5 sm:px-6">
        <span className="shrink-0 rounded bg-nine-live px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
          Breaking
        </span>
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="flex w-max animate-[ticker_28s_linear_infinite] gap-10 whitespace-nowrap text-sm">
            {loop.map((a, i) => (
              <Link
                key={`${a.slug}-${i}`}
                to={`/${a.pillar}/${a.slug}`}
                className="text-white/90 no-underline hover:text-nine-cyan"
              >
                {a.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
