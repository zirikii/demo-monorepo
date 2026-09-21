import { ChevronRight, Search, Shield, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HomeIndicator } from "../components/shell/HomeIndicator";
import { StatusBar } from "../components/shell/StatusBar";
import { Navbar } from "../components/ui/Navbar";

const GROUPS: { title: string; items: { label: string; detail: string; badge?: boolean; to?: string; danger?: boolean }[] }[] = [
  {
    title: "Account",
    items: [
      { label: "Security", detail: "Manage your account security", badge: true, to: "/security" },
      { label: "Login options", detail: "Manage your login method", badge: true },
      { label: "Verified Account Center", detail: "View and manage your Gojek and GoPay accounts linked to your e-KTP", badge: true, to: "/vac" },
      { label: "Privacy", detail: "Manage privacy in the GoPay app" },
    ],
  },
  {
    title: "Payments",
    items: [
      { label: "Linked Apps", detail: "List of apps that you link to GoPay" },
      { label: "Shared wallets", detail: "View and manage family account" },
    ],
  },
  {
    title: "App preferences",
    items: [
      { label: "Quick action", detail: "Check how to get quicker access to GoPay from phone", badge: true },
      { label: "Accessibility", detail: "Customise your GoPay app to make it easier to use" },
      { label: "Notification", detail: "Manage notification in GoPay app" },
      { label: "Change language", detail: "Pick the language setting you'd like to use here" },
    ],
  },
];

export function SettingsPage() {
  const navigate = useNavigate();
  return (
    <div className="relative flex h-full flex-col bg-bg-primary">
      <StatusBar />
      <Navbar title="Settings" onBack={() => navigate("/account-safety")} />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8">
        <label className="mb-4 flex items-center gap-2 rounded-xl bg-bg-quaternary px-3 py-2 text-sm text-text-body">
          <Search className="h-4 w-4" aria-hidden="true" />
          <input aria-label="Search settings" placeholder="What are you looking for settings?" className="w-full bg-transparent outline-none" />
        </label>
        {GROUPS.map((group) => (
          <section key={group.title} className="mb-4">
            <h2 className="mb-2 text-xs font-bold text-text-body">{group.title}</h2>
            <div className="overflow-hidden rounded-2xl bg-card">
              {group.items.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => item.to && navigate(item.to)}
                  className="flex w-full items-center gap-3 border-b border-border-mute px-3 py-3 text-left last:border-b-0"
                >
                  <Shield className="h-5 w-5 text-icon-default" aria-hidden="true" />
                  <span className="flex-1">
                    <span className="flex items-center gap-2 text-title-tiny font-semibold">
                      {item.label}
                      {item.badge ? <span className="rounded-full bg-[#e7f6ea] px-1.5 text-[10px] font-bold text-gopay-active">New</span> : null}
                    </span>
                    <span className="block text-xs text-text-body">{item.detail}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-icon-default" aria-hidden="true" />
                </button>
              ))}
            </div>
          </section>
        ))}
        <section>
          <h2 className="mb-2 text-xs font-bold text-text-body">Others</h2>
          <div className="flex items-center gap-3 rounded-2xl bg-[#fff1f2] px-3 py-3 text-danger">
            <Trash2 className="h-5 w-5" aria-hidden="true" />
            <span>
              <span className="block text-title-tiny font-semibold">Delete account</span>
              <span className="block text-xs">Find out how you can delete your account</span>
            </span>
          </div>
        </section>
      </div>
      <HomeIndicator />
    </div>
  );
}
