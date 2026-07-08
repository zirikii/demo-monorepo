import { Link } from "react-router-dom";
import { Headphones, ArrowRight } from "lucide-react";

/** Slim cyan 24x7 support band. */
export function SupportRibbon() {
  return (
    <section aria-label="Customer support" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-gradient-to-r from-paytm-cyan to-[#0095d9] px-6 py-4 text-white shadow-card sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <Headphones aria-hidden="true" className="h-5 w-5" />
          </span>
          <p className="text-sm font-semibold sm:text-base">
            24×7 trusted customer support to assist and help you in every step of your journey
          </p>
        </div>
        <Link
          to="/support"
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/70 px-5 py-2 text-sm font-bold transition-colors hover:bg-white hover:text-paytm-cyan"
        >
          Learn More <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
