import { Quote } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import type { Testimonial } from "@/data/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="flex h-full flex-col gap-5">
      <Quote aria-hidden className="h-7 w-7 text-eh-violet-soft" />
      <blockquote className="flex-1 text-[1.05rem] leading-relaxed font-medium text-ink-strong">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-line-soft pt-4">
        <Avatar name={testimonial.name} />
        <span className="flex flex-col">
          <span className="text-sm font-bold text-ink-strong">{testimonial.name}</span>
          <span className="text-sm text-ink-faint">
            {testimonial.role}, {testimonial.company}
          </span>
        </span>
      </figcaption>
    </Card>
  );
}
