import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface StatTileProps {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  note?: string;
}

export function StatTile({ label, value, delta, trend = "flat", note }: StatTileProps) {
  return (
    <div className="rounded-hub-lg border border-line bg-white p-5 shadow-hub">
      <p className="text-xs font-extrabold tracking-[0.12em] text-ink-ghost uppercase">{label}</p>
      <p className="mt-2 text-2xl font-extrabold tracking-tight text-ink-strong">{value}</p>
      {delta ? (
        <p
          className={cn(
            "mt-1 inline-flex items-center gap-1 text-sm font-bold",
            trend === "up" && "text-positive",
            trend === "down" && "text-critical",
            trend === "flat" && "text-ink-faint",
          )}
        >
          {trend === "up" ? <ArrowUpRight aria-hidden className="h-4 w-4" /> : null}
          {trend === "down" ? <ArrowDownRight aria-hidden className="h-4 w-4" /> : null}
          {delta}
        </p>
      ) : null}
      {note ? <p className="mt-1 text-sm text-ink-faint">{note}</p> : null}
    </div>
  );
}
