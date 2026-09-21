import { cn } from "@/lib/cn";
import type { Stat } from "@/data/stats";
import { formatCompact } from "@/lib/format";

export function StatsBand({
  stats,
  tone = "light",
}: {
  stats: Stat[];
  tone?: "light" | "green";
}) {
  const dark = tone === "green";
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4",
        dark ? "text-white" : "text-ink",
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label}>
          <dd className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {formatCompact(stat.value)}
            {stat.suffix ?? ""}
          </dd>
          <dt className={cn("mt-1 text-sm font-bold", dark ? "text-white" : "text-ink")}>
            {stat.label}
          </dt>
          {stat.sublabel ? (
            <p className={cn("text-sm", dark ? "text-white/70" : "text-ink-soft")}>
              {stat.sublabel}
            </p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
