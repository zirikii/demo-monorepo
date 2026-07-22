"use client";

import { useEffect, useState } from "react";
import type { TeamMember } from "@/lib/types";
import { SettingsTabs } from "@/components/myoptus/settings-tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function TeamSettingsPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/settings/team");
    if (res.ok) {
      setTeam((await res.json()) as TeamMember[]);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function addMember(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/settings/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, role: "Member" }),
    });
    if (!res.ok) {
      setMessage("Could not add member");
      return;
    }
    setName("");
    setEmail("");
    setMessage("Member added");
    await load();
  }

  async function removeMember(id: string) {
    await fetch(`/api/settings/team?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    setMessage("Member removed");
    await load();
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-optus-ink">Settings</h2>
      <SettingsTabs />
      <h3 className="text-lg font-bold text-optus-ink">Team</h3>
      <div className="overflow-x-auto rounded-lg border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-surface-subtle">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {team.map((m) => (
              <tr key={m.id} className="border-b last:border-0">
                <td className="px-4 py-3 font-semibold">{m.name}</td>
                <td className="px-4 py-3">{m.email}</td>
                <td className="px-4 py-3">
                  <Badge>{m.role}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  {m.role !== "Owner" ? (
                    <button
                      type="button"
                      className="text-sm font-semibold text-red-600"
                      onClick={() => removeMember(m.id)}
                    >
                      Remove
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form
        onSubmit={addMember}
        className="grid max-w-xl gap-3 rounded-lg border border-line bg-white p-5 sm:grid-cols-2"
      >
        <input
          required
          placeholder="Name"
          aria-label="Member name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11 rounded-md border border-line px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-optus-ink"
        />
        <input
          required
          type="email"
          placeholder="Email"
          aria-label="Member email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 rounded-md border border-line px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-optus-ink"
        />
        <Button type="submit" className="sm:col-span-2">
          Add member
        </Button>
      </form>
      {message ? <p className="text-sm font-semibold text-optus-ink">{message}</p> : null}
    </div>
  );
}
