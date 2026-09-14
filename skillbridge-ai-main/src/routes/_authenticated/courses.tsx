import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

import { ComingSoon } from "@/components/ComingSoon";
import { courseService } from "@/services/stubs";

export const Route = createFileRoute("/_authenticated/courses")({
  head: () => ({
    meta: [
      { title: "Courses — SkillBridge AI" },
      {
        name: "description",
        content: "Skill-tagged catalogue across NPTEL, SWAYAM and partner providers.",
      },
      { property: "og:title", content: "Courses — SkillBridge AI" },
      {
        property: "og:description",
        content: "Skill-tagged catalogue across NPTEL, SWAYAM and partner providers.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Curriculum intelligence"
      title="Courses"
      description="Skill-tagged catalogue across NPTEL, SWAYAM and partner providers."
      status={courseService.status()}
      icon={GraduationCap}
    />
  ),
});
