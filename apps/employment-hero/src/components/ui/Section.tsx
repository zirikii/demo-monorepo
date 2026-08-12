import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "white" | "tint" | "purple" | "ink" | "wash";

const tones: Record<Tone, string> = {
  white: "bg-white text-eh-ink",
  tint: "bg-eh-surface-tint text-eh-ink",
  wash: "bg-eh-purple-wash text-eh-ink",
  purple: "bg-eh-purple text-white",
  ink: "bg-eh-ink text-white",
};

export function Section({
  tone = "white",
  className,
  id,
  children,
}: {
  tone?: Tone;
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-24", tones[tone], className)}>
      <div className="container-eh">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  blurb,
  align = "left",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  blurb?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-bold tracking-[0.16em] uppercase",
            tone === "light" ? "text-eh-purple-soft" : "text-eh-purple",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-3 text-3xl leading-tight font-bold md:text-4xl",
          tone === "light" ? "text-white" : "text-eh-ink",
        )}
      >
        {title}
      </h2>
      {blurb ? (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            tone === "light" ? "text-white/80" : "text-eh-ink-soft",
          )}
        >
          {blurb}
        </p>
      ) : null}
    </div>
  );
}
