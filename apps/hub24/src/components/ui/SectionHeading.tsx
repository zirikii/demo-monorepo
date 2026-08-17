import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  invert?: boolean;
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  invert = false,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-bold tracking-[0.16em] uppercase",
            invert ? "text-hub-teal-soft" : "text-hub-teal",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-serif text-3xl leading-tight font-bold text-balance-hub md:text-4xl",
          invert ? "text-white" : "text-ink-strong",
        )}
      >
        {title}
      </h2>
      {body ? (
        <p className={cn("mt-4 text-lg leading-relaxed", invert ? "text-white/75" : "text-ink-soft")}>
          {body}
        </p>
      ) : null}
      {children}
    </div>
  );
}
