import { cn } from "../../lib/cn";

export interface RadioPillOption {
  value: string;
  label: string;
}

interface RadioPillGroupProps {
  name: string;
  legend: string;
  options: RadioPillOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/** Dot-radio pill row like Paytm's "One Way / Round Trip" & "Prepaid / Postpaid". */
export function RadioPillGroup({
  name,
  legend,
  options,
  value,
  onChange,
  className,
}: RadioPillGroupProps) {
  return (
    <fieldset className={cn("flex items-center gap-4", className)}>
      <legend className="sr-only">{legend}</legend>
      {options.map((opt) => {
        const checked = value === opt.value;
        return (
          <label
            key={opt.value}
            className={cn(
              "flex cursor-pointer items-center gap-2 text-sm",
              checked ? "font-semibold text-ink" : "text-ink-soft",
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={checked}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded-full border-2",
                checked ? "border-paytm-cyan" : "border-ink-faint",
              )}
            >
              {checked ? <span className="h-2 w-2 rounded-full bg-paytm-cyan" /> : null}
            </span>
            {opt.label}
          </label>
        );
      })}
    </fieldset>
  );
}
