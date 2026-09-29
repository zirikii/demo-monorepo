import { HeartHandshake, Receipt, ShieldCheck, TriangleAlert, Truck, UserRound } from "lucide-react";
import type { HelpCategory } from "@/data/help";

export function CategoryIcon({ icon, className }: { icon: HelpCategory["icon"]; className?: string }) {
  const props = { className, "aria-hidden": true as const };
  switch (icon) {
    case "receipt":
      return <Receipt {...props} />;
    case "user":
      return <UserRound {...props} />;
    case "truck":
      return <Truck {...props} />;
    case "heart":
      return <HeartHandshake {...props} />;
    case "alert":
      return <TriangleAlert {...props} />;
    case "shield":
      return <ShieldCheck {...props} />;
    default: {
      const exhaustive: never = icon;
      return exhaustive;
    }
  }
}
