import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";

const links = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Who it helps", href: "#audiences" },
];

export function Navbar() {
  const { isReady, isAuthenticated, user } = useAuth();
  const [open, setOpen] = useState(false);

  const cta =
    isReady && isAuthenticated ? (
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-card transition-colors hover:bg-primary/90"
      >
        Open dashboard
        <ArrowRight className="h-4 w-4" />
      </Link>
    ) : (
      <>
        <Link
          to="/login"
          className="rounded-lg px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Sign in
        </Link>
        <Link
          to="/signup"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-card transition-colors hover:bg-primary/90"
        >
          Get started
          <ArrowRight className="h-4 w-4" />
        </Link>
      </>
    );

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {isReady && isAuthenticated && user && (
            <span className="mr-1 hidden text-sm text-muted-foreground lg:inline">
              Hi, {user.name.split(" ")[0]}
            </span>
          )}
          {cta}
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-muted md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">{cta}</div>
        </div>
      )}
    </header>
  );
}
