import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FlightSearchForm } from "../components/travel/FlightSearchForm";

describe("FlightSearchForm", () => {
  it("swaps origin and destination", async () => {
    const user = userEvent.setup();
    render(<FlightSearchForm onSearch={() => {}} />);

    const from = screen.getByLabelText("From") as HTMLSelectElement;
    const to = screen.getByLabelText("To") as HTMLSelectElement;
    expect(from.value).toBe("DEL");
    expect(to.value).toBe("BOM");

    await user.click(screen.getByRole("button", { name: /swap origin and destination/i }));
    expect(from.value).toBe("BOM");
    expect(to.value).toBe("DEL");
  });

  it("submits the selected route and fare", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<FlightSearchForm onSearch={onSearch} />);

    await user.selectOptions(screen.getByLabelText("To"), "BLR");
    await user.click(screen.getByRole("button", { name: /^student/i }));
    await user.click(screen.getByRole("button", { name: /search flights/i }));

    expect(onSearch).toHaveBeenCalledWith({
      fromCode: "DEL",
      toCode: "BLR",
      tripType: "one-way",
      fare: "student",
    });
  });

  it("marks the pressed special fare as selected", async () => {
    const user = userEvent.setup();
    render(<FlightSearchForm onSearch={() => {}} />);

    const armedForces = screen.getByRole("button", { name: /armed forces/i });
    await user.click(armedForces);
    expect(armedForces).toHaveAttribute("aria-pressed", "true");
  });
});
