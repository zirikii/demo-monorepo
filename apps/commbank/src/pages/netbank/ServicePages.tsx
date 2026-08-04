import {
  Bell,
  Check,
  Download,
  Laptop,
  LockKeyhole,
  Mail,
  MessageSquare,
  Save,
  ShieldCheck,
  Smartphone,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { messages, statements } from "@/data/banking";
import { formatDate } from "@/lib/format";
import { readStored, writeStored } from "@/lib/storage";

export function StatementsPage() {
  const download = (period: string) => {
    const blob = new Blob([`CommBank demo statement\n${period}\nFictional data only.`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `commbank-demo-${period.toLowerCase().replaceAll(" ", "-")}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div>
      <h1 className="text-3xl font-bold">Statements</h1>
      <p className="mt-2 text-cba-ink-soft">Download simulated text statements containing fictional data.</p>
      <div className="mt-7 surface-card overflow-hidden">
        {statements.map((statement) => (
          <div key={`${statement.account}-${statement.period}`} className="flex items-center justify-between gap-4 border-b border-cba-line p-5 last:border-0">
            <div><h2 className="font-semibold">{statement.account}</h2><p className="mt-1 text-xs text-cba-muted">{statement.period} · Created {formatDate(statement.created)}</p></div>
            <Button variant="outline" aria-label={`Download ${statement.period} statement`} onClick={() => download(statement.period)}><Download aria-hidden="true" className="h-4 w-4" /> Download</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InboxPage() {
  const [read, setRead] = useState<string[]>(() => readStored("commbank-demo-read-messages", []));
  const toggle = (id: string) => {
    const next = read.includes(id) ? read.filter((item) => item !== id) : [...read, id];
    setRead(next);
    writeStored("commbank-demo-read-messages", next);
  };
  return (
    <div>
      <div className="flex items-center gap-3"><Mail aria-hidden="true" className="h-7 w-7 text-cba-positive" /><h1 className="text-3xl font-bold">Inbox</h1></div>
      <p className="mt-2 text-cba-ink-soft">Secure messages for your demo profile.</p>
      <div className="mt-7 space-y-3">
        {messages.map((message) => {
          const isRead = read.includes(message.id);
          return (
            <button key={message.id} type="button" onClick={() => toggle(message.id)} className="surface-card flex w-full items-center gap-4 p-5 text-left">
              <span className={isRead ? "h-2.5 w-2.5 rounded-full bg-cba-line" : "h-2.5 w-2.5 rounded-full bg-cba-yellow"} />
              <div className="flex-1"><h2 className={isRead ? "font-medium" : "font-bold"}>{message.subject}</h2><p className="mt-1 text-xs text-cba-muted">{formatDate(message.date)}</p></div>
              <span className="text-xs font-semibold">{isRead ? "Mark unread" : "Mark read"}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [details, setDetails] = useState(() =>
    readStored("commbank-demo-profile", {
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      phone: "0402 555 018",
      address: "18 Harbour Street, Sydney NSW 2000",
    }),
  );
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3"><UserRound aria-hidden="true" className="h-7 w-7 text-cba-positive" /><h1 className="text-3xl font-bold">Profile</h1></div>
      <form className="mt-7 surface-card space-y-5 p-6" onSubmit={(event) => { event.preventDefault(); writeStored("commbank-demo-profile", details); setSaved(true); }}>
        {Object.entries(details).map(([key, value]) => (
          <label key={key} className="block text-sm font-semibold capitalize">{key}
            <input className="field mt-2" value={value} onChange={(event) => { setSaved(false); setDetails({ ...details, [key]: event.target.value }); }} />
          </label>
        ))}
        <Button type="submit"><Save aria-hidden="true" className="h-4 w-4" /> Save changes</Button>
        {saved ? <span className="ml-3 inline-flex items-center gap-1 text-sm font-semibold text-cba-positive"><Check aria-hidden="true" className="h-4 w-4" /> Saved locally</span> : null}
      </form>
    </div>
  );
}

export function SecurityPage() {
  return (
    <div>
      <div className="flex items-center gap-3"><ShieldCheck aria-hidden="true" className="h-8 w-8 text-cba-positive" /><h1 className="text-3xl font-bold">Security</h1></div>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <SecurityCard icon={LockKeyhole} title="Password" text="Last changed 42 days ago" action="Change demo password" />
        <SecurityCard icon={Smartphone} title="NetCode" text="Sent to •••• ••• 018" action="Manage NetCode" />
        <SecurityCard icon={Laptop} title="Devices" text="1 remembered demo browser" action="Review devices" />
        <SecurityCard icon={MessageSquare} title="Scam protection" text="Pause, question and protect" action="View safety tips" />
      </div>
      <div className="mt-6 rounded-2xl bg-cba-yellow p-6">
        <h2 className="text-xl font-bold">Bank safely</h2>
        <p className="mt-2 text-sm leading-6">A real bank will never ask you to share a NetCode or move money to a “safe account”. This demo never requests real credentials.</p>
      </div>
    </div>
  );
}

function SecurityCard({ icon: Icon, title, text, action }: { icon: typeof ShieldCheck; title: string; text: string; action: string }) {
  return (
    <article className="surface-card p-6">
      <Icon aria-hidden="true" className="h-6 w-6 text-cba-positive" />
      <h2 className="mt-4 text-lg font-bold">{title}</h2><p className="mt-2 text-sm text-cba-muted">{text}</p>
      <button type="button" className="mt-5 text-sm font-semibold underline">{action}</button>
    </article>
  );
}

type Preferences = { push: boolean; email: boolean; balances: boolean; compact: boolean };

export function SettingsPage() {
  const [preferences, setPreferences] = useState<Preferences>(() =>
    readStored("commbank-demo-settings", { push: true, email: false, balances: true, compact: false }),
  );
  const set = (key: keyof Preferences) => {
    const next = { ...preferences, [key]: !preferences[key] };
    setPreferences(next);
    writeStored("commbank-demo-settings", next);
  };
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="mt-2 text-cba-ink-soft">Preferences are saved in this browser.</p>
      <div className="mt-7 surface-card divide-y divide-cba-line px-6">
        <Setting icon={Bell} label="Push notifications" description="Payment and account alerts" value={preferences.push} onClick={() => set("push")} />
        <Setting icon={Mail} label="Email summaries" description="A fictional monthly overview" value={preferences.email} onClick={() => set("email")} />
        <Setting icon={ShieldCheck} label="Show balances" description="Display balances on overview" value={preferences.balances} onClick={() => set("balances")} />
        <Setting icon={Laptop} label="Compact view" description="Reduce spacing in account lists" value={preferences.compact} onClick={() => set("compact")} />
      </div>
    </div>
  );
}

function Setting({ icon: Icon, label, description, value, onClick }: { icon: typeof Bell; label: string; description: string; value: boolean; onClick: () => void }) {
  return (
    <div className="flex items-center gap-4 py-5">
      <Icon aria-hidden="true" className="h-5 w-5 text-cba-positive" />
      <div className="flex-1"><h2 className="font-semibold">{label}</h2><p className="mt-1 text-xs text-cba-muted">{description}</p></div>
      <button type="button" role="switch" aria-checked={value} aria-label={label} onClick={onClick} className={value ? "relative h-7 w-12 rounded-full bg-cba-positive" : "relative h-7 w-12 rounded-full bg-cba-line"}>
        <span className={value ? "absolute right-1 top-1 h-5 w-5 rounded-full bg-white" : "absolute left-1 top-1 h-5 w-5 rounded-full bg-white"} />
      </button>
    </div>
  );
}
