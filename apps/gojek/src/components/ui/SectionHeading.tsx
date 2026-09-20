import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-gojek">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{description}</p>
      ) : null}
    </div>
  );
}
