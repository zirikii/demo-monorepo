import { ArrowRight } from "lucide-react";
import { LinkCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Insight } from "@/data/types";
import { longDate, readingTime } from "@/lib/format";

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <LinkCard to={`/insights/${insight.slug}`} className="flex h-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={insight.category === "Media release" ? "teal" : "blue"}>
          {insight.category}
        </Badge>
        <span className="text-sm text-ink-faint">{longDate(insight.date)}</span>
      </div>
      <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">{insight.title}</h3>
      <p className="flex-1 text-ink-soft">{insight.summary}</p>
      <span className="flex items-center justify-between text-sm font-bold text-hub-blue">
        Read article
        <span className="flex items-center gap-2 font-semibold text-ink-faint">
          {readingTime(insight.words)}
          <ArrowRight aria-hidden className="h-4 w-4 text-hub-blue" />
        </span>
      </span>
    </LinkCard>
  );
}
