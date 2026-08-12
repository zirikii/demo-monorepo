import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Button } from "@/components/ui/Button";
import { Field, SelectField, TextAreaField } from "@/components/ui/Field";
import { Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

function EnquiryForm({ variant }: { variant: "contact" | "demo" }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-eh-lg border border-eh-positive/30 bg-eh-positive/8 p-8 text-center"
      >
        <p className="font-display text-xl font-bold text-eh-ink">Thanks, we have your details.</p>
        <p className="mt-2 text-sm text-eh-ink-soft">
          This is a demo, so nothing was actually sent. In the real product a specialist would be in
          touch within one business day.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setSubmitted(false)}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-4 rounded-eh-lg border border-eh-line bg-white p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" required defaultValue="Ava" />
        <Field label="Last name" required defaultValue="Thompson" />
      </div>
      <Field
        label="Work email"
        type="email"
        required
        defaultValue="ava.thompson@brightpath.com.au"
      />
      <Field label="Phone" type="tel" defaultValue="0400 000 000" />
      <Field label="Company" required defaultValue="Brightpath Group" />
      <SelectField label="Team size" defaultValue="11-50">
        <option value="1-10">1 – 10 employees</option>
        <option value="11-50">11 – 50 employees</option>
        <option value="51-200">51 – 200 employees</option>
        <option value="201-1000">201 – 1,000 employees</option>
        <option value="1000+">More than 1,000 employees</option>
      </SelectField>
      {variant === "demo" ? (
        <SelectField label="What are you most interested in?" defaultValue="payroll">
          <option value="hr">HR and onboarding</option>
          <option value="payroll">Payroll and award interpretation</option>
          <option value="hiring">Hiring and SmartMatch</option>
          <option value="heroforce">HeroForce and global employment</option>
        </SelectField>
      ) : (
        <TextAreaField
          label="How can we help?"
          placeholder="Tell us what you are trying to solve"
        />
      )}
      <Button type="submit" className="w-full">
        {variant === "demo" ? "Request a demo" : "Send message"}
      </Button>
      <p className="text-center text-xs text-eh-ink-faint">
        Demo form — the fields are pre-filled and nothing is submitted anywhere.
      </p>
    </form>
  );
}

export function ContactPage() {
  useDocumentTitle("Contact us");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="Talk to a human."
        blurb="Sales, support and partnerships all reach a real person. No chatbot loop."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading title="Get in touch" />
            <ul className="mt-8 space-y-6">
              {[
                { icon: Phone, label: "Sales and support", value: site.phone },
                { icon: Mail, label: "Email", value: site.supportEmail },
                { icon: MapPin, label: "Head office", value: site.address },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-eh-purple-tint text-eh-purple">
                    <item.icon size={18} />
                  </span>
                  <span>
                    <span className="block text-xs tracking-wide text-eh-ink-faint uppercase">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block font-semibold text-eh-ink">{item.value}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-eh-ink-faint">
              Contact details are placeholders for this unofficial demo.
            </p>
          </div>

          <EnquiryForm variant="contact" />
        </div>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}

export function RequestDemoPage() {
  useDocumentTitle("Request a demo");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Request a demo"
        title="See it running on your own numbers."
        blurb="Thirty minutes with a specialist who will use your award, your headcount and your pay cycle rather than a canned dataset."
        tone="purple"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Request a demo" }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading title="What to expect" />
            <ol className="mt-8 space-y-5">
              {[
                "A short call to understand your award coverage and current process",
                "A walkthrough using your headcount, pay cycle and entitlements",
                "A migration estimate with the actual effort spelled out",
                "Pricing, in writing, before you decide anything",
              ].map((item, index) => (
                <li key={item} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-eh-purple font-display text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-sm text-eh-ink-soft">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <EnquiryForm variant="demo" />
        </div>
      </Section>

      <CtaBand
        title="Prefer to try it yourself?"
        blurb="Start free and be in the platform in under a minute."
        primaryLabel="Start free"
        primaryTo="/start-free"
        secondaryLabel="See pricing"
        secondaryTo="/pricing"
      />
    </SiteLayout>
  );
}
