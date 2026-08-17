import { useId, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  ariaLabel: string;
  className?: string;
}

export function Tabs({ items, ariaLabel, className }: TabsProps) {
  const base = useId();
  const [active, setActive] = useState(items[0]?.id ?? "");
  const current = items.find((item) => item.id === active) ?? items[0];

  if (!current) return null;

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div role="tablist" aria-label={ariaLabel} className="flex flex-wrap gap-2 border-b border-line">
        {items.map((item) => {
          const selected = item.id === current.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${base}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${item.id}`}
              onClick={() => setActive(item.id)}
              className={cn(
                "focus-h24 -mb-px border-b-2 px-4 py-3 text-[0.95rem] font-semibold transition",
                selected
                  ? "border-h24-teal text-h24-teal-dark"
                  : "border-transparent text-ink-faint hover:text-ink",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${base}-panel-${current.id}`}
        aria-labelledby={`${base}-tab-${current.id}`}
      >
        {current.content}
      </div>
    </div>
  );
}
