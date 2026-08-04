import { cn } from "@/lib/cn";

export type TabOption<T extends string> = { id: T; label: string };

export function Tabs<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: {
  options: readonly TabOption<T>[];
  value: T;
  onChange: (id: T) => void;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <div role="tablist" aria-label={ariaLabel} className={cn("flex flex-wrap gap-2", className)}>
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
              "focus-ring rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              selected
                ? "border-black bg-black text-white"
                : "border-line bg-surface text-ink-soft hover:border-line-strong hover:text-black",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function FilterChips({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: {
  options: readonly string[];
  value: string;
  onChange: (option: string) => void;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <div role="group" aria-label={ariaLabel} className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const pressed = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={pressed}
            onClick={() => onChange(option)}
            className={cn(
              "focus-ring rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              pressed
                ? "border-black bg-cba-yellow text-black"
                : "border-line bg-surface text-ink-soft hover:border-line-strong hover:text-black",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
