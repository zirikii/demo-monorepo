import Link from "next/link";

const cards = [
  { href: "/settings/account", title: "Account", body: "Sign-in and billing preferences." },
  { href: "/settings/profile", title: "Profile", body: "Personal details and contact options." },
  { href: "/settings/team", title: "Family members", body: "Manage shared account access." },
  {
    href: "/settings/integrations",
    title: "Notifications",
    body: "SMS, email and appointment reminders.",
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-black text-optus-ink">Settings</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-line bg-white p-5 shadow-sm hover:border-optus-teal"
          >
            <h3 className="font-black text-optus-ink">{card.title}</h3>
            <p className="mt-2 text-sm text-optus-ink/65">{card.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
