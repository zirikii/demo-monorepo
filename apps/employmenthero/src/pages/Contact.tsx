import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, Select, TextArea, TextInput } from "@/components/ui/Field";
import { SITE } from "@/data/site";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().min(1, "Enter your email").email("Enter a valid email"),
  topic: z.string().min(1, "Choose a topic"),
  message: z.string().min(10, "Tell us a little more"),
});

type ContactValues = z.infer<typeof schema>;

const TOPICS = [
  "Sales and pricing",
  "Existing customer support",
  "Partner network",
  "Media enquiry",
  "Report a bug",
  "Something else",
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", topic: "", message: "" },
  });

  const onSubmit = handleSubmit(() => setSent(true));

  return (
    <PageLayout title="Contact us">
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        body="Sales, support, partnerships or media — tell us what you need and we'll route it to the right team."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact us" }]}
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.75fr]">
          <Card>
            {sent ? (
              <div className="flex flex-col items-start gap-4 py-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-ink-strong">
                  Message received
                </h2>
                <p className="text-[0.98rem] leading-relaxed text-ink-soft">
                  We&apos;d normally reply within one business day. Nothing was actually sent — this is
                  an unofficial demo.
                </p>
                <Button variant="secondary" onClick={() => setSent(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your name" htmlFor="contact-name" error={errors.name?.message}>
                    <TextInput id="contact-name" autoComplete="name" {...register("name")} />
                  </Field>
                  <Field label="Email" htmlFor="contact-email" error={errors.email?.message}>
                    <TextInput id="contact-email" type="email" autoComplete="email" {...register("email")} />
                  </Field>
                </div>
                <Field label="What's this about?" htmlFor="contact-topic" error={errors.topic?.message}>
                  <Select id="contact-topic" {...register("topic")}>
                    <option value="">Choose a topic</option>
                    {TOPICS.map((topic) => (
                      <option key={topic}>{topic}</option>
                    ))}
                  </Select>
                </Field>
                <Field label="Message" htmlFor="contact-message" error={errors.message?.message}>
                  <TextArea id="contact-message" {...register("message")} />
                </Field>
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Send message"}
                </Button>
              </form>
            )}
          </Card>

          <div className="flex flex-col gap-5">
            <Card className="flex flex-col gap-4">
              <h2 className="text-xl font-extrabold tracking-tight text-ink-strong">Talk to a human</h2>
              <p className="flex items-center gap-3 text-[0.98rem] text-ink-soft">
                <Phone aria-hidden className="h-4 w-4 text-eh-purple" />
                {SITE.supportPhone}
              </p>
              <p className="flex items-center gap-3 text-[0.98rem] text-ink-soft">
                <Mail aria-hidden className="h-4 w-4 text-eh-purple" />
                {SITE.salesEmail}
              </p>
              <p className="flex items-start gap-3 text-[0.98rem] text-ink-soft">
                <MapPin aria-hidden className="mt-1 h-4 w-4 shrink-0 text-eh-purple" />
                {SITE.headquarters}
              </p>
            </Card>
            <Card className="flex flex-col gap-3 bg-surface-tint">
              <h2 className="text-lg font-extrabold tracking-tight text-ink-strong">
                Already a customer?
              </h2>
              <p className="text-[0.95rem] leading-relaxed text-ink-soft">
                The Service Centre answers most questions faster than we can, and in-product chat is
                open on business days.
              </p>
              <a href="/support" className="focus-eh text-sm font-bold text-eh-purple hover:underline">
                Visit the Service Centre
              </a>
            </Card>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
