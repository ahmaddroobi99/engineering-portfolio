import { createFileRoute } from "@tanstack/react-router";
import { ConstellationMap } from "@/components/projects/constellation";
import { TechGraph } from "@/components/projects/tech-graph";

export const Route = createFileRoute("/constellation")({
  head: () => ({ meta: [{ title: "Constellation — Ahmad Droobi" }] }),
  component: ConstellationPage,
});

function ConstellationPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Map</p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight">Project constellation</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        Lightweight SVG map. Nodes are ranked projects. Click a node to open the case study.
      </p>
      <div className="mt-8 overflow-hidden rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
        <ConstellationMap />
      </div>
      <h2 className="mt-12 text-xl font-medium">Technology graph</h2>
      <p className="mt-2 text-sm text-muted">
        Counts are from the ranked set only. Connections are domain-level, not inferred call graphs.
      </p>
      <div className="mt-6 overflow-hidden rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
        <TechGraph />
      </div>
    </main>
  );
}
