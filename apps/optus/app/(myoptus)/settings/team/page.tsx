"use client";

import { useEffect, useState } from "react";
import type { TeamMember } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function TeamSettingsPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/settings/team");
    const data = (await res.json()) as TeamMember[];
    setTeam(data);
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
    <div>
      <div className="overflow-x-auto rounded-lg border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-surface-subtle">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {team.map((m) => (
              <tr key={m.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-semibold">{m.name}</td>
                <td className="px-4 py-3">{m.email}</td>
                <td className="px-4 py-3">
                  <Badge>{m.role}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  {m.role !== "Account holder" ? (
                    <button
                      type="button"
                      className="focus-ring rounded px-1 text-sm font-semibold text-red-600"
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
        className="mt-6 grid max-w-xl gap-3 rounded-lg border border-line bg-white p-5 sm:grid-cols-2"
      >
        <input
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="focus-ring h-11 rounded-md border border-line px-3"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="focus-ring h-11 rounded-md border border-line px-3"
        />
        <Button type="submit" className="sm:col-span-2">
          Add member
        </Button>
      </form>
      {message ? <p className="mt-3 text-sm font-medium text-optus-teal">{message}</p> : null}
    </div>
  );
}
