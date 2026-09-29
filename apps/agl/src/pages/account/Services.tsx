import { AccountLayout } from "@/components/account/AccountLayout";
import { ServiceIcon } from "@/components/account/ServiceIcon";
import { Badge } from "@/components/ui/Badge";
import { services } from "@/data/account";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const helpStep = { electricity: "account.plan", gas: "meters", internet: "netmob", mobile: "mobile.usage" } as const;

export function AccountServicesPage() {
  useDocumentTitle("My services");
  const { open } = useAssistant();
  return (
    <AccountLayout title="My services">
      <ul className="grid gap-4 md:grid-cols-2">
        {services.map((s) => (
          <li key={s.id} className="rounded-agl-lg border border-line-soft bg-white p-6 shadow-agl">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-agl-sky text-agl-blue">
                <ServiceIcon kind={s.kind} className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <h2 className="text-lg font-extrabold text-ink">{s.name}</h2>
                <p className="text-sm text-ink-soft">{s.plan}</p>
              </div>
              <Badge tone={s.status === "active" ? "positive" : "caution"}>{s.status === "active" ? "Active" : "Pending"}</Badge>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-ink-faint">Account number</dt>
                <dd className="font-bold text-ink">{s.accountNumber}</dd>
              </div>
              <div>
                <dt className="text-ink-faint">Details</dt>
                <dd className="font-bold text-ink">{s.detail}</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => open({ step: helpStep[s.kind], label: `Help with my ${s.name.toLowerCase()}` })}
              className="mt-4 text-sm font-bold text-agl-blue hover:underline"
            >
              Get help with {s.name.toLowerCase()} →
            </button>
          </li>
        ))}
      </ul>
    </AccountLayout>
  );
}
