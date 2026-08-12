import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";

type Tile = { title: string; body: string; to: string; badge?: string };

const tilesByAudience: Record<string, Tile[]> = {
  businesses: [
    {
      title: "HeroForce",
      body: "We become the legal employer so you can hire anywhere without an entity.",
      to: "/products/heroforce",
    },
    {
      title: "Hiring",
      body: "Job ads, applicant tracking and AI screening in one pipeline.",
      to: "/products/hiring",
      badge: "Start free",
    },
    {
      title: "Powerful HR software",
      body: "Records, onboarding, performance and policy sign-off that runs itself.",
      to: "/products/hr-software",
    },
    {
      title: "Payroll",
      body: "Award interpretation, STP Phase 2 and superannuation on every pay event.",
      to: "/products/payroll-software",
    },
    {
      title: "Employee experience",
      body: "Benefits, recognition and the Work app your team actually opens.",
      to: "/products/employee-experience",
    },
    {
      title: "Integrations",
      body: "Connect accounting, identity and comms tools without re-keying data.",
      to: "/integrations",
    },
  ],
  employees: [
    {
      title: "Employment Hero Work",
      body: "Payslips, rosters, leave and recognition in one app.",
      to: "/work",
    },
    {
      title: "Earned wage access",
      body: "Reach up to 50% of the wages you have already earned, before payday.",
      to: "/products/swag-spend-account/earned-wage-access",
    },
    {
      title: "Swag Spend account",
      body: "Budgeting, cashback and a linked card that keeps up with payday.",
      to: "/products/swag-spend-account",
    },
    {
      title: "Benefits and perks",
      body: "Discounts, novated leasing and a confidential assistance program.",
      to: "/products/employee-experience",
    },
  ],
  "job-seekers": [
    {
      title: "Employment Hero Jobs",
      body: "Roles across Australia and New Zealand, updated daily.",
      to: "/jobs",
    },
    {
      title: "SmartMatch profiles",
      body: "One profile, matched to every employer hiring in your field.",
      to: "/products/find-candidates",
      badge: "AI",
    },
    {
      title: "Salary benchmarking",
      body: "See what you should be paid, from the payslips of three million employees.",
      to: "/jobs/salary-benchmarking",
    },
    {
      title: "Interview preparation",
      body: "Practical guides for the questions that decide most interviews.",
      to: "/resources/job-seekers",
    },
  ],
};

const tabItems = [
  { id: "businesses", label: "Businesses" },
  { id: "employees", label: "Employees" },
  { id: "job-seekers", label: "Job seekers" },
];

export function PlatformTabs() {
  const [active, setActive] = useState("businesses");
  const tiles = tilesByAudience[active] ?? [];

  return (
    <div className="mt-10">
      <Tabs items={tabItems} active={active} onChange={setActive} ariaLabel="Choose an audience" />

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <Link
            key={tile.title}
            to={tile.to}
            className="focus-eh group rounded-eh-lg border border-eh-line bg-white p-6 transition hover:border-eh-purple hover:shadow-eh-lift"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-eh-ink group-hover:text-eh-purple">
                {tile.title}
              </h3>
              {tile.badge ? (
                <span className="rounded-full bg-eh-lime px-2.5 py-1 text-[10px] font-bold tracking-wide text-eh-ink uppercase">
                  {tile.badge}
                </span>
              ) : null}
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-eh-ink-soft">{tile.body}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-eh-purple">
              Explore
              <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
