export type Role = "student" | "institution" | "district" | "employer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  organization: string;
  location: string;
}

export interface Session {
  user: User;
  issuedAt: string;
}

export type ProficiencyLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type DemandTrend = "rising" | "stable" | "declining";

export interface Skill {
  id: string;
  name: string;
  category: string;
  current: ProficiencyLevel;
  target: ProficiencyLevel;
  evidence: string[];
  demandTrend: DemandTrend;
  lastAssessed: string;
}

export type Priority = "critical" | "high" | "medium" | "low";

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  effort: string;
  skillId: string;
}

export interface LearningItem {
  id: string;
  title: string;
  provider: string;
  progress: number;
  skillId: string;
  dueDate: string;
}

export interface ActivityItem {
  id: string;
  type: "assessment" | "course" | "recommendation" | "profile";
  title: string;
  detail: string;
  timestamp: string;
}

export interface StudentProfile {
  userId: string;
  headline: string;
  bio: string;
  phone: string;
  degree: string;
  branch: string;
  institution: string;
  graduationYear: number;
  cgpa: number;
  interests: string[];
  targetRoles: string[];
  preferredLocations: string[];
  linkedin: string;
  github: string;
}

export interface NavItem {
  label: string;
  to: string;
  icon: string;
  exact?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}
