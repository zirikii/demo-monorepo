import { appPromos } from "../../data/home";
import { AppStoreBadges } from "../shared/AppStoreBadges";

/** Three pastel app-feature promo cards with a phone-mock silhouette. */
export function AppPromoRow() {
  return (
    <section aria-label="App features" className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
      <div className="grid gap-4 md:grid-cols-3">
        {appPromos.map((promo) => (
          <article
            key={promo.id}
            style={{ backgroundColor: promo.tint }}
            className="flex items-center justify-between gap-3 overflow-hidden rounded-2xl p-5 shadow-card"
          >
            <div className="min-w-0">
              <h3 className="text-sm font-extrabold leading-snug text-ink">{promo.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{promo.body}</p>
              <div className="mt-3 origin-left scale-75">
                <AppStoreBadges />
              </div>
            </div>
            <PhoneMock />
          </article>
        ))}
      </div>
    </section>
  );
}

function PhoneMock() {
  return (
    <div
      aria-hidden="true"
      className="flex h-28 w-14 shrink-0 flex-col gap-1 rounded-xl border-4 border-paytm-navy bg-card p-1.5 shadow-card"
    >
      <div className="h-1 w-6 self-center rounded-full bg-paytm-navy/30" />
      <div className="h-3 rounded bg-paytm-sky" />
      <div className="h-2 rounded bg-surface" />
      <div className="h-2 w-3/4 rounded bg-surface" />
      <div className="mt-auto h-4 rounded bg-paytm-cyan/70" />
    </div>
  );
}
