import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TravelPackCard } from "@/components/plans/travel-pack-card";
import type { TravelPack } from "@/lib/types";

afterEach(() => {
  cleanup();
});

const pack: TravelPack = {
  id: "tp-79",
  price: 79,
  data: "50GB",
  talkNz: "Unlimited NZ only",
  talkIntl: "200 International*",
  textNz: "Unlimited NZ only",
  textIntl: "200 International*",
  duration: "Plan lasts for three months.",
  features: ["Physical Trio SIM or eSIM available", "Free Hotspot"],
  highlight: true,
};

describe("TravelPackCard", () => {
  it("renders price, data and features", () => {
    render(<TravelPackCard pack={pack} />);
    expect(screen.getByText("50GB")).toBeInTheDocument();
    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByText(/Free Hotspot/)).toBeInTheDocument();
  });

  it("fires onSelect when Click & collect is pressed", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<TravelPackCard pack={pack} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: /click and collect/i }));
    expect(onSelect).toHaveBeenCalledWith("tp-79");
  });
});
