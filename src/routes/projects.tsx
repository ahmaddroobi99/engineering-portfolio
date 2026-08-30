import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { defaultFilters, FilterBar, type FilterState } from "@/components/projects/filters";
import { projects } from "@/data/catalog";
import { filterProjects } from "@/lib/search";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects — Ahmad Droobi" }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const list = useMemo(() => filterProjects(projects, filters), [filters]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Explorer</p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight">Project explorer</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        Up to 50 original public repositories, ranked by Project Signal Score. Search and filter
        stay on-device. No live GitHub calls on this page.
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <Link to="/top-50" className="text-muted hover:text-fg">
          Top 50 list
        </Link>
        <Link to="/constellation" className="text-muted hover:text-fg">
          Constellation
        </Link>
        <Link to="/timeline" className="text-muted hover:text-fg">
          Timeline
        </Link>
        <Link to="/compare" className="text-muted hover:text-fg">
          Compare
        </Link>
      </div>
      <div className="mt-8">
        <FilterBar value={filters} onChange={setFilters} />
      </div>
      <p className="mt-6 font-mono text-xs tabular-nums text-subtle">{list.length} shown</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </main>
  );
}
