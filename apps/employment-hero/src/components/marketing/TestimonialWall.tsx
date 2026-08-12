import { Quote } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { testimonials } from "@/data/site";

export function TestimonialWall({ limit = 4 }: { limit?: number }) {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2">
      {testimonials.slice(0, limit).map((item) => (
        <figure
          key={item.author}
          className="flex flex-col justify-between rounded-eh-lg border border-eh-line bg-white p-7"
        >
          <Quote size={26} className="text-eh-purple-soft" aria-hidden="true" />
          <blockquote className="mt-4 text-lg leading-relaxed text-eh-ink">
            “{item.quote}”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <Avatar name={item.author} />
            <span className="text-sm">
              <span className="block font-semibold text-eh-ink">{item.author}</span>
              <span className="block text-eh-ink-faint">
                {item.role}, {item.company}
              </span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
