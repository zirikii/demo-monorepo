import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Mail, Phone } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeading } from "@/components/ui/Card";
import { Field, Select, TextArea, TextInput } from "@/components/ui/Field";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/data/site";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  business: z.string().min(2, "Enter your business or licensee"),
  audience: z.string().min(1, "Select who you are"),
  message: z.string().min(10, "Tell us a little more so we can route your enquiry"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { audience: "Adviser" },
  });

  return (
    <PageLayout title="Contact us">
      <PageHero
        eyebrow="Contact"
        title="Let's talk about how our market-leading platform can help you"
        body="Submit your details and one of our team will be in touch. Advisers can also go straight to their local Business Development Manager."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact us" }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading eyebrow="Enquiry" title="Send us a message" />

            {submitted ? (
              <Card className="mt-8 border-positive/40 bg-positive-tint">
                <div className="flex gap-4">
                  <CheckCircle2 aria-hidden className="h-6 w-6 shrink-0 text-positive" />
                  <div>
                    <CardHeading>Thanks, {submitted.name.split(" ")[0]}</CardHeading>
                    <CardBody className="mt-2">
                      In a real deployment this enquiry would be routed to the {submitted.audience}{" "}
                      team. Nothing has been sent — this demo has no backend.
                    </CardBody>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-4"
                      onClick={() => setSubmitted(null)}
                    >
                      Send another
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <form
                noValidate
                className="mt-8 flex flex-col gap-5"
                onSubmit={handleSubmit((values) => setSubmitted(values))}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" htmlFor="contact-name" error={errors.name?.message}>
                    <TextInput id="contact-name" autoComplete="name" {...register("name")} />
                  </Field>
                  <Field label="Email" htmlFor="contact-email" error={errors.email?.message}>
                    <TextInput
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                    />
                  </Field>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Business or licensee"
                    htmlFor="contact-business"
                    error={errors.business?.message}
                  >
                    <TextInput id="contact-business" autoComplete="organization" {...register("business")} />
                  </Field>
                  <Field label="I am a" htmlFor="contact-audience" error={errors.audience?.message}>
                    <Select id="contact-audience" {...register("audience")}>
                      <option>Adviser</option>
                      <option>Private wealth adviser or broker</option>
                      <option>Licensee</option>
                      <option>Investment manager</option>
                      <option>Advised client</option>
                      <option>Shareholder or investor</option>
                    </Select>
                  </Field>
                </div>
                <Field
                  label="How can we help?"
                  htmlFor="contact-message"
                  error={errors.message?.message}
                  hint="Nothing is transmitted — this form validates and then renders a confirmation."
                >
                  <TextArea id="contact-message" {...register("message")} />
                </Field>
                <Button type="submit" size="lg" className="w-fit" disabled={isSubmitting}>
                  Submit enquiry
                </Button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <Card className="flex flex-col gap-3">
              <CardHeading>Advisers and support staff</CardHeading>
              <p className="flex items-center gap-2 text-[0.95rem] font-semibold text-h24-teal-dark">
                <Phone aria-hidden className="h-4 w-4" />
                {SITE.adviserPhone}
              </p>
              <p className="flex items-center gap-2 text-sm text-ink-soft">
                <Mail aria-hidden className="h-4 w-4" />
                {SITE.adviserEmail}
              </p>
              <CardBody className="text-sm">
                Platform, application and transaction enquiries, Monday to Friday.
              </CardBody>
            </Card>

            <Card className="flex flex-col gap-3">
              <CardHeading>Investors</CardHeading>
              <p className="flex items-center gap-2 text-[0.95rem] font-semibold text-h24-teal-dark">
                <Phone aria-hidden className="h-4 w-4" />
                {SITE.investorPhone}
              </p>
              <p className="flex items-center gap-2 text-sm text-ink-soft">
                <Mail aria-hidden className="h-4 w-4" />
                {SITE.investorEmail}
              </p>
              <CardBody className="text-sm">
                Account administration for advised clients. For strategy questions, speak to your
                adviser first.
              </CardBody>
            </Card>

            <Card className="flex flex-col gap-3">
              <CardHeading>Shareholders</CardHeading>
              <p className="flex items-center gap-2 text-[0.95rem] font-semibold text-h24-teal-dark">
                <Phone aria-hidden className="h-4 w-4" />
                {SITE.registryPhone}
              </p>
              <CardBody className="text-sm">
                Enquiries about an existing shareholding go to {SITE.registryName}.
              </CardBody>
            </Card>

            <Card className="bg-surface-tint">
              <CardHeading className="text-base">Head office</CardHeading>
              <CardBody className="mt-2 text-sm">{SITE.headOffice}</CardBody>
            </Card>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
