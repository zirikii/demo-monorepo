import { ShieldCheck, ShieldOff, UserPlus } from "lucide-react";
import { useProperty } from "@/features/property/PropertyProvider";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { AskSupport, Badge, PageTitle, Panel } from "./ui";

export function TeamPage() {
  useDocumentTitle("Users");
  const { team, profile } = useProperty();

  return (
    <div className="mx-auto max-w-5xl">
      <PageTitle
        title="Users"
        body="Everyone who can log in to SiteMinder for this property."
        actions={
          <AskSupport
            step="account.user"
            label="Add a user"
            className="btn-primary text-white hover:no-underline"
          >
            <UserPlus className="size-4" aria-hidden /> Invite user
          </AskSupport>
        }
      />
      <Panel>
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-ink-faint">
            <tr>
              <th className="pb-3 font-semibold">Name</th>
              <th className="pb-3 font-semibold">Role</th>
              <th className="pb-3 font-semibold">Two-factor</th>
              <th className="pb-3 font-semibold">Last active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {team.map((u) => (
              <tr key={u.id}>
                <td className="py-3 pr-4">
                  <span className="block font-semibold text-heading">
                    {u.name}{" "}
                    {u.email === profile.email && (
                      <span className="text-xs font-normal text-ink-faint">(you)</span>
                    )}
                  </span>
                  <span className="text-xs text-ink-faint">{u.email}</span>
                </td>
                <td className="py-3 pr-4">
                  <Badge tone={u.role === "Owner" || u.role === "Admin" ? "info" : "neutral"}>
                    {u.role}
                  </Badge>
                </td>
                <td className="py-3 pr-4">
                  {u.mfa ? (
                    <span className="inline-flex items-center gap-1 text-positive">
                      <ShieldCheck className="size-4" aria-hidden /> On
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-caution">
                      <ShieldOff className="size-4" aria-hidden /> Off
                    </span>
                  )}
                </td>
                <td className="py-3 text-ink-soft">{u.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
      <p className="mt-4 text-sm text-ink-faint">
        Locked out or lost your authenticator?{" "}
        <AskSupport step="account.login" label="I can't log in">
          Get help logging in
        </AskSupport>
      </p>
    </div>
  );
}
