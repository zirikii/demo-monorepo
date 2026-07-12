import type { SessionUser } from "@/lib/types";
import { AppDataProvider } from "@/components/providers/AppDataProvider";
import { AppTopNav } from "./AppTopNav";
import { Footer } from "./Footer";

/**
 * Authenticated "My Spark" shell: sticky top nav + main content + footer.
 * Seeds the client-side AppDataProvider with the account's active add-on ids
 * and outstanding bill count so nav badges are correct on first paint.
 */
export function AppShell({
  user,
  initialActiveAddOnIds,
  outstandingBills,
  children,
}: {
  user: SessionUser;
  initialActiveAddOnIds: string[];
  outstandingBills: number;
  children: React.ReactNode;
}) {
  return (
    <AppDataProvider
      initialActiveAddOnIds={initialActiveAddOnIds}
      outstandingBills={outstandingBills}
    >
      <div className="flex min-h-screen flex-col bg-surface-subtle">
        <AppTopNav user={user} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </AppDataProvider>
  );
}
