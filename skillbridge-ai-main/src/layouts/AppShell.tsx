import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, ChevronDown, LogOut, Menu, Settings, UserRound } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { roleMeta } from "@/data/demoUsers";
import { titleForPath } from "@/data/navigation";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";

const COLLAPSE_KEY = "skillbridge.sidebar.collapsed";

export function AppShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCollapsed(window.localStorage.getItem(COLLAPSE_KEY) === "1");
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const toggleCollapse = () => {
    setCollapsed((v) => {
      window.localStorage.setItem(COLLAPSE_KEY, v ? "0" : "1");
      return !v;
    });
  };

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate({ to: "/login", replace: true });
  };

  const title = titleForPath(pathname);
  const role = user ? roleMeta[user.role] : null;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-muted lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <p className="hidden text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:block">
              SkillBridge AI
            </p>
            <h2 className="truncate text-base font-semibold text-foreground sm:text-lg">{title}</h2>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
            </button>

            {user && (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  className="flex items-center gap-2.5 rounded-lg py-1.5 pl-1.5 pr-2 hover:bg-muted"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {initials(user.name)}
                  </span>
                  <span className="hidden text-left sm:block">
                    <span className="block text-sm font-semibold leading-tight text-foreground">
                      {user.name}
                    </span>
                    <span className="block text-xs leading-tight text-muted-foreground">
                      {role?.label}
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      menuOpen && "rotate-180",
                    )}
                  />
                </button>

                {menuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-border bg-popover shadow-elevated animate-in fade-in-0 zoom-in-95"
                  >
                    <div className="border-b border-border px-4 py-3">
                      <p className="text-sm font-semibold text-foreground">{user.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                      <span className="mt-2 inline-flex rounded-md bg-primary-soft px-2 py-0.5 text-[11px] font-semibold text-primary">
                        {role?.label}
                      </span>
                    </div>
                    <div className="p-1.5">
                      <Link
                        to="/profile"
                        role="menuitem"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted"
                      >
                        <UserRound className="h-4 w-4 text-muted-foreground" /> My profile
                      </Link>
                      <Link
                        to="/settings"
                        role="menuitem"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted"
                      >
                        <Settings className="h-4 w-4 text-muted-foreground" /> Settings
                      </Link>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                      >
                        <LogOut className="h-4 w-4" /> Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
