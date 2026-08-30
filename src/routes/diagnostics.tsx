import { createFileRoute } from "@tanstack/react-router";
import { catalog, projects } from "@/data/catalog";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/diagnostics")({
  head: () => ({ meta: [{ title: "Diagnostics — Ahmad Droobi" }] }),
  component: DiagnosticsPage,
});

function DiagnosticsPage() {
  const api = catalog.source;
  const missingImages = projects.filter((p) => p.mediaKind === "generated").length;
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Developer</p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight">Website health</h1>
      <dl className="mt-8 grid gap-3 text-sm">
        <Row label="GitHub API at runtime" value="Not used on page load" />
        <Row label="Index source" value={api} />
        <Row label="Data age" value={formatDate(catalog.generatedAt)} />
        <Row label="Ranked projects" value={String(projects.length)} />
        <Row label="Generated placeholders" value={String(missingImages)} />
        <Row label="Runtime GitHub requests" value="0" />
        <Row label="Cache" value="Static JSON bundled at build" />
      </dl>
      <p className="mt-8 text-xs text-subtle">
        Open via command palette → Maintenance / Diagnostics. This page is intentionally quiet.
      </p>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border py-2">
      <dt className="text-muted">{label}</dt>
      <dd className="font-mono text-xs">{value}</dd>
    </div>
  );
}
