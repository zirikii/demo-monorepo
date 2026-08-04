import { cn } from "@/lib/cn";

export function TextField({
  label,
  error,
  className,
  id,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) {
  const fieldId = id || props.name;
  return (
    <label className="block space-y-1.5 text-sm">
      <span className="font-semibold text-ink">{label}</span>
      <input
        id={fieldId}
        className={cn(
          "w-full rounded-md border border-line bg-card px-3 py-2.5 text-ink shadow-sm placeholder:text-ink-faint",
          error && "border-danger",
          className,
        )}
        {...props}
      />
      {error ? <span className="block text-xs text-danger">{error}</span> : null}
    </label>
  );
}
