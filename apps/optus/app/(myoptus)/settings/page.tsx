import Link from "next/link";
import { readJson } from "@/lib/data/json-store";

type SettingsData = { profile: { phone: string; address: string; preferredContact: string }; team: { id: string; name: string; email: string; role: string }[]; integrations: { id: string; name: string; connected: boolean }[] };

export default async function SettingsIndexPage() {
  const settings = await readJson<SettingsData>("settings.json");
  const cards = [
    { href: "/settings/account", title: "Account", body: "Email, password, demo session" },
    { href: "/settings/profile", title: "Profile", body: `${settings.profile.phone} - ${settings.profile.preferredContact}` },
    { href: "/settings/team", title: "Team", body: `${settings.team.length} members on this demo account` },
    { href: "/settings/integrations", title: "Integrations", body: `${settings.integrations.filter((item) => item.connected).length} connected` },
  ];
  return <div><h2 className="text-2xl font-black text-optus-ink">Settings</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{cards.map((card) => <Link key={card.href} href={card.href} className="rounded-lg border border-line bg-white p-5 hover:border-optus-teal"><h3 className="font-black text-optus-ink">{card.title}</h3><p className="mt-2 text-sm text-optus-ink/70">{card.body}</p></Link>)}</div></div>;
}
