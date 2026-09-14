export const industryDemandData = {
  sectors: ["IT", "BFSI", "Healthcare", "Manufacturing", "Retail"],
  roles: [
    "AI/ML Engineer",
    "Data Scientist",
    "Data Analyst",
    "Software Developer",
    "Cloud Engineer",
  ],
  skillsDemand: [
    { name: "Python", demand: 92, trend: "up" },
    { name: "SQL", demand: 88, trend: "stable" },
    { name: "Cloud Computing", demand: 85, trend: "up" },
    { name: "Machine Learning", demand: 82, trend: "up" },
    { name: "React", demand: 78, trend: "stable" },
    { name: "Generative AI", demand: 75, trend: "up" },
    { name: "Data Visualization", demand: 70, trend: "stable" },
  ],
  roleDemandTrends: [
    { name: "Jan", "AI/ML Engineer": 40, "Data Analyst": 60, "Cloud Engineer": 55 },
    { name: "Feb", "AI/ML Engineer": 45, "Data Analyst": 62, "Cloud Engineer": 58 },
    { name: "Mar", "AI/ML Engineer": 55, "Data Analyst": 65, "Cloud Engineer": 60 },
    { name: "Apr", "AI/ML Engineer": 70, "Data Analyst": 63, "Cloud Engineer": 65 },
    { name: "May", "AI/ML Engineer": 85, "Data Analyst": 68, "Cloud Engineer": 68 },
    { name: "Jun", "AI/ML Engineer": 95, "Data Analyst": 70, "Cloud Engineer": 72 },
  ]
};

export const emergingSkillsData = [
  {
    skill: "Generative AI",
    category: "AI/ML",
    demandSignal: "Very High",
    trend: "+120% YoY",
    relatedRoles: ["AI/ML Engineer", "Data Scientist", "Software Developer"],
    whyItMatters: "Rapid adoption across all sectors for automation and content creation.",
    recommendedAction: "Add practical module",
    currentRelevance: 40,
    emergingRelevance: 95,
  },
  {
    skill: "LLM Applications",
    category: "AI/ML",
    demandSignal: "High",
    trend: "+85% YoY",
    relatedRoles: ["AI/ML Engineer", "Software Developer"],
    whyItMatters: "Companies are building proprietary tools using language models.",
    recommendedAction: "Add to curriculum",
    currentRelevance: 20,
    emergingRelevance: 80,
  },
  {
    skill: "MLOps",
    category: "Infrastructure",
    demandSignal: "High",
    trend: "+60% YoY",
    relatedRoles: ["AI/ML Engineer", "Cloud Engineer"],
    whyItMatters: "Critical for putting machine learning models into production reliably.",
    recommendedAction: "Faculty upskilling",
    currentRelevance: 30,
    emergingRelevance: 75,
  },
  {
    skill: "Responsible AI",
    category: "Ethics/Compliance",
    demandSignal: "Medium",
    trend: "+40% YoY",
    relatedRoles: ["Data Scientist", "AI/ML Engineer"],
    whyItMatters: "Increasing regulation requires compliance in AI implementations.",
    recommendedAction: "Monitor",
    currentRelevance: 15,
    emergingRelevance: 50,
  }
];

export const curriculumAnalyzerData = {
  programs: ["B.Tech", "M.Tech", "BCA", "MCA"],
  branches: ["AI & Machine Learning", "Computer Science", "Data Science", "IT"],
  semesters: ["1st Semester", "2nd Semester", "3rd Semester", "4th Semester", "5th Semester", "6th Semester", "7th Semester", "8th Semester"],
  comparison: [
    { skill: "Python", requirement: "Advanced", coverage: "Well Covered", gap: 0, priority: "Low" },
    { skill: "Machine Learning", requirement: "Advanced", coverage: "Partially Covered", gap: 30, priority: "High" },
    { skill: "SQL", requirement: "Intermediate", coverage: "Well Covered", gap: 0, priority: "Low" },
    { skill: "Statistics", requirement: "Intermediate", coverage: "Well Covered", gap: 0, priority: "Low" },
    { skill: "Deep Learning", requirement: "Advanced", coverage: "Missing", gap: 75, priority: "Critical" },
    { skill: "Generative AI", requirement: "Intermediate", coverage: "Missing", gap: 50, priority: "High" },
    { skill: "MLOps", requirement: "Beginner", coverage: "Missing", gap: 25, priority: "Medium" },
    { skill: "Git", requirement: "Intermediate", coverage: "Partially Covered", gap: 20, priority: "Medium" },
  ],
  chartData: [
    { name: "Python", Required: 90, Covered: 90 },
    { name: "Machine Learning", Required: 90, Covered: 60 },
    { name: "SQL", Required: 50, Covered: 60 },
    { name: "Statistics", Required: 50, Covered: 70 },
    { name: "Deep Learning", Required: 90, Covered: 15 },
    { name: "Generative AI", Required: 50, Covered: 0 },
    { name: "MLOps", Required: 25, Covered: 0 },
    { name: "Git", Required: 50, Covered: 30 },
  ]
};

export const courseAnalysisData = [
  {
    id: "machine-learning",
    name: "Machine Learning",
    overview: "Core course covering supervised and unsupervised learning algorithms.",
    health: "Needs Review", // Healthy, Needs Review, At Risk
    skillsCovered: [
      { name: "Python", depth: "Intermediate" },
      { name: "Scikit-Learn", depth: "Intermediate" },
      { name: "Statistical Modeling", depth: "Introductory" },
    ],
    industryRelevance: 75,
    missingTopics: [
      "Model deployment and APIs",
      "Handling imbalanced datasets",
      "Hyperparameter optimization techniques",
    ],
    recommendedImprovements: [
      "Add a module on deploying ML models using Flask/FastAPI.",
      "Integrate real-world messy datasets instead of clean academic data.",
    ]
  },
  {
    id: "deep-learning",
    name: "Deep Learning",
    overview: "Advanced neural networks, CNNs, and RNNs.",
    health: "At Risk",
    skillsCovered: [
      { name: "Neural Networks", depth: "Intermediate" },
      { name: "TensorFlow/Keras", depth: "Introductory" },
    ],
    industryRelevance: 90,
    missingTopics: [
      "Transformer architectures",
      "PyTorch implementation",
      "Transfer learning",
    ],
    recommendedImprovements: [
      "Shift primary framework to PyTorch to match industry demand.",
      "Introduce Transformers and Attention mechanisms immediately.",
    ]
  },
  {
    id: "data-structures",
    name: "Data Structures",
    overview: "Fundamental data structures and algorithms.",
    health: "Healthy",
    skillsCovered: [
      { name: "Algorithmic Thinking", depth: "Advanced" },
      { name: "C++ / Java", depth: "Advanced" },
    ],
    industryRelevance: 85,
    missingTopics: [
      "Graph databases context",
    ],
    recommendedImprovements: [
      "Link graph algorithms to real-world social network scenarios.",
    ]
  }
];
