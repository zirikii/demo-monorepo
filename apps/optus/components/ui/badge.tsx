import * as React from "react";
import { cn } from "@/lib/utils/cn";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-optus-teal-light px-2.5 py-0.5 text-xs font-semibold text-optus-teal-darker",
        className,
      )}
      {...props}
    />
  );
}
