import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  tone = "light",
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("flex max-w-3xl flex-col gap-3", align === "center" && "items-center")}>
        {eyebrow ? (
          <span
            className={cn(
              "text-xs font-extrabold tracking-[0.18em] uppercase",
              tone === "dark" ? "text-go-green-soft" : "text-go-green",
            )}
          >
            {eyebrow}
          </span>
        ) : null}
        <h2
          className={cn(
            "display-go text-3xl sm:text-4xl lg:text-[2.85rem]",
            tone === "dark" ? "text-white" : "text-ink-strong",
          )}
        >
          {title}
        </h2>
        {body ? (
          <p
            className={cn(
              "text-base leading-relaxed sm:text-lg",
              tone === "dark" ? "text-white/70" : "text-ink-soft",
            )}
          >
            {body}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
