import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { authService } from "@/services/authService";
import type { Role, User } from "@/lib/types";

interface AuthContextValue {
  user: User | null;
  /** True once the persisted session has been read on the client. */
  isReady: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (input: {
    name: string;
    email: string;
    password: string;
    role: Role;
    organization?: string | undefined;
  }) => Promise<User>;
  loginAsDemo: (role: Role) => Promise<User>;
  updateUser: (patch: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setUser(authService.getSession()?.user ?? null);
    setIsReady(true);

    const onStorage = (event: StorageEvent) => {
      if (event.key === "skillbridge.session") {
        setUser(authService.getSession()?.user ?? null);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const session = await authService.login(email, password);
    setUser(session.user);
    return session.user;
  }, []);

  const signup = useCallback<AuthContextValue["signup"]>(async (input) => {
    const session = await authService.signup(input);
    setUser(session.user);
    return session.user;
  }, []);

  const loginAsDemo = useCallback(async (role: Role) => {
    const session = await authService.loginAsDemo(role);
    setUser(session.user);
    return session.user;
  }, []);

  const updateUser = useCallback((patch: Partial<User>) => {
    const session = authService.updateUser(patch);
    if (session) setUser(session.user);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      isAuthenticated: !!user,
      login,
      signup,
      loginAsDemo,
      updateUser,
      logout,
    }),
    [user, isReady, login, signup, loginAsDemo, updateUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
