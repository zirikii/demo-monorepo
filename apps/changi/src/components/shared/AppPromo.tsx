import { Smartphone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function AppPromo() {
  return (
    <Card className="grid gap-6 bg-[#2f271f] text-white md:grid-cols-[auto_1fr_auto] md:items-center">
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-[#f5a400]"><Smartphone size={32} /></span>
      <div>
        <h2 className="text-2xl font-bold">Download Changi App</h2>
        <p className="mt-2 text-sm leading-6 text-white/70">Keep flight updates, airport wayfinding, Changi Pay, and rewards in your pocket.</p>
      </div>
      <ButtonLink to="/help" variant="secondary">Learn more</ButtonLink>
    </Card>
  );
}
