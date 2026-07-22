import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OptusLogo } from "@/components/layout/logo";
export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-optus-line bg-white/95 backdrop-blur">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label="Optus Business Hub home">
          <OptusLogo />
        </Link>
        <nav
          className="hidden items-center gap-7 text-sm font-semibold text-optus-muted md:flex"
          aria-label="Marketing"
        >
          <Link href="/#solutions" className="hover:text-optus-teal">
            Solutions
          </Link>
          <Link href="/#insights" className="hover:text-optus-teal">
            Insight Plus
          </Link>
          <Link href="/pricing" className="hover:text-optus-teal">
            Plans
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild variant="yellow">
            <Link href="/signup">Start demo</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
