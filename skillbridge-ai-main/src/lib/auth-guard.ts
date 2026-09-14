import { redirect } from "@tanstack/react-router";

import { authService } from "@/services/authService";

/**
 * Route-level protection. Used in `beforeLoad` of client-only (`ssr: false`)
 * layout routes so the persisted demo session in localStorage can be read.
 */
export function requireAuth(href: string) {
  if (typeof window === "undefined") return;
  if (!authService.getSession()) {
    throw redirect({ to: "/login", search: { redirect: href } });
  }
}

/** Sends already-authenticated users away from auth pages. */
export function redirectIfAuthenticated() {
  if (typeof window === "undefined") return;
  if (authService.getSession()) {
    throw redirect({ to: "/dashboard" });
  }
}
