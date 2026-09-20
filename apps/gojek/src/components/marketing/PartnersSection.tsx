import { ArrowRight, Bike, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { formatCompact } from "@/lib/format";

const cards = [
  {
    icon: Bike,
    to: "/drivers",
    accent: "text-transport",
    ring: "group-hover:border-transport",
    count: 3_000_000,
    kicker: "driver-partners",
    title: "Be a Gojek driver",
    body: "We're home to 3 million driver-partners. Enjoy flexibility, sustainable income and exclusive benefit programs.",
    cta: "Start driving",
  },
  {
    icon: Store,
    to: "/merchants",
    accent: "text-business",
    ring: "group-hover:border-business",
    count: 6_400_000,
    kicker: "merchant-partners",
    title: "Grow as a merchant",
    body: "We empower 6.4 million merchants within the GoTo ecosystem with technology that helps their businesses grow.",
    cta: "Become a merchant",
  },
];

export function PartnersSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.to}
                to={card.to}
                className="group flex flex-col rounded-3xl border border-line bg-card p-8 transition-all hover:shadow-card sm:p-10"
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-line ${card.ring} ${card.accent} transition-colors`}
                >
                  <Icon aria-hidden="true" className="h-7 w-7" />
                </span>
                <p className="mt-6 text-4xl font-extrabold tracking-tight text-ink">
                  {formatCompact(card.count)}
                </p>
                <p className="text-sm font-semibold uppercase tracking-wide text-ink-faint">
                  {card.kicker}
                </p>
                <h3 className="mt-4 text-2xl font-bold text-ink">{card.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{card.body}</p>
                <span className={`mt-6 inline-flex items-center gap-2 text-sm font-bold ${card.accent}`}>
                  {card.cta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
