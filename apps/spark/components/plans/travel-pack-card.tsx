import type { TravelPack } from "@/lib/types";
import { formatNzd } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

export function TravelPackCard({
  pack,
  onSelect,
}: {
  pack: TravelPack;
  onSelect?: (id: string) => void;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-lg border bg-white p-6 shadow-sm",
        pack.highlight ? "border-spark-purple ring-2 ring-spark-purple/30" : "border-line",
      )}
      data-testid="travel-pack-card"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-4xl font-bold text-spark-ink">
            <span className="text-lg align-top">$</span>
            {pack.price}
          </p>
          <p className="mt-1 text-xs text-spark-ink/60">{pack.duration}</p>
        </div>
        {pack.highlight ? <Badge>Popular</Badge> : null}
      </div>

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between gap-4 border-b border-line pb-2">
          <dt className="font-semibold uppercase tracking-wide text-spark-ink/60">Data</dt>
          <dd className="text-right font-semibold text-spark-ink">
            {pack.data}
            {pack.dataNote ? (
              <span className="mt-1 block text-xs font-normal text-spark-ink/60">{pack.dataNote}</span>
            ) : null}
          </dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-line pb-2">
          <dt className="font-semibold uppercase tracking-wide text-spark-ink/60">Talk</dt>
          <dd className="text-right text-spark-ink">
            <span className="block font-semibold">{pack.talkNz}</span>
            <span className="text-xs text-spark-ink/70">{pack.talkIntl}</span>
          </dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-line pb-2">
          <dt className="font-semibold uppercase tracking-wide text-spark-ink/60">Text</dt>
          <dd className="text-right text-spark-ink">
            <span className="block font-semibold">{pack.textNz}</span>
            <span className="text-xs text-spark-ink/70">{pack.textIntl}</span>
          </dd>
        </div>
      </dl>

      <ul className="mt-5 space-y-2 text-sm text-spark-ink/80">
        {pack.features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-spark-purple" />
            {f}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-auto inline-flex h-11 w-full items-center justify-center rounded-md bg-spark-purple px-4 text-sm font-semibold text-white hover:bg-spark-purple-dark disabled:opacity-60"
        onClick={() => onSelect?.(pack.id)}
        aria-label={`Click and collect ${formatNzd(pack.price)} Travel Pack`}
      >
        Click &amp; collect
      </button>
    </article>
  );
}
