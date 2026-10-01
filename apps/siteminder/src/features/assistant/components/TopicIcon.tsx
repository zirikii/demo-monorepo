import {
  BedDouble,
  Building2,
  CalendarDays,
  HeartHandshake,
  Plug,
  Receipt,
  Siren,
  Tag,
  TrendingUp,
  UserRound,
} from "lucide-react";
import type { Topic } from "../flows";

export function TopicIcon({ icon, className }: { icon: Topic["icon"]; className?: string }) {
  const props = { className, "aria-hidden": true as const };
  switch (icon) {
    case "plug":
      return <Plug {...props} />;
    case "bed":
      return <BedDouble {...props} />;
    case "tag":
      return <Tag {...props} />;
    case "calendar":
      return <CalendarDays {...props} />;
    case "receipt":
      return <Receipt {...props} />;
    case "heart":
      return <HeartHandshake {...props} />;
    case "user":
      return <UserRound {...props} />;
    case "building":
      return <Building2 {...props} />;
    case "alert":
      return <Siren {...props} />;
    case "trending":
      return <TrendingUp {...props} />;
    default: {
      const exhaustive: never = icon;
      return exhaustive;
    }
  }
}
