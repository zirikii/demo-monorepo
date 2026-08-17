import { NavLink } from "react-router-dom";
import { cn } from "@/lib/cn";

const LINKS = [
  { to: "/shareholder-centre/overview/", label: "Overview" },
  { to: "/shareholder-centre/asx-announcements/", label: "ASX announcements" },
  { to: "/shareholder-centre/financial-results/", label: "Financial results" },
  { to: "/shareholder-centre/share-price/", label: "Share price" },
  { to: "/shareholder-centre/corporate-governance/", label: "Corporate governance" },
];

export function ShareholderNav() {
  return (
    <nav aria-label="Shareholder Centre" className="border-b border-line bg-white">
      <div className="container-h24 flex gap-1 overflow-x-auto">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }: { isActive: boolean }) =>
              cn(
                "focus-h24 border-b-2 px-4 py-4 text-sm font-semibold whitespace-nowrap transition",
                isActive
                  ? "border-h24-teal text-h24-teal-dark"
                  : "border-transparent text-ink-faint hover:text-ink",
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
