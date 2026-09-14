/**
 * Service stubs for modules shipping in Part 2+.
 * Each exposes a `status()` so pages can render a consistent "coming soon" state
 * and a typed surface that later modules will fill in.
 */

export interface ModuleStatus {
  module: string;
  ready: boolean;
  plannedFor: string;
  capabilities: string[];
}

const stub = (module: string, plannedFor: string, capabilities: string[]) => ({
  status: (): ModuleStatus => ({ module, ready: false, plannedFor, capabilities }),
});

export const assessmentService = stub("Assessment Engine", "Part 2", [
  "Adaptive skill quizzes",
  "Evidence-backed proficiency verification",
  "Assessment history & retake scheduling",
]);

export const skillGapService = stub("Skill Gap Analyzer", "Part 2", [
  "Role-benchmark comparison",
  "Gap prioritisation by market weight",
  "Cohort-level gap heatmaps",
]);

export const learningPathService = stub("Learning Path Generator", "Part 2", [
  "Sequenced course recommendations",
  "Time-to-ready estimates",
  "Progress sync with course providers",
]);

export const curriculumService = stub("Curriculum Intelligence", "Part 3", [
  "Syllabus-to-skill mapping",
  "Industry alignment scoring",
  "Revision recommendations for departments",
]);

export const courseService = stub("Course Catalogue", "Part 3", [
  "Aggregated NPTEL / SWAYAM / MOOC listings",
  "Skill-tagged course search",
  "Institution-approved course lists",
]);

export const industryDemandService = stub("Industry Demand Signals", "Part 3", [
  "Job-posting skill extraction",
  "Regional demand trends",
  "Emerging skill radar",
]);

export const trainingService = stub("Training Capacity Planner", "Part 4", [
  "Trainer and seat capacity by district",
  "Utilisation and waitlist tracking",
  "Capacity vs demand gap alerts",
]);

export const districtService = stub("District Planner", "Part 4", [
  "District skill supply/demand dashboards",
  "Intervention scenario modelling",
  "Scheme-wise budget planning",
]);

export const employerService = stub("Employer Validation", "Part 4", [
  "Candidate skill verification requests",
  "Employer demand signalling",
  "Hiring outcome feedback loop",
]);
