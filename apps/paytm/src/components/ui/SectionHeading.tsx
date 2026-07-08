import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface SectionHeadingProps {
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ title, subtitle, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-8", align === "center" && "text-center", className)}>
      <h2 className="text-2xl font-bold tracking-tight text-paytm-navy sm:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-2 max-w-2xl text-sm text-ink-soft sm:text-base">{subtitle}</p> : null}
    </div>
  );
}
