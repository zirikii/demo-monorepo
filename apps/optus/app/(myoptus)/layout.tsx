import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user";
import { MyOptusNav } from "@/components/myoptus/myoptus-nav";

export default async function MyOptusLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="bg-surface-subtle">
      <div className="border-b border-line bg-optus-teal text-white">
        <div className="container flex items-center justify-between py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/70">My Optus</p>
            <h1 className="text-xl font-extrabold">Hi {user.name.split(" ")[0]}</h1>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-white.svg" alt="" className="hidden h-7 w-auto sm:block" />
        </div>
      </div>
      <div className="container grid gap-8 py-8 lg:grid-cols-[240px_1fr]">
        <MyOptusNav userName={user.name} />
        <div>{children}</div>
      </div>
    </div>
  );
}
