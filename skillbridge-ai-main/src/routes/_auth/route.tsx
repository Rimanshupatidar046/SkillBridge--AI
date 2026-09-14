import { Outlet, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import { Logo } from "@/components/Logo";
import { redirectIfAuthenticated } from "@/lib/auth-guard";

export const Route = createFileRoute("/_auth")({
  ssr: false,
  beforeLoad: () => redirectIfAuthenticated(),
  component: AuthLayout,
});

const points = [
  "Readiness score benchmarked to real job demand",
  "Skill gaps ranked by regional market weight",
  "Learning paths that produce verifiable evidence",
];

function AuthLayout() {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="grid-fade pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative">
          <Logo className="[&_span:last-child]:text-primary-foreground [&_span:last-child_span]:text-primary-foreground/70 [&_span:first-child]:bg-primary-foreground [&_span:first-child]:text-primary" />
        </div>
        <div className="relative max-w-md">
          <h2 className="text-4xl font-extrabold leading-tight">
            From industry signals to workforce action.
          </h2>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-primary-foreground/90">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-primary-foreground/70">
          Smart India Hackathon 2026 · SIH26134
        </p>
      </aside>
      <main className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
