import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import type { FormId } from "../../flows";
import { forms } from "../../engine/forms";
import { useAssistant } from "../../AssistantProvider";
import { CardShell } from "./CardShell";

const fieldClass =
  "mt-1 block w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-agl-blue focus:outline-none focus:ring-2 focus:ring-agl-blue/20";

export function FormCard({ form, next, live }: { form: FormId; next: string; live: boolean }) {
  const def = forms[form];
  const { submitForm } = useAssistant();
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Record<string, string>>({
    resolver: zodResolver(def.schema),
    defaultValues: Object.fromEntries(def.fields.map((f) => [f.name, ""])),
  });

  const disabled = done || !live;

  const onSubmit = handleSubmit((values) => {
    const result = submitForm(form, values, next);
    if (result.ok) {
      setDone(true);
      return;
    }
    for (const [name, message] of Object.entries(result.errors)) setError(name, { message });
  });

  return (
    <CardShell title={def.title} icon={<ClipboardCheck className="h-4 w-4 text-agl-blue" aria-hidden="true" />}>
      <form onSubmit={onSubmit} noValidate className="space-y-3" aria-label={def.title}>
        {def.fields.map((field) => {
          const id = `${form}-${field.name}`;
          const error = errors[field.name]?.message;
          return (
            <div key={field.name}>
              <label htmlFor={id} className="text-xs font-bold text-ink-soft">
                {field.label}
              </label>
              {field.options ? (
                <select id={id} disabled={disabled} className={fieldClass} aria-invalid={Boolean(error)} {...register(field.name)}>
                  <option value="">Select…</option>
                  {field.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  disabled={disabled}
                  inputMode={field.inputMode}
                  placeholder={field.placeholder}
                  className={fieldClass}
                  aria-invalid={Boolean(error)}
                  {...register(field.name)}
                />
              )}
              {error && (
                <p role="alert" className="mt-1 text-xs font-semibold text-critical">
                  {error}
                </p>
              )}
            </div>
          );
        })}
        <button
          type="submit"
          disabled={disabled}
          className={cn(
            "w-full rounded-full px-4 py-2.5 text-sm font-extrabold transition-colors",
            disabled ? "bg-surface-deep text-ink-faint" : "bg-agl-blue text-white hover:bg-agl-blue-hover",
          )}
        >
          {done ? "Sent" : def.submitLabel}
        </button>
      </form>
    </CardShell>
  );
}
