import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, MessageSquare, Monitor, Phone } from "lucide-react";
import { helpCards } from "@/data/site";

const icons = {
  book: CalendarCheck,
  manage: Monitor,
  contact: Phone,
  message: MessageSquare,
} as const;

/** The "We're here to help" block that closes most commbank.com.au pages. */
export function HelpBlock() {
  return (
    <section className="bg-surface-tint py-12 sm:py-16">
      <div className="container-cba">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          We&rsquo;re here to help
          <span aria-hidden="true" className="mt-2 block h-1 w-16 bg-cba-yellow" />
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {helpCards.map((card) => {
            const Icon = icons[card.id as keyof typeof icons] ?? MessageSquare;
            return (
              <Link
                key={card.id}
                to={card.to}
                className="focus-cba group flex h-full flex-col rounded-cba-lg bg-surface p-6 shadow-cba transition-shadow hover:shadow-cba-lift"
              >
                <Icon aria-hidden="true" className="h-7 w-7 text-ink" />
                <h3 className="mt-4 text-base font-bold text-ink">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{card.body}</p>
                <ArrowRight
                  aria-hidden="true"
                  className="mt-4 h-4 w-4 text-ink transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
