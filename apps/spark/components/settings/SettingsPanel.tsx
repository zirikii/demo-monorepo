"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import type { NotificationSettings, PrivacySettings, Settings, SessionUser } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const notificationLabels: { key: keyof NotificationSettings; label: string; desc: string }[] = [
  {
    key: "billing",
    label: "Billing reminders",
    desc: "Get notified when a new bill is ready and before it's due.",
  },
  {
    key: "usageAlerts",
    label: "Usage alerts",
    desc: "Heads-up when you're getting close to a data allowance.",
  },
  {
    key: "roamingTips",
    label: "Travel & roaming tips",
    desc: "Reminders to set up roaming before you head overseas.",
  },
  {
    key: "marketing",
    label: "Offers & product news",
    desc: "Occasional deals and updates about new Spark features.",
  },
];

const privacyLabels: { key: keyof PrivacySettings; label: string; desc: string }[] = [
  {
    key: "shareUsageForOffers",
    label: "Personalised offers",
    desc: "Use my usage patterns to suggest better-value plans and add-ons.",
  },
  {
    key: "twoFactor",
    label: "Two-step verification",
    desc: "Require a one-time code when signing in to My Spark.",
  },
];

export function SettingsPanel({ initial, user }: { initial: Settings; user: SessionUser }) {
  const [settings, setSettings] = React.useState(initial);
  const router = useRouter();
  const { toast } = useToast();

  async function persist(next: Settings, message: string) {
    setSettings(next);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    toast({ title: message, variant: "success" });
  }

  function toggleNotification(key: keyof NotificationSettings, value: boolean) {
    void persist(
      { ...settings, notifications: { ...settings.notifications, [key]: value } },
      "Notification preferences saved",
    );
  }

  function togglePrivacy(key: keyof PrivacySettings, value: boolean) {
    void persist(
      { ...settings, privacy: { ...settings.privacy, [key]: value } },
      "Privacy settings saved",
    );
  }

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account details</CardTitle>
          <CardDescription>Your Spark ID and contact details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="acct-name">Full name</Label>
              <Input id="acct-name" defaultValue={settings.fullName} readOnly />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="acct-email">Email (Spark ID)</Label>
              <Input id="acct-email" defaultValue={user.email} readOnly />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="acct-mobile">Mobile number</Label>
              <Input id="acct-mobile" defaultValue={settings.mobile} readOnly />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="acct-password">Password</Label>
              <Input id="acct-password" type="password" defaultValue="demo-password" readOnly />
            </div>
          </div>
          <p className="text-xs text-ink-muted">
            Demo mode — account details are read-only and not used for real authentication.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose what we let you know about.</CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-line">
          {notificationLabels.map((n) => (
            <div key={n.key} className="flex items-center justify-between gap-4 py-3 first:pt-0">
              <div>
                <p className="text-sm font-medium text-spark-ink">{n.label}</p>
                <p className="text-sm text-ink-secondary">{n.desc}</p>
              </div>
              <Switch
                checked={settings.notifications[n.key]}
                onCheckedChange={(v) => toggleNotification(n.key, v)}
                aria-label={n.label}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy & security</CardTitle>
          <CardDescription>Control how your account information is used.</CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-line">
          {privacyLabels.map((p) => (
            <div key={p.key} className="flex items-center justify-between gap-4 py-3 first:pt-0">
              <div>
                <p className="text-sm font-medium text-spark-ink">{p.label}</p>
                <p className="text-sm text-ink-secondary">{p.desc}</p>
              </div>
              <Switch
                checked={settings.privacy[p.key]}
                onCheckedChange={(v) => togglePrivacy(p.key, v)}
                aria-label={p.label}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sign out</CardTitle>
          <CardDescription>Sign out of this demo session.</CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <Button variant="secondary" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
