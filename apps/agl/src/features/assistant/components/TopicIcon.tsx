import { Gauge, HeartHandshake, Receipt, Sun, TriangleAlert, Truck, UserRound, Wifi } from "lucide-react";
import type { Topic } from "../flows";

export function TopicIcon({ icon, className }: { icon: Topic["icon"]; className?: string }) {
  const props = { className, "aria-hidden": true as const };
  switch (icon) {
    case "receipt":
      return <Receipt {...props} />;
    case "wifi":
      return <Wifi {...props} />;
    case "truck":
      return <Truck {...props} />;
    case "gauge":
      return <Gauge {...props} />;
    case "user":
      return <UserRound {...props} />;
    case "heart":
      return <HeartHandshake {...props} />;
    case "alert":
      return <TriangleAlert {...props} />;
    case "sun":
      return <Sun {...props} />;
    default: {
      const exhaustive: never = icon;
      return exhaustive;
    }
  }
}
