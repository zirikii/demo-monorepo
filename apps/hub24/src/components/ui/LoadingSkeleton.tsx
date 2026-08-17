import { cn } from "@/lib/cn";

export function LoadingSkeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-h24 bg-surface-deep", className)} aria-hidden />;
}
