import { BriefcaseBusiness, CalendarDays, Check, CircleDollarSign, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function ProductMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      <div className="absolute -inset-8 -z-10 rounded-[40%] bg-coral-soft blur-3xl" />
      <Card className="overflow-hidden border-0 shadow-product">
        <div className="flex items-center justify-between border-b border-line bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet">
              <span className="text-sm font-black">A</span>
            </span>
            <div>
              <p className="text-sm font-bold">Acme Digital</p>
              <p className="text-xs text-ink-faint">Employment OS</p>
            </div>
          </div>
          <span className="h-8 w-8 rounded-full bg-green-soft" />
        </div>
        <div className="grid min-h-[370px] grid-cols-[132px_1fr]">
          <div className="border-r border-line bg-neutral-soft p-3">
            {[
              [Users, "People"],
              [CircleDollarSign, "Payroll"],
              [BriefcaseBusiness, "Hiring"],
              [CalendarDays, "Leave"],
            ].map(([Icon, label], index) => (
              <div
                key={String(label)}
                className={`mb-1 flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold ${index === 0 ? "bg-violet" : "text-ink-soft"}`}
              >
                <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                {label}
              </div>
            ))}
          </div>
          <div className="bg-white p-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold text-ink-faint">Good morning, Avery</p>
                <p className="mt-1 text-xl font-bold">Your team at a glance</p>
              </div>
              <span className="rounded-full border border-line px-3 py-1 text-[10px] font-semibold">
                This month
              </span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                ["84", "Employees"],
                ["7", "On leave"],
                ["6", "Open roles"],
              ].map(([value, label], index) => (
                <div
                  key={label}
                  className={`rounded-xl p-3 ${index === 1 ? "bg-coral-soft" : index === 2 ? "bg-green-soft" : "bg-violet-soft"}`}
                >
                  <p className="text-xl font-bold">{value}</p>
                  <p className="mt-1 text-[10px] text-ink-soft">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs font-bold">Onboarding progress</p>
            <div className="mt-3 space-y-3">
              {[
                ["Mia Thompson", "Product design", "80%"],
                ["Leo Martin", "Engineering", "60%"],
                ["Zoe Patel", "Client services", "40%"],
              ].map(([name, team, progress]) => (
                <div
                  key={name}
                  className="flex items-center gap-3 rounded-xl border border-line p-3"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-blue-soft text-[10px] font-bold">
                    {name
                      ?.split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-bold">{name}</p>
                    <p className="text-[9px] text-ink-faint">{team}</p>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-bold">
                    <Check aria-hidden="true" className="h-3 w-3 text-positive" /> {progress}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
