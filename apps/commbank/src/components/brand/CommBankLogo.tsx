import { cn } from "@/lib/cn";

type Props = {
  /** Wordmark colour. The diamond stays yellow on every surface. */
  tone?: "dark" | "light";
  showWordmark?: boolean;
  className?: string;
};

/**
 * Rendered inline rather than as an <img> so the wordmark picks up the page's Inter webfont —
 * fonts referenced from inside an <img>-loaded SVG never load.
 */
export function CommBankLogo({ tone = "dark", showWordmark = true, className }: Props) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 60 60" className="h-8 w-8 shrink-0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="cba-diamond-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFD84D" />
            <stop offset="0.55" stopColor="#FFCC00" />
            <stop offset="1" stopColor="#F5C000" />
          </linearGradient>
        </defs>
        <path d="M30 3 57 30 30 57 3 30Z" fill="url(#cba-diamond-face)" />
        <path d="M30 3 57 30 30 57 40 30Z" fill="#E5B300" fillOpacity="0.34" />
      </svg>
      {showWordmark ? (
        <span
          className={cn(
            "text-[22px] font-bold leading-none tracking-[-0.02em]",
            tone === "light" ? "text-white" : "text-black",
          )}
        >
          CommBank
        </span>
      ) : null}
    </span>
  );
}
