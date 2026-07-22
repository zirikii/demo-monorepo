import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      tone: {
        teal: "bg-optus-teal-soft text-optus-teal-dark",
        yellow: "bg-optus-yellow-soft text-optus-ink",
        success: "bg-emerald-50 text-optus-success",
        warning: "bg-amber-50 text-optus-warning",
        danger: "bg-red-50 text-optus-danger",
        neutral: "bg-slate-100 text-slate-700",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}
export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone, className }))} {...props} />;
}
