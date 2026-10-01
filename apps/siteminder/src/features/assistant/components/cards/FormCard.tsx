import { ClipboardCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { useAssistant } from "../../AssistantProvider";
import { forms } from "../../engine/forms";
import { renderTemplate, type FormId, type TemplateValues } from "../../flows";
import { CardShell } from "./CardShell";

export function FormCard({ form, next, values, live }: { form: FormId; next: string; values: TemplateValues; live: boolean }) {
  const def = forms[form];
  const { submitForm } = useAssistant();
  const [fields, setFields] = useState<Record<string, string>>(() =>
    Object.fromEntries(def.fields.map((f) => [f.name, f.prefill ? renderTemplate(f.prefill, values) : ""])),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const disabled = done || !live;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const result = submitForm(form, fields, next);
    if (result.ok) setDone(true);
    else setErrors(result.errors);
  };

  return (
    <CardShell title={def.title} icon={<ClipboardCheck className="size-4 text-tk-blue" aria-hidden />}>
      <form onSubmit={submit} noValidate className="space-y-3" aria-label={def.title}>
        {def.fields.map((field) => {
          const id = `${form}-${field.name}`;
          const error = errors[field.name];
          const common = {
            id,
            disabled,
            value: fields[field.name] ?? "",
            "aria-invalid": Boolean(error),
            className: "field mt-1 disabled:bg-page disabled:text-ink-faint",
          };
          return (
            <div key={field.name}>
              <label htmlFor={id} className="text-xs font-semibold text-ink-soft">
                {field.label}
              </label>
              {field.options ? (
                <select {...common} onChange={(e) => setFields((f) => ({ ...f, [field.name]: e.target.value }))}>
                  <option value="">Select…</option>
                  {field.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  {...common}
                  inputMode={field.inputMode}
                  placeholder={field.placeholder}
                  onChange={(e) => setFields((f) => ({ ...f, [field.name]: e.target.value }))}
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
          className={cn("w-full rounded-full px-4 py-2.5 text-sm font-bold transition-colors", disabled ? "bg-line-soft text-ink-faint" : "bg-tk-green text-white hover:bg-tk-green-hover")}
        >
          {done ? "Sent" : def.submitLabel}
        </button>
      </form>
    </CardShell>
  );
}
