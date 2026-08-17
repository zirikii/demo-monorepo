import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { readRaw, writeRaw } from "@/lib/storage";

const KEY = "hub24-demo-cookie-consent";

export function CookieBanner() {
  const [dismissed, setDismissed] = useState(() => readRaw(KEY) === "acknowledged");

  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/98 backdrop-blur"
    >
      <div className="container-h24-wide flex flex-col gap-4 py-5 md:flex-row md:items-center">
        <p className="flex-1 text-sm leading-relaxed text-ink-soft">
          This demonstration build sets no tracking cookies. It stores a mock session and your
          settings in this browser only. See the{" "}
          <Link to="/legal/privacy-policy" className="focus-h24 font-semibold text-h24-teal-dark underline">
            privacy policy
          </Link>
          .
        </p>
        <Button
          size="sm"
          onClick={() => {
            writeRaw(KEY, "acknowledged");
            setDismissed(true);
          }}
        >
          Got it
        </Button>
      </div>
    </div>
  );
}
