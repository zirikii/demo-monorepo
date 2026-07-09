import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Badge, type BadgeTint } from "./Badge";

interface SectionHeadingProps {
  eyebrow?: string;
  eyebrowTint?: BadgeTint;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  eyebrowTint = "mint",
  title,
  copy,
  align = "left",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        dark ? "text-white" : "text-navy",
        className,
      )}
    >
      {eyebrow && (
        <Badge tint={eyebrowTint} className="mb-4">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {copy && (
        <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-white/75" : "text-ink-soft")}>
          {copy}
        </p>
      )}
    </div>
  );
}
