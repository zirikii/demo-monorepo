import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Deals" };

const deals = [
  {
    title: "Travel Packs from $29",
    body: "Stay connected for up to three months with prepaid Travel SIMs — in store only.",
    href: "/travel-packs",
  },
  {
    title: "Team Up save up to 35%",
    body: "Link 4+ eligible Endless plans on the same account for multi-line savings.",
    href: "/mobile-plans",
  },
  {
    title: "Wireless broadband promo",
    body: "Join Wireless Broadband and get $20 off per month for 12 months (demo offer).",
    href: "/broadband",
  },
  {
    title: "Entertainment perks",
    body: "Unlock Netflix, Spotify Premium, NEON and more on eligible plans.",
    href: "/entertainment",
  },
];

export default function DealsPage() {
  return (
    <div className="container py-14">
      <h1 className="text-4xl font-bold text-spark-ink">Deals</h1>
      <p className="mt-4 text-spark-ink/80">Current demo promotions for visitors and movers.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {deals.map((deal) => (
          <Link
            key={deal.title}
            href={deal.href}
            className="rounded-lg border border-line bg-surface-subtle p-6 transition hover:border-spark-purple"
          >
            <h2 className="text-xl font-bold text-spark-ink">{deal.title}</h2>
            <p className="mt-3 text-sm text-spark-ink/80">{deal.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
