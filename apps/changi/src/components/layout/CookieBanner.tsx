import { Button } from "@/components/ui/Button";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function CookieBanner() {
  const [accepted, setAccepted] = useLocalStorage("changi-cookie-ok", false);
  if (accepted) return null;
  return (
    <section aria-label="Cookie preferences" className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-5xl rounded-[2rem] bg-white p-5 shadow-2xl ring-1 ring-[#eadfd3] md:p-6">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-lg font-bold text-[#2f271f]">Let&apos;s give you the best experience possible</h2>
          <p className="mt-2 text-sm leading-6 text-[#665448]">Changi Airport uses cookies and other innovative tech to deliver an incredible and more personalized experience. Analytical technologies give us insights on site usage to improve our services. Marketing technologies help us advertise our services more relevantly.</p>
        </div>
        <Button onClick={() => setAccepted(true)}>Continue</Button>
      </div>
    </section>
  );
}
