import { NavLink } from "react-router-dom";
import {
  Smartphone,
  Satellite,
  Zap,
  Landmark,
  ShieldCheck,
  CarFront,
  Flame,
  Droplets,
  Router,
  Clapperboard,
  Plane,
  TrainFront,
} from "lucide-react";
import { cn } from "../../lib/cn";

const items = [
  { to: "/recharge", label: "Mobile", icon: Smartphone },
  { to: "/fastag-recharge", label: "FASTag Recharge", icon: CarFront },
  { to: "/dth-recharge", label: "DTH Recharge", icon: Satellite },
  { to: "/electricity-bill-payment", label: "Electricity Bill", icon: Zap },
  { to: "/loan-emi-payment", label: "Loan EMI", icon: Landmark },
  { to: "/insurance", label: "Insurance / LIC", icon: ShieldCheck },
  { to: "/bill-payments", label: "Piped Gas Bill", icon: Flame },
  { to: "/bill-payments", label: "Water", icon: Droplets },
  { to: "/broadband-bill-payment", label: "Broadband/Landline", icon: Router },
  { to: "/movies", label: "Movies", icon: Clapperboard },
  { to: "/flights", label: "Flights", icon: Plane },
  { to: "/train-tickets", label: "Trains", icon: TrainFront },
];

/**
 * Dark navy icon strip under the header on product pages —
 * mirrors paytm.com's category subnav band.
 */
export function CategoryStrip() {
  return (
    <div className="bg-gradient-to-r from-paytm-navy-deep to-paytm-navy-mid">
      <nav
        aria-label="Payment categories"
        className="scrollbar-none mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6"
      >
        {items.map(({ to, label, icon: Icon }, i) => (
          <NavLink
            // Some labels intentionally share a destination hub page
            key={`${to}-${i}`}
            to={to}
            className={({ isActive }: { isActive: boolean }) =>
              cn(
                "flex min-w-20 shrink-0 flex-col items-center gap-1.5 border-b-2 px-3 py-3 text-center",
                isActive
                  ? "border-paytm-cyan text-white"
                  : "border-transparent text-white/75 hover:text-white",
              )
            }
          >
            <Icon aria-hidden="true" className="h-5 w-5" />
            <span className="text-[11px] font-medium leading-tight">{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
