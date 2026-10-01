import { Accessibility, CalendarClock, CreditCard, MapPin, RotateCcw, Send, Sparkles, Tag, Ticket, UserRound, Users } from "lucide-react";
import type { Topic } from "../flows";

export function TopicIcon({ icon, className }: { icon: Topic["icon"]; className?: string }) {
  const props = { className, "aria-hidden": true as const };
  switch (icon) {
    case "ticket":
      return <Ticket {...props} />;
    case "refund":
      return <RotateCcw {...props} />;
    case "calendar":
      return <CalendarClock {...props} />;
    case "send":
      return <Send {...props} />;
    case "tag":
      return <Tag {...props} />;
    case "accessible":
      return <Accessibility {...props} />;
    case "users":
      return <Users {...props} />;
    case "card":
      return <CreditCard {...props} />;
    case "user":
      return <UserRound {...props} />;
    case "map":
      return <MapPin {...props} />;
    case "sparkles":
      return <Sparkles {...props} />;
    default: {
      const exhaustive: never = icon;
      return exhaustive;
    }
  }
}
