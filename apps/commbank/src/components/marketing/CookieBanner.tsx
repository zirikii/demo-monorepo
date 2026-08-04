import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { readJson, writeJson } from "@/lib/storage";

const KEY = "commbank-demo-cookies";

export function CookieBanner() {
  const [dismissed, setDismissed] = useState(() => readJson(KEY, false));

  if (dismissed) return null;

  const accept = () => {
    writeJson(KEY, true);
    setDismissed(true);
  };

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface shadow-float"
    >
      <div className="container-page flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">
          This demo stores your session and account data in your browser&apos;s local storage only.
          Nothing is sent anywhere.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button size="sm" onClick={accept}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
