import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const KEY = "gojek-demo-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setVisible(window.localStorage.getItem(KEY) !== "dismissed");
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    window.localStorage.setItem(KEY, "dismissed");
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-ink-soft">
          We use cookies to improve your experience. This is a demo — nothing is tracked.
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={dismiss}>
            Manage
          </Button>
          <Button size="sm" onClick={dismiss}>
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
