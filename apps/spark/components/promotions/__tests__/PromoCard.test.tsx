import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PromoCard } from "../PromoCard";
import type { Promotion } from "@/lib/types";

const promo: Promotion = {
  id: "promo-test",
  slug: "daily-roaming",
  eyebrow: "Going overseas",
  title: "Daily Roaming from $7/day",
  description: "Use your NZ plan overseas for a flat daily fee.",
  category: "travel",
  accent: "purple",
  badge: "Most popular",
  cta: { label: "Set up roaming", href: "/roaming" },
  secondaryCta: { label: "See destinations", href: "/roaming#zones" },
  highlights: ["No charge on unused days", "Keep your number"],
};

describe("PromoCard", () => {
  it("renders the title, eyebrow and badge", () => {
    render(<PromoCard promo={promo} />);
    expect(screen.getByText("Daily Roaming from $7/day")).toBeInTheDocument();
    expect(screen.getByText("Going overseas")).toBeInTheDocument();
    expect(screen.getByText("Most popular")).toBeInTheDocument();
  });

  it("links the primary CTA to its href", () => {
    render(<PromoCard promo={promo} />);
    const cta = screen.getByRole("link", { name: /Set up roaming/i });
    expect(cta).toHaveAttribute("href", "/roaming");
  });

  it("shows highlight bullets only when featured", () => {
    const { rerender } = render(<PromoCard promo={promo} />);
    expect(screen.queryByText("Keep your number")).not.toBeInTheDocument();

    rerender(<PromoCard promo={promo} featured />);
    expect(screen.getByText("Keep your number")).toBeInTheDocument();
  });
});
