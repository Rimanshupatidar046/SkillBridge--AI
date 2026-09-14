import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/Navbar";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Workforce intelligence that turns industry signals into action for students,
              institutions, districts and employers.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground md:items-end">
            <div className="flex items-center gap-4">
              <Link to="/login" className="hover:text-foreground">
                Sign in
              </Link>
              <Link to="/signup" className="hover:text-foreground">
                Create account
              </Link>
            </div>
            <p className="text-xs">Smart India Hackathon 2026 · Problem Statement SIH26134</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
