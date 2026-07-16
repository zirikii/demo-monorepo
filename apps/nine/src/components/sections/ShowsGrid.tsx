import { shows } from "@/data/shows";
import { Badge } from "../ui/Badge";

export function ShowsGrid() {
  return (
    <section className="rounded-xl border border-line bg-card p-5">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-black tracking-tight text-ink">
        <span className="h-5 w-1.5 rounded-full bg-entertainment" />
        On Channel 9 &amp; 9Now
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shows.map((show) => (
          <article key={show.name} className="rounded-lg border border-line bg-surface p-4">
            <div className="flex items-center justify-between">
              <Badge pillar="entertainment">{show.tag}</Badge>
              <span className="text-[11px] font-semibold text-ink-faint">{show.slot}</span>
            </div>
            <h3 className="mt-2 text-base font-black text-ink">{show.name}</h3>
            <p className="mt-1 text-sm text-ink-soft">{show.blurb}</p>
            <p className="mt-2 text-xs font-semibold text-entertainment">{show.channel}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
