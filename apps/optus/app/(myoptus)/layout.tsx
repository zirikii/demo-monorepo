import { getCurrentUser } from "@/lib/auth/current-user";
import { MyOptusNav } from "@/components/myoptus/myoptus-nav";
import { redirect } from "next/navigation";

export default async function MyOptusLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="bg-surface-subtle">
      <div className="border-b border-line bg-optus-teal text-white">
        <div className="container flex items-center justify-between py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/70">My Optus</p>
            <h1 className="text-xl font-bold">G&apos;day, {user.name.split(" ")[0]}</h1>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-white.svg" alt="" className="hidden h-8 w-auto sm:block" />
        </div>
      </div>
      <div className="container space-y-6 py-8">
        <MyOptusNav />
        <div>{children}</div>
      </div>
    </div>
  );
}
