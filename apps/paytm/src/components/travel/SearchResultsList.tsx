import { Plane } from "lucide-react";
import { flightResults } from "../../data/travel";
import { formatInr, formatDuration } from "../../lib/format";
import { useDisclosure } from "../../hooks/useDisclosure";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { SuccessModal } from "../shared/SuccessModal";
import { useState } from "react";

interface SearchResultsListProps {
  fromName: string;
  toName: string;
}

/** Mock flight results list with a book action per row. */
export function SearchResultsList({ fromName, toName }: SearchResultsListProps) {
  const success = useDisclosure();
  const [picked, setPicked] = useState(flightResults[0]);

  return (
    <section aria-label="Flight results" className="rounded-2xl bg-card p-6 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-ink">
          {fromName} → {toName} · {flightResults.length} flights found
        </h2>
        <p className="text-xs text-ink-faint">Demo fares — sorted by departure</p>
      </div>
      <ul className="mt-4 divide-y divide-hairline">
        {flightResults.map((f) => (
          <li key={f.id} className="flex flex-wrap items-center gap-4 py-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paytm-sky">
              <Plane aria-hidden="true" className="h-5 w-5 text-paytm-navy" />
            </span>
            <div className="min-w-28">
              <p className="text-sm font-bold text-ink">{f.airline}</p>
              <p className="text-xs text-ink-faint">{f.flightNo}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-base font-extrabold text-ink">{f.depart}</span>
              <span className="flex flex-col items-center text-[10px] text-ink-faint">
                <span>{formatDuration(f.durationMin)}</span>
                <span aria-hidden="true" className="my-0.5 h-px w-16 bg-hairline" />
                <span>{f.stops === 0 ? "Non-stop" : `${f.stops} stop`}</span>
              </span>
              <span className="text-base font-extrabold text-ink">{f.arrive}</span>
            </div>
            {f.stops === 0 ? <Badge tone="green">Non-stop</Badge> : <Badge>Via layover</Badge>}
            <div className="ml-auto flex items-center gap-4">
              <span className="text-lg font-extrabold text-paytm-navy">{formatInr(f.price)}</span>
              <Button
                size="sm"
                onClick={() => {
                  setPicked(f);
                  success.open();
                }}
              >
                Book
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <SuccessModal
        open={success.isOpen}
        onClose={success.close}
        title="Flight Booked"
        lines={[
          { label: "Flight", value: `${picked.airline} ${picked.flightNo}` },
          { label: "Route", value: `${fromName} → ${toName}` },
          { label: "Departure", value: picked.depart },
          { label: "Fare", value: formatInr(picked.price) },
        ]}
      />
    </section>
  );
}
