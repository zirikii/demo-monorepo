import { Link } from "react-router-dom";
import { ArrowRight, Car, House, Smartphone, Sun, Wifi, Zap } from "lucide-react";

const tiles = [
  { title: "Electricity & gas", body: "Compare plans with no lock-in contracts.", to: "/energy", Icon: Zap },
  { title: "Internet", body: "nbn® plans from $70/mth with AGL energy.", to: "/internet", Icon: Wifi },
  { title: "Mobile", body: "SIM plans on the Optus Mobile Network.", to: "/mobile", Icon: Smartphone },
  { title: "Solar & batteries", body: "Bundles installed by our accredited partners.", to: "/solar", Icon: Sun },
  { title: "Electric vehicles", body: "Charge for 8c/kWh overnight.", to: "/electric-vehicles", Icon: Car },
  { title: "Moving house", body: "Connect your services in minutes.", to: "/moving-house", Icon: House },
];

export function ProductTiles() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tiles.map(({ title, body, to, Icon }) => (
        <li key={title}>
          <Link
            to={to}
            className="group flex h-full items-start gap-4 rounded-agl-lg border border-line-soft bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-agl-blue hover:shadow-agl-lift"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-agl-sky text-agl-blue">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className="block text-lg font-extrabold text-ink">{title}</span>
              <span className="mt-1 block text-ink-soft">{body}</span>
            </span>
            <ArrowRight className="mt-1 h-5 w-5 text-agl-blue transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
