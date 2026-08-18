import { AlertTriangle, PhoneOff, ShieldCheck } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/data/site";

export default function ScamAlertPage() {
  return (
    <PageLayout title="Scam alert">
      <PageHero
        eyebrow="Security"
        title="Scam alert"
        body="Please be aware of scammers falsely impersonating HUB24 representatives. HUB24 will never contact you regarding potential investment opportunities."
        crumbs={[{ label: "Home", to: "/" }, { label: "Scam alert" }]}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="flex flex-col gap-3">
            <PhoneOff aria-hidden className="h-7 w-7 text-critical" />
            <h2 className="text-xl font-extrabold tracking-tight text-ink-strong">
              What we never do
            </h2>
            <CheckList
              items={[
                "Cold call you about investment opportunities",
                "Ask you to transfer money to a new account",
                "Request your password or one-time code",
                "Create urgency or threaten account closure",
              ]}
            />
          </Card>
          <Card className="flex flex-col gap-3">
            <ShieldCheck aria-hidden className="h-7 w-7 text-positive" />
            <h2 className="text-xl font-extrabold tracking-tight text-ink-strong">
              What legitimate contact looks like
            </h2>
            <CheckList
              items={[
                "Reference to your existing account and adviser",
                "No pressure to act within hours",
                "Requests made through your adviser, not directly",
                "Published phone numbers you can verify",
              ]}
            />
          </Card>
          <Card className="flex flex-col gap-3">
            <AlertTriangle aria-hidden className="h-7 w-7 text-caution" />
            <h2 className="text-xl font-extrabold tracking-tight text-ink-strong">
              If you&rsquo;re unsure
            </h2>
            <p className="text-ink-soft">
              Stop and contact your adviser, or call the published investor line directly. Do not
              use contact details supplied in the suspicious message.
            </p>
            <a
              href={`tel:${SITE.phones.investors.replace(/\s/g, "")}`}
              className="focus-hub text-xl font-extrabold text-hub-blue"
            >
              {SITE.phones.investors}
            </a>
          </Card>
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="Reporting"
          title="Reporting a suspected scam"
          body="If you believe you have been targeted, contact your adviser immediately and report the incident to Scamwatch. If you have shared banking details, contact your bank straight away."
        />
        <p className="mt-6 text-sm text-ink-faint">
          This is an unofficial demonstration page. For real scam guidance, use the actual HUB24
          website and Australian government resources.
        </p>
      </Section>
    </PageLayout>
  );
}
