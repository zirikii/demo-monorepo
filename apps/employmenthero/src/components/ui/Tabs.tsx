import { cn } from "@/lib/cn";

interface TabsProps<T extends string> {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
  className?: string;
  label?: string;
}

export function Tabs<T extends string>({ tabs, active, onChange, className, label }: TabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={label ?? "Filter"}
      className={cn("inline-flex flex-wrap gap-1 rounded-full bg-surface-deep p-1", className)}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={tab === active}
          onClick={() => onChange(tab)}
          className={cn(
            "focus-eh rounded-full px-4 py-2 text-sm font-semibold transition",
            tab === active ? "bg-white text-eh-purple shadow-eh" : "text-ink-soft hover:text-ink",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
