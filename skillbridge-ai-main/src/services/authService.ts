import { DEMO_PASSWORD, demoUsers } from "@/data/demoUsers";
import type { Role, Session, User } from "@/lib/types";

const SESSION_KEY = "skillbridge.session";
const USERS_KEY = "skillbridge.users";

interface StoredUser extends User {
  password: string;
}

const isBrowser = () => typeof window !== "undefined";

function readUsers(): StoredUser[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function persistSession(user: User): Session {
  const session: Session = { user, issuedAt: new Date().toISOString() };
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

const delay = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  getSession(): Session | null {
    if (!isBrowser()) return null;
    try {
      const raw = window.localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as Session) : null;
    } catch {
      return null;
    }
  },

  async login(email: string, password: string): Promise<Session> {
    await delay();
    const normalized = email.trim().toLowerCase();
    const demo = demoUsers.find((u) => u.email === normalized);
    if (demo && password === DEMO_PASSWORD) return persistSession(demo);

    const stored = readUsers().find((u) => u.email === normalized);
    if (stored && stored.password === password) {
      const { password: _pw, ...user } = stored;
      return persistSession(user);
    }
    throw new Error("Invalid email or password. Try a demo account below.");
  },

  async signup(input: {
    name: string;
    email: string;
    password: string;
    role: Role;
    organization?: string | undefined;
  }): Promise<Session> {
    await delay();
    const normalized = input.email.trim().toLowerCase();
    const exists =
      demoUsers.some((u) => u.email === normalized) ||
      readUsers().some((u) => u.email === normalized);
    if (exists) throw new Error("An account with this email already exists.");

    const user: StoredUser = {
      id: `u-${Date.now().toString(36)}`,
      name: input.name.trim(),
      email: normalized,
      role: input.role,
      organization: input.organization?.trim() || "Not specified",
      location: "India",
      password: input.password,
    };
    writeUsers([...readUsers(), user]);
    const { password: _pw, ...publicUser } = user;
    return persistSession(publicUser);
  },

  async loginAsDemo(role: Role): Promise<Session> {
    await delay(300);
    const user = demoUsers.find((u) => u.role === role);
    if (!user) throw new Error("Demo account unavailable.");
    return persistSession(user);
  },

  async requestPasswordReset(email: string): Promise<void> {
    await delay();
    if (!email.includes("@")) throw new Error("Enter a valid email address.");
  },

  updateUser(patch: Partial<User>): Session | null {
    const session = authService.getSession();
    if (!session) return null;
    const user: User = { ...session.user, ...patch };
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    const existing = idx >= 0 ? users[idx] : undefined;
    if (existing) {
      users[idx] = { ...user, password: existing.password };
      writeUsers(users);
    }
    return persistSession(user);
  },

  logout() {
    if (!isBrowser()) return;
    window.localStorage.removeItem(SESSION_KEY);
  },
};
