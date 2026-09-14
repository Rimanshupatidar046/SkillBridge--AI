import type { ActivityItem, LearningItem, RecommendedAction } from "@/lib/types";

export const readinessStats = [
  {
    id: "readiness",
    label: "Overall readiness",
    value: "68%",
    delta: "+6% this month",
    trend: "up" as const,
    hint: "vs. Data Analyst role benchmark",
  },
  {
    id: "assessed",
    label: "Skills assessed",
    value: "8 / 12",
    delta: "4 pending",
    trend: "neutral" as const,
    hint: "Complete assessments to sharpen your profile",
  },
  {
    id: "gaps",
    label: "Critical skill gaps",
    value: "4",
    delta: "-1 since last review",
    trend: "up" as const,
    hint: "SQL, Python, ML, Cloud",
  },
  {
    id: "hours",
    label: "Learning hours",
    value: "26h",
    delta: "+9h this week",
    trend: "up" as const,
    hint: "Target: 40h before campus drive",
  },
];

export const recommendedActions: RecommendedAction[] = [
  {
    id: "a1",
    title: "Complete SQL Joins & Window Functions module",
    description:
      "Highest-weighted gap for Data Analyst roles in your region. Estimated to lift readiness by 7%.",
    priority: "critical",
    effort: "4 hours",
    skillId: "sql",
  },
  {
    id: "a2",
    title: "Take the Python proficiency assessment",
    description:
      "Verify your Intermediate level with an evidence-backed score employers can trust.",
    priority: "high",
    effort: "45 minutes",
    skillId: "python",
  },
  {
    id: "a3",
    title: "Start AWS Cloud Practitioner learning path",
    description: "Cloud fundamentals appear in 61% of local job postings for your target roles.",
    priority: "high",
    effort: "12 hours",
    skillId: "cloud",
  },
  {
    id: "a4",
    title: "Build one end-to-end ML mini-project",
    description:
      "Turn MOOC learning into portfolio evidence. Suggested: churn prediction on a public dataset.",
    priority: "medium",
    effort: "1 week",
    skillId: "ml",
  },
];

export const learningProgress: LearningItem[] = [
  {
    id: "l1",
    title: "SQL for Data Analysis",
    provider: "NPTEL",
    progress: 35,
    skillId: "sql",
    dueDate: "2026-09-30",
  },
  {
    id: "l2",
    title: "Intermediate Python: Data Wrangling",
    provider: "Coursera",
    progress: 72,
    skillId: "python",
    dueDate: "2026-09-20",
  },
  {
    id: "l3",
    title: "Introduction to Machine Learning",
    provider: "SWAYAM",
    progress: 60,
    skillId: "ml",
    dueDate: "2026-10-15",
  },
  {
    id: "l4",
    title: "AWS Cloud Practitioner Essentials",
    provider: "AWS Skill Builder",
    progress: 8,
    skillId: "cloud",
    dueDate: "2026-11-05",
  },
];

export const recentActivity: ActivityItem[] = [
  {
    id: "r1",
    type: "assessment",
    title: "Completed Git & Version Control assessment",
    detail: "Scored 88/100 · Verified Advanced",
    timestamp: "2026-09-05T10:20:00Z",
  },
  {
    id: "r2",
    type: "course",
    title: "Finished Module 3 of Intermediate Python",
    detail: "Progress moved from 58% to 72%",
    timestamp: "2026-09-03T17:45:00Z",
  },
  {
    id: "r3",
    type: "recommendation",
    title: "New recommendation: AWS Cloud Practitioner",
    detail: "Triggered by rising cloud demand in Indore & Pune postings",
    timestamp: "2026-09-02T08:00:00Z",
  },
  {
    id: "r4",
    type: "profile",
    title: "Added internship evidence to Data Visualization",
    detail: "Logistics dashboard project · Summer 2026",
    timestamp: "2026-08-29T14:10:00Z",
  },
  {
    id: "r5",
    type: "assessment",
    title: "SQL self-assessment submitted",
    detail: "Scored 42/100 · Gap flagged as critical",
    timestamp: "2026-08-28T11:30:00Z",
  },
];
