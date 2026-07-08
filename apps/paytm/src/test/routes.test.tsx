import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import App from "../App";

/**
 * Smoke test: every route renders inside the shared layout with the header
 * logo present and a main landmark. Uses the real router via window history.
 */
const routes = [
  "/",
  "/recharge",
  "/electricity-bill-payment",
  "/dth-recharge",
  "/fastag-recharge",
  "/broadband-bill-payment",
  "/loan-emi-payment",
  "/bill-payments",
  "/flights",
  "/bus-tickets",
  "/train-tickets",
  "/movies",
  "/upi",
  "/credit-cards",
  "/insurance",
  "/personal-loan",
  "/gold",
  "/paytm-money",
  "/business",
  "/offers",
  "/about-us",
  "/careers",
  "/investor-relations",
  "/blog",
  "/support",
  "/security",
];

describe("route smoke tests", () => {
  for (const route of routes) {
    it(`renders ${route} with header logo and main content`, () => {
      window.history.pushState({}, "", route);
      const { unmount } = render(<App />);

      expect(screen.getAllByAltText("Paytm and UPI").length).toBeGreaterThan(0);
      const main = screen.getByRole("main");
      expect(within(main).getAllByRole("heading").length).toBeGreaterThan(0);

      unmount();
    });
  }

  it("renders the 404 page for unknown paths", () => {
    window.history.pushState({}, "", "/does-not-exist");
    render(<App />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });
});
