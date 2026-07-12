import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { DirectionTabs } from "@/components/home/DirectionTabs";

test("updates useful passenger information when direction changes", async () => {
  render(<MemoryRouter><DirectionTabs /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: /useful information for arriving passengers/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole("tab", { name: /departing/i }));
  expect(screen.getByRole("heading", { name: /useful information for departing passengers/i })).toBeInTheDocument();
});
