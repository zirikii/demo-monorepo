import { useState, type ReactNode } from "react";
import { useDisclosure } from "../../hooks/useDisclosure";
import { TextField } from "../ui/TextField";
import { SelectField, type SelectOption } from "../ui/SelectField";
import { Button } from "../ui/Button";
import { SuccessModal, type SuccessLine } from "../shared/SuccessModal";

export interface BillFormField {
  kind: "select" | "text";
  id: string;
  label: string;
  placeholder?: string;
  options?: SelectOption[];
  validate?: (value: string) => string | undefined;
  hint?: string;
}

interface BillFormProps {
  title: string;
  cta: string;
  fields: BillFormField[];
  successTitle: string;
  buildSuccessLines: (values: Record<string, string>) => SuccessLine[];
  footer?: ReactNode;
}

/** Generic floating bill-payment card driven by a field config. */
export function BillForm({ title, cta, fields, successTitle, buildSuccessLines, footer }: BillFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const success = useDisclosure();

  const setValue = (id: string, value: string) =>
    setValues((prev) => ({ ...prev, [id]: value }));

  const submit = () => {
    const nextErrors: Record<string, string | undefined> = {};
    for (const field of fields) {
      const value = values[field.id] ?? "";
      if (!value.trim()) {
        nextErrors[field.id] = `${field.label} is required`;
      } else if (field.validate) {
        nextErrors[field.id] = field.validate(value);
      }
    }
    setErrors(nextErrors);
    if (Object.values(nextErrors).every((e) => !e)) success.open();
  };

  return (
    <>
      <form
        aria-label={title}
        className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-float"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <h2 className="text-base font-bold text-ink">{title}</h2>
        <div className="mt-5 space-y-5">
          {fields.map((field) =>
            field.kind === "select" ? (
              <SelectField
                key={field.id}
                label={field.label}
                placeholder={field.placeholder ?? `Select ${field.label.toLowerCase()}`}
                value={values[field.id] ?? ""}
                onChange={(e) => setValue(field.id, e.target.value)}
                options={field.options ?? []}
                error={errors[field.id]}
              />
            ) : (
              <TextField
                key={field.id}
                label={field.label}
                placeholder={field.placeholder}
                value={values[field.id] ?? ""}
                onChange={(e) => setValue(field.id, e.target.value)}
                error={errors[field.id]}
                hint={field.hint}
              />
            ),
          )}
        </div>
        <Button type="submit" className="mt-6 w-full">
          {cta}
        </Button>
        {footer}
      </form>

      <SuccessModal
        open={success.isOpen}
        onClose={success.close}
        title={successTitle}
        lines={buildSuccessLines(values)}
      />
    </>
  );
}
