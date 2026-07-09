import { CalendarClock, ListChecks, Users } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ContactForm } from "@/components/shared/ContactForm";

const expectations = [
  {
    icon: CalendarClock,
    title: "30 minutes, no slides",
    copy: "A working conversation about your digital estate — not a pitch deck.",
  },
  {
    icon: Users,
    title: "The right expert",
    copy: "You'll meet someone who knows your sector: education, government, health, finance, or utilities.",
  },
  {
    icon: ListChecks,
    title: "A concrete next step",
    copy: "You leave with a scoped recommendation — even if the recommendation isn't us.",
  },
];

export function BookACallPage() {
  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Book a call" }]} />
      <PageHero
        eyebrow="Book a call"
        title="Start your DXP journey"
        copy="A 30-minute chat with an expert helps you scope your first next step."
      />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            {expectations.map(({ icon: ItemIcon, title, copy }) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-cream-deep bg-card p-6 shadow-card">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mint-tint text-navy">
                  <ItemIcon className="size-5" aria-hidden />
                </span>
                <div>
                  <h2 className="font-semibold text-navy">{title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{copy}</p>
                </div>
              </div>
            ))}
          </div>
          <ContactForm
            heading="Book your call"
            submitLabel="Request a time"
            successTitle="Request received"
            successCopy="Thanks! In a real deployment you'd receive a calendar link within the hour. This demo stops here."
          />
        </div>
      </section>
    </PageLayout>
  );
}
