import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl bg-card shadow-[0_1px_2px_rgb(0_0_0/4%)]", className)} {...props} />;
}
