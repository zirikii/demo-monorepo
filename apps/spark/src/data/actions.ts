import { CreditCard, MapPin, PackagePlus, Smartphone, Wifi } from "lucide-react";

export const buyingSteps = [
  {
    icon: Smartphone,
    title: "Check your phone",
    body: "First, check that your phone is compatible with the Spark network in New Zealand.",
    cta: "Check phone compatibility",
  },
  {
    icon: MapPin,
    title: "Buy when you arrive",
    body: "Purchase a Travel Pack from Spark when you arrive in New Zealand. Spark has stores at Auckland and Christchurch Airports, as well as around New Zealand.",
    cta: "Find a store",
  },
  {
    icon: Wifi,
    title: "Connect like a local",
    body: "Activate by using your SIM or eSIM in New Zealand, then use maps, bookings, messages and hotspots while you explore.",
    cta: "View coverage",
  },
];

export const existingSimActions = [
  {
    icon: CreditCard,
    eyebrow: "Quick",
    title: "top up",
    body: "Add more credit to your mobile.",
    cta: "Top up now",
  },
  {
    icon: Smartphone,
    eyebrow: "Download",
    title: "the Spark app",
    body: "Top up by credit card, debit card or voucher and check your balance in the Spark app.",
    cta: "Get the app",
  },
  {
    icon: PackagePlus,
    eyebrow: "Buy",
    title: "extras",
    body: "Your Travel Pack comes pre-loaded with data, text and minutes, but you can add value packs and extras to keep you going.",
    cta: "See extras",
  },
];
