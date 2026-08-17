import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { readRaw, writeRaw } from "@/lib/storage";

const KEY = "hub24-demo-cookies";

export function CookieBanner() {
  const [visible, setVisible] = useState(() => readRaw(KEY) !== "accepted");

  if (!visible) return null;

  return (
    <div className="fixed right-4 bottom-4 z-50 max-w-sm rounded-hub-lg border border-line bg-white p-5 shadow-hub-lift">
      <p className="text-sm leading-relaxed text-ink-soft">
        This unofficial demo stores a session cookie analogue in localStorage only. No tracking pixels fire.
      </p>
      <Button
        className="mt-3"
        size="sm"
        onClick={() => {
          writeRaw(KEY, "accepted");
          setVisible(false);
        }}
      >
        Got it
      </Button>
    </div>
  );
}
