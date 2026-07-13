import { Link } from "react-router-dom";
import { happenings } from "@/data/happenings";
import { Badge } from "../ui/Badge";

export function HappeningsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-ink-deep sm:text-3xl">What’s Happening</h2>
          <p className="mt-1 text-sm text-ink-soft">Events, promotions, and deals across Changi and Jewel.</p>
        </div>
        <Link to="/happenings" className="hidden text-sm font-bold text-purple hover:underline sm:inline">
          View all
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {happenings.map((item, idx) => (
          <Link
            key={item.id}
            to={item.href}
            className="group overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-shadow hover:shadow-card animate-fade-up"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <div className="aspect-[16/9] overflow-hidden bg-surface">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="space-y-2 p-5">
              <Badge tone="purple">{item.tag}</Badge>
              <h3 className="text-lg font-black text-ink-deep group-hover:text-purple">{item.title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{item.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
