import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface StatTileProps {
  label: string;
  value: string;
  trend?: string;
  trendTone?: "positive" | "critical" | "caution" | "neutral";
  icon?: LucideIcon;
  className?: string;
}

const TREND_TONES = {
  positive: "text-positive",
  critical: "text-critical",
  caution: "text-caution",
  neutral: "text-ink-faint",
} as const;

export function StatTile({
  label,
  value,
  trend,
  trendTone = "neutral",
  icon: Icon,
  className,
}: StatTileProps) {
  return (
    <div className={cn("rounded-eh-lg border border-line bg-white p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-ink-faint">{label}</p>
        {Icon ? <Icon aria-hidden className="h-4 w-4 text-eh-purple" /> : null}
      </div>
      <p className="mt-2 text-3xl font-extrabold tracking-tight text-ink-strong">{value}</p>
      {trend ? <p className={cn("mt-1 text-sm font-semibold", TREND_TONES[trendTone])}>{trend}</p> : null}
    </div>
  );
}
