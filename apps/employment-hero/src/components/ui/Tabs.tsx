import { cn } from "@/lib/cn";

export type TabItem = { id: string; label: string };

export function Tabs({
  items,
  active,
  onChange,
  className,
  ariaLabel,
}: {
  items: TabItem[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
  ariaLabel: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex flex-wrap gap-1 rounded-full border border-eh-line bg-white p-1",
        className,
      )}
    >
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
              "rounded-full px-5 py-2 text-sm font-semibold transition focus-eh",
              selected
                ? "bg-eh-purple text-white"
                : "text-eh-ink-soft hover:bg-eh-purple-tint hover:text-eh-purple",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
