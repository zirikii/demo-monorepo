import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { DineAndShopPage } from "@/pages/DineAndShop";
import { outlets } from "@/data/dine";

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/dine-and-shop"]}>
      <DineAndShopPage />
    </MemoryRouter>,
  );
}

describe("DineAndShop filter", () => {
  it("shows all outlets by default", () => {
    renderPage();
    expect(screen.getByRole("status")).toHaveTextContent(`${outlets.length}`);
  });

  it("narrows the list when a category is selected", async () => {
    const user = userEvent.setup();
    renderPage();

    const shopCount = outlets.filter((o) => o.category === "shop").length;
    await user.click(screen.getByRole("tab", { name: "Shop" }));

    expect(screen.getByRole("tab", { name: "Shop" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("status")).toHaveTextContent(`${shopCount}`);
  });
});
