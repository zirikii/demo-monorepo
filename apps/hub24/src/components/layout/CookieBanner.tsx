import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { readRaw, writeRaw } from "@/lib/storage";

const KEY = "hub24-demo-cookie-consent";

export function CookieBanner() {
  const [dismissed, setDismissed] = useState(() => readRaw(KEY) === "accepted");

  if (dismissed) return null;

  function accept() {
    writeRaw(KEY, "accepted");
    setDismissed(true);
  }

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-hub-lg border border-line bg-white p-5 shadow-hub-menu"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-ink-soft">
          This demo stores a small amount of data in your browser to remember your session and this
          notice. Read the{" "}
          <Link to="/legals/privacy-policy" className="focus-hub font-bold text-hub-blue underline">
            privacy policy
          </Link>
          .
        </p>
        <Button size="sm" onClick={accept} className="shrink-0">
          Accept
        </Button>
      </div>
    </div>
  );
}
