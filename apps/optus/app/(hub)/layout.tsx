import { HubShell } from "@/components/layout/hub-shell";
import { getCurrentUser } from "@/lib/auth/current-user";
export default async function HubLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return <HubShell user={user}>{children}</HubShell>;
}
