import { ServiceHealthCard } from "@/components/account/service-health-card";
import { readJson } from "@/lib/data/json-store";
import type { Service } from "@/lib/types";

export default async function UsagePage() {
  const services = await readJson<Service[]>("services.json");
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-3xl font-black text-optus-ink">Usage</h2>
        <p className="text-optus-ink/65">Track mobile, prepaid and home internet usage.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <ServiceHealthCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
