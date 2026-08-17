import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  tone = "light",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn("flex flex-col gap-3", align === "center" && "items-center text-center", className)}
    >
      {eyebrow ? (
        <span
          className={cn(
            "text-xs font-bold tracking-[0.16em] uppercase",
            tone === "dark" ? "text-h24-aqua" : "text-h24-teal-dark",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "text-balance-h24 font-display text-3xl font-semibold md:text-[2.5rem] md:leading-[1.12]",
          tone === "dark" ? "text-white" : "text-ink-strong",
        )}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={cn(
            "max-w-2xl text-[1.05rem] leading-relaxed",
            tone === "dark" ? "text-h24-sky" : "text-ink-soft",
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
