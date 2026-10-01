import { Sparkle } from "lucide-react";
import { cn } from "@/lib/cn";

/** Ticketek Support's avatar: the brand gradient with a spark, so it never reads as a person. */
export function SupportMark({ size = "sm", online = false, className }: { size?: "sm" | "md" | "lg"; online?: boolean; className?: string }) {
  const box = { sm: "size-8", md: "size-11", lg: "size-14" }[size];
  const icon = { sm: "size-4", md: "size-5", lg: "size-7" }[size];
  return (
    <span className={cn("tk-gradient relative inline-flex shrink-0 items-center justify-center rounded-full text-midnight shadow-tk", box, className)}>
      <Sparkle className={cn(icon, "fill-midnight")} aria-hidden />
      {online && <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-midnight bg-[#22c55e]" aria-hidden />}
    </span>
  );
}
