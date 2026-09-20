import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Field, Select, TextInput } from "@/components/ui/Field";
import { DISCLAIMER } from "@/data/site";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(3, "Use at least 3 characters"),
  hub: z.string().min(1),
});

type Values = z.infer<typeof schema>;

export default function SignUpPage() {
  useDocumentTitle("Sign up");
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "demo", hub: "Jakarta" },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-go-bg px-4 py-12">
      <div className="w-full max-w-md rounded-go-lg border border-go-line bg-go-surface p-8">
        <BrandLogo />
        <h1 className="mt-8 text-3xl font-semibold">Join the dummy roster</h1>
        <p className="mt-2 text-sm text-go-muted">Persists to localStorage. Not a real Gojek application.</p>
        <form
          className="mt-8 space-y-4"
          onSubmit={handleSubmit((values) => {
            signUp(values);
            navigate("/portal", { replace: true });
          })}
        >
          <Field htmlFor="name" label="Name" error={errors.name?.message}>
            <TextInput id="name" {...register("name")} />
          </Field>
          <Field htmlFor="email" label="Email" error={errors.email?.message}>
            <TextInput id="email" type="email" {...register("email")} />
          </Field>
          <Field htmlFor="password" label="Password" error={errors.password?.message}>
            <TextInput id="password" type="password" {...register("password")} />
          </Field>
          <Field htmlFor="hub" label="Preferred hub">
            <Select id="hub" {...register("hub")}>
              <option>Jakarta</option>
              <option>Singapore</option>
              <option>Bangalore</option>
            </Select>
          </Field>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Create profile
          </Button>
        </form>
        <p className="mt-6 text-sm text-go-muted">
          Already in?{" "}
          <Link to="/login" className="text-go-green hover:underline">
            Log in
          </Link>
        </p>
        <p className="mt-6 text-xs text-go-faint">{DISCLAIMER}</p>
      </div>
    </div>
  );
}
