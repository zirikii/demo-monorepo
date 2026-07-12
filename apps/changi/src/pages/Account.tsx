import { Link, Navigate } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { formatPoints } from "@/lib/format";
import { flights } from "@/data/flights";

export function AccountPage() {
  useDocumentTitle("My Account");
  const { user, logout } = useAuth();
  if (!user) return <Navigate to="/login?redirect=/account" replace />;

  const pinned = flights.filter((f) => f.direction === "departure").slice(0, 3);

  return (
    <PageLayout>
      <PageHero
        title={`Hello, ${user.name}`}
        subtitle="Your demo Changi Account — points, pinned flights, and quick links."
        crumbs={[{ label: "My Account" }]}
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[1.2fr_0.8fr] sm:px-6">
        <div className="space-y-4">
          <article className="rounded-2xl border border-line bg-card p-6 shadow-sm">
            <h2 className="text-lg font-black text-ink-deep">Changi Rewards</h2>
            <p className="mt-3 text-4xl font-black text-purple">{formatPoints(user.points)}</p>
            <p className="text-sm text-ink-soft">points available</p>
            <Link to="/rewards" className="mt-4 inline-block text-sm font-bold text-purple hover:underline">
              Browse catalogue →
            </Link>
          </article>
          <article className="rounded-2xl border border-line bg-card p-6 shadow-sm">
            <h2 className="text-lg font-black text-ink-deep">Pinned flights</h2>
            <ul className="mt-4 space-y-3">
              {pinned.map((f) => (
                <li key={f.id} className="flex items-center justify-between rounded-lg bg-sand px-3 py-2 text-sm">
                  <span className="font-bold">
                    {f.flightNo} · {f.city}
                  </span>
                  <span className="text-ink-soft">
                    {f.scheduled} · T{f.terminal}
                  </span>
                </li>
              ))}
            </ul>
            <Link to="/fly/flights" className="mt-4 inline-block text-sm font-bold text-purple hover:underline">
              View all flights →
            </Link>
          </article>
        </div>
        <aside className="space-y-4">
          <article className="rounded-2xl border border-line bg-sand p-6">
            <h2 className="text-lg font-black text-ink-deep">Profile</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-faint">Email</dt>
                <dd className="font-bold">{user.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-faint">Member since</dt>
                <dd className="font-bold">{user.memberSince}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/settings">
                <Button variant="secondary">Settings</Button>
              </Link>
              <Button variant="ghost" onClick={logout}>
                Sign out
              </Button>
            </div>
          </article>
        </aside>
      </section>
    </PageLayout>
  );
}
