import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PageHero } from "@/components/marketing/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Field, Select, TextArea, TextInput } from "@/components/ui/Field";
import { SITE } from "@/data/site";
import { readJson, writeJson } from "@/lib/storage";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  practice: z.string().min(2, "Enter your practice or company"),
  audience: z.string(),
  message: z.string().min(10, "Tell us a little more"),
});

type Values = z.infer<typeof schema>;

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { audience: "Adviser", name: "", email: "", practice: "", message: "" },
  });

  const onSubmit = handleSubmit((values) => {
    const existing = readJson<Values[]>("hub24-demo-enquiries", []);
    writeJson("hub24-demo-enquiries", [...existing, values]);
    setSent(true);
  });

  return (
    <PageLayout title="Contact">
      <PageHero
        eyebrow="Contact HUB24"
        title="How can we help?"
        body="Contact us via the form, chat to a local BDM, or call the investor line. Demo submissions stay in this browser."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <Field label="Name" htmlFor="name" error={errors.name?.message}>
              <TextInput id="name" {...register("name")} />
            </Field>
            <Field label="Email" htmlFor="email" error={errors.email?.message}>
              <TextInput id="email" type="email" {...register("email")} />
            </Field>
            <Field label="Practice / company" htmlFor="practice" error={errors.practice?.message}>
              <TextInput id="practice" {...register("practice")} />
            </Field>
            <Field label="I am a" htmlFor="audience">
              <Select id="audience" {...register("audience")}>
                <option>Adviser</option>
                <option>Private wealth</option>
                <option>Licensee</option>
                <option>Investment manager</option>
                <option>Advised client</option>
                <option>Shareholder</option>
              </Select>
            </Field>
            <Field label="Message" htmlFor="message" error={errors.message?.message}>
              <TextArea id="message" {...register("message")} />
            </Field>
            <Button type="submit" disabled={isSubmitting}>
              Submit enquiry
            </Button>
            {sent ? (
              <p role="status" className="text-sm font-semibold text-positive">
                Thanks for getting in touch. HUB24 will use the details you provide to respond — except this is a demo, so we stored them locally instead.
              </p>
            ) : null}
          </form>
          <aside className="rounded-hub-lg bg-surface-tint p-6">
            <h2 className="text-lg font-bold">Other ways to connect</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              <li>
                <strong className="text-ink">Advisers</strong>
                <br />
                {SITE.supportPhone}
              </li>
              <li>
                <strong className="text-ink">Investors phone line</strong>
                <br />
                {SITE.investorPhone}
              </li>
              <li>
                <strong className="text-ink">Postal</strong>
                <br />
                {SITE.postal}
              </li>
            </ul>
          </aside>
        </div>
      </Section>
    </PageLayout>
  );
}
