# SkillBridge AI

Build Part 1 of SkillBridge AI, a workforce-intelligence web application for Smart India Hackathon 2026 (Problem Statement: SIH26134).

Key specifications:
1. Tech & styling: React, Tailwind CSS, React Router, Lucide icons, Recharts. Clean, professional UI with light background, dark readable typography, restrained blue/indigo accents, subtle borders, responsive design.
2. Architecture:
   - src/components (Navbar, Sidebar, PageHeader, StatCard, SkillBadge, ProgressBar, StatusBadge, ChartCard, ActionCard, SectionHeader, DataTable, EmptyState, LoadingState)
   - src/layouts (PublicLayout, AppShell layout with sidebar and header)
   - src/context (AuthContext with demo auth, session persistence via localStorage, login, signup with role selection, logout, protected route handling)
   - src/data (demoUsers, studentData, skills, dashboardData, navigation)
   - src/services (authService, skillService, assessmentService, skillGapService, learningPathService, curriculumService, courseService, industryDemandService, trainingService, districtService, employerService stubs)
3. Pages & Features:
   - Landing page (/) with hero ("From Industry Signals to Workforce Action"), visual process flow, The Problem, Our Solution, Core Capabilities, Who It Helps, and navigation CTAs.
   - Auth pages (/login, /signup, /forgot-password) with form validation, plus quick "Try Demo Account" role selector (Student, Institution/TPO, District/Policymaker, Employer).
   - Route protection: ProtectedRoute redirects unauthenticated users to /login; authenticated users visiting auth pages redirect to /dashboard.
   - App Shell: Top header showing current page, user name, role, profile dropdown, logout; sidebar covering Overview, Student Intelligence, Curriculum Intelligence, Industry Intelligence, Training Intelligence, Regional Intelligence, Employer Intelligence, Profile.
   - Student Dashboard (/dashboard): Readiness overview cards, Top Skill Gaps (SQL, Python, ML, Cloud with Beginner/Intermediate/Advanced/Expert levels and gap indicators), Recharts Skill Readiness comparison chart (Current vs Required), Recommended Actions, Learning Progress bars, Recent Activity.
   - My Skills (/my-skills): List of skills with current vs target proficiency, skill gaps, evidence, and ability to update proficiency locally.
   - Profile (/profile): Student details, education, interests, completion meter, and edit modal/form with local state update.
   - Working placeholder routes for all other sidebar links (/assessment, /skill-gap, /learning-path, /curriculum, /courses, /industry-demand, /industry-demand/emerging, /training-capacity, /district-planner, /employer-validation, /settings) with PageHeader and clean "Coming in next module" state. No broken links or blank pages.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/427a18e9-193b-4ae8-b6bd-bcb6e7c3267f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
