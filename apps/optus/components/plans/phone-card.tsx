import type { Phone } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { Smartphone } from "lucide-react";

export function PhoneCard({ phone }: { phone: Phone }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-optus-yellow-light">
          <Smartphone className="h-9 w-9 text-optus-ink" aria-hidden="true" />
        </div>
        {phone.tag ? <Badge>{phone.tag}</Badge> : null}
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-optus-ink-soft">
        {phone.brand}
      </p>
      <h3 className="text-lg font-bold text-optus-ink">{phone.name}</h3>
      <p className="mt-1 text-sm text-optus-ink-soft">
        {phone.storage} · {phone.colour}
      </p>

      <div className="mt-4 flex-1 space-y-1 text-sm">
        <p className="text-2xl font-bold text-optus-ink">
          {formatAud(phone.monthly, { cents: true })}
          <span className="text-sm font-semibold text-optus-ink-soft">/mth</span>
        </p>
        <p className="text-xs text-optus-ink-soft">
          over {phone.term} months, or {formatAud(phone.outright)} outright
        </p>
      </div>

      <button
        type="button"
        className="mt-5 inline-flex h-11 w-full shrink-0 items-center justify-center rounded-md bg-optus-yellow px-4 text-sm font-semibold text-optus-ink hover:bg-optus-yellow-dark"
      >
        See device
      </button>
    </article>
  );
}
