import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CircleCheck, MapPin, Zap, Wifi, Smartphone } from "lucide-react";
import { AglRays } from "@/components/brand/AglRays";
import { STATES, type StateCode } from "@/data/plans";

const services = [
  { label: "Electricity & gas", to: "/energy", Icon: Zap },
  { label: "Internet", to: "/internet", Icon: Wifi },
  { label: "Mobile", to: "/mobile", Icon: Smartphone },
] as const;

export function HomeHero() {
  const navigate = useNavigate();
  const [service, setService] = useState<(typeof services)[number]["to"]>("/energy");
  const [address, setAddress] = useState("");
  const [state, setState] = useState<StateCode>("NSW");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ state });
    if (address.trim()) params.set("address", address.trim());
    navigate(`${service}?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-agl-blue-dark via-agl-blue to-[#0078d4] text-white">
      <AglRays className="pointer-events-none absolute top-1/2 -right-40 h-[640px] w-[640px] -translate-y-1/2 opacity-30" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-ray-cyan/25 blur-3xl" />
      <div className="container-agl relative grid items-center gap-12 py-14 lg:grid-cols-[1.15fr_1fr] lg:py-20">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-bold ring-1 ring-white/20">
            <span className="h-2 w-2 rounded-full bg-ray-light" aria-hidden="true" /> Limited time online offer
          </p>
          <h1 className="mt-5 text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Get up to $300 in bill credits when you join online
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Switch to our Value Saver plan and bundle nbn® or mobile to save even more. No lock-in contracts.
          </p>
          <ul className="mt-6 space-y-2 text-white/90">
            {["$15/mth off nbn® with AGL energy", "$10/mth off SIM plans with AGL energy", "Award-winning customer service"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CircleCheck className="h-5 w-5 text-ray-light" aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={submit}
          aria-label="Find a plan"
          className="animate-pop-in rounded-agl-xl bg-white p-6 text-ink shadow-agl-panel sm:p-8"
          style={{ animationDelay: "120ms" }}
        >
          <h2 className="text-2xl font-extrabold text-agl-blue-dark">Find a plan for your address</h2>
          <fieldset className="mt-5">
            <legend className="text-sm font-bold text-ink-soft">I’m looking for</legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {services.map(({ label, to, Icon }) => (
                <label
                  key={to}
                  className="flex cursor-pointer flex-col items-center gap-1.5 rounded-agl border-2 border-line-soft p-3 text-center text-xs font-bold has-checked:border-agl-blue has-checked:bg-agl-sky has-checked:text-agl-blue"
                >
                  <input type="radio" name="service" value={to} checked={service === to} onChange={() => setService(to)} className="sr-only" />
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_110px]">
            <label className="block">
              <span className="text-sm font-bold text-ink-soft">Your address</span>
              <span className="relative mt-1 block">
                <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Start typing your address"
                  className="h-12 w-full rounded-agl border border-line pr-3 pl-9 focus:border-agl-blue focus:ring-2 focus:ring-agl-blue/20 focus:outline-none"
                />
              </span>
            </label>
            <label className="block">
              <span className="text-sm font-bold text-ink-soft">State</span>
              <select
                value={state}
                onChange={(e) => setState(e.target.value as StateCode)}
                className="mt-1 h-12 w-full rounded-agl border border-line bg-white px-3 focus:border-agl-blue focus:outline-none"
              >
                {STATES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.code}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit" className="mt-5 h-12 w-full rounded-full bg-agl-blue font-extrabold text-white hover:bg-agl-blue-hover">
            See plans and prices
          </button>
          <p className="mt-3 text-center text-xs text-ink-faint">Already with us? Log in to see your plan and bills.</p>
        </form>
      </div>
    </section>
  );
}
