import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const LOGIN_FEEDBACK_DELAY_MS = 300;

type FormValues = z.infer<typeof schema>;

export function LoginPage() {
  useDocumentTitle("Sign in");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [hint] = useState("Demo mode: any email and password will work.");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "traveller@example.com", password: "demo" },
  });

  return (
    <PageLayout>
      <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
        <div className="rounded-2xl border border-line bg-card p-6 shadow-card">
          <img src="/brand/logo.svg" alt="" className="h-8 w-auto" />
          <h1 className="mt-4 text-2xl font-black text-ink-deep">Sign in to Changi Account</h1>
          <p className="mt-1 text-sm text-ink-soft">{hint}</p>
          <form
            className="mt-6 space-y-4"
            onSubmit={handleSubmit(async (values) => {
              await new Promise((resolve) => window.setTimeout(resolve, LOGIN_FEEDBACK_DELAY_MS));
              login(values.email, values.password);
              navigate(params.get("redirect") || "/account");
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="text-xs font-bold uppercase tracking-wide text-ink-faint"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                disabled={isSubmitting}
                className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm outline-none ring-purple focus:ring-2"
                {...register("email")}
              />
              {errors.email ? (
                <p className="mt-1 text-xs text-danger">{errors.email.message}</p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-xs font-bold uppercase tracking-wide text-ink-faint"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                disabled={isSubmitting}
                className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm outline-none ring-purple focus:ring-2"
                {...register("password")}
              />
              {errors.password ? (
                <p className="mt-1 text-xs text-danger">{errors.password.message}</p>
              ) : null}
            </div>
            <Button
              type="submit"
              variant="purple"
              className="w-full"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-ink-soft">
            New here?{" "}
            <Link to="/signup" className="font-bold text-purple hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
