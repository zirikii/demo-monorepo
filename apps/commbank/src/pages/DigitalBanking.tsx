import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { LinkCard } from "@/components/ui/Card";
import { faqs } from "@/data/faqs";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const channels = [
  {
    to: "/digital-banking/app",
    title: "CommBank app",
    body: "Making your day-to-day simple, quick and secure — paying someone, transferring money, managing your cards and bills, all on the go.",
  },
  {
    to: "/digital-banking/netbank",
    title: "NetBank",
    body: "A secure online place to manage your finances, best accessed on your laptop or desktop, where you can get the big picture and the details.",
  },
  {
    to: "/digital-banking#wallets",
    title: "Digital wallets & wearables",
    body: "Use your compatible phone or wearable to make secure, cashless payments wherever you are.",
  },
  {
    to: "/business#commbiz",
    title: "Other apps",
    body: "CommSec mobile for trading on the go, and CommBiz for managing business banking on your iPhone or iPad.",
  },
];

export function DigitalBankingPage() {
  useDocumentTitle("Digital banking");
  const digitalFaqs = faqs
    .filter((faq) => faq.category === "Digital banking")
    .map((faq) => ({ id: faq.id, title: faq.question, content: <p>{faq.answer}</p> }));

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Digital banking" }]} />
      <PageHero
        eyebrow="Digital banking"
        title="Bank on your terms, wherever you are"
        intro="Our award-winning digital technology gives you the flexibility to access, track and manage your money on a range of devices."
      >
        <ButtonLink to="/login" variant="dark">
          Log on to NetBank
        </ButtonLink>
        <ButtonLink to="/digital-banking/app" variant="secondary">
          Explore the app
        </ButtonLink>
      </PageHero>

      <Section title="Ways to bank">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel) => (
            <LinkCard
              key={channel.title}
              to={channel.to}
              title={channel.title}
              body={channel.body}
            />
          ))}
        </div>
      </Section>

      <Section id="wallets" tone="tint" title="Digital wallets and wearables">
        <p className="max-w-3xl text-[17px] leading-relaxed text-ink-soft">
          Use the CommBank app to tap and pay, or choose from our range of digital wallets — Apple
          Pay, Google Pay or Samsung Pay. Link your eligible CommBank debit or credit card and pay
          with your phone or wearable.
        </p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {["Apple Pay", "Google Pay", "Samsung Pay", "Garmin Pay", "Fitbit Pay"].map((wallet) => (
            <li
              key={wallet}
              className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-bold text-ink"
            >
              {wallet}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="payid" title="PayID, Osko and BPAY">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "PayID",
              body: "Let people pay you with your mobile number or email instead of a BSB and account number.",
            },
            {
              title: "Osko",
              body: "Send and receive eligible payments in under a minute, any time of day.",
            },
            {
              title: "BPAY",
              body: "Pay bills, schedule recurring payments and receive bills straight into NetBank with BPAY View.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-cba-lg border border-line-soft p-6">
              <h3 className="text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="tint" title="ATMs — not just cash machines">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Check your balance",
            "Deposit money, instantly",
            "Transfer money between accounts",
            "Touchscreen and audio-enabled",
          ].map((item) => (
            <li
              key={item}
              className="rounded-cba-lg bg-surface p-5 text-[15px] font-bold text-ink shadow-cba"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Digital banking FAQs">
        <Accordion items={digitalFaqs} />
      </Section>

      <HelpBlock />
    </PageLayout>
  );
}
