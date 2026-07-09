import { type FormEvent, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ContactFormProps {
  heading: string;
  submitLabel: string;
  successTitle: string;
  successCopy: string;
  showTopic?: boolean;
}

interface Fields {
  name: string;
  email: string;
  organization: string;
  topic: string;
  message: string;
}

const emptyFields: Fields = { name: "", email: "", organization: "", topic: "Squiz DXP", message: "" };

/** Client-side demo form: validates locally and shows a success state. */
export function ContactForm({
  heading,
  submitLabel,
  successTitle,
  successCopy,
  showTopic = true,
}: ContactFormProps) {
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof Fields) => (e: { target: { value: string } }) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (fields.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(fields.email)) next.email = "Please enter a valid work email.";
    if (fields.organization.trim().length < 2) next.organization = "Please enter your organization.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-mint bg-mint-tint p-10 text-center" role="status">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-mint text-navy">
          <Check className="size-7" aria-hidden />
        </span>
        <h3 className="mt-5 text-2xl font-semibold text-navy">{successTitle}</h3>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">{successCopy}</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-cream-deep bg-card px-4 py-3 text-sm text-navy placeholder:text-ink-faint focus:border-navy focus:outline-none";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-cream-deep bg-card p-8 shadow-card"
    >
      <h2 className="text-2xl font-semibold text-navy">{heading}</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-semibold text-navy">
            Full name
          </label>
          <input
            id="cf-name"
            value={fields.name}
            onChange={set("name")}
            placeholder="Alex Taylor"
            className={inputClass}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="mt-1 text-sm text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-semibold text-navy">
            Work email
          </label>
          <input
            id="cf-email"
            type="email"
            value={fields.email}
            onChange={set("email")}
            placeholder="alex@organization.gov"
            className={inputClass}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-1 text-sm text-red-700">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="cf-org" className="mb-1.5 block text-sm font-semibold text-navy">
            Organization
          </label>
          <input
            id="cf-org"
            value={fields.organization}
            onChange={set("organization")}
            placeholder="Harbour City Council"
            className={inputClass}
            aria-invalid={!!errors.organization}
          />
          {errors.organization && <p className="mt-1 text-sm text-red-700">{errors.organization}</p>}
        </div>
        {showTopic && (
          <div>
            <label htmlFor="cf-topic" className="mb-1.5 block text-sm font-semibold text-navy">
              What would you like to discuss?
            </label>
            <select id="cf-topic" value={fields.topic} onChange={set("topic")} className={inputClass}>
              <option>Squiz DXP</option>
              <option>Funnelback Search</option>
              <option>Content Intelligence</option>
              <option>Migration from a legacy CMS</option>
              <option>Partnerships</option>
              <option>Something else</option>
            </select>
          </div>
        )}
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="mb-1.5 block text-sm font-semibold text-navy">
            Message <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <textarea
            id="cf-message"
            rows={4}
            value={fields.message}
            onChange={set("message")}
            placeholder="Tell us a little about your digital estate and goals…"
            className={inputClass}
          />
        </div>
      </div>
      <Button type="submit" size="lg" className="mt-7" withArrow>
        {submitLabel}
      </Button>
      <p className="mt-4 text-xs text-ink-faint">
        Demo form — nothing is sent anywhere. In the real product this would route to the sales
        team.
      </p>
    </form>
  );
}
