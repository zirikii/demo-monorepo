import { cn } from "@/lib/cn";

export type TabOption<T extends string> = {
  value: T;
  label: string;
};

export function Tabs<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: TabOption<T>[];
  value: T;
  onChange: (next: T) => void;
  label: string;
  className?: string;
}) {
  return (
    <div role="tablist" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "focus-cba rounded-full border px-4 py-2 text-sm font-bold transition-colors",
              selected
                ? "border-ink bg-ink text-surface"
                : "border-line bg-surface text-ink hover:bg-surface-tint",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
