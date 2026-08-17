import { Quote } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({ quote, name, role }: Testimonial) {
  return (
    <Card className="flex h-full flex-col gap-5">
      <Quote aria-hidden className="h-7 w-7 text-h24-tint-strong" />
      <blockquote className="flex-1 text-[1.05rem] leading-relaxed text-ink">{quote}</blockquote>
      <footer className="text-sm">
        <p className="font-semibold text-ink-strong">{name}</p>
        <p className="text-ink-faint">{role}</p>
      </footer>
    </Card>
  );
}
