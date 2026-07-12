import { Link } from "react-router-dom";
import { ChangiLogo } from "@/components/brand/ChangiLogo";
import { footerSections } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-[#241d18] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <div className="inline-flex rounded-2xl bg-white p-3"><ChangiLogo className="h-14 w-auto" /></div>
          <h2 className="mt-8 text-2xl font-bold">Download Changi App</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">Sign up for a Changi Account to receive the latest updates, save favourite flights, and keep rewards close.</p>
          <Link to="/help" className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#806d5d]">Sign Up</Link>
          <div className="mt-8 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/65">
            {['Facebook','Instagram','LinkedIn','Telegram','TikTok','YouTube'].map((item) => <span key={item} className="rounded-full border border-white/15 px-3 py-2">{item}</span>)}
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#f5a400]">{section.title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/72">
                {section.links.map((link) => <li key={link.label}><Link className="hover:text-white" to={link.href}>{link.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/55">Changi Sites: Airport · By-laws & Conditions of Use · Privacy Policy · © 2026 Changi Airport</div>
    </footer>
  );
}
