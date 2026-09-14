import { createFileRoute } from "@tanstack/react-router";
import { Github, GraduationCap, Linkedin, Mail, MapPin, Pencil, Phone, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Field } from "@/components/auth/AuthFields";
import { PageHeader } from "@/components/PageHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { SectionHeader } from "@/components/SectionHeader";
import { useAuth } from "@/context/AuthContext";
import { roleMeta } from "@/data/demoUsers";
import { profileCompletion, studentProfile } from "@/data/studentData";
import { initials } from "@/lib/format";
import type { StudentProfile } from "@/lib/types";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Profile — SkillBridge AI" },
      {
        name: "description",
        content: "Your student profile, education, interests and completion status.",
      },
      { property: "og:title", content: "Profile — SkillBridge AI" },
      { property: "og:description", content: "Manage your SkillBridge profile." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

const PROFILE_KEY = "skillbridge.profile";

function loadProfile(): StudentProfile {
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    return raw
      ? { ...studentProfile, ...(JSON.parse(raw) as Partial<StudentProfile>) }
      : studentProfile;
  } catch {
    return studentProfile;
  }
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <span
          key={i}
          className="rounded-md bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary"
        >
          {i}
        </span>
      ))}
    </div>
  );
}

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState<StudentProfile>(studentProfile);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  useEffect(() => {
    if (!editing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setEditing(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [editing]);

  if (!user) return null;
  const completion = profileCompletion(profile);

  const save = (next: StudentProfile & { name: string }) => {
    const { name, ...rest } = next;
    setProfile(rest);
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(rest));
    if (name !== user.name) updateUser({ name, organization: rest.institution });
    setEditing(false);
    toast.success("Profile updated");
  };

  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title="Your profile"
        description="Keep your details current — employers and TPOs see this alongside your verified skills."
        actions={
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Pencil className="h-4 w-4" /> Edit profile
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <section className="surface-card p-6 text-center">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              {initials(user.name)}
            </span>
            <h2 className="mt-4 text-xl font-bold text-foreground">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{profile.headline}</p>
            <span className="mt-3 inline-flex rounded-md bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">
              {roleMeta[user.role].label}
            </span>
            <dl className="mt-6 space-y-2.5 text-left text-sm">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <dd className="truncate text-foreground">{user.email}</dd>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <dd className="text-foreground">{profile.phone || "—"}</dd>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <dd className="text-foreground">{user.location}</dd>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Linkedin className="h-4 w-4" />
                <dd className="truncate text-foreground">{profile.linkedin || "—"}</dd>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Github className="h-4 w-4" />
                <dd className="truncate text-foreground">{profile.github || "—"}</dd>
              </div>
            </dl>
          </section>

          <section className="surface-card p-6">
            <SectionHeader title="Profile completion" as="h3" />
            <p className="font-display text-3xl font-bold text-foreground">{completion.percent}%</p>
            <ProgressBar
              className="mt-2"
              value={completion.percent}
              showValue={false}
              tone={completion.percent === 100 ? "success" : "primary"}
            />
            <p className="mt-3 text-xs text-muted-foreground">
              {completion.missing.length
                ? `Missing: ${completion.missing.join(", ")}`
                : "Your profile is complete. Great work!"}
            </p>
          </section>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <section className="surface-card p-6">
            <SectionHeader title="About" as="h3" />
            <p className="text-sm leading-relaxed text-foreground">{profile.bio}</p>
          </section>

          <section className="surface-card p-6">
            <SectionHeader title="Education" as="h3" />
            <div className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-foreground">
                  {profile.degree} · {profile.branch}
                </p>
                <p className="text-sm text-muted-foreground">{profile.institution}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Class of {profile.graduationYear} · CGPA {profile.cgpa.toFixed(1)}
                </p>
              </div>
            </div>
          </section>

          <div className="grid gap-6 md:grid-cols-2">
            <section className="surface-card p-6">
              <SectionHeader title="Interests" as="h3" />
              <Chips items={profile.interests} />
            </section>
            <section className="surface-card p-6">
              <SectionHeader title="Target roles" as="h3" />
              <Chips items={profile.targetRoles} />
            </section>
          </div>

          <section className="surface-card p-6">
            <SectionHeader title="Preferred locations" as="h3" />
            <Chips items={profile.preferredLocations} />
          </section>
        </div>
      </div>

      {editing && (
        <EditProfileModal
          initial={{ ...profile, name: user.name }}
          onClose={() => setEditing(false)}
          onSave={save}
        />
      )}
    </>
  );
}

type EditState = StudentProfile & { name: string };

function EditProfileModal({
  initial,
  onClose,
  onSave,
}: {
  initial: EditState;
  onClose: () => void;
  onSave: (p: EditState) => void;
}) {
  const [form, setForm] = useState<EditState>(initial);
  const [lists, setLists] = useState({
    interests: initial.interests.join(", "),
    targetRoles: initial.targetRoles.join(", "),
    preferredLocations: initial.preferredLocations.join(", "),
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EditState, string>>>({});

  const set =
    (k: keyof EditState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value as never });

  const split = (v: string) =>
    v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof EditState, string>> = {};
    if (form.name.trim().length < 2) next.name = "Enter your name";
    if (!form.headline.trim()) next.headline = "Add a short headline";
    const year = Number(form.graduationYear);
    if (!year || year < 2020 || year > 2035) next.graduationYear = "Enter a valid year";
    const cgpa = Number(form.cgpa);
    if (Number.isNaN(cgpa) || cgpa < 0 || cgpa > 10) next.cgpa = "CGPA must be 0–10";
    setErrors(next);
    if (Object.keys(next).length) return;
    onSave({
      ...form,
      graduationYear: year,
      cgpa,
      interests: split(lists.interests),
      targetRoles: split(lists.targetRoles),
      preferredLocations: split(lists.preferredLocations),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
    >
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <form
        onSubmit={submit}
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-card shadow-elevated sm:rounded-2xl animate-in fade-in-0 zoom-in-95"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 id="edit-profile-title" className="text-lg font-bold text-foreground">
            Edit profile
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid gap-4 overflow-y-auto px-6 py-5 sm:grid-cols-2">
          <Field
            id="name"
            label="Full name"
            value={form.name}
            onChange={set("name")}
            error={errors.name}
          />
          <Field id="phone" label="Phone" value={form.phone} onChange={set("phone")} />
          <div className="sm:col-span-2">
            <Field
              id="headline"
              label="Headline"
              value={form.headline}
              onChange={set("headline")}
              error={errors.headline}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="bio" className="mb-1.5 block text-sm font-medium text-foreground">
              About
            </label>
            <textarea
              id="bio"
              rows={3}
              value={form.bio}
              onChange={set("bio")}
              className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <Field id="degree" label="Degree" value={form.degree} onChange={set("degree")} />
          <Field id="branch" label="Branch" value={form.branch} onChange={set("branch")} />
          <div className="sm:col-span-2">
            <Field
              id="institution"
              label="Institution"
              value={form.institution}
              onChange={set("institution")}
            />
          </div>
          <Field
            id="graduationYear"
            label="Graduation year"
            type="number"
            value={form.graduationYear}
            onChange={set("graduationYear")}
            error={errors.graduationYear}
          />
          <Field
            id="cgpa"
            label="CGPA"
            type="number"
            step="0.1"
            value={form.cgpa}
            onChange={set("cgpa")}
            error={errors.cgpa}
          />
          <div className="sm:col-span-2">
            <Field
              id="interests"
              label="Interests (comma separated)"
              value={lists.interests}
              onChange={(e) => setLists({ ...lists, interests: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <Field
              id="targetRoles"
              label="Target roles (comma separated)"
              value={lists.targetRoles}
              onChange={(e) => setLists({ ...lists, targetRoles: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <Field
              id="preferredLocations"
              label="Preferred locations (comma separated)"
              value={lists.preferredLocations}
              onChange={(e) => setLists({ ...lists, preferredLocations: e.target.value })}
            />
          </div>
          <Field id="linkedin" label="LinkedIn" value={form.linkedin} onChange={set("linkedin")} />
          <Field id="github" label="GitHub" value={form.github} onChange={set("github")} />
        </div>
        <div className="flex justify-end gap-2 border-t border-border px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
