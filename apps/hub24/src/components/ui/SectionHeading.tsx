import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "text-xs font-extrabold tracking-[0.16em] uppercase",
            tone === "dark" ? "text-hub-teal-dark" : "text-hub-teal-soft",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "text-balance-hub text-3xl leading-tight font-extrabold tracking-tight md:text-4xl",
          tone === "dark" ? "text-ink-strong" : "text-white",
        )}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={cn(
            "text-lg leading-relaxed",
            tone === "dark" ? "text-ink-soft" : "text-white/80",
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
