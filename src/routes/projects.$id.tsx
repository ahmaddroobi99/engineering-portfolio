import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";
import { Badge, healthTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCover } from "@/components/projects/project-cover";
import { SignalBars, SignalScore } from "@/components/projects/signal-score";
import { getProject, projects } from "@/data/catalog";
import { formatCompact, formatDate, timeAgo } from "@/lib/utils";
import { useCompare } from "@/lib/compare-store";

export const Route = createFileRoute("/projects/$id")({
  loader: ({ params }) => {
    const project = getProject(params.id);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.name.replaceAll("_", " ")} — Ahmad Droobi`
          : "Project — Ahmad Droobi",
      },
    ],
  }),
  component: ProjectDetail,
});

function ProjectDetail() {
  const p = Route.useLoaderData();
  const toggle = useCompare((s) => s.toggle);
  const selected = useCompare((s) => s.ids.includes(p.id));
  const related = projects
    .filter((x) => x.id !== p.id && x.domain === p.domain)
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        {p.rank ? `Rank ${p.rank}` : "Project"} · {p.category}
      </p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          {p.name.replaceAll("_", " ")}
        </h1>
        <SignalScore score={p.signalScore} size="lg" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone={healthTone(p.health)}>{p.status}</Badge>
        <Badge>{p.language}</Badge>
        {p.license ? <Badge>{p.license}</Badge> : <Badge>License not detected</Badge>}
      </div>
      <div className="mt-8 overflow-hidden rounded-xl">
        <ProjectCover project={p} className="aspect-[16/8]" priority />
      </div>

      <section className="mt-10 grid gap-10 md:grid-cols-[1.4fr_0.8fr]">
        <div className="grid gap-8">
          <Block title="Overview">
            {p.fourLines.map((line) => (
              <p key={line} className="text-sm leading-relaxed text-muted">
                {line}
              </p>
            ))}
          </Block>
          <Block title="Problem">
            <p className="text-sm leading-relaxed text-muted">{p.fourLines[1]}</p>
          </Block>
          <Block title="Approach / architecture">
            <p className="text-sm leading-relaxed text-muted">{p.fourLines[2]}</p>
            <p className="mt-2 text-sm text-subtle">
              File-level architecture beyond README and GitHub metadata is not claimed here.
            </p>
          </Block>
          <Block title="Technologies">
            <div className="flex flex-wrap gap-2">
              {(p.tech.length ? p.tech : [p.language]).map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </Block>
          <Block title="What this project demonstrates">
            <ul className="list-disc pl-5 text-sm text-muted">
              {p.learning.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </Block>
          <Block title="Results / project status">
            <p className="text-sm text-muted">
              {p.status}. Last push {formatDate(p.pushedAt)} ({timeAgo(p.pushedAt)}). Benchmarks,
              users, and deployment claims are not invented.
            </p>
          </Block>
          {p.gifs.length || p.images.length ? (
            <Block title="Screenshots and GIFs">
              <div className="grid gap-3 sm:grid-cols-2">
                {[...p.gifs, ...p.images].slice(0, 6).map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    width={640}
                    height={360}
                    loading="lazy"
                    className="rounded-lg object-cover"
                  />
                ))}
              </div>
            </Block>
          ) : (
            <Block title="Screenshots and GIFs">
              <p className="text-sm text-muted">Not detected in the public README.</p>
            </Block>
          )}
          {p.readmeExcerpt ? (
            <Block title="README excerpt">
              <pre className="overflow-auto whitespace-pre-wrap rounded-lg bg-surface p-4 font-mono text-xs leading-relaxed text-muted">
                {p.readmeExcerpt}
              </pre>
            </Block>
          ) : (
            <Block title="README excerpt">
              <p className="text-sm text-muted">Not detected.</p>
            </Block>
          )}
        </div>
        <aside className="h-fit rounded-xl bg-bg-elevated p-5 shadow-[var(--shadow-border)]">
          <h2 className="text-sm font-medium">Repository</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <Row label="Stars" value={formatCompact(p.stars)} />
            <Row label="Forks" value={formatCompact(p.forks)} />
            <Row label="Open issues" value={formatCompact(p.openIssues)} />
            <Row label="Size" value={`${formatCompact(p.sizeKb)} KB`} />
            <Row label="Created" value={formatDate(p.createdAt)} />
            <Row label="Updated" value={formatDate(p.pushedAt)} />
            <Row label="Default branch" value={p.defaultBranch || "Not detected"} />
            <Row label="Media" value={p.mediaKind === "generated" ? "Generated placeholder" : p.mediaKind} />
          </dl>
          <div className="mt-6">
            <SignalBars breakdown={p.signalBreakdown} />
          </div>
          <div className="mt-6 grid gap-2">
            <Button asChild>
              <a href={p.url} target="_blank" rel="noreferrer">
                <Github className="size-4" /> GitHub
              </a>
            </Button>
            {p.homepage ? (
              <Button asChild variant="secondary">
                <a href={p.homepage} target="_blank" rel="noreferrer">
                  Live demo <ArrowUpRight className="size-4" />
                </a>
              </Button>
            ) : (
              <p className="text-xs text-subtle">Live demo not detected.</p>
            )}
            <Button variant={selected ? "primary" : "ghost"} onClick={() => toggle(p.id)}>
              {selected ? "In comparison" : "Add to comparison"}
            </Button>
          </div>
        </aside>
      </section>

      {related.length ? (
        <section className="mt-16">
          <h2 className="text-lg font-medium">Related in {p.category}</h2>
          <ul className="mt-4 grid gap-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link to="/projects/$id" params={{ id: r.id }} className="text-sm hover:underline">
                  {r.name.replaceAll("_", " ")} · signal {Math.round(r.signalScore)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-medium">{title}</h2>
      <div className="mt-3 grid gap-2">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="font-mono text-xs tabular-nums">{value}</dd>
    </div>
  );
}
