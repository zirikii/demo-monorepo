import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { OptusLogo } from "@/components/layout/logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-optus-page px-4 py-10">
      <Card className="w-full max-w-md shadow-optus">
        <CardHeader className="items-center text-center">
          <Link href="/" aria-label="Home">
            <OptusLogo />
          </Link>
          <CardTitle className="mt-4 text-2xl">Log in to Business Hub</CardTitle>
          <p className="text-sm text-optus-muted">
            Use any credentials to explore the protected Optus demo.
          </p>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <p className="mt-5 text-center text-sm text-optus-muted">
            Need a workspace?{" "}
            <Link href="/signup" className="font-bold text-optus-teal">
              Start demo
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
