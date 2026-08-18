import { cn } from "@/lib/cn";

interface TabsProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
  label: string;
  className?: string;
}

export function Tabs({ tabs, active, onChange, label, className }: TabsProps) {
  return (
    <div role="tablist" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {tabs.map((tab) => {
        const selected = tab === active;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab)}
            className={cn(
              "focus-hub rounded-full border px-4 py-2 text-sm font-bold transition",
              selected
                ? "border-hub-blue bg-hub-blue text-white"
                : "border-line bg-white text-ink-soft hover:border-hub-blue hover:text-hub-blue",
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
