import Link from "next/link";
import { Smartphone } from "lucide-react";
import type { Phone } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";

export function PhoneCard({ phone }: { phone: Phone }) {
  return (
    <div className="flex flex-col rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="flex h-32 items-center justify-center rounded-md bg-surface-subtle">
        <Smartphone className="h-16 w-16 text-optus-teal" aria-hidden="true" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-optus-ink/50">
          {phone.brand}
        </p>
        {phone.tag ? <Badge>{phone.tag}</Badge> : null}
      </div>
      <h3 className="mt-1 text-lg font-bold text-optus-ink">{phone.name}</h3>
      <p className="text-sm text-optus-ink/60">{phone.storage}</p>
      <p className="mt-3 text-sm text-optus-ink/70">
        <span className="text-2xl font-extrabold text-optus-ink">
          {formatAud(phone.price36, { cents: true })}
        </span>
        /mth over 36 months
      </p>
      <p className="text-xs text-optus-ink/60">or {formatAud(phone.priceOutright)} outright</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {phone.colours.map((c) => (
          <span key={c} className="rounded-full bg-surface-muted px-2 py-0.5 text-xs text-optus-ink/70">
            {c}
          </span>
        ))}
      </div>
      <Link
        href="/login"
        className="focus-ring mt-5 inline-flex h-11 items-center justify-center rounded-md bg-optus-teal px-5 text-sm font-semibold text-white hover:bg-optus-teal-dark"
      >
        View device
      </Link>
    </div>
  );
}
