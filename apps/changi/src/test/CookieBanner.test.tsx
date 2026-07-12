import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CookieBanner } from "@/components/layout/CookieBanner";

beforeEach(() => window.localStorage.clear());

test("dismisses the cookie banner", async () => {
  render(<CookieBanner />);
  expect(screen.getByRole("heading", { name: /best experience possible/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: /continue/i }));
  expect(screen.queryByRole("heading", { name: /best experience possible/i })).not.toBeInTheDocument();
});
