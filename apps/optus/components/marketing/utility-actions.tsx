import Link from "next/link";
import {
  CreditCard,
  HelpCircle,
  Home,
  RefreshCw,
  Shield,
  Smartphone,
  UserRound,
  Wifi,
} from "lucide-react";
import { utilityActions } from "@/lib/constants/optus-landing";

const ICONS = [CreditCard, UserRound, RefreshCw, Smartphone, Home, Shield, HelpCircle, Wifi] as const;

export function UtilityActions() {
  return (
    <section className="border-b border-line bg-surface-subtle">
      <div className="container py-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-optus-teal-dark">Quick actions</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-optus-ink md:text-3xl">
              Manage your Optus services
            </h2>
          </div>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {utilityActions.map((action, index) => {
            const Icon = ICONS[index] ?? HelpCircle;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-start gap-3 rounded-lg border border-line bg-white p-4 transition hover:border-optus-teal hover:shadow-sm"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-optus-teal-light text-optus-teal-dark">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-optus-ink group-hover:text-optus-teal-dark">
                    {action.title}
                  </span>
                  <span className="mt-1 block text-xs text-optus-ink/65">{action.description}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
