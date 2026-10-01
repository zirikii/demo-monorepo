import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

export function Logo({ tone = "navy", className }: { tone?: "navy" | "white"; className?: string }) {
  return <img src={asset(`brand/siteminder-logo-${tone}.svg`)} alt="SiteMinder" width={145} height={25} className={cn("h-6 w-auto", className)} />;
}

export function LogoMark({ tone = "navy", className }: { tone?: "navy" | "white"; className?: string }) {
  return (
    <img
      src={asset(tone === "white" ? "brand/siteminder-mark-white.svg" : "brand/siteminder-mark.svg")}
      alt=""
      aria-hidden
      width={18}
      height={24}
      className={cn("h-6 w-auto", className)}
    />
  );
}
