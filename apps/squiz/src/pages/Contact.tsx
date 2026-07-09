import { Mail, MapPin, MessageSquareText } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ContactForm } from "@/components/shared/ContactForm";
import { offices } from "@/data/company";

const channels = [
  {
    icon: Mail,
    title: "Sales",
    copy: "New to Squiz? The form is the fastest route to the right regional team.",
  },
  {
    icon: MessageSquareText,
    title: "Support",
    copy: "Customers get 24/7 support through the My Squiz portal (simulated in this demo).",
  },
  {
    icon: MapPin,
    title: "Offices",
    copy: "Six hubs across Australia, New Zealand, the UK, and the US.",
  },
];

export function ContactPage() {
  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Contact us" }]} />
      <PageHero
        eyebrow="Contact"
        title="Talk to us"
        copy="Sales, support, partnerships, careers — start here and we'll route you to the right humans."
      />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            {channels.map(({ icon: ChannelIcon, title, copy }) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-cream-deep bg-card p-6 shadow-card">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mint-tint text-navy">
                  <ChannelIcon className="size-5" aria-hidden />
                </span>
                <div>
                  <h2 className="font-semibold text-navy">{title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{copy}</p>
                </div>
              </div>
            ))}
            <div className="rounded-2xl border border-cream-deep bg-card p-6 shadow-card">
              <h2 className="font-semibold text-navy">Our offices</h2>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-ink-soft">
                {offices.map((o) => (
                  <li key={o.city}>
                    <span className="font-medium text-navy">{o.city}</span>, {o.country}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ContactForm
            heading="Send us a message"
            submitLabel="Send message"
            successTitle="Message received"
            successCopy="Thanks for reaching out. In a real deployment the regional team would reply within one business day."
          />
        </div>
      </section>
    </PageLayout>
  );
}
