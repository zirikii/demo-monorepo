import * as React from "react";
import { cn } from "@/lib/utils/cn";
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-11 w-full rounded-md border border-optus-line bg-white px-3 text-sm text-optus-ink shadow-sm outline-none transition focus:border-optus-teal focus:ring-2 focus:ring-optus-teal/20 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
