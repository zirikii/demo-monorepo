import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface StatProps {
  value: ReactNode;
  label: ReactNode;
  note?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

export function Stat({ value, label, note, tone = "light", className }: StatProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "font-display text-3xl font-semibold md:text-[2.6rem] md:leading-none",
          tone === "dark" ? "text-white" : "text-h24-navy",
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "text-sm font-semibold",
          tone === "dark" ? "text-h24-aqua" : "text-h24-teal-dark",
        )}
      >
        {label}
      </span>
      {note ? (
        <span className={cn("text-xs", tone === "dark" ? "text-h24-sky" : "text-ink-faint")}>
          {note}
        </span>
      ) : null}
    </div>
  );
}
