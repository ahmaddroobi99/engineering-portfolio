import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";
import { ProjectCover } from "@/components/projects/project-cover";
import { SignalScore } from "@/components/projects/signal-score";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/catalog";
import { SCORE_WEIGHTS } from "@/data/catalog";

export const Route = createFileRoute("/top-50")({
  head: () => ({ meta: [{ title: "Top 50 projects — Ahmad Droobi" }] }),
  component: Top50,
});

function Top50() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Ranking</p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight">Top 50 projects</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        Original public repositories only. Signal Score is a weighted 0–100 index. Stars are 5% of
        the score and are not treated as the primary measure.
      </p>
      <dl className="mt-6 grid gap-2 text-xs text-muted sm:grid-cols-2">
        {SCORE_WEIGHTS.map((w) => (
          <div key={w.key} className="flex justify-between gap-3 rounded-md bg-surface px-3 py-2">
            <dt>{w.label}</dt>
            <dd className="font-mono tabular-nums">{w.weight}%</dd>
          </div>
        ))}
      </dl>
      <ol className="mt-10 grid gap-6">
        {projects.map((p) => (
          <li
            key={p.id}
            className="grid gap-4 overflow-hidden rounded-xl bg-bg-elevated p-3 shadow-[var(--shadow-border)] md:grid-cols-[220px_1fr]"
          >
            <ProjectCover project={p} className="aspect-[16/10] rounded-lg" />
            <div className="flex flex-col gap-2 py-1 pr-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] text-muted">
                    #{p.rank} · {p.category} · {p.language}
                  </p>
                  <h2 className="text-lg font-medium">
                    <Link to="/projects/$id" params={{ id: p.id }} className="hover:underline">
                      {p.name.replaceAll("_", " ")}
                    </Link>
                  </h2>
                </div>
                <SignalScore score={p.signalScore} />
              </div>
              <ol className="grid gap-1 text-sm leading-relaxed text-muted">
                {p.fourLines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ol>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-2 text-sm">
                <Badge>{p.stars} stars</Badge>
                <a href={p.url} className="inline-flex items-center gap-1 hover:underline">
                  <Github className="size-3.5" /> GitHub
                </a>
                {p.homepage ? (
                  <a href={p.homepage} className="inline-flex items-center gap-1 hover:underline">
                    Demo <ArrowUpRight className="size-3.5" />
                  </a>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
