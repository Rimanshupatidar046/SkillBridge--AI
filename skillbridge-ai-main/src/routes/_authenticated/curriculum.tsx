import { createFileRoute } from "@tanstack/react-router";
import { BookOpenCheck } from "lucide-react";

import { ComingSoon } from "@/components/ComingSoon";
import { curriculumService } from "@/services/stubs";

export const Route = createFileRoute("/_authenticated/curriculum")({
  head: () => ({
    meta: [
      { title: "Curriculum Mapping — SkillBridge AI" },
      {
        name: "description",
        content: "Map syllabi to live industry demand and flag modules that need revision.",
      },
      { property: "og:title", content: "Curriculum Mapping — SkillBridge AI" },
      {
        property: "og:description",
        content: "Map syllabi to live industry demand and flag modules that need revision.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Curriculum intelligence"
      title="Curriculum Mapping"
      description="Map syllabi to live industry demand and flag modules that need revision."
      status={curriculumService.status()}
      icon={BookOpenCheck}
    />
  ),
});
