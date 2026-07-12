import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "@/components/layout/Header";

test("marks the active navigation route", () => {
  render(<MemoryRouter initialEntries={["/fly"]}><Header /></MemoryRouter>);
  expect(screen.getByRole("link", { name: "Fly" })).toHaveAttribute("aria-current", "page");
});
