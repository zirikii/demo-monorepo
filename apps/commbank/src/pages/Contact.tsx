import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { readJson, writeJson } from "@/lib/storage";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  topic: z.string().min(2),
  message: z.string().min(10, "Tell us a bit more"),
});

type FormValues = z.infer<typeof schema>;

export function ContactPage() {
  useDocumentTitle("Contact us");
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Alex Demo",
      email: "alex@example.com",
      topic: "Home loan appointment",
      message: "I’d like to discuss refinancing options in this demo.",
    },
  });

  return (
    <PageLayout>
      <PageHero
        eyebrow="Support"
        title="Contact us"
        summary="Send a demo enquiry — stored in localStorage, never emailed."
      />
      <div className="mx-auto max-w-lg px-4 py-10 sm:px-6">
        <form
          className="space-y-4 rounded-xl border border-line bg-card p-6"
          onSubmit={handleSubmit((values) => {
            const prev = readJson<FormValues[]>("commbank-demo-contacts", []);
            writeJson("commbank-demo-contacts", [...prev, values]);
            setDone(true);
            reset();
          })}
        >
          <TextField label="Name" error={errors.name?.message} {...register("name")} />
          <TextField label="Email" error={errors.email?.message} {...register("email")} />
          <TextField label="Topic" error={errors.topic?.message} {...register("topic")} />
          <label className="block space-y-1.5 text-sm">
            <span className="font-semibold text-ink">Message</span>
            <textarea
              className="min-h-28 w-full rounded-md border border-line px-3 py-2.5"
              {...register("message")}
            />
            {errors.message ? <span className="text-xs text-danger">{errors.message.message}</span> : null}
          </label>
          {done ? (
            <p role="status" className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-success">
              Thanks — your demo enquiry was saved locally.
            </p>
          ) : null}
          <Button type="submit" variant="yellow" disabled={isSubmitting}>
            Send message
          </Button>
        </form>
      </div>
    </PageLayout>
  );
}
