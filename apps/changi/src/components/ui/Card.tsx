import type { PropsWithChildren } from "react";
import { cn } from "@/lib/cn";

export function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("card-shadow rounded-[2rem] border border-white/80 bg-white p-6", className)}>{children}</div>;
}
