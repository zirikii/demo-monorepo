import { AlertTriangle, BellRing, Eye, Fingerprint, Lock, PhoneCall } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, SectionHeading } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { HelpSection } from "@/components/marketing/HelpSection";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const protections = [
  {
    Icon: Eye,
    title: "NameCheck",
    description:
      "We compare the account name you enter against the details we hold and warn you before you send money if it doesn't look right.",
  },
  {
    Icon: PhoneCall,
    title: "CallerCheck",
    description:
      "We send a notification in the app you can approve, so you know an inbound call is really from us.",
  },
  {
    Icon: Lock,
    title: "Lock, Block, Limit",
    description:
      "Lock a card instantly, block overseas or online transactions, and set your own spending limits.",
  },
  {
    Icon: BellRing,
    title: "Real-time alerts",
    description:
      "Get notified the moment a transaction happens so unusual activity doesn't go unnoticed.",
  },
  {
    Icon: Fingerprint,
    title: "NetCode",
    description:
      "A one-time code confirms higher-risk activity like adding a new payee or changing your details.",
  },
  {
    Icon: AlertTriangle,
    title: "24/7 fraud monitoring",
    description:
      "Our systems monitor for unusual patterns around the clock and can stop a payment before it leaves.",
  },
];

const scamSigns = [
  {
    id: "urgency",
    title: "Urgency and pressure",
    content:
      "Scammers create a deadline so you act before you think. A genuine bank will never rush you into moving money.",
  },
  {
    id: "credentials",
    title: "Requests for your password or NetCode",
    content:
      "We will never ask for your NetBank password, NetCode, or the full number on your card. Anyone who does is not us.",
  },
  {
    id: "new-account",
    title: "Asking you to move money to a 'safe' account",
    content:
      "There is no such thing as a safe account. This is one of the most common ways money is stolen.",
  },
  {
    id: "remote-access",
    title: "Asking to install remote-access software",
    content:
      "Never install screen-sharing or remote-access software at the request of an unexpected caller.",
  },
];

export function SecurityPage() {
  useDocumentTitle("Security & scams");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Security & scams" }]} />
      <PageHero
        eyebrow="CommBank Safe"
        title="How we help keep you safe"
        description="More than $900 million invested in scam, fraud and cyber protection — and the tools you need to protect yourself."
        tone="black"
      />

      <section className="py-16">
        <div className="container-page">
          <SectionHeading title="Protections built into your banking" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {protections.map(({ Icon, title, description }) => (
              <Card key={title}>
                <Icon aria-hidden="true" className="mb-3 h-6 w-6 text-black" />
                <h3 className="text-base font-bold text-black">{title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface-tint py-16">
        <div className="container-page">
          <SectionHeading
            title="Know the signs of a scam"
            description="If something feels off, stop and check. It's always fine to hang up and call us back on a number you've looked up yourself."
          />
          <Accordion className="mt-8" items={scamSigns} />
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <Card className="border-2 border-alert">
            <h2 className="text-xl font-bold text-black">Think you&apos;ve been scammed?</h2>
            <ol className="mt-4 space-y-2 text-sm text-ink-soft">
              <li>1. Lock your cards immediately in the CommBank app.</li>
              <li>2. Call us on 13 2221 and choose the fraud option.</li>
              <li>3. Forward suspicious texts and emails to hoax@cba.com.au.</li>
              <li>4. Change any password you may have shared.</li>
            </ol>
          </Card>
        </div>
      </section>

      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          Security guidance here mirrors CommBank&apos;s published advice for realism, but this is a
          demo application with no real accounts, money or fraud monitoring.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
