import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface StatTileProps {
  label: string;
  value: ReactNode;
  note?: ReactNode;
  icon?: LucideIcon;
  tone?: "default" | "positive" | "critical";
  className?: string;
}

const NOTE_TONES = {
  default: "text-ink-faint",
  positive: "text-positive",
  critical: "text-critical",
} as const;

export function StatTile({ label, value, note, icon: Icon, tone = "default", className }: StatTileProps) {
  return (
    <div className={cn("rounded-h24-lg border border-line bg-white p-5 shadow-h24", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-bold tracking-[0.1em] text-ink-ghost uppercase">{label}</p>
        {Icon ? <Icon aria-hidden className="h-4 w-4 text-h24-teal" /> : null}
      </div>
      <p className="mt-2 font-display text-2xl font-semibold text-h24-navy tabular-nums">{value}</p>
      {note ? <p className={cn("mt-1 text-sm", NOTE_TONES[tone])}>{note}</p> : null}
    </div>
  );
}
