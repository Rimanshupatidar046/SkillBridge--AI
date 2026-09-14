import type { StudentProfile } from "@/lib/types";

export const studentProfile: StudentProfile = {
  userId: "u-student-01",
  headline: "Final-year CSE student aspiring to be a Data Analyst",
  bio: "Passionate about turning data into decisions. Completed a summer internship building analytics dashboards for a logistics startup.",
  phone: "+91 98260 11223",
  degree: "B.Tech",
  branch: "Computer Science & Engineering",
  institution: "Government Engineering College, Bhopal",
  graduationYear: 2027,
  cgpa: 8.2,
  interests: ["Data Analytics", "Machine Learning", "Product Analytics", "Open Source"],
  targetRoles: ["Data Analyst", "Business Intelligence Analyst", "Junior ML Engineer"],
  preferredLocations: ["Bhopal", "Indore", "Pune", "Remote"],
  linkedin: "linkedin.com/in/ananya-sharma",
  github: "github.com/ananya-sh",
};

export const profileCompletionFields: {
  key: keyof StudentProfile;
  label: string;
}[] = [
  { key: "headline", label: "Headline" },
  { key: "bio", label: "About" },
  { key: "phone", label: "Phone" },
  { key: "degree", label: "Degree" },
  { key: "branch", label: "Branch" },
  { key: "institution", label: "Institution" },
  { key: "graduationYear", label: "Graduation year" },
  { key: "cgpa", label: "CGPA" },
  { key: "interests", label: "Interests" },
  { key: "targetRoles", label: "Target roles" },
  { key: "preferredLocations", label: "Preferred locations" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "github", label: "GitHub" },
];

export function profileCompletion(profile: StudentProfile) {
  const filled = profileCompletionFields.filter(({ key }) => {
    const value = profile[key];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "number") return value > 0;
    return typeof value === "string" && value.trim().length > 0;
  });
  return {
    percent: Math.round((filled.length / profileCompletionFields.length) * 100),
    missing: profileCompletionFields.filter((f) => !filled.includes(f)).map((f) => f.label),
  };
}
