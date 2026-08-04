import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { articles } from "@/data/articles";
import { faqs } from "@/data/faqs";
import { formatDateLong } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const protections = [
  {
    title: "CallerCheck",
    body: "Received a call from us? CallerCheck pops up as a security notification in your CommBank app so you know it's really us.",
  },
  {
    title: "NetCode",
    body: "One-time codes by SMS or in the app confirm higher-risk activity such as adding a new payee.",
  },
  {
    title: "Lock, Block, Limit",
    body: "Lock a misplaced card instantly, block transaction types, and set your own spend limits.",
  },
  {
    title: "Name Check",
    body: "We check the account name you enter against the account you're paying and warn you if it doesn't look right.",
  },
];

const ifScammed = [
  "Message us in the CommBank app or call 13 2221. Business customers call 13 1998 and select option 4.",
  "Change your passwords immediately if you have shared any personal or banking details.",
  "Report a card lost or stolen and order a replacement.",
  "Forward hoax emails and SMS to us, then delete them.",
  "Never access your banking from a link in a message — always use the app or type our address.",
];

export function SecurityPage() {
  useDocumentTitle("CommBank Safe — scams & fraud");
  const securityFaqs = faqs
    .filter((faq) => faq.category === "Security")
    .map((faq) => ({ id: faq.id, title: faq.question, content: <p>{faq.answer}</p> }));
  const alerts = articles.filter((article) => article.category === "Security");

  return (
    <PageLayout>
      <Breadcrumb
        items={[{ label: "Help & support", to: "/support" }, { label: "CommBank Safe" }]}
      />
      <PageHero
        tone="dark"
        eyebrow="CommBank Safe"
        title="Scams, fraud and security"
        intro="We will never ask you to move money to a 'safe account'. If something feels wrong, hang up and contact us using the details on our site or in the CommBank app."
      >
        <ButtonLink to="/support/contact-us" variant="primary">
          Report a scam
        </ButtonLink>
        <ButtonLink to="/support" variant="secondary">
          Search support
        </ButtonLink>
      </PageHero>

      <Section title="How we protect you">
        <ul className="grid gap-4 sm:grid-cols-2">
          {protections.map((item) => (
            <li key={item.title} className="rounded-cba-lg border border-line-soft p-6">
              <h3 className="text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="tint" title="If you think you've been scammed">
        <ol className="grid gap-3">
          {ifScammed.map((step, index) => (
            <li key={step} className="flex gap-4 rounded-cba-lg bg-surface p-5 shadow-cba">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-critical text-sm font-extrabold text-surface">
                {index + 1}
              </span>
              <p className="text-[15px] leading-relaxed text-ink-soft">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Latest scam and security alerts">
        <ul className="grid gap-4 md:grid-cols-2">
          {alerts.map((alert) => (
            <li key={alert.slug} className="rounded-cba-lg border border-line-soft p-6">
              <Badge tone="critical">Alert</Badge>
              <h3 className="mt-3 text-lg font-bold text-ink">{alert.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{alert.standfirst}</p>
              <p className="mt-3 text-[13px] text-ink-faint">
                Published {formatDateLong(alert.published)}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="tint" title="Security FAQs">
        <Accordion items={securityFaqs} />
      </Section>

      <HelpBlock />
    </PageLayout>
  );
}
