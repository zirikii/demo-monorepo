import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calculator,
  CreditCard,
  Home,
  PiggyBank,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const links = [
  { label: "Bank & savings accounts", to: "/banking/bank-accounts", Icon: Wallet },
  { label: "Credit cards", to: "/banking/credit-cards", Icon: CreditCard },
  { label: "Home loans", to: "/home-loans", Icon: Home },
  { label: "Savings accounts", to: "/banking/savings-accounts", Icon: PiggyBank },
  { label: "Tools & calculators", to: "/tools-and-calculators", Icon: Calculator },
  { label: "Security & scams", to: "/security", Icon: ShieldCheck },
];

export function QuickLinks() {
  return (
    <section className="border-b border-line bg-surface py-8">
      <div className="container-page">
        <h2 className="sr-only">Quick links</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
          {links.map(({ label, to, Icon }) => (
            <li key={to}>
              <Link
                to={to}
                className="focus-ring group flex h-full items-center gap-3 rounded-xl border border-line px-4 py-3.5 transition-colors hover:border-black"
              >
                <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-black" />
                <span className="text-sm font-semibold text-black">{label}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="ml-auto h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-black"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
