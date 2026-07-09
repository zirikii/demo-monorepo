import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { rotatingIndustryBadges } from "@/data/personas";

/** Marquee of industry pills, echoing squiz.net's rotating badges section. */
export function IndustryBadges() {
  const doubled = [...rotatingIndustryBadges, ...rotatingIndustryBadges];
  return (
    <section className="overflow-hidden py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Industries"
          title="Powerful solutions for service-led industries"
          copy={
            <>
              Purpose-built for organizations where digital is the front door to real services.{" "}
              <Link to="/industries" className="font-semibold text-navy underline underline-offset-4">
                Explore all industries
              </Link>
            </>
          }
        />
      </div>
      <div className="relative mt-12">
        <div className="flex w-max animate-marquee gap-4 motion-reduce:animate-none" aria-hidden="false">
          {doubled.map((label, i) => (
            <span
              key={`${label}-${i}`}
              aria-hidden={i >= rotatingIndustryBadges.length}
              className="whitespace-nowrap rounded-full border border-navy/15 bg-card px-6 py-3 font-heading text-lg font-medium text-navy shadow-card"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
