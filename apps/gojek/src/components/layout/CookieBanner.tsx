import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { readRaw, writeRaw } from "@/lib/storage";

const KEY = "gojek-demo-cookie-choice";

export function CookieBanner() {
  const [choice, setChoice] = useState<string | null>(() => readRaw(KEY));

  if (choice) return null;

  function record(value: string) {
    writeRaw(KEY, value);
    setChoice(value);
  }

  return (
    <div
      role="region"
      aria-label="Cookie settings"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-go-lg bg-night p-5 text-white shadow-go-menu"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-white/75">
          This demo stores your session and saved roles in your browser only. Nothing leaves the
          device and no analytics are collected.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-white/80 hover:bg-white/10"
            onClick={() => record("essential")}
          >
            Essential only
          </Button>
          <Button size="sm" onClick={() => record("all")}>
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
}
