import type { LucideIcon } from "lucide-react";

export type NavItem = { label: string; href: string; children?: string[] };
export type DirectionKey = "arriving" | "departing" | "transiting" | "visiting";
export type DirectionPanel = { key: DirectionKey; label: string; eyebrow: string; description: string; services: ServiceItem[] };
export type ServiceItem = { title: string; description: string; href: string; icon: LucideIcon };
export type Happening = { title: string; description: string; image: string; category: string; href: string };
export type Destination = { city: string; slug: string; tagline: string; region: string; accent: string; flightTime: string };
export type Flight = { id: string; time: string; destination: string; airline: string; terminal: string; status: "On time" | "Boarding" | "Delayed" | "Arrived" };
export type RewardBenefit = { title: string; description: string; href: string };
export type FooterSection = { title: string; links: { label: string; href: string }[] };
