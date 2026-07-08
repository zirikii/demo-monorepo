import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { quickPayItems } from "../../data/home";

/** Two slim reminder strips (broadband due / loan EMI due). */
export function QuickPayStrip() {
  return (
    <section aria-label="Quick payments" className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
      <div className="grid gap-4 md:grid-cols-2">
        {quickPayItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 rounded-2xl bg-card px-5 py-4 shadow-card"
          >
            <div className="flex items-center gap-4">
              <img src={item.icon} alt="" aria-hidden="true" className="h-9 w-9 object-contain" />
              <div>
                <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                <p className="text-xs text-ink-soft">{item.subtitle}</p>
              </div>
            </div>
            <Link
              to={item.to}
              className="flex shrink-0 items-center gap-1 rounded-full border border-paytm-cyan px-4 py-1.5 text-xs font-bold text-paytm-cyan transition-colors hover:bg-paytm-cyan hover:text-white"
            >
              {item.cta}
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
