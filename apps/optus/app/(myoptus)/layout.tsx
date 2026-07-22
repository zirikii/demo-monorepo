import { getCurrentUser } from "@/lib/auth/current-user";
import { MyOptusNav } from "@/components/myoptus/myoptus-nav";
import { redirect } from "next/navigation";

export default async function MyOptusLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <div className="bg-surface-subtle">
      <div className="border-b border-line bg-optus-navy text-white">
        <div className="container flex items-center justify-between py-5">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-optus-yellow">My Optus</p>
            <h1 className="text-2xl font-black">
              Hi {user.name.split(" ")[0]}, your services are ready.
            </h1>
          </div>
          <img src="/brand/logo-white.svg" alt="" className="hidden h-9 w-auto sm:block" />
        </div>
      </div>
      <div className="container grid gap-8 py-8 lg:grid-cols-[260px_1fr]">
        <MyOptusNav userName={user.name} />
        <div>{children}</div>
      </div>
    </div>
  );
}
