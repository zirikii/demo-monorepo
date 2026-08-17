import { Mail, Phone } from "lucide-react";
import { PanelCard } from "@/components/portal/PanelCard";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { ADVISER_NAV } from "@/components/portal/nav";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { BDMS } from "@/data/company";
import { CLIENTS, PRACTICE } from "@/data/platform";
import { SITE } from "@/data/site";
import { formatCurrencyWhole, formatNumber } from "@/lib/format";

const SERVICE_REQUESTS = [
  { id: "sr-001", reference: "SR-40182", subject: "In-specie transfer — Hollis Family Trust", status: "In progress", opened: "2026-08-11" },
  { id: "sr-002", reference: "SR-40166", subject: "Pension commencement — Marguerite Ferreira", status: "Awaiting client", opened: "2026-08-06" },
  { id: "sr-003", reference: "SR-40140", subject: "Third-party payment authority — Peregrine Family Office", status: "Completed", opened: "2026-07-28" },
  { id: "sr-004", reference: "SR-40119", subject: "SMSF establishment — Oleander SMSF", status: "Completed", opened: "2026-07-15" },
];

const STATUS_TONES = {
  "In progress": "caution",
  "Awaiting client": "info",
  Completed: "positive",
} as const;

export default function AdviserPracticePage() {
  const bdm = BDMS.find((candidate) => candidate.name === PRACTICE.bdm);
  const fum = CLIENTS.reduce((total, client) => total + client.balance, 0);

  return (
    <PortalLayout
      portal="AdviserHUB"
      nav={ADVISER_NAV}
      contextLabel="Practice"
      contextValue={PRACTICE.name}
      contextNote={`${PRACTICE.afsl} · ${PRACTICE.adviserCount} advisers`}
      title="Practice"
      description="Your practice details, support contacts and service requests"
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <PanelCard title="Practice details">
          <dl className="flex flex-col divide-y divide-line-soft">
            {[
              { label: "Practice", value: PRACTICE.name },
              { label: "Licensee", value: PRACTICE.licensee },
              { label: "AFSL", value: PRACTICE.afsl },
              { label: "Advisers", value: formatNumber(PRACTICE.adviserCount) },
              { label: "Clients", value: formatNumber(CLIENTS.length) },
              { label: "Funds under management", value: formatCurrencyWhole(fum) },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <dt className="text-sm text-ink-faint">{item.label}</dt>
                <dd className="text-right text-sm font-semibold text-ink-strong">{item.value}</dd>
              </div>
            ))}
          </dl>
        </PanelCard>

        <div className="flex flex-col gap-6">
          {bdm ? (
            <PanelCard title="Your Business Development Manager" action={{ label: "Find another BDM", to: "/contact-us/find-a-bdm/" }}>
              <div className="flex items-start gap-4">
                <Avatar name={bdm.name} size="lg" />
                <div className="flex min-w-0 flex-col gap-1.5">
                  <p className="font-display text-lg font-semibold text-ink-strong">{bdm.name}</p>
                  <p className="text-sm text-ink-faint">
                    {bdm.title} · {bdm.state}
                  </p>
                  <Badge tone="neutral" className="w-fit">
                    {bdm.segment}
                  </Badge>
                  <p className="mt-1 flex items-center gap-2 text-sm text-ink-soft">
                    <Phone aria-hidden className="h-3.5 w-3.5" />
                    {bdm.phone}
                  </p>
                  <p className="flex items-center gap-2 truncate text-sm text-ink-soft">
                    <Mail aria-hidden className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{bdm.email}</span>
                  </p>
                </div>
              </div>
            </PanelCard>
          ) : null}

          <PanelCard title="Client services">
            <p className="text-[0.95rem] leading-relaxed text-ink-soft">
              Platform, application and transaction queries are handled by the Sydney-based client
              services desk.
            </p>
            <p className="mt-3 flex items-center gap-2 font-semibold text-h24-teal-dark">
              <Phone aria-hidden className="h-4 w-4" />
              {SITE.adviserPhone}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-ink-soft">
              <Mail aria-hidden className="h-4 w-4" />
              {SITE.adviserEmail}
            </p>
            <ButtonLink to="/contact-us/" variant="secondary" size="sm" className="mt-4 w-fit">
              Raise an enquiry
            </ButtonLink>
          </PanelCard>
        </div>
      </div>

      <PanelCard className="mt-6" title="Service requests" description="Open and recently completed">
        <ul className="flex flex-col divide-y divide-line-soft">
          {SERVICE_REQUESTS.map((request) => (
            <li key={request.id} className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0">
              <span className="w-24 shrink-0 font-mono text-xs text-ink-faint">{request.reference}</span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink-strong">
                {request.subject}
              </span>
              <Badge tone={STATUS_TONES[request.status as keyof typeof STATUS_TONES]}>
                {request.status}
              </Badge>
            </li>
          ))}
        </ul>
      </PanelCard>

      <p className="mt-8 text-xs text-ink-faint">
        Practice details, BDM contacts and service requests shown here are invented for a
        demonstration build.
      </p>
    </PortalLayout>
  );
}
