import { Link, useNavigate } from "react-router-dom";
import { Bookmark, LogOut, Settings as SettingsIcon } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { ArticleCard } from "@/components/article/ArticleCard";
import { useAuth } from "@/hooks/useAuth";
import { featuredArticles } from "@/data/articles";

export function AccountPage() {
  useDocumentTitle("My account");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const saved = featuredArticles().slice(0, 3);

  if (!user) {
    return (
      <PageLayout ticker={false}>
        <section className="mx-auto max-w-md px-4 py-20 text-center">
          <h1 className="text-2xl font-black text-ink">You&apos;re signed out</h1>
          <p className="mt-2 text-sm text-ink-soft">Sign in to see your account and saved stories.</p>
          <div className="mt-5">
            <Link to="/login">
              <Button>Sign in</Button>
            </Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-5 rounded-2xl border border-line bg-card p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-nine-deep text-2xl font-black text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-black text-ink">{user.name}</h1>
              <p className="text-sm text-ink-soft">{user.email}</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-nine/15 px-2 py-0.5 text-xs font-bold text-nine-deep">
                {user.plan} member
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/settings">
              <Button variant="secondary">
                <SettingsIcon className="h-4 w-4" aria-hidden="true" />
                Settings
              </Button>
            </Link>
            <Button
              variant="ghost"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-black text-ink">
            <Bookmark className="h-5 w-5 text-nine-deep" aria-hidden="true" />
            Saved for later
          </h2>
          <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((a) => (
              <ArticleCard key={a.slug} article={a} showPillar />
            ))}
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Member since", value: new Intl.DateTimeFormat("en-AU", { month: "short", year: "numeric" }).format(new Date(user.memberSince)) },
            { label: "Saved stories", value: `${saved.length}` },
            { label: "Following", value: "6 topics" },
            { label: "Plan", value: user.plan },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-line bg-card p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                {stat.label}
              </dt>
              <dd className="mt-1 text-lg font-black text-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </PageLayout>
  );
}
