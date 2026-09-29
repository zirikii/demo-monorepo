import { AglRays } from "@/components/brand/AglRays";
import { cn } from "@/lib/cn";

export function AssistantAvatar({ size = "sm", online = false, className }: { size?: "sm" | "md"; online?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-line-soft",
        size === "sm" ? "h-8 w-8" : "h-11 w-11",
        className,
      )}
    >
      <AglRays className={size === "sm" ? "h-5 w-5" : "h-7 w-7"} />
      {online && (
        <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#22c55e]" aria-hidden="true" />
      )}
    </span>
  );
}
