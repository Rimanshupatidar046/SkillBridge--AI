import type { Role, User } from "@/lib/types";

export const DEMO_PASSWORD = "demo1234";

export const demoUsers: User[] = [
  {
    id: "u-student-01",
    name: "Ananya Sharma",
    email: "ananya@demo.skillbridge.ai",
    role: "student",
    organization: "Government Engineering College, Bhopal",
    location: "Bhopal, Madhya Pradesh",
  },
  {
    id: "u-inst-01",
    name: "Rajesh Iyer",
    email: "tpo@demo.skillbridge.ai",
    role: "institution",
    organization: "Training & Placement Cell, GEC Bhopal",
    location: "Bhopal, Madhya Pradesh",
  },
  {
    id: "u-district-01",
    name: "Meera Nair",
    email: "district@demo.skillbridge.ai",
    role: "district",
    organization: "District Skill Committee, Bhopal",
    location: "Bhopal, Madhya Pradesh",
  },
  {
    id: "u-employer-01",
    name: "Vikram Malhotra",
    email: "employer@demo.skillbridge.ai",
    role: "employer",
    organization: "TechNova Solutions Pvt. Ltd.",
    location: "Indore, Madhya Pradesh",
  },
];

export const roleMeta: Record<
  Role,
  { label: string; shortLabel: string; description: string; color: string }
> = {
  student: {
    label: "Student",
    shortLabel: "Student",
    description: "Track your skills, close gaps and follow a personalised learning path.",
    color: "primary",
  },
  institution: {
    label: "Institution / TPO",
    shortLabel: "Institution",
    description: "Map curriculum to industry demand and monitor cohort readiness.",
    color: "info",
  },
  district: {
    label: "District / Policymaker",
    shortLabel: "District",
    description: "Plan training capacity and regional workforce interventions.",
    color: "success",
  },
  employer: {
    label: "Employer",
    shortLabel: "Employer",
    description: "Validate candidate skills and signal emerging demand.",
    color: "warning",
  },
};

export const roleOrder: Role[] = ["student", "institution", "district", "employer"];
