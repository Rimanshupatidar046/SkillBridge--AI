import type { ProficiencyLevel, Skill } from "@/lib/types";

export const PROFICIENCY_LEVELS: ProficiencyLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

/** Numeric score (0-100) used for charts and progress bars. */
export const levelScore: Record<ProficiencyLevel, number> = {
  Beginner: 25,
  Intermediate: 50,
  Advanced: 75,
  Expert: 100,
};

export function levelIndex(level: ProficiencyLevel) {
  return PROFICIENCY_LEVELS.indexOf(level);
}

/** Gap in levels between target and current (0 = no gap). */
export function skillGap(skill: Pick<Skill, "current" | "target">) {
  return Math.max(0, levelIndex(skill.target) - levelIndex(skill.current));
}

export const skills: Skill[] = [
  {
    id: "sql",
    name: "SQL",
    category: "Data",
    current: "Beginner",
    target: "Advanced",
    evidence: ["DBMS course project (Sem 4)", "Self-assessment: 42/100"],
    demandTrend: "rising",
    lastAssessed: "2026-08-28",
  },
  {
    id: "python",
    name: "Python",
    category: "Programming",
    current: "Intermediate",
    target: "Advanced",
    evidence: ["HackerRank Python (Silver)", "Data Structures lab", "2 GitHub repos"],
    demandTrend: "rising",
    lastAssessed: "2026-09-02",
  },
  {
    id: "ml",
    name: "Machine Learning",
    category: "AI / ML",
    current: "Beginner",
    target: "Intermediate",
    evidence: ["Intro to ML MOOC (60% complete)"],
    demandTrend: "rising",
    lastAssessed: "2026-08-15",
  },
  {
    id: "cloud",
    name: "Cloud (AWS)",
    category: "Infrastructure",
    current: "Beginner",
    target: "Intermediate",
    evidence: ["No verified evidence yet"],
    demandTrend: "rising",
    lastAssessed: "2026-07-30",
  },
  {
    id: "dataviz",
    name: "Data Visualization",
    category: "Data",
    current: "Intermediate",
    target: "Intermediate",
    evidence: ["Power BI mini-project", "Internship dashboard (Summer 2026)"],
    demandTrend: "stable",
    lastAssessed: "2026-08-20",
  },
  {
    id: "git",
    name: "Git & Version Control",
    category: "Engineering Practice",
    current: "Advanced",
    target: "Advanced",
    evidence: ["Active GitHub contributor", "Team lead - college project"],
    demandTrend: "stable",
    lastAssessed: "2026-09-05",
  },
  {
    id: "stats",
    name: "Statistics",
    category: "Data",
    current: "Intermediate",
    target: "Advanced",
    evidence: ["Probability & Statistics: A grade"],
    demandTrend: "stable",
    lastAssessed: "2026-08-10",
  },
  {
    id: "communication",
    name: "Business Communication",
    category: "Professional",
    current: "Advanced",
    target: "Advanced",
    evidence: ["Mock interview feedback 4.5/5", "Presentation lead - Tech Fest"],
    demandTrend: "stable",
    lastAssessed: "2026-08-25",
  },
];
