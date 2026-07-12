import { Accessibility, Phone, Mail, MessageCircle, Smartphone, Search } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqSection } from "@/components/shared/FaqSection";
import { helpFaqs } from "@/data/faqs";

const assistanceTopics = [
  { icon: Accessibility, title: "Special assistance", copy: "Request wheelchair support, mobility help and accessible services." },
  { icon: Search, title: "Lost & found", copy: "Report or recover misplaced belongings across the terminals and Jewel." },
  { icon: Smartphone, title: "Changi App", copy: "Track flights, navigate the terminals and manage your rewards on the go." },
];

const contacts = [
  { icon: Phone, label: "Call us", value: "+65 6595 6868 (24 hours)" },
  { icon: MessageCircle, label: "Live chat", value: "In the Changi App, daily 8am–10pm" },
  { icon: Mail, label: "Email", value: "help@changiairport.demo" },
];

export function HelpPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="App & Help"
        title="We're here to help"
        copy="Find assistance, download the Changi App and reach our team whenever you need us."
        crumbs={[{ label: "Home", to: "/" }, { label: "Help" }]}
      />

      <section className="bg-sand py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Assistance" title="How can we assist you?" className="mb-12" />
          <div className="grid gap-6 sm:grid-cols-3">
            {assistanceTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <div key={topic.title} className="rounded-card border border-sand-deep bg-card p-7 shadow-card">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-badge-purple text-magenta">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{topic.copy}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {contacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <div
                  key={contact.label}
                  className="flex items-start gap-4 rounded-card border border-sand-deep bg-card p-6 shadow-card"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-badge-amber text-amber-700">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{contact.label}</p>
                    <p className="mt-1 text-sm text-ink-soft">{contact.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FaqSection faqs={helpFaqs} />
    </PageLayout>
  );
}
