import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { cities, specialFares } from "../../data/travel";
import { formatDayDate, todayIso } from "../../lib/format";
import { RadioPillGroup } from "../ui/RadioPillGroup";
import { SelectField } from "../ui/SelectField";
import { Button } from "../ui/Button";
import { cn } from "../../lib/cn";

export interface FlightSearch {
  fromCode: string;
  toCode: string;
  tripType: string;
  fare: string;
}

interface FlightSearchFormProps {
  initialFrom?: string;
  initialTo?: string;
  onSearch: (search: FlightSearch) => void;
}

/** Full flight search card used on /flights. */
export function FlightSearchForm({ initialFrom = "DEL", initialTo = "BOM", onSearch }: FlightSearchFormProps) {
  const [tripType, setTripType] = useState("one-way");
  const [fromCode, setFromCode] = useState(initialFrom);
  const [toCode, setToCode] = useState(initialTo);
  const [fare, setFare] = useState("regular");

  const swap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  return (
    <form
      aria-label="Search flights"
      className="rounded-2xl bg-card p-6 shadow-float"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch({ fromCode, toCode, tripType, fare });
      }}
    >
      <RadioPillGroup
        name="flight-trip-type"
        legend="Trip type"
        value={tripType}
        onChange={setTripType}
        options={[
          { value: "one-way", label: "One Way" },
          { value: "round-trip", label: "Round Trip" },
        ]}
      />

      <div className="mt-5 grid items-end gap-5 lg:grid-cols-[1fr_auto_1fr_1fr_1fr]">
        <SelectField
          label="From"
          value={fromCode}
          onChange={(e) => setFromCode(e.target.value)}
          options={cities.filter((c) => c.code !== toCode).map((c) => ({ value: c.code, label: `${c.name} (${c.code})` }))}
        />
        <button
          type="button"
          onClick={swap}
          aria-label="Swap origin and destination"
          className="mb-1 hidden h-9 w-9 items-center justify-center self-end rounded-full border border-hairline text-paytm-cyan transition-colors hover:bg-paytm-sky lg:flex"
        >
          <ArrowLeftRight aria-hidden="true" className="h-4 w-4" />
        </button>
        <SelectField
          label="To"
          value={toCode}
          onChange={(e) => setToCode(e.target.value)}
          options={cities.filter((c) => c.code !== fromCode).map((c) => ({ value: c.code, label: `${c.name} (${c.code})` }))}
        />
        <div>
          <span className="text-xs font-medium text-ink-soft">Depart</span>
          <span className="mt-1 block border-b border-hairline pb-2 text-sm font-bold text-ink">
            {formatDayDate(todayIso())}
          </span>
        </div>
        <div>
          <span className="text-xs font-medium text-ink-soft">Passenger & Class</span>
          <span className="mt-1 block border-b border-hairline pb-2 text-sm font-bold text-ink">
            1 Traveller, Economy
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-hairline pt-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Special fares">
          {specialFares.map((sf) => (
            <button
              key={sf.id}
              type="button"
              aria-pressed={fare === sf.id}
              onClick={() => setFare(sf.id)}
              className={cn(
                "rounded-xl border px-3 py-1.5 text-left transition-colors",
                fare === sf.id ? "border-paytm-cyan bg-paytm-sky/60" : "border-hairline hover:border-paytm-cyan/50",
              )}
            >
              <span className="block text-xs font-bold text-ink">{sf.label}</span>
              <span className="block text-[10px] text-ink-soft">{sf.note}</span>
            </button>
          ))}
        </div>
        <Button type="submit" size="lg" className="shrink-0">
          Search Flights
        </Button>
      </div>
    </form>
  );
}
