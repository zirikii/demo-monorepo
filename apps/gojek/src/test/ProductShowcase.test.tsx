import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ProductShowcase } from "@/components/marketing/ProductShowcase";

describe("ProductShowcase", () => {
  it("filters products when a category tab is selected", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProductShowcase />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "GoRide" })).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Food & Shopping" }));
    expect(screen.getByRole("heading", { name: "GoFood" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "GoRide" })).not.toBeInTheDocument();
  });
});
