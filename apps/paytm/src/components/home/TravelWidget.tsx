import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftRight, Sparkles } from "lucide-react";
import { cities, specialFares } from "../../data/travel";
import { formatDayDate, todayIso } from "../../lib/format";
import { Tabs } from "../ui/Tabs";
import { RadioPillGroup } from "../ui/RadioPillGroup";
import { Button } from "../ui/Button";
import { cn } from "../../lib/cn";

const travelTabs = [
  { id: "flights", label: "Flights", icon: <img src="/brand/icons/travel-flights.png" alt="" aria-hidden="true" className="h-6 w-6 object-contain" /> },
  { id: "bus", label: "Bus", icon: <img src="/brand/icons/travel-bus.png" alt="" aria-hidden="true" className="h-6 w-6 object-contain" /> },
  { id: "trains", label: "Trains", icon: <img src="/brand/icons/travel-trains.png" alt="" aria-hidden="true" className="h-6 w-6 object-contain" /> },
  { id: "intl", label: "Intl. Flights", icon: <img src="/brand/icons/travel-intl.png" alt="" aria-hidden="true" className="h-6 w-6 object-contain" /> },
];

/** Home travel search widget with Flights/Bus/Trains/Intl tabs. */
export function TravelWidget() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("flights");
  const [tripType, setTripType] = useState("one-way");
  const [fromCode, setFromCode] = useState("DEL");
  const [toCode, setToCode] = useState("BOM");
  const [fare, setFare] = useState("regular");

  const departDate = useMemo(() => formatDayDate(todayIso()), []);

  const from = cities.find((c) => c.code === fromCode) ?? cities[0];
  const to = cities.find((c) => c.code === toCode) ?? cities[1];

  const swap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  const search = () => {
    const dest = tab === "bus" ? "/bus-tickets" : tab === "trains" ? "/train-tickets" : "/flights";
    navigate(`${dest}?from=${fromCode}&to=${toCode}&trip=${tripType}`);
  };

  return (
    <section aria-label="Book travel" className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
      <div className="rounded-2xl bg-card p-5 shadow-card sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Tabs items={travelTabs} active={tab} onChange={setTab} aria-label="Travel modes" />
          <img src="/brand/paytm-travel-logo.svg" alt="Paytm Travel" className="hidden h-6 sm:block" />
        </div>

        <div className="mt-5 rounded-2xl border border-hairline p-5">
          <RadioPillGroup
            name="trip-type"
            legend="Trip type"
            value={tripType}
            onChange={setTripType}
            options={[
              { value: "one-way", label: "One Way" },
              { value: "round-trip", label: "Round Trip" },
            ]}
          />

          <div className="mt-5 grid items-end gap-5 lg:grid-cols-[1fr_auto_1fr_1fr_1fr_auto]">
            <CityPicker label="From" value={fromCode} onChange={setFromCode} exclude={toCode} display={`${from.name} (${from.code})`} />
            <button
              type="button"
              onClick={swap}
              aria-label="Swap origin and destination"
              className="mb-1 hidden h-9 w-9 items-center justify-center self-center rounded-full border border-hairline text-paytm-cyan transition-colors hover:bg-paytm-sky lg:flex"
            >
              <ArrowLeftRight aria-hidden="true" className="h-4 w-4" />
            </button>
            <CityPicker label="To" value={toCode} onChange={setToCode} exclude={fromCode} display={`${to.name} (${to.code})`} />
            <Field label="Depart" value={departDate} hint="Today" />
            {tripType === "round-trip" ? (
              <Field label="Return" value="Choose Date" hint="Add Return" accent />
            ) : (
              <Field label="Return" value="Add Return" hint="Save more on round trips" accent />
            )}
            <div className="lg:hidden" />
            <Field label="Passenger & Class" value="1 Traveller, Economy" hint="Change in results" className="lg:hidden" />
          </div>

          <div className="mt-5 flex flex-col gap-4 border-t border-hairline pt-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
                Special Fares <span className="font-normal text-ink-faint">(optional)</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
                  <Sparkles aria-hidden="true" className="h-3 w-3" /> Extra Savings
                </span>
              </p>
              <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Special fares">
                {specialFares.map((sf) => (
                  <button
                    key={sf.id}
                    type="button"
                    aria-pressed={fare === sf.id}
                    onClick={() => setFare(sf.id)}
                    className={cn(
                      "rounded-xl border px-3 py-1.5 text-left transition-colors",
                      fare === sf.id
                        ? "border-paytm-cyan bg-paytm-sky/60"
                        : "border-hairline hover:border-paytm-cyan/50",
                    )}
                  >
                    <span className="block text-xs font-bold text-ink">{sf.label}</span>
                    <span className="block text-[10px] text-ink-soft">{sf.note}</span>
                  </button>
                ))}
              </div>
            </div>
            <Button size="lg" onClick={search} className="shrink-0">
              {tab === "bus" ? "Search Buses" : tab === "trains" ? "Search Trains" : "Search Flights"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CityPickerProps {
  label: string;
  value: string;
  onChange: (code: string) => void;
  exclude: string;
  display: string;
}

function CityPicker({ label, value, onChange, exclude, display }: CityPickerProps) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-ink-soft">{label}</span>
      <span className="mt-1 block truncate text-base font-bold text-ink">{display}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border-b border-hairline bg-transparent pb-1.5 text-xs text-ink-soft outline-none focus:border-paytm-cyan"
      >
        {cities
          .filter((c) => c.code !== exclude)
          .map((c) => (
            <option key={c.code} value={c.code}>
              {c.name} ({c.code}) — {c.airport}
            </option>
          ))}
      </select>
    </label>
  );
}

interface FieldProps {
  label: string;
  value: string;
  hint: string;
  accent?: boolean;
  className?: string;
}

function Field({ label, value, hint, accent, className }: FieldProps) {
  return (
    <div className={className}>
      <span className="text-xs font-medium text-ink-soft">{label}</span>
      <span className={cn("mt-1 block text-base font-bold", accent ? "text-paytm-cyan" : "text-ink")}>
        {value}
      </span>
      <span className="mt-1 block border-b border-hairline pb-1.5 text-xs text-ink-faint">{hint}</span>
    </div>
  );
}
