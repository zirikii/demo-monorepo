import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Card({
  children,
  className,
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "section";
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-card",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-base text-ink-soft">{description}</p> : null}
    </div>
  );
}
