import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface StatProps {
  value: string;
  label: string;
  tone?: "light" | "dark";
  icon?: ReactNode;
  className?: string;
}

export function Stat({ value, label, tone = "light", icon, className }: StatProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {icon ? <span className="mb-1 text-eh-purple">{icon}</span> : null}
      <span
        className={cn(
          "text-3xl font-extrabold tracking-tight md:text-4xl",
          tone === "dark" ? "text-white" : "text-ink-strong",
        )}
      >
        {value}
      </span>
      <span className={cn("text-sm", tone === "dark" ? "text-eh-violet-soft" : "text-ink-faint")}>
        {label}
      </span>
    </div>
  );
}
