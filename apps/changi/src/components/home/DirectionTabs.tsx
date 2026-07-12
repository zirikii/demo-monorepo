import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { directionPanels } from "@/data/directions";
import { cn } from "@/lib/cn";
import type { DirectionKey } from "@/types";

export function DirectionTabs() {
  const [active, setActive] = useState<DirectionKey>("arriving");
  const panel = directionPanels.find((item) => item.key === active) ?? directionPanels[0];
  return (
    <section className="hero-grid px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <Badge>{panel.eyebrow}</Badge>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.22em] text-[#806d5d]">I am</p>
            <h1 className="mt-2 text-5xl font-black uppercase tracking-tight text-[#2f271f] md:text-7xl">{panel.label}</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#665448]">{panel.description}</p>
          </div>
          <div className="card-shadow rounded-[2.5rem] bg-white p-4 ring-1 ring-[#eadfd3]">
            <div role="tablist" aria-label="Passenger direction" className="grid gap-2 sm:grid-cols-4">
              {directionPanels.map((item) => (
                <button key={item.key} role="tab" aria-selected={item.key === active} onClick={() => setActive(item.key)} className={cn("focus-ring rounded-2xl px-4 py-4 text-sm font-black uppercase tracking-[0.12em] transition", item.key === active ? "bg-[#806d5d] text-white" : "bg-[#f7f3ee] text-[#806d5d] hover:bg-[#f2e7dc]")}>{item.label}</button>
              ))}
            </div>
            <div className="mt-6 rounded-[2rem] bg-[#fbf8f4] p-6">
              <h2 className="text-2xl font-bold uppercase tracking-tight text-[#2f271f]">Useful information for {panel.label.toLowerCase()} passengers</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {panel.services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link to={service.href} key={service.title} className="rounded-2xl bg-white p-5 ring-1 ring-[#eadfd3] transition hover:-translate-y-1 hover:ring-[#806d5d]/30">
                      <Icon className="text-[#806d5d]" />
                      <h3 className="mt-4 font-bold text-[#2f271f]">{service.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#665448]">{service.description}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
