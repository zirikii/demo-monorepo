import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ProductLayout } from "@/components/product/ProductLayout";
import { getProductApp } from "@/data/apps";
import { SERVICE_QUEUES, type RequestType } from "@/data/jsm";
import { readRequests } from "@/lib/jsm";

const APP = getProductApp("jsm");
const NAV = [{ label: "Queues", to: "/jsm", end: true }];

export default function JsmQueuesPage() {
  const [queue, setQueue] = useState<RequestType | "All">("All");
  const requests = readRequests();
  const filtered = useMemo(
    () => (queue === "All" ? requests : requests.filter((request) => request.type === queue)),
    [queue, requests],
  );

  return (
    <ProductLayout app={APP} title="Queues · Jira Service Management" nav={NAV}>
      <h1 className="text-2xl font-extrabold text-ink-strong">Queues</h1>
      <p className="mt-1 text-sm text-ink-soft">Northline IT service desk</p>

      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Queues">
        {(["All", ...SERVICE_QUEUES] as const).map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={queue === item}
            onClick={() => setQueue(item)}
            className={
              queue === item
                ? "focus-atl rounded-full bg-atl-blue-deep px-3 py-1.5 text-sm font-semibold text-white"
                : "focus-atl rounded-full border border-line px-3 py-1.5 text-sm font-medium text-ink-soft hover:bg-surface-deep"
            }
          >
            {item}
          </button>
        ))}
      </div>

      <ul className="mt-5 divide-y divide-line rounded-atl-sm border border-line bg-white">
        {filtered.map((request) => (
          <li key={request.key}>
            <Link
              to={`/jsm/requests/${request.key}`}
              className="focus-atl flex flex-wrap items-center gap-3 px-4 py-3 hover:bg-surface-tint"
            >
              <span className="w-20 shrink-0 text-sm font-semibold text-atl-blue">
                {request.key}
              </span>
              <span className="min-w-0 flex-1 font-semibold text-ink-strong">
                {request.summary}
              </span>
              <span className="text-xs font-semibold text-ink-faint">{request.type}</span>
              <span className="text-xs font-semibold text-ink-soft">{request.status}</span>
              <span className="text-xs text-ink-faint">{request.sla}</span>
            </Link>
          </li>
        ))}
      </ul>
    </ProductLayout>
  );
}
