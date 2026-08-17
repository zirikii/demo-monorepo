import { useState } from "react";
import { PanelCard } from "@/components/portal/PanelCard";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { ADVISER_NAV } from "@/components/portal/nav";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Select } from "@/components/ui/Field";
import { MODELS, PRACTICE } from "@/data/platform";
import { formatPercent } from "@/lib/format";

const MENUS = ["All menus", "Discover", "Core", "Choice"] as const;

export default function AdviserPortfoliosPage() {
  const [menu, setMenu] = useState<(typeof MENUS)[number]>("All menus");
  const [manager, setManager] = useState("All managers");

  const managers = ["All managers", ...Array.from(new Set(MODELS.map((model) => model.manager)))];

  const rows = MODELS.filter(
    (model) =>
      (menu === "All menus" || model.menu.includes(menu)) &&
      (manager === "All managers" || model.manager === manager),
  );

  return (
    <PortalLayout
      portal="AdviserHUB"
      nav={ADVISER_NAV}
      contextLabel="Practice"
      contextValue={PRACTICE.name}
      contextNote={`${PRACTICE.afsl} · ${PRACTICE.adviserCount} advisers`}
      title="Managed portfolios"
      description="Models available to the practice"
    >
      <PanelCard title="Model list" description={`${rows.length} of ${MODELS.length} models`} bodyClassName="p-0">
        <div className="grid gap-4 border-b border-line p-5 md:grid-cols-2 lg:max-w-2xl">
          <Field label="Menu" htmlFor="model-menu">
            <Select
              id="model-menu"
              value={menu}
              onChange={(event) => setMenu(event.target.value as (typeof MENUS)[number])}
            >
              {MENUS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Manager" htmlFor="model-manager">
            <Select id="model-manager" value={manager} onChange={(event) => setManager(event.target.value)}>
              {managers.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <DataTable
          className="rounded-none border-0"
          caption="Managed portfolio models"
          rowKey={(model) => model.code}
          rows={rows}
          empty={<EmptyState className="m-5" title="No models match those filters" />}
          columns={[
            {
              key: "model",
              header: "Model",
              render: (model) => (
                <div className="flex flex-col">
                  <span className="font-semibold text-ink-strong">{model.name}</span>
                  <span className="text-xs text-ink-faint">
                    {model.code} · {model.manager}
                  </span>
                </div>
              ),
            },
            {
              key: "risk",
              header: "Risk profile",
              render: (model) => <Badge tone="neutral">{model.riskProfile}</Badge>,
            },
            { key: "menus", header: "Menus", render: (model) => model.menu.join(", ") },
            {
              key: "fee",
              header: "Mgmt fee",
              align: "right",
              render: (model) => formatPercent(model.managementFee),
            },
            {
              key: "one",
              header: "1yr",
              align: "right",
              render: (model) => (
                <span className="font-semibold text-positive">{formatPercent(model.oneYearReturn)}</span>
              ),
            },
            {
              key: "three",
              header: "3yr p.a.",
              align: "right",
              render: (model) => formatPercent(model.threeYearReturn),
            },
            {
              key: "five",
              header: "5yr p.a.",
              align: "right",
              render: (model) => formatPercent(model.fiveYearReturn),
            },
          ]}
        />
      </PanelCard>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {rows.slice(0, 4).map((model) => (
          <PanelCard key={model.code} title={model.name} description={model.riskProfile}>
            <ul className="flex flex-col gap-2">
              {model.allocation.map((slice) => (
                <li key={slice.assetClass} className="flex items-center gap-3 text-sm">
                  <span className="flex-1 truncate text-ink-soft">{slice.assetClass}</span>
                  <span className="w-12 text-right font-semibold tabular-nums text-ink-strong">
                    {slice.weight}%
                  </span>
                </li>
              ))}
            </ul>
          </PanelCard>
        ))}
      </div>

      <p className="mt-8 text-xs text-ink-faint">
        Model performance shown is invented for a demonstration build.
      </p>
    </PortalLayout>
  );
}
