import raw from "./repositories.json";
import type { Catalog, Project } from "./types";
import { DOMAIN_META } from "./types";

export const catalog = raw as unknown as Catalog;

export const projects: Project[] = catalog.projects;

export const projectById = new Map(projects.map((p) => [p.id, p]));

export function getProject(id: string) {
  return projectById.get(id);
}

export function featuredProjects() {
  return projects.filter((p) => p.featured).sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
}

export function projectsByDomain(slug: string) {
  return projects.filter((p) => p.domain === slug);
}

export function uniqueLanguages() {
  const set = new Set<string>();
  for (const p of projects) {
    if (p.language && p.language !== "Not detected") set.add(p.language);
    for (const k of Object.keys(p.languages || {})) set.add(k);
  }
  return [...set].sort();
}

export function uniqueCategories() {
  return [...new Set(projects.map((p) => p.category))].sort();
}

export function uniqueStatuses() {
  return [...new Set(projects.map((p) => p.status))].sort();
}

export { DOMAIN_META };

export const SCORE_WEIGHTS = [
  { key: "relevance", label: "Technical relevance", weight: 25 },
  { key: "activity", label: "Activity / maintenance", weight: 20 },
  { key: "documentation", label: "Documentation", weight: 15 },
  { key: "visual", label: "Visual / demo", weight: 15 },
  { key: "complexity", label: "Engineering complexity", weight: 10 },
  { key: "stars", label: "GitHub stars", weight: 5 },
  { key: "completeness", label: "Completeness", weight: 5 },
  { key: "recency", label: "Recency", weight: 5 },
] as const;
