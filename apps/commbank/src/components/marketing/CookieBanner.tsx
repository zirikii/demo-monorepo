import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

const KEY = "commbank-demo-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem(KEY) !== "accepted");
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    window.localStorage.setItem(KEY, "accepted");
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface shadow-cba-menu"
    >
      <div className="container-cba flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[14px] leading-relaxed text-ink-soft">
          We use cookies to give you the best experience on our site. This is a demo, so nothing is
          actually tracked. Read our{" "}
          <Link to="/privacy" className="font-bold text-ink underline underline-offset-2">
            privacy policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button size="sm" variant="secondary" onClick={dismiss}>
            Manage cookies
          </Button>
          <Button size="sm" onClick={dismiss}>
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
