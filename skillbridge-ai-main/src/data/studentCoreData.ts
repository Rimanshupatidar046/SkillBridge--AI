import type { ProficiencyLevel } from "@/lib/types";

export interface AssessmentQuestion {
  id: string;
  skillId: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const demoAssessmentQuestions: AssessmentQuestion[] = [
  {
    id: "q1",
    skillId: "python",
    question: "Which of the following is true about Python dictionaries?",
    options: [
      "They are ordered collections of items",
      "They are indexed by keys, which can be any immutable type",
      "They are immutable",
      "They only store string values",
    ],
    correctAnswer: 1,
  },
  {
    id: "q2",
    skillId: "python",
    question: "How do you handle exceptions in Python?",
    options: [
      "try/catch block",
      "try/except block",
      "catch/finally block",
      "on error resume next",
    ],
    correctAnswer: 1,
  },
  {
    id: "q3",
    skillId: "ml",
    question: "What is the purpose of a validation set in machine learning?",
    options: [
      "To train the model's primary parameters",
      "To evaluate the model's final performance before deployment",
      "To tune hyperparameters and prevent overfitting",
      "To increase the size of the training data",
    ],
    correctAnswer: 2,
  },
  {
    id: "q4",
    skillId: "sql",
    question: "Which SQL clause is used to filter the results of a GROUP BY operation?",
    options: ["WHERE", "HAVING", "FILTER", "ORDER BY"],
    correctAnswer: 1,
  },
];

export interface RoleRequiredSkill {
  name: string;
  target: ProficiencyLevel;
  priority: "High" | "Medium" | "Low";
  category: string;
}

export interface TargetRole {
  id: string;
  name: string;
  description: string;
  skills: RoleRequiredSkill[];
}

export const demoTargetRoles: TargetRole[] = [
  {
    id: "ai-ml-engineer",
    name: "AI/ML Engineer",
    description: "Develops, trains, and deploys machine learning models and AI systems.",
    skills: [
      { name: "Python", target: "Advanced", priority: "High", category: "Programming" },
      { name: "Machine Learning", target: "Advanced", priority: "High", category: "Core AI" },
      { name: "SQL", target: "Intermediate", priority: "Medium", category: "Data" },
      { name: "Deep Learning", target: "Advanced", priority: "High", category: "Core AI" },
      { name: "Statistics", target: "Intermediate", priority: "Medium", category: "Mathematics" },
      { name: "Generative AI", target: "Intermediate", priority: "High", category: "Emerging" },
      { name: "Git", target: "Intermediate", priority: "Low", category: "Tools" },
    ],
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    description: "Interprets data and turns it into information which can offer ways to improve a business.",
    skills: [
      { name: "SQL", target: "Advanced", priority: "High", category: "Data" },
      { name: "Python", target: "Intermediate", priority: "Medium", category: "Programming" },
      { name: "Data Visualization", target: "Advanced", priority: "High", category: "Analytics" },
      { name: "Statistics", target: "Intermediate", priority: "High", category: "Mathematics" },
      { name: "Business Communication", target: "Advanced", priority: "Medium", category: "Soft Skills" },
    ],
  },
  {
    id: "full-stack-dev",
    name: "Full Stack Developer",
    description: "Builds both the front-end and back-end of web applications.",
    skills: [
      { name: "JavaScript", target: "Advanced", priority: "High", category: "Programming" },
      { name: "React", target: "Advanced", priority: "High", category: "Frontend" },
      { name: "Node.js", target: "Intermediate", priority: "High", category: "Backend" },
      { name: "SQL", target: "Intermediate", priority: "Medium", category: "Database" },
      { name: "Git", target: "Advanced", priority: "Medium", category: "Tools" },
    ],
  },
];

export interface LearningItem {
  id: string;
  skillName: string;
  topic: string;
  currentLevel: ProficiencyLevel;
  targetLevel: ProficiencyLevel;
  effort: string;
  priority: "High" | "Medium" | "Low";
  status: "Not Started" | "In Progress" | "Completed";
  type: "Course" | "Project" | "Documentation" | "Assessment";
}

export interface LearningPhase {
  id: string;
  title: string;
  description: string;
  items: LearningItem[];
}

export const demoLearningRoadmap: LearningPhase[] = [
  {
    id: "phase-1",
    title: "PHASE 1 — Strengthen Foundations",
    description: "Focus on closing critical gaps in your core technical skills.",
    items: [
      {
        id: "li-1",
        skillName: "Python",
        topic: "Python for Data Science & ML",
        currentLevel: "Intermediate",
        targetLevel: "Advanced",
        effort: "12 hours",
        priority: "High",
        status: "In Progress",
        type: "Course",
      },
      {
        id: "li-2",
        skillName: "Statistics",
        topic: "Statistics for Machine Learning",
        currentLevel: "Beginner",
        targetLevel: "Intermediate",
        effort: "8 hours",
        priority: "Medium",
        status: "Not Started",
        type: "Course",
      },
    ],
  },
  {
    id: "phase-2",
    title: "PHASE 2 — Core Machine Learning",
    description: "Build a strong understanding of algorithms and model evaluation.",
    items: [
      {
        id: "li-3",
        skillName: "Machine Learning",
        topic: "Supervised & Unsupervised Learning",
        currentLevel: "Beginner",
        targetLevel: "Advanced",
        effort: "20 hours",
        priority: "High",
        status: "Not Started",
        type: "Project",
      },
      {
        id: "li-4",
        skillName: "Machine Learning",
        topic: "Feature Engineering & Selection",
        currentLevel: "Beginner",
        targetLevel: "Intermediate",
        effort: "5 hours",
        priority: "Medium",
        status: "Not Started",
        type: "Course",
      },
    ],
  },
  {
    id: "phase-3",
    title: "PHASE 3 — Advanced AI Skills",
    description: "Master modern deep learning and generative models.",
    items: [
      {
        id: "li-5",
        skillName: "Deep Learning",
        topic: "Neural Networks & PyTorch",
        currentLevel: "Beginner",
        targetLevel: "Advanced",
        effort: "25 hours",
        priority: "High",
        status: "Not Started",
        type: "Course",
      },
      {
        id: "li-6",
        skillName: "Generative AI",
        topic: "Transformers & LLMs",
        currentLevel: "Beginner",
        targetLevel: "Intermediate",
        effort: "15 hours",
        priority: "High",
        status: "Not Started",
        type: "Documentation",
      },
    ],
  },
];
