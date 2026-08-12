import { Link } from "react-router-dom";
import { Link2, Play } from "lucide-react";

const footerGroups = [
  {
    title: "Products",
    links: [
      ["Employment OS", "/products/employment-os"],
      ["HR software", "/products/hr-software"],
      ["Payroll", "/products/payroll-software"],
      ["Hiring", "/products/hiring"],
      ["Employee experience", "/products/employee-experience"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Small business", "/solutions/small-business"],
      ["Medium business", "/solutions/medium-business"],
      ["Enterprise", "/solutions/enterprise"],
      ["Industries", "/industries"],
      ["Pricing", "/pricing"],
    ],
  },
  {
    title: "Learn",
    links: [
      ["Resources", "/resources"],
      ["Blog", "/resources/blog"],
      ["Guides", "/resources/guides-and-playbooks"],
      ["Webinars", "/resources/webinars"],
      ["Templates", "/resources/templates"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Careers", "/careers"],
      ["Customers", "/customers"],
      ["Partners", "/partners"],
      ["Contact", "/contact"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-hero py-16 sm:py-20">
        <div className="grid gap-12 border-b border-white/20 pb-14 lg:grid-cols-[1.25fr_2fr]">
          <div>
            <img
              src="/brand/logo.svg"
              alt="Employment Hero"
              className="h-9 w-auto brightness-0 invert"
            />
            <p className="mt-6 max-w-sm text-lg leading-8 text-white/70">
              Employment doesn&rsquo;t have to be hard. Run every part of it in one intelligent
              system.
            </p>
            <Link
              to="/book-a-demo"
              className="focus-hero mt-7 inline-flex rounded-full bg-violet px-6 py-3 text-sm font-bold text-ink"
            >
              Book a demo
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-bold">{group.title}</h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map(([label, href]) => (
                    <li key={href}>
                      <Link
                        className="focus-hero rounded text-sm text-white/65 hover:text-white"
                        to={href}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6 pt-8 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>Unofficial demo. Not affiliated with Employment Hero Pty Ltd.</p>
          <div className="flex items-center gap-5">
            <Link to="/contact" className="focus-hero rounded hover:text-white">
              Privacy
            </Link>
            <Link to="/contact" className="focus-hero rounded hover:text-white">
              Terms
            </Link>
            <a
              href="https://www.linkedin.com/company/employment-hero/"
              className="focus-hero rounded"
              aria-label="LinkedIn"
            >
              <Link2 aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/@EmploymentHero"
              className="focus-hero rounded"
              aria-label="YouTube"
            >
              <Play aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
