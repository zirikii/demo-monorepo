import { cn } from "@/lib/cn";

type Tone = "dark" | "light" | "purple";

const MARK_SRC: Record<Tone, string> = {
  dark: "/brand/mark.svg",
  light: "/brand/mark-white.svg",
  purple: "/brand/mark-purple.svg",
};

const WORDMARK_TONE: Record<Tone, string> = {
  dark: "text-ink-strong",
  light: "text-white",
  purple: "text-ink-strong",
};

interface BrandLogoProps {
  tone?: Tone;
  showWordmark?: boolean;
  className?: string;
  markClassName?: string;
}

/**
 * The wordmark is live text rather than an outlined SVG so it stays crisp at any size and
 * can inherit colour. Only the circular mark is a raster-independent asset on disk.
 */
export function BrandLogo({
  tone = "dark",
  showWordmark = true,
  className,
  markClassName,
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src={MARK_SRC[tone]}
        alt="Employment Hero"
        width={32}
        height={32}
        className={cn("h-8 w-8 shrink-0", markClassName)}
      />
      {showWordmark ? (
        <span
          className={cn(
            "text-[1.075rem] leading-none font-extrabold tracking-[-0.025em] whitespace-nowrap",
            WORDMARK_TONE[tone],
          )}
        >
          employment hero
        </span>
      ) : null}
    </span>
  );
}
