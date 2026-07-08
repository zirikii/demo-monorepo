import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
  "aria-label": string;
}

/** Underline-active tab strip (travel widget, plan browser). */
export function Tabs({ items, active, onChange, className, "aria-label": ariaLabel }: TabsProps) {
  return (
    <div role="tablist" aria-label={ariaLabel} className={cn("flex items-end gap-6", className)}>
      {items.map((item) => {
        const selected = item.id === active;
        return (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={selected}
            onClick={() => onChange(item.id)}
            className={cn(
              "flex flex-col items-center gap-1.5 border-b-2 px-1 pb-2 text-sm transition-colors",
              selected
                ? "border-paytm-cyan font-semibold text-paytm-navy"
                : "border-transparent text-ink-soft hover:text-ink",
            )}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
