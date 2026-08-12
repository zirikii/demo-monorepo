import { testimonials } from "@/data/testimonials";

export function TestimonialStrip() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {testimonials.map((t) => (
        <blockquote key={t.name} className="rounded-eh-lg border border-line bg-white p-6 shadow-eh">
          <p className="text-[15px] leading-relaxed text-ink">“{t.quote}”</p>
          <footer className="mt-4 text-sm">
            <div className="font-semibold text-ink">{t.name}</div>
            <div className="text-ink-faint">{t.role}</div>
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
