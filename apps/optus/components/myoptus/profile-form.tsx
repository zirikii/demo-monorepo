"use client";

import { useState } from "react";
import type { ProfileSettings } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function ProfileForm({ initial }: { initial: ProfileSettings }) {
  const [name, setName] = useState(initial.name);
  const [email, setEmail] = useState(initial.email);
  const [mobile, setMobile] = useState(initial.mobile);
  const [optIn, setOptIn] = useState(initial.marketingOptIn);
  const [saved, setSaved] = useState(false);

  function save(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
  }

  return (
    <form onSubmit={save} className="max-w-xl space-y-4 rounded-lg border border-line bg-white p-6">
      <h3 className="text-lg font-bold text-optus-ink">Profile</h3>
      <div>
        <label htmlFor="pf-name" className="text-sm font-semibold text-optus-ink">
          Full name
        </label>
        <input
          id="pf-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSaved(false);
          }}
          className="mt-1 h-11 w-full rounded-md border border-line px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-optus-ink"
        />
      </div>
      <div>
        <label htmlFor="pf-email" className="text-sm font-semibold text-optus-ink">
          Email
        </label>
        <input
          id="pf-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setSaved(false);
          }}
          className="mt-1 h-11 w-full rounded-md border border-line px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-optus-ink"
        />
      </div>
      <div>
        <label htmlFor="pf-mobile" className="text-sm font-semibold text-optus-ink">
          Mobile
        </label>
        <input
          id="pf-mobile"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
            setSaved(false);
          }}
          className="mt-1 h-11 w-full rounded-md border border-line px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-optus-ink"
        />
      </div>
      <label className="flex items-center gap-3 text-sm text-optus-ink">
        <input
          type="checkbox"
          checked={optIn}
          onChange={(e) => {
            setOptIn(e.target.checked);
            setSaved(false);
          }}
          className="h-4 w-4 rounded border-line text-optus-ink focus-visible:ring-optus-ink"
        />
        Send me Optus offers and product news
      </label>
      <Button type="submit">Save changes</Button>
      {saved ? (
        <p role="status" className="text-sm font-semibold text-optus-green">
          Profile saved (demo — stored locally only).
        </p>
      ) : null}
    </form>
  );
}
