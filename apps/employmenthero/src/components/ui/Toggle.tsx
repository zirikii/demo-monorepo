import { cn } from "@/lib/cn";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  className?: string;
}

export function Toggle({ checked, onChange, label, description, className }: ToggleProps) {
  return (
    <label className={cn("flex cursor-pointer items-start justify-between gap-6", className)}>
      <span className="flex flex-col gap-0.5">
        <span className="text-[0.95rem] font-semibold text-ink-strong">{label}</span>
        {description ? <span className="text-sm text-ink-faint">{description}</span> : null}
      </span>
      <span className="relative inline-flex shrink-0 pt-1">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className={cn(
            "block h-6 w-11 rounded-full transition peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-eh-purple",
            checked ? "bg-eh-purple" : "bg-surface-deep",
          )}
        />
        <span
          aria-hidden
          className={cn(
            "absolute top-1 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
            checked && "translate-x-5",
          )}
        />
      </span>
    </label>
  );
}
