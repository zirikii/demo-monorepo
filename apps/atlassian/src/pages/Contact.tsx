import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Field, TextArea, TextInput } from "@/components/ui/Field";
import { SITE } from "@/data/site";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <PageLayout title="Contact">
      <PageHero
        eyebrow="Talk to us"
        title="Contact sales or support"
        body={`Nothing is transmitted. Email stand-ins: ${SITE.salesEmail} and ${SITE.supportEmail}.`}
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />
      <Section>
        {sent ? (
          <p
            role="status"
            className="rounded-atl-lg bg-positive-tint p-6 font-semibold text-positive"
          >
            Message captured locally. Nobody will reply — this is a demo form.
          </p>
        ) : (
          <form
            className="mx-auto flex max-w-xl flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <Field label="Work email" htmlFor="email">
              <TextInput id="email" type="email" required defaultValue="maya@northline.demo" />
            </Field>
            <Field label="Company" htmlFor="company">
              <TextInput id="company" required defaultValue="Northline Payments" />
            </Field>
            <Field label="How can we help?" htmlFor="message">
              <TextArea
                id="message"
                required
                defaultValue="We want a Teamwork Collection trial for 80 people."
              />
            </Field>
            <Button type="submit">Send message</Button>
          </form>
        )}
      </Section>
    </PageLayout>
  );
}
