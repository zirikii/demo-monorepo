import { Bus, CarTaxiFront, MapPinned, Search, ShoppingBag, Smartphone, Utensils, Wifi } from "lucide-react";
import type { ServiceItem } from "@/types";

export const airportServices: ServiceItem[] = [
  { title: "Flight Information", description: "Track live-style arrivals, departures, terminals, and boarding status.", href: "/fly", icon: Search },
  { title: "Transport", description: "Travel to, from, and within Changi Airport with ease.", href: "/at-changi", icon: CarTaxiFront },
  { title: "Facilities", description: "Find rest areas, family spaces, medical rooms, and passenger services.", href: "/at-changi", icon: MapPinned },
  { title: "Airport Map", description: "Navigate terminal links, Jewel, lounges, gates, and transport nodes.", href: "/at-changi", icon: MapPinned },
  { title: "Lost & Found", description: "Report lost items or check service counters across terminals.", href: "/help", icon: Search },
  { title: "Free Wifi Access", description: "Connect throughout Changi with free airport Wi-Fi.", href: "/help", icon: Wifi },
];

export const dineBenefits: ServiceItem[] = [
  { title: "Earn rewards points as you spend", description: "Collect Changi Rewards points when shopping and dining at participating outlets.", href: "/rewards", icon: ShoppingBag },
  { title: "Let our shopping concierge assist you", description: "Get help finding gifts, duty-free picks, and airport exclusives.", href: "/dine-and-shop", icon: Utensils },
  { title: "Pay easily with Changi Pay", description: "Use the Changi Pay e-wallet for seamless airport purchases.", href: "/dine-and-shop", icon: Smartphone },
  { title: "Order and collect seamlessly", description: "Plan ahead with iShopChangi and pick up around your journey.", href: "/dine-and-shop", icon: Bus },
];

export const attractions = [
  { title: "Sunflower Garden", description: "Let cheery blooms brighten your day at the Sunflower Garden, where a majestic view of the runway and aircraft parking bays awaits." },
  { title: "Dreamscape", description: "Enter Dreamscape, an immersive indoor garden where nature and technology merge in a magical symphony." },
  { title: "Enchanted Garden", description: "Be captivated by the interactive Enchanted Garden as it magically comes to life with sights and sounds." },
];

export const helpTopics = ["Assistance", "Changi App", "Contact Information", "Baggage services", "Family travel", "Special assistance", "Airport feedback", "Mobile app support"];
