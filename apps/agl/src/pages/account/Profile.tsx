import { AccountLayout } from "@/components/account/AccountLayout";
import { household } from "@/data/account";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function AccountProfilePage() {
  useDocumentTitle("Profile");
  const { user } = useAuth();
  const { open } = useAssistant();
  const rows = [
    { label: "Name", value: `${user?.firstName ?? ""} ${user?.lastName ?? ""}` },
    { label: "Email", value: user?.email ?? "" },
    { label: "Mobile", value: household.mobileNumber },
    { label: "Supply address", value: household.address },
    { label: "Mailing address", value: household.mailingAddress, step: "account.address", ask: "Update my mailing address" },
    { label: "Concession", value: household.concession ? household.concession.type : "None added", step: "account.concession", ask: "Add a concession card" },
    { label: "Payment method", value: `${household.savedCard.brand} •••• ${household.savedCard.last4}`, step: "billing.directdebit", ask: "Set up direct debit" },
  ];
  return (
    <AccountLayout title="Profile">
      <dl className="divide-y divide-line-soft rounded-agl-lg border border-line-soft bg-white">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[200px_1fr_auto] sm:items-center">
            <dt className="text-sm font-bold text-ink-soft">{row.label}</dt>
            <dd className="text-ink">{row.value}</dd>
            {row.step && (
              <button type="button" onClick={() => open({ step: row.step, label: row.ask })} className="justify-self-start text-sm font-bold text-agl-blue hover:underline">
                Update
              </button>
            )}
          </div>
        ))}
      </dl>
    </AccountLayout>
  );
}
