import { cn } from "@/lib/cn";

interface ToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  description?: string;
  className?: string;
}

export function Toggle({ checked, onChange, label, description, className }: ToggleProps) {
  return (
    <div className={cn("flex items-start justify-between gap-6", className)}>
      <div className="flex flex-col gap-0.5">
        <span className="text-[0.95rem] font-semibold text-ink-strong">{label}</span>
        {description ? <span className="text-sm text-ink-faint">{description}</span> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "focus-h24 relative h-6 w-11 shrink-0 rounded-full transition",
          checked ? "bg-h24-teal" : "bg-surface-deep",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition",
            checked && "translate-x-5",
          )}
        />
      </button>
    </div>
  );
}
