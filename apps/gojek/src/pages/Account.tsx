import { Navigate, Link } from "react-router-dom";
import {
  Bike,
  LogOut,
  Settings as SettingsIcon,
  Star,
  Store,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/hooks/useAuth";
import { formatRupiah, formatDate } from "@/lib/format";
import type { PartnerType } from "@/lib/auth";

const roleLabel: Record<PartnerType, string> = {
  driver: "Driver-partner",
  merchant: "Merchant-partner",
  consumer: "Consumer",
};

const activity = [
  { label: "GoFood order delivered", time: "12 min ago", amount: 48000 },
  { label: "GoRide trip completed", time: "48 min ago", amount: 21500 },
  { label: "GoPay top-up", time: "2 hrs ago", amount: 100000 },
  { label: "GoSend parcel delivered", time: "Yesterday", amount: 32000 },
];

export function AccountPage() {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  const isMerchant = user.partnerType === "merchant";
  const RoleIcon = isMerchant ? Store : Bike;

  const stats = isMerchant
    ? [
        { icon: Wallet, label: "This week's payout", value: formatRupiah(4_820_000) },
        { icon: TrendingUp, label: "Orders", value: "312" },
        { icon: Star, label: "Rating", value: "4.9" },
      ]
    : [
        { icon: Wallet, label: "This week's earnings", value: formatRupiah(1_240_000) },
        { icon: TrendingUp, label: "Trips & orders", value: "86" },
        { icon: Star, label: "Rating", value: "4.9" },
      ];

  return (
    <PageLayout title="Partner Hub — Gojek (Demo)">
      <section className="border-b border-line bg-surface">
        <Container className="py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gojek-tint text-gojek">
                <RoleIcon aria-hidden="true" className="h-7 w-7" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-faint">Welcome back</p>
                <h1 className="text-2xl font-extrabold tracking-tight text-ink">{user.name}</h1>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
                  <Badge className="border-gojek/30 text-gojek">
                    {roleLabel[user.partnerType]}
                  </Badge>
                  <span>{user.city}</span>
                  <span>· Since {formatDate(user.memberSince)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                to="/settings"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
              >
                <SettingsIcon aria-hidden="true" className="h-4 w-4" />
                Settings
              </Link>
              <Button variant="secondary" size="sm" onClick={logout}>
                <LogOut aria-hidden="true" className="h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-10">
        <div className="grid gap-5 sm:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-2xl border border-line bg-card p-6">
                <Icon aria-hidden="true" className="h-6 w-6 text-gojek" />
                <p className="mt-4 text-2xl font-extrabold tracking-tight text-ink">
                  {stat.value}
                </p>
                <p className="text-sm text-ink-soft">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl border border-line bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-ink">Recent activity</h2>
              <span className="text-sm text-ink-faint">Last 24 hours</span>
            </div>
            <ul className="mt-4 divide-y divide-line">
              {activity.map((item) => (
                <li key={item.label} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-semibold text-ink">{item.label}</p>
                    <p className="text-sm text-ink-faint">{item.time}</p>
                  </div>
                  <span className="font-bold text-ink">{formatRupiah(item.amount)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-card p-6">
            <h2 className="text-lg font-bold text-ink">Quick actions</h2>
            <div className="mt-4 space-y-2">
              <Link
                to="/products"
                className="block rounded-xl border border-line px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-gojek hover:text-gojek"
              >
                Explore all products
              </Link>
              <Link
                to={isMerchant ? "/merchants" : "/drivers"}
                className="block rounded-xl border border-line px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-gojek hover:text-gojek"
              >
                {isMerchant ? "Merchant resources" : "Driver resources"}
              </Link>
              <Link
                to="/settings"
                className="block rounded-xl border border-line px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-gojek hover:text-gojek"
              >
                Manage preferences
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
