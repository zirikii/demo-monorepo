import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

/**
 * The wordmark is rendered as live text rather than baked into the SVG so it picks up the
 * app's loaded Poppins face. The static lockups in public/brand/ exist for the favicon,
 * the social card, and anywhere an <img> is the only option.
 */
export function Logo({
  tone = "dark",
  className,
  to = "/",
}: {
  tone?: "dark" | "light";
  className?: string;
  to?: string;
}) {
  return (
    <Link to={to} className={cn("focus-eh inline-flex items-center gap-2.5", className)}>
      <img
        src={tone === "light" ? "/brand/symbol-white.svg" : "/brand/symbol.svg"}
        alt="Employment Hero"
        width={36}
        height={36}
        className="size-9"
      />
      <span
        className={cn(
          "font-display text-xl leading-none font-semibold tracking-tight whitespace-nowrap",
          tone === "light" ? "text-white" : "text-eh-ink",
        )}
      >
        employment hero
      </span>
    </Link>
  );
}
