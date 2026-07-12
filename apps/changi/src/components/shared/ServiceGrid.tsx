import { Link } from "react-router-dom";
import type { ServiceItem } from "@/types";

export function ServiceGrid({ services }: { services: ServiceItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <Link key={service.title} to={service.href} className="card-shadow group rounded-[2rem] bg-white p-6 ring-1 ring-[#eadfd3] transition hover:-translate-y-1 hover:ring-[#806d5d]/30">
            <span className="inline-flex rounded-2xl bg-[#f2e7dc] p-3 text-[#806d5d]"><Icon /></span>
            <h3 className="mt-5 text-xl font-bold text-[#2f271f]">{service.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#665448]">{service.description}</p>
            <span className="mt-5 inline-flex text-sm font-bold text-[#806d5d]">Explore →</span>
          </Link>
        );
      })}
    </div>
  );
}
