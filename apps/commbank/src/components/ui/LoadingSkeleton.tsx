import { cn } from "@/lib/cn";

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-cba bg-surface-deep", className)}
    />
  );
}
