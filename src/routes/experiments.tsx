import { createFileRoute } from "@tanstack/react-router";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/catalog";

export const Route = createFileRoute("/experiments")({
  head: () => ({ meta: [{ title: "Experiments — Ahmad Droobi" }] }),
  component: ExperimentsPage,
});

function ExperimentsPage() {
  const items = projects.filter(
    (p) =>
      p.domain === "experiments" ||
      p.status === "Experimental" ||
      p.category === "Education" ||
      p.category === "Tools",
  );
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Lab</p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight">Experiments</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        Interview resources, coursework, and exploratory repositories. These are not presented as
        production systems.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </main>
  );
}
