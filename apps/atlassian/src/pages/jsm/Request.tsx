import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProductLayout } from "@/components/product/ProductLayout";
import { ButtonLink } from "@/components/ui/Button";
import { Field, Select } from "@/components/ui/Field";
import { getProductApp } from "@/data/apps";
import { REQUEST_STATUSES, type RequestStatus, type ServiceRequest } from "@/data/jsm";
import { getStoredRequest, updateRequestStatus } from "@/lib/jsm";

const APP = getProductApp("jsm");
const NAV = [{ label: "Queues", to: "/jsm", end: true }];

export default function JsmRequestPage() {
  const { key = "" } = useParams();
  const stored = getStoredRequest(key);

  if (!stored) {
    return (
      <ProductLayout app={APP} title="Request not found" nav={NAV}>
        <div className="mx-auto max-w-lg rounded-atl-sm border border-line bg-white p-8 text-center">
          <h1 className="text-xl font-extrabold text-ink-strong">Request not found</h1>
          <p className="mt-2 text-sm text-ink-soft">{key} is not in this service desk.</p>
          <ButtonLink to="/jsm" shape="box" className="mt-6">
            Back to queues
          </ButtonLink>
        </div>
      </ProductLayout>
    );
  }

  return <RequestDetail request={stored} />;
}

function RequestDetail({ request: initial }: { request: ServiceRequest }) {
  const [request, setRequest] = useState(initial);

  return (
    <ProductLayout app={APP} title={`${request.key} · Jira Service Management`} nav={NAV}>
      <article className="mx-auto max-w-3xl rounded-atl-sm border border-line bg-white p-6">
        <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
          {request.type} · {request.key}
        </p>
        <h1 className="mt-2 text-2xl font-extrabold text-ink-strong">{request.summary}</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">{request.description}</p>
        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-ink-faint">Requester</dt>
            <dd className="font-semibold text-ink-strong">{request.requester}</dd>
          </div>
          <div>
            <dt className="text-ink-faint">Assignee</dt>
            <dd className="font-semibold text-ink-strong">{request.assignee}</dd>
          </div>
          <div>
            <dt className="text-ink-faint">SLA</dt>
            <dd className="font-semibold text-ink-strong">{request.sla}</dd>
          </div>
        </dl>
        <Field label="Status" htmlFor="request-status" className="mt-6 max-w-xs">
          <Select
            id="request-status"
            value={request.status}
            onChange={(event) => {
              const status = event.target.value as RequestStatus;
              updateRequestStatus(request.key, status);
              setRequest((current) => ({ ...current, status }));
            }}
          >
            {REQUEST_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </Field>
      </article>
    </ProductLayout>
  );
}
