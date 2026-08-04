import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function RegisterPage() {
  useDocumentTitle("Register for NetBank");
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("Alex Nguyen");
  const [email, setEmail] = useState("alex.nguyen@example.com");
  const [mobile, setMobile] = useState("0412 555 018");
  const [cardNumber, setCardNumber] = useState("5163 0000 0000 4471");

  return (
    <PageLayout>
      <section className="bg-surface-tint py-12 sm:py-16">
        <div className="container-cba max-w-2xl">
          <h1 className="text-3xl font-extrabold text-ink">Register for NetBank</h1>
          <p className="mt-3 text-[17px] leading-relaxed text-ink-soft">
            You can register with your CommBank card details. You will need a valid email address
            and an Australian mobile phone number.
          </p>

          <div className="mt-6 flex gap-3 rounded-cba-md bg-cba-yellow-tint p-4">
            <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
            <p className="text-[14px] leading-relaxed text-ink-soft">
              <span className="font-bold text-ink">Demo mode.</span> Nothing is submitted anywhere.
              Registering creates a local demo session in your browser only.
            </p>
          </div>

          <form
            className="mt-8 space-y-5 rounded-cba-lg bg-surface p-8 shadow-cba"
            onSubmit={(event) => {
              event.preventDefault();
              register(name, email);
              navigate("/netbank", { replace: true });
            }}
          >
            <TextField
              label="Full name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              label="Email address"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Australian mobile number"
              autoComplete="tel"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
            />
            <TextField
              label="CommBank card number"
              hint="We use this to verify who you are"
              value={cardNumber}
              onChange={(event) => setCardNumber(event.target.value)}
            />
            <Button type="submit" size="lg" className="w-full">
              Register and log on
            </Button>
          </form>

          <p className="mt-6 text-[14px] text-ink-soft">
            Already registered?{" "}
            <Link to="/login" className="font-bold text-ink underline underline-offset-4">
              Log on to NetBank
            </Link>
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
