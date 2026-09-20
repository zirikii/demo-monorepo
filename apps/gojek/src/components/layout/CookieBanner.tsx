import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { readRaw, writeRaw } from "@/lib/storage";

const KEY = "gojek-demo-cookies";

export function CookieBanner() {
  const [hidden, setHidden] = useState(() => readRaw(KEY) === "1");

  if (hidden) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-go-line bg-go-card/95 px-4 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-go-muted">
          This unofficial demo stores session data in localStorage only.{" "}
          <Link to="/legal/cookies" className="underline hover:text-white">
            Cookie settings
          </Link>
        </p>
        <Button
          size="sm"
          onClick={() => {
            writeRaw(KEY, "1");
            setHidden(true);
          }}
        >
          Got it
        </Button>
      </div>
    </div>
  );
}
