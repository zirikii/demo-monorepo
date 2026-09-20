import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  id,
  tone = "light",
  width = "default",
  className,
  children,
}: {
  id?: string;
  tone?: "light" | "tint" | "dark";
  width?: "default" | "wide";
  className?: string;
  children: ReactNode;
}) {
  const toneClass =
    tone === "dark" ? "bg-night text-white" : tone === "tint" ? "bg-surface-tint" : "bg-white";

  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", toneClass, className)}>
      <div className={width === "wide" ? "container-go-wide" : "container-go"}>{children}</div>
    </section>
  );
}
