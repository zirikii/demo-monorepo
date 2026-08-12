import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { readRaw, writeRaw } from "@/lib/storage";

const KEY = "employmenthero-demo-cookie-consent";

export function CookieBanner() {
  const [dismissed, setDismissed] = useState(() => readRaw(KEY) === "accepted");

  if (dismissed) return null;

  function accept() {
    writeRaw(KEY, "accepted");
    setDismissed(true);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/97 backdrop-blur">
      <div className="container-eh flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
          This demo stores a small amount of data in your browser so the mock session and preferences
          survive a refresh. Nothing leaves your device and no analytics are collected.
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="secondary" size="sm" onClick={accept}>
            Manage
          </Button>
          <Button size="sm" onClick={accept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
