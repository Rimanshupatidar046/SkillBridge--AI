import { Outlet, createFileRoute } from "@tanstack/react-router";

import { LoadingState } from "@/components/LoadingState";
import { useAuth } from "@/context/AuthContext";
import { AppShell } from "@/layouts/AppShell";
import { requireAuth } from "@/lib/auth-guard";

/**
 * ProtectedRoute: every route under `_authenticated/` requires a session.
 * Runs client-side only so the persisted demo session can be read.
 */
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: ({ location }) => requireAuth(location.href),
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { isReady, user } = useAuth();
  if (!isReady || !user) return <LoadingState fullScreen label="Loading your workspace…" />;
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
