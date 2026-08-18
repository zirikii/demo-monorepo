import { Quote } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

interface TestimonialProps {
  body: string;
  name: string;
  role: string;
}

export function Testimonial({ body, name, role }: TestimonialProps) {
  return (
    <figure className="flex flex-col gap-5 rounded-hub-lg border border-line bg-white p-7 shadow-hub">
      <Quote aria-hidden className="h-7 w-7 text-hub-teal" />
      <blockquote className="text-lg leading-relaxed text-ink">{body}</blockquote>
      <figcaption className="flex items-center gap-3">
        <Avatar name={name} />
        <span className="flex flex-col">
          <span className="font-bold text-ink-strong">{name}</span>
          <span className="text-sm text-ink-faint">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
