import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { securityAlerts } from "@/data/site";

export function SecurityStrip() {
  return (
    <section className="bg-ink py-10 text-surface">
      <div className="container-cba">
        <div className="flex items-center gap-3">
          <ShieldAlert aria-hidden="true" className="h-6 w-6 text-cba-yellow" />
          <h2 className="text-xl font-extrabold">Latest scam and security alerts</h2>
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {securityAlerts.map((alert) => (
            <li key={alert.id}>
              <Link
                to={alert.to}
                className="focus-cba block h-full rounded-cba-lg border border-surface/20 p-5 transition-colors hover:border-cba-yellow"
              >
                <h3 className="text-[15px] font-bold text-cba-yellow">{alert.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-surface/80">{alert.body}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/support/security"
          className="focus-cba mt-6 inline-block text-sm font-bold text-cba-yellow underline underline-offset-4"
        >
          Visit CommBank Safe
        </Link>
      </div>
    </section>
  );
}
