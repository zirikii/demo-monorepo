import { Flame, Smartphone, Wifi, Zap } from "lucide-react";
import type { ServiceKind } from "@/data/account";

export function ServiceIcon({ kind, className }: { kind: ServiceKind; className?: string }) {
  const props = { className, "aria-hidden": true as const };
  switch (kind) {
    case "electricity":
      return <Zap {...props} />;
    case "gas":
      return <Flame {...props} />;
    case "internet":
      return <Wifi {...props} />;
    case "mobile":
      return <Smartphone {...props} />;
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}
