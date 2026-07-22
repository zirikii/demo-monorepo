import Link from "next/link";

const LINKS = [
  { href: "/settings/account", label: "Account", desc: "Email, password, demo session" },
  { href: "/settings/profile", label: "Profile", desc: "Display name and contact prefs" },
  { href: "/settings/team", label: "Team", desc: "Members and roles" },
  { href: "/settings/integrations", label: "Integrations", desc: "Sport, Pause, Wi‑Fi tips" },
];

export default function SettingsIndexPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-optus-ink">Settings</h2>
        <p className="mt-1 text-sm text-optus-ink/70">Manage your demo My Optus account.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border border-line bg-white p-5 hover:border-optus-teal"
          >
            <p className="font-bold text-optus-ink">{item.label}</p>
            <p className="mt-1 text-sm text-optus-ink/65">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
