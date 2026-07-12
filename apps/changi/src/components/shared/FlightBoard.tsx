import { formatTime } from "@/lib/format";
import { statusTone, type Flight } from "@/lib/flights";
import { cn } from "@/lib/cn";

interface FlightBoardProps {
  flights: Flight[];
  direction: "departures" | "arrivals";
}

/** Airport-style arrivals/departures board (mock, deterministic data). */
export function FlightBoard({ flights, direction }: FlightBoardProps) {
  const cityLabel = direction === "departures" ? "Destination" : "Origin";

  if (flights.length === 0) {
    return (
      <div className="rounded-card border border-sand-deep bg-card p-10 text-center text-ink-soft">
        No flights match your search. Try a different city or airline.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-card border border-sand-deep bg-card shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="bg-plum text-xs uppercase tracking-wider text-white">
              <th scope="col" className="px-4 py-3 font-semibold">Time</th>
              <th scope="col" className="px-4 py-3 font-semibold">Flight</th>
              <th scope="col" className="px-4 py-3 font-semibold">Airline</th>
              <th scope="col" className="px-4 py-3 font-semibold">{cityLabel}</th>
              <th scope="col" className="px-4 py-3 font-semibold">Terminal</th>
              <th scope="col" className="px-4 py-3 font-semibold">Gate</th>
              <th scope="col" className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-deep">
            {flights.map((flight) => (
              <tr key={flight.id} className="hover:bg-sand-alt">
                <td className="whitespace-nowrap px-4 py-3 font-semibold text-ink">
                  {formatTime(flight.time)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-ink">{flight.flightNo}</td>
                <td className="px-4 py-3 text-ink-soft">{flight.airline}</td>
                <td className="px-4 py-3 text-ink">
                  {flight.city} <span className="text-ink-faint">({flight.code})</span>
                </td>
                <td className="px-4 py-3 text-ink-soft">{flight.terminal}</td>
                <td className="px-4 py-3 text-ink-soft">{flight.gate}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                      statusTone(flight.status),
                    )}
                  >
                    {flight.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
