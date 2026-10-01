import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AuthProvider } from "@/hooks/useAuth";
import { resolveLoginService } from "@/lib/login-service";
import { LoginPage } from "@/pages/Login";

function renderLogin(route = "/login") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>
        <LoginPage />
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe("resolveLoginService", () => {
  it("defaults to NetBank when the query is missing", () => {
    expect(resolveLoginService(null)).toEqual({
      name: "NetBank",
      tagline: "Everyday personal banking",
    });
  });

  it("matches the lowercase service query used by the log-on menu", () => {
    expect(resolveLoginService("commbiz").name).toBe("CommBiz");
    expect(resolveLoginService("commsec").name).toBe("CommSec");
    expect(resolveLoginService("netbank").name).toBe("NetBank");
  });

  it("falls back to NetBank for unknown values instead of crashing", () => {
    expect(resolveLoginService("NetBank").name).toBe("NetBank");
    expect(resolveLoginService("not-a-service").name).toBe("NetBank");
  });
});

describe("LoginPage", () => {
  it("renders the NetBank log-on form without a service query", () => {
    renderLogin();

    expect(screen.getByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
    expect(screen.getByText("Everyday personal banking")).toBeInTheDocument();
    expect(screen.getByLabelText("Client number")).toHaveValue("12345678");
    expect(screen.getByLabelText("Password")).toHaveValue("demo1234");
  });

  it.each([
    ["/login?service=commbiz", "Log on to CommBiz"],
    ["/login?service=commsec", "Log on to CommSec"],
  ] as const)("renders %s from the log-on menu query", (route, heading) => {
    renderLogin(route);
    expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
  });

  it("keeps rendering when the service query is unrecognised", () => {
    renderLogin("/login?service=unknown");
    expect(screen.getByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
  });
});
