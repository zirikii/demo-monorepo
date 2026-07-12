import type { PropsWithChildren } from "react";
import { cn } from "@/lib/cn";

export function Badge({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <span className={cn("inline-flex rounded-full bg-[#f2e7dc] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#806d5d]", className)}>{children}</span>;
}
