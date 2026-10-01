import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

/** SiteMinder Support's avatar: the brand mark on royal blue, so it never reads as a person. */
export function SupportMark({ size = "sm", online = false, className }: { size?: "sm" | "md" | "lg"; online?: boolean; className?: string }) {
  const box = { sm: "size-8", md: "size-11", lg: "size-14" }[size];
  const mark = { sm: "h-3.5", md: "h-5", lg: "h-6" }[size];
  return (
    <span className={cn("sm-gradient relative inline-flex shrink-0 items-center justify-center rounded-full shadow-card", box, className)}>
      <img src={asset("brand/siteminder-mark-white.svg")} alt="" aria-hidden className={cn("w-auto", mark)} />
      {online && <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-stratos bg-lime" aria-hidden />}
    </span>
  );
}
