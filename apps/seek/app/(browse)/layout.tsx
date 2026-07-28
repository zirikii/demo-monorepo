import { getSession } from "@/lib/auth/server";
import { getSavedJobs } from "@/lib/data/saved";
import { getApplications } from "@/lib/data/applications";
import { AppShell } from "@/components/layout/AppShell";
import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { Footer } from "@/components/layout/Footer";
import { AppDataProvider } from "@/components/providers/AppDataProvider";

/**
 * Public job-browse shell (seek.com.au allows anonymous search).
 * Logged-in candidates keep the full app nav; guests get the marketing chrome
 * plus AppDataProvider so save/apply can redirect to login on 401.
 */
export default async function BrowseLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession();

  if (user) {
    const [saved, applications] = await Promise.all([getSavedJobs(), getApplications()]);
    return (
      <AppShell
        user={user}
        initialSavedIds={saved.map((s) => s.jobId)}
        initialAppliedIds={applications.map((a) => a.jobId)}
      >
        {children}
      </AppShell>
    );
  }

  return (
    <AppDataProvider initialSavedIds={[]} initialAppliedIds={[]}>
      <div className="flex min-h-screen flex-col bg-surface-subtle">
        <MarketingHeader user={null} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </AppDataProvider>
  );
}
