"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function QuickSearchChips({
  chips,
  variant = "light",
}: {
  chips: string[];
  /** "light" for white/subtle heroes; "dark" for navy heroes. */
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={cn(
          "text-sm font-medium",
          dark ? "text-white/80" : "text-ink-secondary",
        )}
      >
        Quick search
      </span>
      {chips.map((chip) => (
        <Link
          key={chip}
          href={`/jobs?keywords=${encodeURIComponent(chip)}`}
          className={cn(
            "focus-ring rounded-full border px-3 py-1.5 text-sm transition-colors",
            dark
              ? "border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
              : "border-line bg-white text-seek-navy hover:border-seek-pink hover:text-seek-pink",
          )}
        >
          {chip}
        </Link>
      ))}
    </div>
  );
}
