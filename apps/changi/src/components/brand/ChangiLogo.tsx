import { cn } from "@/lib/cn";
import { GlobeMark } from "./GlobeMark";

interface ChangiLogoProps {
  className?: string;
  /** Render the wordmark in white for use on dark bands. */
  light?: boolean;
  globeSize?: number;
}

/**
 * The "CHANGI airport singapore" lockup: the official globe emblem beside a
 * taupe wordmark, mirroring the attached brand logo. The wordmark switches to
 * white on dark surfaces via the `light` prop.
 */
export function ChangiLogo({ className, light = false, globeSize = 44 }: ChangiLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <GlobeMark size={globeSize} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-[1.35rem] font-bold uppercase tracking-[0.02em]",
            light ? "text-white" : "text-taupe",
          )}
        >
          Changi
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.72rem] font-medium lowercase tracking-[0.14em]",
            light ? "text-white/80" : "text-taupe/80",
          )}
        >
          airport singapore
        </span>
      </span>
    </span>
  );
}
