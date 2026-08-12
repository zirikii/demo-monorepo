import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, Select, TextArea, TextInput } from "@/components/ui/Field";
import { INDUSTRIES } from "@/data/solutions";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().min(1, "Enter your work email").email("Enter a valid work email"),
  phone: z.string().min(8, "Enter a contact number"),
  company: z.string().min(2, "Enter your business name"),
  headcount: z.string().min(1, "Choose a headcount range"),
  industry: z.string().min(1, "Choose an industry"),
  notes: z.string().optional(),
});

type DemoValues = z.infer<typeof schema>;

const HEADCOUNTS = ["1–20", "21–100", "101–500", "500+"];

export default function RequestDemoPage() {
  const [submitted, setSubmitted] = useState<DemoValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DemoValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      headcount: "",
      industry: "",
      notes: "",
    },
  });

  const onSubmit = handleSubmit((values) => setSubmitted(values));

  return (
    <PageLayout title="Request a demo">
      <PageHero
        eyebrow="Request a demo"
        title="See Employment OS on your own numbers"
        body="Tell us your headcount, industry and the awards you pay against. We'll show you exactly what changes in a 30-minute session."
        crumbs={[{ label: "Home", to: "/" }, { label: "Request a demo" }]}
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {submitted ? (
            <Card className="flex flex-col items-start gap-4 border-positive/30 bg-positive-tint">
              <CheckCircle2 aria-hidden className="h-10 w-10 text-positive" />
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-strong">
                Thanks {submitted.name.split(" ")[0]}, we&apos;ve got it
              </h2>
              <p className="text-[0.98rem] leading-relaxed text-ink-soft">
                A specialist would normally call {submitted.phone} within one business day to book your
                session for {submitted.company} ({submitted.headcount} employees, {submitted.industry}).
              </p>
              <p className="rounded-eh bg-white px-4 py-3 text-sm text-ink-faint">
                This is an unofficial demo — nothing was sent and no details left your browser.
              </p>
              <Button variant="secondary" onClick={() => setSubmitted(null)}>
                Submit another request
              </Button>
            </Card>
          ) : (
            <Card>
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" htmlFor="demo-name" error={errors.name?.message}>
                    <TextInput id="demo-name" autoComplete="name" {...register("name")} />
                  </Field>
                  <Field label="Work email" htmlFor="demo-email" error={errors.email?.message}>
                    <TextInput id="demo-email" type="email" autoComplete="email" {...register("email")} />
                  </Field>
                  <Field label="Phone" htmlFor="demo-phone" error={errors.phone?.message}>
                    <TextInput id="demo-phone" type="tel" autoComplete="tel" {...register("phone")} />
                  </Field>
                  <Field label="Business name" htmlFor="demo-company" error={errors.company?.message}>
                    <TextInput id="demo-company" autoComplete="organization" {...register("company")} />
                  </Field>
                  <Field label="Employees" htmlFor="demo-headcount" error={errors.headcount?.message}>
                    <Select id="demo-headcount" {...register("headcount")}>
                      <option value="">Select a range</option>
                      {HEADCOUNTS.map((range) => (
                        <option key={range}>{range}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Industry" htmlFor="demo-industry" error={errors.industry?.message}>
                    <Select id="demo-industry" {...register("industry")}>
                      <option value="">Select an industry</option>
                      {INDUSTRIES.map((industry) => (
                        <option key={industry.slug}>{industry.name}</option>
                      ))}
                      <option>Other</option>
                    </Select>
                  </Field>
                </div>
                <Field
                  label="Anything we should know?"
                  htmlFor="demo-notes"
                  hint="Awards you pay against, systems you're replacing, deadlines you're working to."
                >
                  <TextArea id="demo-notes" {...register("notes")} />
                </Field>
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Request my demo"}
                </Button>
                <p className="text-xs text-ink-faint">
                  By submitting you agree to our privacy policy. This demo does not transmit anything.
                </p>
              </form>
            </Card>
          )}

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-strong">
                What happens in the session
              </h2>
              <CheckList
                items={[
                  "We map your current employment stack and what each tool costs",
                  "We show award interpretation running against your actual roster patterns",
                  "We walk the hiring pipeline with roles you are trying to fill now",
                  "You get a written summary with pricing and an implementation plan",
                ]}
              />
            </div>
            <Card className="bg-surface-tint">
              <p className="text-[0.98rem] leading-relaxed text-ink-soft">
                “The demo used our own award and our own roster. By the end of it I could see the three
                things we had been getting wrong for two years.”
              </p>
              <p className="mt-4 text-sm font-bold text-ink-strong">Rachel Nguyen</p>
              <p className="text-sm text-ink-faint">General Manager, People — Tallowood Care</p>
            </Card>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
