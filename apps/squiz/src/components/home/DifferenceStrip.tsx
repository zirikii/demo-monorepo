import { Handshake, Search, UserRound, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  {
    icon: Zap,
    title: "Marketers work independently",
    copy: "Launch pages, campaigns, and tests without a developer queue — governance keeps it safe.",
  },
  {
    icon: UserRound,
    title: "Personalization at scale",
    copy: "Unified audience data drives tailored journeys across every site in your portfolio.",
  },
  {
    icon: Search,
    title: "Discovered everywhere",
    copy: "On-site, on Google, and inside AI assistants — your content stays findable and quotable.",
  },
  {
    icon: Handshake,
    title: "A true partnership",
    copy: "From first demo to year-ten optimization, our team stays engaged in your results.",
  },
];

export function DifferenceStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeading eyebrow="Why Squiz" title="The Squiz DXP difference" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {points.map(({ icon: PointIcon, title, copy }) => (
          <div
            key={title}
            className="rounded-2xl border border-cream-deep bg-card p-6 shadow-card transition-shadow hover:shadow-float"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-mint-tint text-navy">
              <PointIcon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-navy">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
