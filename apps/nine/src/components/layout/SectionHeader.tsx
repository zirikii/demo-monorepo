import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { pillars } from "@/data/pillars";
import type { PillarId } from "@/data/types";

type Props = {
  title: string;
  pillar?: PillarId;
  to?: string;
  moreLabel?: string;
  className?: string;
};

export function SectionHeader({ title, pillar, to, moreLabel = "More", className }: Props) {
  const accent = pillar ? pillars[pillar] : null;
  return (
    <div className={cn("mb-4 flex items-end justify-between gap-4", className)}>
      <h2 className="flex items-center gap-2.5 text-xl font-black tracking-tight text-ink">
        <span className={cn("h-5 w-1.5 rounded-full", accent ? accent.bg : "bg-nine-deep")} />
        {title}
      </h2>
      {to ? (
        <Link
          to={to}
          className={cn(
            "inline-flex items-center gap-0.5 text-sm font-bold hover:underline",
            accent ? accent.text : "text-nine-deep",
          )}
        >
          {moreLabel}
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
