"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ProfileSettingsPage() {
  const [name, setName] = useState("Alex Demo");
  const [email, setEmail] = useState("admin@optus-demo.au");
  const [phone, setPhone] = useState("0412 345 678");
  const [saved, setSaved] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4 rounded-lg border border-line bg-white p-6">
      <div>
        <label htmlFor="p-name" className="text-sm font-semibold text-optus-ink">
          Full name
        </label>
        <input
          id="p-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSaved(false);
          }}
          className="focus-ring mt-1 h-11 w-full rounded-md border border-line px-3"
        />
      </div>
      <div>
        <label htmlFor="p-email" className="text-sm font-semibold text-optus-ink">
          Email
        </label>
        <input
          id="p-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setSaved(false);
          }}
          className="focus-ring mt-1 h-11 w-full rounded-md border border-line px-3"
        />
      </div>
      <div>
        <label htmlFor="p-phone" className="text-sm font-semibold text-optus-ink">
          Mobile number
        </label>
        <input
          id="p-phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setSaved(false);
          }}
          className="focus-ring mt-1 h-11 w-full rounded-md border border-line px-3"
        />
      </div>
      <Button type="submit">Save changes</Button>
      {saved ? <p className="text-sm font-medium text-optus-teal">Profile saved (demo).</p> : null}
    </form>
  );
}
