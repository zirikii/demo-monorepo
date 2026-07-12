import { BadgeHelp, Clock3, Coffee, Luggage, Map, PlaneLanding, PlaneTakeoff, Repeat2, ShieldCheck, ShoppingBag, Sparkles, Train } from "lucide-react";
import type { DirectionPanel } from "@/types";

export const directionPanels: DirectionPanel[] = [
  {
    key: "arriving",
    label: "Arriving",
    eyebrow: "Airport",
    description: "Everything you need after landing, from baggage belts and immigration to transport into Singapore.",
    services: [
      { title: "Arrival Guide", description: "Know the immigration, baggage, and customs flow before you touch down.", href: "/fly", icon: PlaneLanding },
      { title: "Transport", description: "Taxi, train, bus, private hire, and Jewel connections from every terminal.", href: "/at-changi", icon: Train },
      { title: "Lost & Found", description: "Report a misplaced item or search airport service counters.", href: "/at-changi", icon: Luggage },
    ],
  },
  {
    key: "departing",
    label: "Departing",
    eyebrow: "Airport",
    description: "Plan your check-in, security, shopping, lounges, and boarding from Changi.",
    services: [
      { title: "Departure Guide", description: "Check-in opening times, immigration reminders, and gate-ready tips.", href: "/fly", icon: PlaneTakeoff },
      { title: "Flight Information", description: "Browse live-style rows for terminals, boarding calls, and delays.", href: "/fly", icon: Clock3 },
      { title: "Dine & Shop", description: "Shop tax-absorbed deals, collect orders, and dine before you fly.", href: "/dine-and-shop", icon: ShoppingBag },
    ],
  },
  {
    key: "transiting",
    label: "Transiting",
    eyebrow: "Airport",
    description: "Make a smooth connection with lounge, gate, transfer, and short-stay attraction guidance.",
    services: [
      { title: "Transiting Guide", description: "Move between gates and terminals with clear transfer checkpoints.", href: "/fly", icon: Repeat2 },
      { title: "Lounges", description: "Refresh with quiet rooms, showers, and premium lounge stops.", href: "/fly", icon: Coffee },
      { title: "Experience Changi", description: "Visit gardens, art, and play spaces while waiting for your onward flight.", href: "/experience", icon: Sparkles },
    ],
  },
  {
    key: "visiting",
    label: "Visiting",
    eyebrow: "Airport",
    description: "Explore Jewel, terminals, gardens, shopping, dining, and family-friendly activities.",
    services: [
      { title: "Attractions", description: "Sunflower Garden, Dreamscape, Enchanted Garden, and more.", href: "/experience", icon: Sparkles },
      { title: "Airport Map", description: "Find your way across terminals, Jewel, and transport nodes.", href: "/at-changi", icon: Map },
      { title: "Assistance", description: "Get help with accessibility, family services, and passenger support.", href: "/help", icon: BadgeHelp },
    ],
  },
];

export const assuranceTiles = [
  { title: "Stress-free", description: "Be knowledgeable, resourceful, and reliable at every touchpoint.", icon: ShieldCheck },
  { title: "Personalised", description: "Welcoming, sincere, and attentive service for each passenger.", icon: BadgeHelp },
  { title: "Positively surprising", description: "Small moments that make every journey memorable.", icon: Sparkles },
];
