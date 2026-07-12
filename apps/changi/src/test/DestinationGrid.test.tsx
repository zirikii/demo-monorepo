import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DestinationGrid } from "@/components/home/DestinationGrid";

test("renders the full live-page inspired destination set", () => {
  render(<MemoryRouter><DestinationGrid /></MemoryRouter>);
  expect(screen.getAllByRole("link")).toHaveLength(21);
  expect(screen.getByRole("heading", { name: "Kyoto" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Hong Kong" })).toBeInTheDocument();
});
