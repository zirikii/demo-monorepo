import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { audienceCards } from "@/data/site";

export function AudienceGrid() {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {audienceCards.map((card) => (
        <Link
          key={card.eyebrow}
          to={card.to}
          className="focus-eh group flex flex-col justify-between rounded-eh-lg border border-eh-line bg-white p-7 transition hover:-translate-y-1 hover:border-eh-purple hover:shadow-eh-lift"
        >
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-eh-purple uppercase">
              {card.eyebrow}
            </p>
            <h3 className="mt-4 font-display text-2xl leading-snug font-bold text-eh-ink">
              {card.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-eh-ink-soft">{card.body}</p>
          </div>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-eh-purple">
            Learn more
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  );
}
