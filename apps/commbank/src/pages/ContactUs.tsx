import { useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { Button } from "@/components/ui/Button";
import { SelectField, TextField } from "@/components/ui/Field";
import { contactChannels } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const enquiries = [
  "Everyday accounts and cards",
  "Home loans",
  "Credit cards",
  "Insurance",
  "Business banking",
  "Scams, fraud and security",
  "Something else",
];

const cebaTasks = [
  "Dispute a transaction",
  "Help with a scam or fraud",
  "Update mobile & contact details",
  "Find a statement online",
];

export function ContactUsPage() {
  useDocumentTitle("Contact us");
  const [enquiry, setEnquiry] = useState(enquiries[0] ?? "");
  const [detail, setDetail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Help & support", to: "/support" }, { label: "Contact us" }]} />
      <PageHero
        eyebrow="Help & support"
        title="Contact us"
        intro="Message us in the CommBank app 24/7, or call the team best placed to help with your enquiry."
      />

      <Section title="Phone numbers & contact options">
        <ul className="grid gap-4 sm:grid-cols-2">
          {contactChannels.map((channel) => (
            <li key={channel.id} className="rounded-cba-lg border border-line-soft p-6">
              <h3 className="text-[15px] font-bold text-ink">{channel.title}</h3>
              <p className="mt-2 text-2xl font-extrabold text-ink">{channel.number}</p>
              <p className="mt-1 text-sm text-ink-soft">{channel.hours}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[13px] text-ink-faint">
          Demo numbers reflect the real published contact details but no calls are placed from this
          site.
        </p>
      </Section>

      <Section tone="tint" title="What's your enquiry?">
        <form
          className="grid max-w-2xl gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <SelectField
            label="I need help with"
            value={enquiry}
            onChange={(event) => {
              setEnquiry(event.target.value);
              setSubmitted(false);
            }}
          >
            {enquiries.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
          <TextField
            label="Tell us more"
            hint="Optional — this demo form does not send anything"
            value={detail}
            onChange={(event) => {
              setDetail(event.target.value);
              setSubmitted(false);
            }}
            placeholder="Describe what you need help with"
          />
          <div>
            <Button type="submit">Find the right team</Button>
          </div>

          {submitted ? (
            <p
              role="status"
              className="rounded-cba-md bg-surface px-4 py-3 text-[15px] font-bold text-ink shadow-cba"
            >
              For &ldquo;{enquiry}&rdquo;, message us in the CommBank app or call 13 2221 between
              8am and 8pm. This is a demo, so nothing was submitted.
            </p>
          ) : null}
        </form>
      </Section>

      <Section title="Instant help from Ceba in the CommBank app">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cebaTasks.map((task) => (
            <li
              key={task}
              className="rounded-cba-lg border border-line-soft p-5 text-[15px] font-bold text-ink"
            >
              {task}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="tint" title="Other contact options">
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Chat in the CommBank app",
              body: "Get instant help from Ceba or connect to a specialist.",
            },
            {
              title: "Support if you're overseas",
              body: "Call +61 2 9999 3283, 24 hours a day, 7 days a week.",
            },
            {
              title: "Accessibility services",
              body: "Interpreters, the National Relay Service on 133 677, and more.",
            },
          ].map((item) => (
            <li key={item.title} className="rounded-cba-lg bg-surface p-6 shadow-cba">
              <h3 className="text-[15px] font-bold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <HelpBlock />
    </PageLayout>
  );
}
