import { skills as seedSkills, levelScore, skillGap } from "@/data/skills";
import type { ProficiencyLevel, Skill } from "@/lib/types";

const STORAGE_KEY = "skillbridge.skills";

const isBrowser = () => typeof window !== "undefined";

export const skillService = {
  getSkills(): Skill[] {
    if (!isBrowser()) return seedSkills;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return seedSkills;
      const overrides = JSON.parse(raw) as Record<string, Partial<Skill> & { deleted?: boolean }>;
      const allSkills = seedSkills.map((s) => ({ ...s, ...overrides[s.id] }));
      
      // Add custom skills that are only in overrides
      for (const key of Object.keys(overrides)) {
        if (!seedSkills.find(s => s.id === key) && overrides[key]?.name) {
          allSkills.push(overrides[key]! as Skill);
        }
      }
      
      return allSkills.filter(s => !(s as any).deleted);
    } catch {
      return seedSkills;
    }
  },

  updateProficiency(id: string, current: ProficiencyLevel): Skill[] {
    if (!isBrowser()) return seedSkills;
    let overrides: Record<string, Partial<Skill>> = {};
    try {
      overrides = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    } catch {
      overrides = {};
    }
    overrides[id] = {
      ...overrides[id],
      current,
      lastAssessed: new Date().toISOString().slice(0, 10),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    return skillService.getSkills();
  },

  addSkill(skill: Skill): Skill[] {
    if (!isBrowser()) return seedSkills;
    const currentSkills = this.getSkills();
    const overrides: Record<string, Partial<Skill>> = {};
    try {
      Object.assign(overrides, JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}"));
    } catch {}
    
    // Add full skill as an override. (This allows custom skills to exist just in overrides)
    overrides[skill.id] = skill;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    return this.getSkills();
  },

  removeSkill(id: string): Skill[] {
    if (!isBrowser()) return seedSkills;
    const overrides: Record<string, Partial<Skill>> = {};
    try {
      Object.assign(overrides, JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}"));
    } catch {}
    
    overrides[id] = { ...overrides[id], deleted: true } as any;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    return this.getSkills();
  },

  resetSkills(): Skill[] {
    if (isBrowser()) window.localStorage.removeItem(STORAGE_KEY);
    return seedSkills;
  },

  /** Aggregate readiness = average of current/required score ratio, capped at 100. */
  readinessScore(list: Skill[]) {
    if (!list.length) return 0;
    const total = list.reduce(
      (acc, s) => acc + Math.min(1, levelScore[s.current] / levelScore[s.target]),
      0,
    );
    return Math.round((total / list.length) * 100);
  },

  topGaps(list: Skill[], limit = 4) {
    return [...list]
      .filter((s) => skillGap(s) > 0)
      .sort((a, b) => skillGap(b) - skillGap(a) || a.name.localeCompare(b.name))
      .slice(0, limit);
  },
};
