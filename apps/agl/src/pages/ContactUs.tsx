import { MessageCircle, Phone, TriangleAlert } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { telHref } from "@/lib/format";

const numbers = [
  { label: "General enquiries", phone: "131 245", hours: "Mon–Fri 8am–8pm, Sat 9am–5pm AEST" },
  { label: "Staying Connected (hardship)", phone: "1300 659 925", hours: "Mon–Fri 8am–6pm AEST" },
  { label: "Life support customers", phone: "131 245", hours: "24/7 — select the life support option" },
  { label: "Business customers", phone: "133 835", hours: "Mon–Fri 8am–6pm AEST" },
  { label: "National Relay Service", phone: "133 677", hours: "Then ask for 1300 664 358" },
  { label: "Interpreter service", phone: "131 450", hours: "Ask for AGL on 131 245" },
];

export function ContactUsPage() {
  useDocumentTitle("Contact us");
  const { open } = useAssistant();
  return (
    <PageLayout>
      <PageHero crumbs={[{ label: "Contact us" }]} title="Contact us" intro="The quickest way to get help is the AGL Assistant — it's available 24/7 and can hand you to our team." />
      <Section>
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-agl-lg bg-agl-navy p-6 text-white lg:row-span-2">
            <MessageCircle className="h-8 w-8 text-ray-light" aria-hidden="true" />
            <h2 className="mt-3 text-2xl font-extrabold">Chat or talk to us</h2>
            <p className="mt-2 text-white/80">Pay a bill, change your details, move house or troubleshoot your nbn® — any time of day.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button variant="white" onClick={() => open()}>
                Start a chat
              </Button>
              <Button variant="ghost" className="text-white ring-1 ring-white/30 hover:bg-white/10" onClick={() => open({ mode: "voice" })}>
                Talk to us
              </Button>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
            {numbers.map((n) => (
              <li key={n.label} className="rounded-agl-lg border border-line-soft p-5">
                <p className="font-bold text-ink">{n.label}</p>
                <a href={telHref(n.phone)} className="mt-1 inline-flex items-center gap-2 text-xl font-extrabold text-agl-blue hover:underline">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {n.phone}
                </a>
                <p className="text-sm text-ink-faint">{n.hours}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <Section tone="tint" id="complaints" title="Complaints">
        <p className="max-w-3xl text-ink-soft">
          If we haven’t resolved your concern, ask the assistant to connect you to our team and choose “make a complaint”. If you’re still
          not satisfied you can contact the energy ombudsman in your state.
        </p>
        <p className="mt-4 flex items-center gap-2 font-bold text-critical">
          <TriangleAlert className="h-5 w-5" aria-hidden="true" /> In an emergency, call 000.
        </p>
      </Section>
    </PageLayout>
  );
}
