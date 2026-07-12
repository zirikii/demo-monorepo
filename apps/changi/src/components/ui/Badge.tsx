import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTint = "purple" | "amber" | "green" | "blue" | "magenta" | "outline";

const tints: Record<BadgeTint, string> = {
  purple: "bg-badge-purple text-magenta border border-badge-purple",
  amber: "bg-badge-amber text-amber-800 border border-badge-amber",
  green: "bg-badge-green text-emerald-800 border border-badge-green",
  blue: "bg-badge-blue text-blue-800 border border-badge-blue",
  magenta: "bg-magenta text-white border border-magenta",
  outline: "border border-taupe/30 text-taupe",
};

interface BadgeProps {
  tint?: BadgeTint;
  className?: string;
  children: ReactNode;
}

export function Badge({ tint = "purple", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        tints[tint],
        className,
      )}
    >
      {children}
    </span>
  );
}
