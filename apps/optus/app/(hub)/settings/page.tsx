import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
const settingsLinks = [
  { href: "/settings/account", title: "Account", body: "Billing account and company details" },
  {
    href: "/settings/profile",
    title: "Profile",
    body: "Primary contact and notification defaults",
  },
  { href: "/settings/team", title: "Team", body: "Administrators and cost-centre managers" },
  {
    href: "/settings/integrations",
    title: "Integrations",
    body: "Mock exports, SSO, and finance connections",
  },
];
export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Settings"
        title="Workspace controls"
        description="Manage the simulated Optus Business Hub account and team settings."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {settingsLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="p-5 transition hover:border-optus-teal hover:shadow-optus">
              <h2 className="text-xl font-black text-optus-ink">{link.title}</h2>
              <p className="mt-2 text-sm text-optus-muted">{link.body}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
