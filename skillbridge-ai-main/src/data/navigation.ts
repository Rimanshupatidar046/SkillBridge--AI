import type { NavGroup } from "@/lib/types";

export const navigation: NavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", to: "/dashboard", icon: "LayoutDashboard" }],
  },
  {
    label: "Student Intelligence",
    items: [
      { label: "My Skills", to: "/my-skills", icon: "Sparkles" },
      { label: "Assessment", to: "/assessment", icon: "ClipboardCheck" },
      { label: "Skill Gap", to: "/skill-gap", icon: "GitCompareArrows" },
      { label: "Learning Path", to: "/learning-path", icon: "Route" },
    ],
  },
  {
    label: "Curriculum Intelligence",
    items: [
      { label: "Curriculum Mapping", to: "/curriculum", icon: "BookOpenCheck" },
      { label: "Courses", to: "/courses", icon: "GraduationCap" },
    ],
  },
  {
    label: "Industry Intelligence",
    items: [
      { label: "Industry Demand", to: "/industry-demand", icon: "TrendingUp", exact: true },
      { label: "Emerging Skills", to: "/industry-demand/emerging", icon: "Radar" },
    ],
  },
  {
    label: "Training Intelligence",
    items: [{ label: "Training Capacity", to: "/training-capacity", icon: "Building2" }],
  },
  {
    label: "Regional Intelligence",
    items: [{ label: "District Planner", to: "/district-planner", icon: "Map" }],
  },
  {
    label: "Employer Intelligence",
    items: [{ label: "Employer Validation", to: "/employer-validation", icon: "BadgeCheck" }],
  },
  {
    label: "Profile",
    items: [
      { label: "Profile", to: "/profile", icon: "UserRound" },
      { label: "Settings", to: "/settings", icon: "Settings" },
    ],
  },
];

export const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/my-skills": "My Skills",
  "/assessment": "Assessment",
  "/skill-gap": "Skill Gap Analysis",
  "/learning-path": "Learning Path",
  "/curriculum": "Curriculum Mapping",
  "/courses": "Courses",
  "/industry-demand": "Industry Demand",
  "/industry-demand/emerging": "Emerging Skills",
  "/training-capacity": "Training Capacity",
  "/district-planner": "District Planner",
  "/employer-validation": "Employer Validation",
  "/profile": "Profile",
  "/settings": "Settings",
};

export function titleForPath(pathname: string) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return pageTitles[clean] ?? "SkillBridge AI";
}
