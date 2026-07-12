import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

const KEY = "changi-demo-cookies";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-3xl animate-fade-up rounded-2xl border border-line bg-card p-5 shadow-float sm:inset-x-auto sm:right-6 sm:bottom-6"
    >
      <h2 className="text-lg font-black text-ink-deep">Let’s give you the best experience possible</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Changi Airport uses cookies and other innovative tech to deliver an incredible and more
        personalized experience. Analytical technologies give us insights on site usage to improve our
        services. Marketing technologies help us advertise our services more relevantly. Preferences can
        be changed at any time. For more information, see our{" "}
        <Link to="/privacy" className="font-bold text-purple hover:underline">
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant="purple"
          onClick={() => {
            window.localStorage.setItem(KEY, "accepted");
            setVisible(false);
          }}
        >
          Continue
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            window.localStorage.setItem(KEY, "essential");
            setVisible(false);
          }}
        >
          Essential only
        </Button>
      </div>
    </div>
  );
}
