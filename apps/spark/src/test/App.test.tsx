import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";

describe("Spark travel page", () => {
  it("renders the Spark header and hero on the requested route", () => {
    window.history.pushState({}, "", "/online/shop/promotions/travel-and-move");
    render(<App />);

    expect(screen.getAllByAltText("Spark NZ")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Shop" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /experience new zealand on a local mobile network/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Travel Packs are only available in store/i)).toBeInTheDocument();
  });

  it("renders all plan cards and click-and-collect demo feedback", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/");
    render(<App />);

    expect(screen.getByText("$29")).toBeInTheDocument();
    expect(screen.getByText("$49")).toBeInTheDocument();
    expect(screen.getByText("$79")).toBeInTheDocument();
    expect(screen.getByText("$129")).toBeInTheDocument();
    expect(screen.getByText("Endless data")).toBeInTheDocument();

    const collectButtons = screen.getAllByRole("button", { name: /click & collect/i });
    expect(collectButtons).toHaveLength(4);
    await user.click(collectButtons[3]!);

    expect(screen.getByRole("status")).toHaveTextContent("Demo only: Endless selected.");
    expect(screen.getByText(/Real Spark Travel Packs are purchased in store/i)).toBeInTheDocument();
  });

  it("expands FAQ content and shows standard rates", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/");
    render(<App />);

    expect(screen.getByRole("cell", { name: "$0.49 per minute" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /questions about endless data/i }));

    expect(screen.getByText(/100GB of full-speed Endless Travel Pack data/i)).toBeInTheDocument();
    expect(screen.getByText(/Tethering is included/i)).toBeInTheDocument();
  });
});
