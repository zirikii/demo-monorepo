import { useMemo, useState } from "react";
import { foreignExchangeRates } from "@/data/rates";
import { convertCurrency } from "@/lib/calculators";
import { formatCurrency, formatNumber } from "@/lib/format";
import { SelectField, TextField } from "../ui/Field";

export function ForeignExchangeCalculator() {
  const [amount, setAmount] = useState(1000);
  const [code, setCode] = useState("USD");

  const selected = foreignExchangeRates.find((entry) => entry.code === code);
  const result = useMemo(
    () => convertCurrency(amount, selected?.rate ?? 0),
    [amount, selected?.rate],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
        <TextField
          label="Amount in Australian dollars"
          type="number"
          min={0}
          step={50}
          prefix="$"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <SelectField
          label="Convert to"
          value={code}
          onChange={(event) => setCode(event.target.value)}
        >
          {foreignExchangeRates.map((entry) => (
            <option key={entry.code} value={entry.code}>
              {entry.code} — {entry.currency}
            </option>
          ))}
        </SelectField>
        <p className="text-[13px] leading-relaxed text-ink-faint">
          Indicative rates for online transfers, shown for demo purposes only. The rate applied to a
          real transaction is set at the time it is processed.
        </p>
      </form>

      <div className="rounded-cba-lg border border-line-soft bg-surface p-8 shadow-cba">
        <p className="text-[13px] font-bold uppercase tracking-wider text-ink-faint">
          {formatCurrency(amount)} converts to
        </p>
        <p data-testid="fx-result" className="mt-2 text-4xl font-extrabold text-ink">
          {formatNumber(Number(result.converted.toFixed(2)))} {code}
        </p>
        <p className="mt-4 text-[15px] text-ink-soft">
          Rate: 1 AUD = {formatNumber(result.rate)} {code}
        </p>

        <table className="mt-8 w-full border-collapse text-left text-sm">
          <caption className="sr-only">Indicative foreign exchange rates</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="pb-2 font-bold text-ink">
                Currency
              </th>
              <th scope="col" className="pb-2 text-right font-bold text-ink">
                1 AUD buys
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {foreignExchangeRates.slice(0, 8).map((entry) => (
              <tr key={entry.code}>
                <th scope="row" className="py-2 font-normal text-ink-soft">
                  {entry.code} — {entry.currency}
                </th>
                <td className="py-2 text-right font-bold text-ink">{formatNumber(entry.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
