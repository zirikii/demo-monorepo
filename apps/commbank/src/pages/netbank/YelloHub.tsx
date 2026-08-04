import { useState } from "react";
import { Check } from "lucide-react";
import { NetBankLayout } from "@/components/netbank/NetBankLayout";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { FilterChips } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { yelloOffers, yelloTiers } from "@/data/yello";
import { formatDate } from "@/lib/format";
import { readJson, writeJson } from "@/lib/storage";
import { cn } from "@/lib/cn";

const ACTIVATED_KEY = "commbank-demo-yello-offers";
const categories = ["All", "Groceries", "Fuel", "Dining", "Retail", "Travel", "Home"];

export function YelloHubPage() {
  useDocumentTitle("CommBank Yello");
  const { user } = useAuth();
  const [category, setCategory] = useState("All");
  const [activated, setActivated] = useState<string[]>(() =>
    readJson(
      ACTIVATED_KEY,
      yelloOffers.filter((offer) => offer.activated).map((offer) => offer.id),
    ),
  );

  const currentTier =
    yelloTiers.find((tier) => tier.name.endsWith(user?.yelloTier ?? "")) ?? yelloTiers[2]!;
  const nextTier = yelloTiers.find((tier) => tier.order === currentTier.order + 1);

  const visible = yelloOffers.filter((offer) => category === "All" || offer.category === category);

  const toggle = (offerId: string) => {
    setActivated((current) => {
      const next = current.includes(offerId)
        ? current.filter((id) => id !== offerId)
        : [...current, offerId];
      writeJson(ACTIVATED_KEY, next);
      return next;
    });
  };

  return (
    <NetBankLayout title="CommBank Yello">
      <div className="mb-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border-2 border-black bg-surface p-6 lg:col-span-2">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
            Your current tier
          </p>
          <p className="mt-2 text-3xl font-bold text-black">{currentTier.name}</p>
          <p className="mt-2 text-sm text-ink-soft">
            Your tier is reviewed in the first week of each month based on last month&apos;s
            activity. Once you qualify, you keep it for 3 months.
          </p>
          {nextTier ? (
            <div className="mt-5 border-t border-line pt-4">
              <p className="text-sm font-semibold text-black">
                To reach {nextTier.name} you&apos;d need to:
              </p>
              <ul className="mt-2 space-y-1.5">
                {nextTier.criteria.map((item) => (
                  <li key={item} className="text-sm text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-5 border-t border-line pt-4 text-sm font-semibold text-black">
              You&apos;re at the top tier.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
            Your benefits
          </p>
          <ul className="mt-3 space-y-2.5">
            {currentTier.benefits.map((benefit) => (
              <li key={benefit} className="flex gap-2.5 text-sm text-ink-soft">
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-positive" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <ButtonLink to="/commbank-yello#tiers" variant="outline" size="sm">
              Compare tiers
            </ButtonLink>
          </div>
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">
          Your offers
        </h2>
        <FilterChips
          options={categories}
          value={category}
          onChange={setCategory}
          ariaLabel="Filter offers by category"
        />

        {visible.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="No offers in that category"
              description="Choose a different category to see what's available."
            />
          </div>
        ) : (
          <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((offer) => {
              const isActive = activated.includes(offer.id);
              return (
                <li
                  key={offer.id}
                  className={cn(
                    "flex flex-col rounded-2xl border-2 bg-surface p-5",
                    isActive ? "border-cba-yellow" : "border-line",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-black">{offer.merchant}</h3>
                    <Badge tone="neutral">{offer.category}</Badge>
                  </div>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">{offer.offer}</p>
                  <p className="mt-3 text-xs text-ink-muted">Expires {formatDate(offer.expires)}</p>
                  <Button
                    className="mt-4"
                    size="sm"
                    variant={isActive ? "outline" : "primary"}
                    aria-pressed={isActive}
                    onClick={() => toggle(offer.id)}
                  >
                    {isActive ? "Activated" : "Activate offer"}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <p className="mt-8 text-xs text-ink-muted">
        Offers are fabricated. Activating one stores a flag in your browser and nothing else
        happens.
      </p>
    </NetBankLayout>
  );
}
