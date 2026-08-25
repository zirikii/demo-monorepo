import { useState } from "react";
import { ProductLayout } from "@/components/product/ProductLayout";
import { DIRECTORY_USERS } from "@/data/admin";
import { getProductApp } from "@/data/apps";
import { readAdminSettings, updateAdminSetting } from "@/lib/admin";

const APP = getProductApp("admin");
const NAV = [{ label: "Directory", to: "/admin", end: true }];

const TOGGLES = [
  {
    key: "twoStepLogin" as const,
    label: "Two-step verification",
    description: "Require a second factor for everyone on this site.",
  },
  {
    key: "publicSignup" as const,
    label: "Public signup",
    description: "Let anyone with a Northline email create an account.",
  },
];

export default function AdminHubPage() {
  const [settings, setSettings] = useState(readAdminSettings);

  return (
    <ProductLayout app={APP} title="Admin" nav={NAV}>
      <h1 className="text-2xl font-extrabold text-ink-strong">Admin</h1>
      <p className="mt-1 text-sm text-ink-soft">Northline Payments site administration</p>

      <section className="mt-6 rounded-atl-sm border border-line bg-white p-5">
        <h2 className="text-base font-extrabold text-ink-strong">Directory</h2>
        <ul className="mt-4 divide-y divide-line">
          {DIRECTORY_USERS.map((person) => (
            <li key={person.email} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
              <span>
                <span className="block font-semibold text-ink-strong">{person.name}</span>
                <span className="text-sm text-ink-faint">{person.email}</span>
              </span>
              <span className="text-sm text-ink-soft">
                {person.role} · {person.products.join(", ")}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-atl-sm border border-line bg-white p-5">
        <h2 className="text-base font-extrabold text-ink-strong">Organisation policies</h2>
        <ul className="mt-4 flex flex-col gap-5">
          {TOGGLES.map((toggle) => {
            const checked = settings[toggle.key];
            return (
              <li key={toggle.key} className="flex items-start justify-between gap-4">
                <span>
                  <span className="block font-bold text-ink-strong">{toggle.label}</span>
                  <span className="text-sm text-ink-faint">{toggle.description}</span>
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={checked}
                  aria-label={toggle.label}
                  onClick={() => setSettings(updateAdminSetting(toggle.key, !checked))}
                  className={
                    checked
                      ? "focus-atl relative h-6 w-11 shrink-0 rounded-full bg-atl-blue"
                      : "focus-atl relative h-6 w-11 shrink-0 rounded-full bg-surface-deep"
                  }
                >
                  <span
                    className={
                      checked
                        ? "absolute top-0.5 left-[22px] h-5 w-5 rounded-full bg-white"
                        : "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white"
                    }
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </ProductLayout>
  );
}
