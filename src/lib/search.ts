import type { Project } from "@/data/types";
import type { FilterState } from "@/components/projects/filters";

export function filterProjects(list: Project[], f: FilterState) {
  const q = f.query.trim().toLowerCase();
  let out = list.filter((p) => {
    if (f.domain !== "all" && p.domain !== f.domain) return false;
    if (f.language !== "all") {
      const langs = new Set([p.language, ...Object.keys(p.languages || {})]);
      if (!langs.has(f.language)) return false;
    }
    if (f.status !== "all" && p.status !== f.status) return false;
    if (!q) return true;
    const hay = [
      p.name,
      p.description,
      p.category,
      p.language,
      p.topics.join(" "),
      p.fourLines.join(" "),
      p.tech.join(" "),
      ...(p.learning || []),
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });

  out = [...out].sort((a, b) => {
    switch (f.sort) {
      case "updated":
        return (b.pushedAt || "").localeCompare(a.pushedAt || "");
      case "stars":
        return b.stars - a.stars;
      case "complexity":
        return b.signalBreakdown.complexity - a.signalBreakdown.complexity;
      case "newest":
        return (b.createdAt || "").localeCompare(a.createdAt || "");
      case "oldest":
        return (a.createdAt || "").localeCompare(b.createdAt || "");
      case "alpha":
        return a.name.localeCompare(b.name);
      default:
        return b.signalScore - a.signalScore;
    }
  });
  return out;
}
