import { redirect } from "next/navigation";
import { MyOptusNav } from "@/components/myoptus/myoptus-nav";
import { getCurrentUser } from "@/lib/auth/current-user";

export default async function MyOptusLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return <div className="bg-surface-subtle"><div className="border-b border-line bg-optus-teal text-white"><div className="container flex items-center justify-between py-4"><div><p className="text-xs font-bold uppercase tracking-wide text-white/70">My Optus</p><h1 className="text-xl font-black">Hi, {user.name.split(" ")[0]}</h1></div><img src="/brand/logo-white.svg" alt="" className="hidden h-8 w-auto sm:block" /></div></div><div className="container grid gap-8 py-8 lg:grid-cols-[240px_1fr]"><MyOptusNav userName={user.name} /><div>{children}</div></div></div>;
}
