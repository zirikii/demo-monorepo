import Link from "next/link";
import { readJson } from "@/lib/data/json-store";

type SettingsData = {
  profile: { phone: string; address: string; preferredContact: string };
  team: { id: string; name: string; email: string; role: string }[];
  integrations: { id: string; name: string; connected: boolean }[];
};

export default async function SettingsIndexPage() {
  const settings = await readJson<SettingsData>("settings.json");

  return (
    <div>
      <h2 className="text-2xl font-bold text-spark-ink">Settings</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          { href: "/settings/account", title: "Account", body: "Email, password, demo session" },
          {
            href: "/settings/profile",
            title: "Profile",
            body: `${settings.profile.phone} · ${settings.profile.preferredContact}`,
          },
          {
            href: "/settings/team",
            title: "Team",
            body: `${settings.team.length} members on this demo account`,
          },
          {
            href: "/settings/integrations",
            title: "Integrations",
            body: `${settings.integrations.filter((i) => i.connected).length} connected`,
          },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-lg border border-line bg-white p-5 hover:border-spark-purple"
          >
            <h3 className="font-bold text-spark-ink">{card.title}</h3>
            <p className="mt-2 text-sm text-spark-ink/70">{card.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
