import { cn } from "@/lib/cn";

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-line/70", className)}
      aria-hidden="true"
    />
  );
}
