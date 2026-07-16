import { cn } from "@/lib/cn";
import { matches } from "@/data/scores";

const statusTone: Record<string, string> = {
  LIVE: "bg-live text-white",
  FT: "bg-surface-deep text-ink-soft",
  Upcoming: "bg-sport/10 text-sport",
};

export function LiveScores() {
  return (
    <section aria-label="Live scores" className="rounded-xl border border-line bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse-dot rounded-full bg-live" aria-hidden="true" />
        <h2 className="text-lg font-black tracking-tight text-ink">Live scores</h2>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {matches.map((match) => (
          <li key={match.id} className="rounded-lg border border-line bg-surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                {match.competition}
              </span>
              <span
                className={cn(
                  "rounded-sm px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide",
                  statusTone[match.status],
                )}
              >
                {match.status}
              </span>
            </div>
            <div className="space-y-1.5">
              {match.scores!.map((line) => (
                <div key={line.short} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <span className="inline-flex h-6 w-9 items-center justify-center rounded bg-nine-ink text-[10px] font-black text-white">
                      {line.short}
                    </span>
                    {line.team}
                  </span>
                  <span className="text-lg font-black tabular-nums text-ink">{line.score}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 border-t border-line pt-2 text-xs text-ink-faint">
              {match.clock} · {match.venue}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
