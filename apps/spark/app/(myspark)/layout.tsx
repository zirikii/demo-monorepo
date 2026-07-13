import { getCurrentUser } from "@/lib/auth/current-user";
import { MySparkNav } from "@/components/myspark/myspark-nav";
import { redirect } from "next/navigation";

export default async function MySparkLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="bg-surface-subtle">
      <div className="border-b border-line bg-spark-purple text-white">
        <div className="container flex items-center justify-between py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/70">MySpark</p>
            <h1 className="text-xl font-bold">Kia ora, {user.name.split(" ")[0]}</h1>
          </div>
          <img src="/brand/logo-white.svg" alt="" className="hidden h-8 w-auto sm:block" />
        </div>
      </div>
      <div className="container grid gap-8 py-8 lg:grid-cols-[240px_1fr]">
        <MySparkNav userName={user.name} />
        <div>{children}</div>
      </div>
    </div>
  );
}
