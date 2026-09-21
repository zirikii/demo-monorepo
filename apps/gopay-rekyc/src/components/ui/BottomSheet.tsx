import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function BottomSheet({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-t-3xl bg-card px-4 pb-8 pt-5 shadow-[0_-8px_24px_rgb(0_0_0/8%)]", className)}>
      {children}
    </div>
  );
}
