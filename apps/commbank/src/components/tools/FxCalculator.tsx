import { useMemo, useState } from "react";
import { SelectField, TextField } from "@/components/ui/Field";
import { fxRates, retailFxMarginPct } from "@/data/fx";
import { convertCurrency } from "@/lib/calculators";
import { formatCurrency } from "@/lib/format";

export function FxCalculator() {
  const [amount, setAmount] = useState("1000");
  const [code, setCode] = useState("USD");

  const selected = fxRates.find((rate) => rate.code === code) ?? fxRates[0]!;

  const converted = useMemo(
    () => convertCurrency(Number(amount) || 0, selected.rate, retailFxMarginPct),
    [amount, selected],
  );

  const formatted = new Intl.NumberFormat("en-AU", {
    minimumFractionDigits: selected.code === "IDR" || selected.code === "JPY" ? 0 : 2,
    maximumFractionDigits: selected.code === "IDR" || selected.code === "JPY" ? 0 : 2,
  }).format(converted);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
        <TextField
          label="Amount in Australian dollars"
          prefix="$"
          inputMode="decimal"
          value={amount}
          onChange={(event) => setAmount(event.target.value.replace(/[^0-9.]/g, ""))}
          hint="Enter the amount you want to convert"
        />
        <SelectField
          label="Convert to"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          hint="Indicative retail rates including a demo margin"
        >
          {fxRates.map((rate) => (
            <option key={rate.code} value={rate.code}>
              {rate.code} — {rate.name}
            </option>
          ))}
        </SelectField>

        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[360px] text-left text-sm">
            <caption className="border-b border-line bg-surface-tint px-5 py-3 text-left text-sm font-bold text-black">
              Indicative rates per 1 AUD
            </caption>
            <thead>
              <tr className="border-b border-line bg-surface-tint text-xs uppercase tracking-wide text-ink-muted">
                <th scope="col" className="px-5 py-2.5 font-semibold">
                  Currency
                </th>
                <th scope="col" className="px-5 py-2.5 text-right font-semibold">
                  Mid-market
                </th>
                <th scope="col" className="px-5 py-2.5 text-right font-semibold">
                  Retail
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {fxRates.map((rate) => (
                <tr key={rate.code}>
                  <th scope="row" className="px-5 py-2.5 font-medium text-ink">
                    {rate.code} · {rate.name}
                  </th>
                  <td className="px-5 py-2.5 text-right tabular-nums text-ink-soft">
                    {rate.rate.toLocaleString("en-AU", { maximumFractionDigits: 4 })}
                  </td>
                  <td className="px-5 py-2.5 text-right font-semibold tabular-nums text-black">
                    {convertCurrency(1, rate.rate, retailFxMarginPct).toLocaleString("en-AU", {
                      maximumFractionDigits: 4,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>

      <aside
        aria-live="polite"
        className="h-fit rounded-2xl border-2 border-black bg-surface p-6 lg:sticky lg:top-32"
      >
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
          You&apos;ll receive approximately
        </p>
        <p className="mt-2 break-words text-4xl font-bold tracking-tight text-black">
          {selected.symbol}
          {formatted}
        </p>
        <p className="text-sm text-ink-soft">
          {selected.code} · {selected.name}
        </p>
        <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-ink-soft">You send</dt>
            <dd className="font-semibold text-black tabular-nums">
              {formatCurrency(Number(amount) || 0)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-soft">Mid-market rate</dt>
            <dd className="font-semibold text-black tabular-nums">{selected.rate}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-soft">Retail margin</dt>
            <dd className="font-semibold text-black tabular-nums">{retailFxMarginPct}%</dd>
          </div>
        </dl>
        <p className="mt-5 text-xs leading-relaxed text-ink-muted">
          Indicative only. Demo rates are static and do not reflect live currency markets.
        </p>
      </aside>
    </div>
  );
}
