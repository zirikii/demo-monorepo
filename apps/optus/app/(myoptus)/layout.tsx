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
      <div className="bg-optus-ink text-white">
        <div className="container flex items-center justify-between py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-optus-yellow">
              My Optus
            </p>
            <h1 className="text-xl font-bold">Hi, {user.name.split(" ")[0]}</h1>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-white.svg" alt="" className="hidden h-5 w-auto sm:block" />
        </div>
      </div>
      <div className="container grid gap-8 py-8 lg:grid-cols-[240px_1fr]">
        <MyOptusNav userName={user.name} />
        <div>{children}</div>
      </div>
    </div>
  );
}
