import { requireSession } from "@/lib/auth/server";
import { getAccount } from "@/lib/data/account";
import { getOutstandingBillCount } from "@/lib/data/bills";
import { AppShell } from "@/components/layout/AppShell";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, account, outstandingBills] = await Promise.all([
    requireSession(),
    getAccount(),
    getOutstandingBillCount(),
  ]);

  return (
    <AppShell
      user={user}
      initialActiveAddOnIds={account.activeAddOnIds}
      outstandingBills={outstandingBills}
    >
      {children}
    </AppShell>
  );
}
