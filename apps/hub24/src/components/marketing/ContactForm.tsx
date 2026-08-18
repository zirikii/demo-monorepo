import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(8, "Enter a contact number"),
  practice: z.string().min(2, "Enter your practice or company"),
  enquiry: z.string().min(1, "Choose an enquiry type"),
  message: z.string().min(10, "Tell us a little more (10 characters minimum)"),
});

type FormValues = z.infer<typeof schema>;

const ENQUIRY_OPTIONS = [
  { value: "platform", label: "HUB24 Platform demonstration" },
  { value: "transition", label: "Transitioning a practice" },
  { value: "managed-portfolios", label: "Managed portfolios" },
  { value: "class", label: "Class / NowInfinity" },
  { value: "myprosperity", label: "myprosperity" },
  { value: "media", label: "Media enquiry" },
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      practice: "",
      enquiry: "platform",
      message: "",
    },
  });

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-hub-lg border border-line bg-white p-8 shadow-hub">
        <CheckCircle2 aria-hidden className="h-8 w-8 text-positive" />
        <h3 className="text-2xl font-extrabold tracking-tight text-ink-strong">
          Thanks {submitted.name}
        </h3>
        <p className="text-ink-soft">
          In the real world, HUB24 would use the details you provide to respond to your enquiry.
          This is a demo, so nothing was sent anywhere — your submission stayed in the browser.
        </p>
        <Button variant="secondary" onClick={() => setSubmitted(null)}>
          Submit another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => setSubmitted(values))}
      className="flex flex-col gap-5 rounded-hub-lg border border-line bg-white p-8 shadow-hub"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Full name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <TextField
          label="Practice or company"
          autoComplete="organization"
          error={errors.practice?.message}
          {...register("practice")}
        />
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextField
          label="Phone"
          type="tel"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <SelectField
        label="What is your enquiry about?"
        options={ENQUIRY_OPTIONS}
        error={errors.enquiry?.message}
        {...register("enquiry")}
      />

      <TextAreaField
        label="How can we help?"
        placeholder="Tell us about your practice and what you're looking for."
        error={errors.message?.message}
        {...register("message")}
      />

      <p className="text-xs text-ink-faint">
        Demo mode: nothing you submit here is transmitted or stored outside this browser tab.
      </p>

      <Button type="submit" size="lg" disabled={isSubmitting} className="self-start">
        Submit enquiry
      </Button>
    </form>
  );
}
