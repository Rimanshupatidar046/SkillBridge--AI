import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { DemoAccounts, Field, FormError, SubmitButton } from "@/components/auth/AuthFields";
import { useAuth } from "@/context/AuthContext";

const searchSchema = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/_auth/login")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Sign in — SkillBridge AI" },
      {
        name: "description",
        content: "Sign in to your SkillBridge AI workspace or explore with a demo account.",
      },
      { property: "og:title", content: "Sign in — SkillBridge AI" },
      { property: "og:description", content: "Access your workforce-intelligence dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const goNext = () => {
    const target =
      redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/dashboard";
    navigate({ to: target, replace: true });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: typeof errors = {};
      for (const issue of parsed.error.issues)
        next[issue.path[0] as keyof typeof form] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const user = await login(parsed.data.email, parsed.data.password);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}`);
      goNext();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">Sign in to continue to your workspace.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
        <FormError message={formError} />
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@college.edu"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />
        <Field
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
          hint={
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          }
        />
        <SubmitButton loading={loading}>Sign in</SubmitButton>
      </form>

      <DemoAccounts onDone={goNext} />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        New to SkillBridge?{" "}
        <Link to="/signup" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
