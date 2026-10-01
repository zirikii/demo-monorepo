import { ClipboardCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useProperty } from "@/features/property/PropertyProvider";
import { cn } from "@/lib/cn";
import { useAssistant } from "../../AssistantProvider";
import { forms, optionsFor, type FormContext } from "../../engine/forms";
import { renderTemplate, type FormId, type TemplateValues } from "../../flows";
import { CardShell } from "./CardShell";

export function FormCard({
  form,
  next,
  values,
  live,
}: {
  form: FormId;
  next: string;
  values: TemplateValues;
  live: boolean;
}) {
  const def = forms[form];
  const store = useProperty();
  const { submitForm } = useAssistant();
  const ctx: FormContext = {
    facts: values,
    rooms: store.property.roomTypes.map((r) => r.name),
    teamEmails: store.team.map((u) => u.email),
    today: values.today ?? new Date().toISOString().slice(0, 10),
  };
  const [fields, setFields] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      def.fields.map((f) => [f.name, f.prefill ? renderTemplate(f.prefill, values) : ""]),
    ),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const disabled = done || !live;
  const title = renderTemplate(def.title, values);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const result = submitForm(form, fields, next);
    if (result.ok) setDone(true);
    else setErrors(result.errors);
  };

  return (
    <CardShell title={title} icon={<ClipboardCheck className="size-4 text-royal" aria-hidden />}>
      <form onSubmit={submit} noValidate className="space-y-3" aria-label={title}>
        {def.fields.map((field) => {
          const id = `${form}-${field.name}`;
          const error = errors[field.name];
          const options = optionsFor(field, ctx);
          const label = renderTemplate(field.label, values);
          const hint = field.hint ? renderTemplate(field.hint, values) : undefined;
          const common = {
            id,
            disabled,
            value: fields[field.name] ?? "",
            "aria-invalid": Boolean(error),
            "aria-describedby": hint ? `${id}-hint` : undefined,
            className: "field mt-1 disabled:bg-canvas disabled:text-ink-faint",
          };
          const set = (value: string) => setFields((f) => ({ ...f, [field.name]: value }));
          return (
            <div key={field.name}>
              <label htmlFor={id} className="text-xs font-semibold text-ink-soft">
                {label}
              </label>
              {options ? (
                <select {...common} onChange={(e) => set(e.target.value)}>
                  <option value="">Select…</option>
                  {options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  {...common}
                  type={field.type ?? (field.inputMode === "email" ? "email" : "text")}
                  min={field.type === "date" ? ctx.today : undefined}
                  inputMode={field.type ? undefined : field.inputMode}
                  placeholder={
                    field.placeholder ? renderTemplate(field.placeholder, values) : undefined
                  }
                  onChange={(e) => set(e.target.value)}
                />
              )}
              {hint && !error && (
                <p id={`${id}-hint`} className="mt-1 text-[11px] text-ink-faint">
                  {hint}
                </p>
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
            "w-full rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
            disabled ? "bg-line-soft text-ink-faint" : "bg-royal text-white hover:bg-royal-hover",
          )}
        >
          {done ? "Sent" : def.submitLabel}
        </button>
      </form>
    </CardShell>
  );
}
