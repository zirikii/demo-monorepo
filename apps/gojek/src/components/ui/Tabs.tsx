import { cn } from "@/lib/cn";

export interface TabOption {
  id: string;
  label: string;
  count?: number;
}

export function Tabs({
  options,
  value,
  onChange,
  ariaLabel,
  tone = "light",
}: {
  options: TabOption[];
  value: string;
  onChange: (id: string) => void;
  ariaLabel: string;
  tone?: "light" | "dark";
}) {
  return (
    <div role="tablist" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.id)}
            className={cn(
              "focus-go rounded-full px-4 py-2 text-sm font-bold transition",
              selected
                ? "bg-go-green text-white"
                : tone === "dark"
                  ? "bg-white/10 text-white/80 hover:bg-white/20"
                  : "bg-surface-deep text-ink-soft hover:bg-go-green-tint hover:text-go-green-deep",
            )}
          >
            {option.label}
            {typeof option.count === "number" ? (
              <span className={cn("ml-2 text-xs", selected ? "text-white/80" : "text-ink-faint")}>
                {option.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
