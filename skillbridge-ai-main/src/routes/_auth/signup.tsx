import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";

import {
  DemoAccounts,
  Field,
  FormError,
  RoleSelector,
  SubmitButton,
} from "@/components/auth/AuthFields";
import { useAuth } from "@/context/AuthContext";
import { roleMeta } from "@/data/demoUsers";
import type { Role } from "@/lib/types";

export const Route = createFileRoute("/_auth/signup")({
  head: () => ({
    meta: [
      { title: "Create account — SkillBridge AI" },
      {
        name: "description",
        content:
          "Create a SkillBridge AI account as a student, institution, district planner or employer.",
      },
      { property: "og:title", content: "Create account — SkillBridge AI" },
      { property: "og:description", content: "Join the workforce-intelligence loop." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignupPage,
});

const schema = z
  .object({
    name: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email address"),
    organization: z.string().optional(),
    password: z.string().min(8, "Use at least 8 characters"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

type FormState = z.infer<typeof schema>;

function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("student");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    organization: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: typeof errors = {};
      for (const issue of parsed.error.issues)
        next[issue.path[0] as keyof FormState] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await signup({ ...parsed.data, role });
      toast.success("Account created. Welcome to SkillBridge AI!");
      navigate({ to: "/dashboard", replace: true });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
      <p className="mt-1 text-sm text-muted-foreground">{roleMeta[role].description}</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
        <FormError message={formError} />
        <div>
          <p className="mb-1.5 text-sm font-medium text-foreground">I am a…</p>
          <RoleSelector value={role} onChange={setRole} />
        </div>
        <Field
          id="name"
          label="Full name"
          autoComplete="name"
          placeholder="Ananya Sharma"
          value={form.name}
          onChange={set("name")}
          error={errors.name}
        />
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@college.edu"
          value={form.email}
          onChange={set("email")}
          error={errors.email}
        />
        <Field
          id="organization"
          label={role === "student" ? "Institution (optional)" : "Organisation (optional)"}
          placeholder={role === "employer" ? "Company name" : "Institution or department"}
          value={form.organization}
          onChange={set("organization")}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={set("password")}
            error={errors.password}
          />
          <Field
            id="confirm"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            value={form.confirm}
            onChange={set("confirm")}
            error={errors.confirm}
          />
        </div>
        <SubmitButton loading={loading}>Create account</SubmitButton>
      </form>

      <DemoAccounts onDone={() => navigate({ to: "/dashboard", replace: true })} />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
