import { cn } from "@/lib/cn";

type Tone = "dark" | "light";

interface BrandLogoProps {
  tone?: Tone;
  className?: string;
  /** Rendered beneath the wordmark on dark surfaces, matching the group lockup. */
  descriptor?: string;
}

/**
 * The wordmark is live text rather than an outlined SVG so it stays crisp at any size and can
 * invert on the navy surfaces. public/brand/hub24-logo-{dark,light}.svg cover static usage.
 */
export function BrandLogo({ tone = "dark", className, descriptor }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "text-[1.6rem] font-extrabold tracking-[-0.04em] whitespace-nowrap",
          tone === "dark" ? "text-hub-navy" : "text-white",
        )}
      >
        HUB
        <span className={tone === "dark" ? "text-hub-teal" : "text-hub-teal-soft"}>24</span>
      </span>
      {descriptor ? (
        <span
          className={cn(
            "mt-1 text-[0.6rem] font-bold tracking-[0.22em] uppercase",
            tone === "dark" ? "text-ink-faint" : "text-white/70",
          )}
        >
          {descriptor}
        </span>
      ) : null}
    </span>
  );
}
