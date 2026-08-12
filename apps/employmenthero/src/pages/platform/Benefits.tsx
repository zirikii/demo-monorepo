import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { PanelCard } from "@/components/platform/PanelCard";
import { StatTile } from "@/components/platform/StatTile";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { BENEFIT_OFFERS, EMPLOYEES } from "@/data/platform";
import { formatCurrency } from "@/lib/format";

export default function PlatformBenefits() {
  const totalSaved = BENEFIT_OFFERS.reduce((total, offer) => total + offer.savedThisYear, 0);

  return (
    <PlatformLayout
      title="Benefits"
      description="Employment Hero Work perks available to your team"
      actions={
        <>
          <ButtonLink to="/products/work-app" size="sm">
            About the Work app
          </ButtonLink>
          <ButtonLink to="/products/earned-wage-access" variant="secondary" size="sm">
            Earned Wage Access
          </ButtonLink>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Work app adoption" value="94%" trend={`${EMPLOYEES.length - 1} of ${EMPLOYEES.length} activated`} trendTone="positive" />
        <StatTile label="Offers available" value={String(BENEFIT_OFFERS.length)} />
        <StatTile label="Saved this year" value={formatCurrency(totalSaved)} trend="Average per employee" />
        <StatTile label="EWA drawdowns" value="11" trend="This pay cycle" />
      </div>

      <div className="mt-6">
        <PanelCard title="Everyday offers" subtitle="Available in the Employment Hero Work app">
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {BENEFIT_OFFERS.map((offer) => (
              <li key={offer.id} className="flex flex-col gap-2 rounded-eh border border-line px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.98rem] font-bold text-ink-strong">{offer.brand}</p>
                    <p className="text-sm font-semibold text-eh-purple">{offer.offer}</p>
                  </div>
                  <Badge tone="neutral">{offer.category}</Badge>
                </div>
                <p className="text-sm leading-relaxed text-ink-soft">{offer.detail}</p>
                <p className="mt-1 text-sm font-semibold text-ink-faint">
                  {formatCurrency(offer.savedThisYear)} saved by your team this year
                </p>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>

      <div className="mt-6">
        <PanelCard title="Earned Wage Access" subtitle="No cost to the business">
          <p className="text-[0.98rem] leading-relaxed text-ink-soft">
            Your team can access up to 50% of wages already earned in the current cycle, capped at
            $1,000. Draws are funded by Employment Hero and reconciled in your next pay run, so there is
            no impact on your cash flow.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Access limit", value: "50% / $1,000" },
              { label: "Employer cost", value: formatCurrency(0) },
              { label: "Turnover reduction", value: "18%" },
            ].map((item) => (
              <div key={item.label} className="rounded-eh border border-line bg-surface-tint px-5 py-4">
                <p className="text-xl font-extrabold text-ink-strong">{item.value}</p>
                <p className="text-sm text-ink-faint">{item.label}</p>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>
    </PlatformLayout>
  );
}
