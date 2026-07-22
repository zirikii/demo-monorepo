import Link from "next/link";
import { OptusLogo } from "@/components/layout/logo";
export function MarketingFooter() {
  return (
    <footer className="border-t border-optus-line bg-optus-ink text-white">
      <div className="container grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <OptusLogo variant="white" />
          <p className="mt-4 max-w-md text-sm text-white/70">
            Unofficial Optus Business Hub demo built with public brand references, local JSON data,
            and mock authentication. Not affiliated with Optus.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-bold">Demo surfaces</p>
          <Link href="/overview" className="block text-white/70 hover:text-white">
            Business Hub
          </Link>
          <Link href="/fleet" className="block text-white/70 hover:text-white">
            Fleet Manager
          </Link>
          <Link href="/insights" className="block text-white/70 hover:text-white">
            Insight Plus
          </Link>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-bold">Credentials</p>
          <p className="text-white/70">Any email and password works in demo mode.</p>
          <p className="text-white/70">Suggested: admin@example.com / demo</p>
        </div>
      </div>
    </footer>
  );
}
