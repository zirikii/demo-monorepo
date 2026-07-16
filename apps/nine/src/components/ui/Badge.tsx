import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "live" | "breaking" | "cyan";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        tone === "default" && "bg-nine-wash text-nine-muted",
        tone === "live" && "bg-nine-live text-white",
        tone === "breaking" && "bg-nine-ink text-nine-cyan",
        tone === "cyan" && "bg-nine-cyan/15 text-nine-blue",
        className,
      )}
    >
      {children}
    </span>
  );
}
