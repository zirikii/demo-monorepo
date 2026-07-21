import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  personaOptions,
  quickLinksByPersona,
  type PersonaId,
} from "@/data/personas";
import { cn } from "@/lib/cn";

export function PersonaHero() {
  const [persona, setPersona] = useState<PersonaId>("arriving");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const links = quickLinksByPersona[persona];
  const current = personaOptions.find((p) => p.id === persona)!;

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1520] via-[#2a1f38] to-[#3d2a55] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(225,210,0,0.25), transparent 45%), radial-gradient(ellipse at 80% 10%, rgba(238,52,36,0.28), transparent 40%), radial-gradient(ellipse at 70% 80%, rgba(108,33,127,0.45), transparent 50%)",
        }}
      />
      <div className="relative z-20 mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16">
        <div className="animate-fade-up">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Airport</p>
          <div className="mt-4 flex flex-wrap items-end gap-3 sm:gap-4">
            <span className="text-4xl font-black tracking-tight sm:text-6xl">I AM</span>
            <div ref={wrapRef} className="relative">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={listId}
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-2 border-b-2 border-white pb-1 text-3xl font-black tracking-tight sm:text-5xl"
              >
                {current.label}
                <ChevronDown className={cn("h-6 w-6 transition-transform sm:h-8 sm:w-8", open && "rotate-180")} />
              </button>
              {open ? (
                <ul
                  id={listId}
                  role="listbox"
                  className="absolute left-0 top-full z-10 mt-2 min-w-[220px] animate-fade-in overflow-hidden rounded-lg border border-white/20 bg-[#1f1828] shadow-float"
                >
                  {personaOptions.map((opt) => (
                    <li key={opt.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={opt.id === persona}
                        className={cn(
                          "block w-full px-4 py-3 text-left text-sm font-bold tracking-wide hover:bg-white/10",
                          opt.id === persona && "bg-white/10 text-[#f7c651]",
                        )}
                        onClick={() => {
                          setPersona(opt.id);
                          setOpen(false);
                        }}
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-sand text-ink">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-black uppercase tracking-[0.14em] text-ink-soft">
              Useful information for {current.label.toLowerCase()} passengers
            </h2>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple">Quick links</span>
          </div>
          <div
            key={persona}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {links.map((link, idx) => (
              <Link
                key={link.id}
                to={link.to}
                className="group rounded-xl border border-sand-deep bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-purple/30 hover:shadow-card animate-fade-up"
                style={{ animationDelay: `${idx * 45}ms` }}
              >
                <h3 className="text-base font-black text-ink-deep group-hover:text-purple">{link.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
