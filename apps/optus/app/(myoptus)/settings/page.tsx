import type { Metadata } from "next";
import Link from "next/link";
import { SettingsTabs } from "@/components/myoptus/settings-tabs";
import { User, Users, Plug, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings",
};

const CARDS = [
  {
    href: "/settings/account",
    label: "Account",
    blurb: "Password, security and login.",
    icon: ShieldCheck,
  },
  {
    href: "/settings/profile",
    label: "Profile",
    blurb: "Your name, contact and preferences.",
    icon: User,
  },
  {
    href: "/settings/team",
    label: "Team",
    blurb: "Manage who can access this account.",
    icon: Users,
  },
  {
    href: "/settings/integrations",
    label: "Integrations",
    blurb: "Connect Optus services & apps.",
    icon: Plug,
  },
] as const;

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-optus-ink">Settings</h2>
        <p className="mt-1 text-sm text-optus-ink-soft">Manage your account and services.</p>
      </div>
      <SettingsTabs />
      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="flex items-start gap-4 rounded-lg border border-line bg-white p-5 transition hover:border-optus-ink"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-optus-yellow-light">
              <card.icon className="h-5 w-5 text-optus-ink" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-semibold text-optus-ink">{card.label}</span>
              <span className="block text-sm text-optus-ink-soft">{card.blurb}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
