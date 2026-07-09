import { Quote } from "lucide-react";
import { homeTestimonial } from "@/data/company";

export function TestimonialBand() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
      <figure className="relative rounded-3xl bg-cream-alt p-8 sm:p-12">
        <Quote className="absolute -top-5 left-8 size-10 rounded-xl bg-mint p-2 text-navy" aria-hidden />
        <blockquote className="text-xl font-medium leading-relaxed text-navy sm:text-2xl">
          “{homeTestimonial.text}”
        </blockquote>
        <figcaption className="mt-6 text-sm text-ink-soft">
          <span className="font-semibold text-navy">{homeTestimonial.name}</span> —{" "}
          {homeTestimonial.role}, {homeTestimonial.company}
        </figcaption>
      </figure>
    </section>
  );
}
