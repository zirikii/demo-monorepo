import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

type Tone = "dark" | "light";

const MARK_SRC: Record<Tone, string> = {
  dark: asset("/brand/mark.svg"),
  light: asset("/brand/mark-white.svg"),
};

interface BrandLogoProps {
  tone?: Tone;
  showWordmark?: boolean;
  className?: string;
  markClassName?: string;
}

/**
 * Lockup matching the official artwork: two-peak gradient mark plus the
 * all-caps ATLASSIAN wordmark in brand blue. The wordmark is live text rather
 * than an outlined SVG so it stays crisp at any size — official Charlie Sans
 * is not licensed here, so Plus Jakarta Sans stands in.
 */
export function BrandLogo({
  tone = "dark",
  showWordmark = true,
  className,
  markClassName,
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <img
        src={MARK_SRC[tone]}
        alt="Atlassian"
        width={28}
        height={28}
        className={cn("block h-7 w-7 shrink-0", markClassName)}
      />
      {showWordmark ? (
        <span
          className={cn(
            "text-[1.05rem] leading-none font-extrabold tracking-[0.02em] whitespace-nowrap uppercase",
            tone === "light" ? "text-white" : "text-[#0052CC]",
          )}
        >
          Atlassian
        </span>
      ) : null}
    </span>
  );
}
