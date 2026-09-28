import { CalendarCheck, House, PlugZap, Truck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Section } from "@/components/ui/Section";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const steps = [
  { Icon: House, title: "Tell us your new address", body: "We'll check which services are available there." },
  { Icon: CalendarCheck, title: "Pick your move-in date", body: "Book at least 2 business days ahead to avoid same-day fees." },
  { Icon: PlugZap, title: "We connect you", body: "Our Power On Guarantee means the lights are on when you arrive." },
  { Icon: Truck, title: "We close your old account", body: "Your final bill arrives within 10 business days." },
];

export function MovingHousePage() {
  useDocumentTitle("Moving house");
  const { open } = useAssistant();
  return (
    <PageLayout>
      <PageHero
        crumbs={[{ label: "Moving house" }]}
        eyebrow="Moving house"
        title="Move your energy, internet and mobile in minutes"
        intro="Get a $100 credit when you move with AGL online. We'll connect your new home and disconnect the old one."
        actions={
          <>
            <Button onClick={() => open({ step: "moving", label: "I'm moving house" })}>Start my move</Button>
            <Button variant="secondary" onClick={() => open({ step: "moving", label: "I'm moving house", mode: "voice" })}>
              Talk it through
            </Button>
          </>
        }
      />
      <Section title="How moving with AGL works">
        <ol className="grid gap-5 md:grid-cols-4">
          {steps.map(({ Icon, title, body }, i) => (
            <li key={title} className="rounded-agl-lg border border-line-soft p-6">
              <span className="text-sm font-extrabold text-agl-teal-ink">Step {i + 1}</span>
              <Icon className="mt-2 h-8 w-8 text-agl-blue" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-extrabold text-ink">{title}</h2>
              <p className="mt-1 text-ink-soft">{body}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="tint" title="Moving FAQs">
        <Accordion
          items={[
            { id: "fees", title: "Are there connection fees?", content: "Your distributor may charge a connection fee, which appears on your first bill. Same-day connections cost more." },
            { id: "notice", title: "How much notice do you need?", content: "At least 2 business days for electricity and gas. nbn® connections can take up to 10 business days for a new line." },
            { id: "meter", title: "Do I need to be home?", content: "Not usually. Make sure your meter is accessible and unlock gates or pets on the day." },
          ]}
        />
      </Section>
    </PageLayout>
  );
}
