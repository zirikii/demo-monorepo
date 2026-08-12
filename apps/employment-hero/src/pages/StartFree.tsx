import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Field, SelectField } from "@/components/ui/Field";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const included = [
  "Employee records, contracts and e-signature",
  "Guided onboarding checklists",
  "Leave requests and approvals",
  "Unlimited job ads and applicant tracking",
  "The Employment Hero Work app for your whole team",
];

export function StartFreePage() {
  useDocumentTitle("Start free");
  const navigate = useNavigate();
  const { startFree } = useAuth();

  const [name, setName] = useState("Ava Thompson");
  const [email, setEmail] = useState("ava.thompson@brightpath.com.au");
  const [company, setCompany] = useState("Brightpath Group");
  const [size, setSize] = useState("11-50");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    startFree(name, email, company);
    navigate("/platform");
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      <div className="flex flex-col justify-center px-6 py-16 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <Logo />
          <p className="mt-10 text-xs font-bold tracking-[0.16em] text-eh-purple uppercase">
            Start free
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-eh-ink">
            Set up your workspace
          </h1>
          <p className="mt-2 text-sm text-eh-ink-soft">
            No credit card, no sales call. You will land straight in the platform.
          </p>

          <div className="mt-6 flex items-start gap-3 rounded-eh-md bg-eh-purple-tint px-4 py-3.5 text-sm text-eh-purple-deep">
            <Sparkles size={16} className="mt-0.5 shrink-0" />
            <p>Demo mode — the form is pre-filled and nothing is sent anywhere.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Field
              label="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
            />
            <Field
              label="Work email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
            <Field
              label="Company"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              autoComplete="organization"
            />
            <SelectField
              label="Team size"
              value={size}
              onChange={(event) => setSize(event.target.value)}
            >
              <option value="1-10">1 – 10 employees</option>
              <option value="11-50">11 – 50 employees</option>
              <option value="51-200">51 – 200 employees</option>
              <option value="201-1000">201 – 1,000 employees</option>
              <option value="1000+">More than 1,000 employees</option>
            </SelectField>

            <Button type="submit" className="w-full">
              Create my workspace
            </Button>
          </form>

          <p className="mt-8 text-sm text-eh-ink-soft">
            Already using Employment Hero?{" "}
            <Link
              to="/login?portal=employer"
              className="focus-eh font-semibold text-eh-purple hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden flex-col justify-center bg-eh-purple p-12 text-white lg:flex">
        <h2 className="font-display text-3xl leading-tight font-bold">
          Everything you need on day one.
        </h2>
        <ul className="mt-8 space-y-4">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-white/85">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-eh-lime text-eh-ink">
                <Check size={12} strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-xs text-white/50">
          Unofficial demo. Not affiliated with Employment Hero Pty Ltd.
        </p>
      </div>
    </div>
  );
}
