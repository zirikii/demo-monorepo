import { Link, Navigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function AccountPage() {
  useDocumentTitle("Account");
  const { user, logout } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <PageLayout>
      <h1 className="font-display text-4xl font-bold">Hi, {user.name}</h1>
      <p className="mt-2 text-nine-muted">{user.email}</p>
      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-nine-line p-4">
          <dt className="text-xs font-bold uppercase tracking-wider text-nine-muted">Member since</dt>
          <dd className="mt-1 font-display text-2xl font-bold">{user.memberSince}</dd>
        </div>
        <div className="rounded-lg border border-nine-line p-4">
          <dt className="text-xs font-bold uppercase tracking-wider text-nine-muted">Saved stories</dt>
          <dd className="mt-1 font-display text-2xl font-bold">{user.savedCount}</dd>
        </div>
        <div className="rounded-lg border border-nine-line p-4">
          <dt className="text-xs font-bold uppercase tracking-wider text-nine-muted">Newsletter</dt>
          <dd className="mt-1 font-display text-2xl font-bold">On</dd>
        </div>
      </dl>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button to="/settings">Settings</Button>
        <Button to="/newsletter" variant="secondary">
          Manage newsletter
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            logout();
          }}
        >
          Sign out
        </Button>
      </div>
      <p className="mt-6 text-sm text-nine-muted">
        Prefer the homepage? <Link to="/">Back to nine.com.au</Link>
      </p>
    </PageLayout>
  );
}
