import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

/** The real site carries a persistent scam warning above the header; this mirrors it. */
export function ScamAlertBar() {
  return (
    <div className="bg-hub-navy-deep text-white">
      <div className="container-hub-wide flex flex-wrap items-center gap-2 py-2 text-sm">
        <AlertTriangle aria-hidden className="h-4 w-4 text-caution" />
        <span className="font-bold tracking-wide uppercase">Scam alert:</span>
        <span className="text-white/80">
          HUB24 will never contact you regarding potential investment opportunities.
        </span>
        <Link
          to="/scam-alert"
          className="focus-hub font-bold text-hub-teal-soft underline underline-offset-4"
        >
          More information
        </Link>
      </div>
    </div>
  );
}
