import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";

import { ComingSoon } from "@/components/ComingSoon";
const settingsStatus = {
  module: "Account Settings",
  ready: false,
  plannedFor: "Part 2",
  capabilities: [
    "Notification preferences",
    "Password & security",
    "Data export and privacy controls",
  ],
};

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [
      { title: "Settings — SkillBridge AI" },
      {
        name: "description",
        content: "Notification preferences, account security and data controls.",
      },
      { property: "og:title", content: "Settings — SkillBridge AI" },
      {
        property: "og:description",
        content: "Notification preferences, account security and data controls.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Profile"
      title="Settings"
      description="Notification preferences, account security and data controls."
      status={settingsStatus}
      icon={Settings}
    />
  ),
});
