import { Check, Monitor, Smartphone } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, SectionHeading } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { HelpSection } from "@/components/marketing/HelpSection";
import { FeedbackBar } from "@/components/marketing/FeedbackBar";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const channels = [
  {
    Icon: Smartphone,
    title: "CommBank app",
    description:
      "Where you can get a big-picture overview of your finances and explore all the day-to-day details too.",
    to: "/digital-banking/app",
    cta: "Explore the app",
  },
  {
    Icon: Monitor,
    title: "NetBank",
    description:
      "A secure, online place for you to manage your finances, best accessed on your laptop or desktop.",
    to: "/digital-banking/netbank",
    cta: "Get familiar with NetBank",
  },
];

export function DigitalBankingPage() {
  useDocumentTitle("Digital banking");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Digital banking" }]} />
      <PageHero
        eyebrow="Digital banking"
        title="Access, track and manage your money wherever you are"
        description="From banking on the go in the CommBank app, to completing more complex tasks in NetBank and paying with your digital wallet."
      />

      <section className="py-16">
        <div className="container-page">
          <SectionHeading title="Two ways to bank online" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {channels.map(({ Icon, title, description, to, cta }) => (
              <Card key={title}>
                <Icon aria-hidden="true" className="mb-3 h-7 w-7 text-black" />
                <h3 className="text-xl font-bold text-black">{title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{description}</p>
                <div className="mt-5">
                  <ButtonLink to={to}>{cta}</ButtonLink>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface-tint py-16">
        <div className="container-page">
          <SectionHeading title="How-to guides" />
          <Accordion
            className="mt-8"
            items={[
              {
                id: "digital-wallet",
                title: "Set up a digital wallet",
                content:
                  "Link an eligible CommBank debit or credit card to Apple Pay, Google Pay or Samsung Pay, or tap and pay directly from the CommBank app on an eligible Android device.",
              },
              {
                id: "netcode",
                title: "Register for NetCode",
                content:
                  "NetCode adds a layer of security to higher-risk activity such as adding a new payee. Choose SMS to your registered mobile, or generate a code in the CommBank app.",
              },
              {
                id: "quick-links",
                title: "Customise NetBank Quick Links",
                content:
                  "Customising Quick Links on your NetBank homepage makes it faster to reach the sections you use most, like transfers, BPAY and statements.",
              },
              {
                id: "ceba",
                title: "Get help from Ceba",
                content:
                  "Ceba is our digital banking assistant. Ask a question in the app or NetBank and Ceba can help with hundreds of common tasks, or connect you to a specialist.",
              },
            ]}
          />
        </div>
      </section>

      <FeedbackBar />
      <HelpSection />
      <ThingsYouShouldKnow>
        <p>NetBank access with NetCode SMS is required in the real world. This is a demo.</p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}

const netbankBasics = [
  "See your everyday account balance",
  "Check statements and transactions",
  "Transfer money to someone or between your accounts",
  "Find your nearest ATM or branch",
  "Update your personal details",
  "Get support from Ceba, your digital banking assistant",
];

const netbankPayments = [
  "Make one-off or recurring payments with BPAY",
  "Get bills sent straight to NetBank with alerts and reminders",
  "Set up credit card AutoPay",
  "Send money to more than 200 countries in over 30 currencies",
];

const netbankCards = [
  "Activate your Debit Mastercard or credit card and choose a PIN",
  "Change your credit limit",
  "Amend your daily limit",
  "Lock, Block, Limit your credit card",
];

export function NetBankInfoPage() {
  useDocumentTitle("NetBank");

  return (
    <PageLayout>
      <Breadcrumb
        items={[{ label: "Digital banking", to: "/digital-banking" }, { label: "NetBank" }]}
      />
      <PageHero
        eyebrow="NetBank"
        title="Do your day-to-day banking from your laptop or desktop"
        description="NetBank is simple and secure. Register for NetBank to get started, or log on with your client number and password."
        actions={
          <>
            <ButtonLink to="/logon" variant="secondary" size="lg">
              Log on to NetBank
            </ButtonLink>
            <ButtonLink to="/register" variant="outline" size="lg">
              Register for NetBank
            </ButtonLink>
          </>
        }
      />

      <section className="py-16">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          {[
            { heading: "All the basics. In one place", items: netbankBasics },
            { heading: "Pay bills and send money", items: netbankPayments },
            { heading: "Manage your cards", items: netbankCards },
          ].map((group) => (
            <div key={group.heading} className="border-t-2 border-black pt-5">
              <h2 className="text-lg font-bold text-black">{group.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-ink-soft">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-positive" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface-tint py-16">
        <div className="container-page">
          <SectionHeading
            title="What you'll need to register"
            description="You can start using NetBank straight away if you already have your client number and password."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              "Your CommBank card, or your existing NetBank client number and password",
              "A valid email address and mobile phone number",
              "If you don't bank with us yet, open an Everyday account in under 5 minutes",
            ].map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-line bg-surface p-6 text-sm text-ink-soft"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FeedbackBar />
      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          The NetBank in this demo is a mock. Any client number and password are accepted, and all
          accounts, balances and transactions are fabricated and stored only in your browser.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}

const appFeatures = [
  {
    title: "Cardless Cash",
    description:
      "Request cash in the app, then enter the code and PIN at a CommBank ATM to withdraw without your card.",
  },
  {
    title: "Lock, Block, Limit",
    description:
      "Lock a card instantly, block transaction types like overseas or online purchases, and set your own limits.",
  },
  {
    title: "CallerCheck",
    description:
      "We send a notification you can approve, so you know an inbound call is really from us.",
  },
  {
    title: "NameCheck",
    description:
      "We compare the account name you enter against the details we hold and warn you if it doesn't look right.",
  },
  {
    title: "Benefits finder",
    description: "Find rebates, concessions and government benefits you may be eligible for.",
  },
  {
    title: "Spend tracker",
    description: "See where your money goes each month, categorised automatically.",
  },
];

export function CommBankAppPage() {
  useDocumentTitle("CommBank app");

  return (
    <PageLayout>
      <Breadcrumb
        items={[{ label: "Digital banking", to: "/digital-banking" }, { label: "CommBank app" }]}
      />
      <PageHero
        eyebrow="CommBank app"
        title="Australia's best banking app"
        description="Bank on the go, tap and pay from your phone or watch, and get help from Ceba 24/7."
        actions={
          <ButtonLink to="/register" variant="secondary" size="lg">
            Get started
          </ButtonLink>
        }
      />

      <section className="py-16">
        <div className="container-page">
          <SectionHeading title="What you can do in the app" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {appFeatures.map((feature) => (
              <Card key={feature.title}>
                <h3 className="text-base font-bold text-black">{feature.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FeedbackBar />
      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          There is no real mobile app in this demo. These pages exist to mirror the structure of
          commbank.com.au.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
