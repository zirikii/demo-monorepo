import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DashboardPage } from "@/pages/Dashboard";

describe("Employment OS preview", () => {
  it("updates the overview period", () => {
    render(
      <MemoryRouter initialEntries={["/platform/dashboard"]}>
        <DashboardPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("84")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Quarter" }));
    expect(screen.getByText("90")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Quarter" })).toHaveAttribute("aria-pressed", "true");
  });

  it("filters the people directory", () => {
    render(
      <MemoryRouter initialEntries={["/platform/people"]}>
        <DashboardPage />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByRole("textbox", { name: "Search people" }), {
      target: { value: "Zoe Patel" },
    });
    expect(screen.getByText("Zoe Patel")).toBeInTheDocument();
    expect(screen.queryByText("Avery Chen")).not.toBeInTheDocument();
  });
});
