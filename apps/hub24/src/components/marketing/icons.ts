import {
  Briefcase,
  ChartLine,
  Coins,
  Compass,
  Database,
  Globe,
  Layers,
  Lock,
  Puzzle,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FeatureIconName } from "@/data/types";

/**
 * Data modules name their icon as a string so the seed data stays serialisable and free of
 * component imports. This map is the single place that turns those names into components.
 */
export const FEATURE_ICONS: Record<FeatureIconName, LucideIcon> = {
  briefcase: Briefcase,
  chart: ChartLine,
  coins: Coins,
  compass: Compass,
  database: Database,
  globe: Globe,
  layers: Layers,
  lock: Lock,
  puzzle: Puzzle,
  sparkles: Sparkles,
  target: Target,
  users: Users,
};
