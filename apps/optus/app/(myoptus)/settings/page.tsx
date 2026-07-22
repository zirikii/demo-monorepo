import Link from "next/link";
import { CreditCard, Puzzle, User, Users } from "lucide-react";

const CARDS = [
  { href: "/settings/account", icon: CreditCard, title: "Account", body: "Billing details and payment methods." },
  { href: "/settings/profile", icon: User, title: "Profile", body: "Your name, contact and preferences." },
  { href: "/settings/team", icon: Users, title: "Team", body: "Manage who can access this account." },
  { href: "/settings/integrations", icon: Puzzle, title: "Add-ons", body: "Optus Sport, SubHub and more." },
];

export default function SettingsOverviewPage() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <Link
            key={card.href}
            href={card.href}
            className="focus-ring flex items-start gap-4 rounded-lg border border-line bg-white p-5 hover:border-optus-teal"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-optus-teal-light text-optus-teal">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-bold text-optus-ink">{card.title}</h3>
              <p className="mt-1 text-sm text-optus-ink/70">{card.body}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
