import { Link } from "@tanstack/react-router";
import { ArrowUpRight, GitCompare, Github, Star } from "lucide-react";
import type { Project } from "@/data/types";
import { Badge, healthTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCover } from "@/components/projects/project-cover";
import { SignalScore } from "@/components/projects/signal-score";
import { useCompare } from "@/lib/compare-store";
import { cn, formatCompact, timeAgo } from "@/lib/utils";

export function ProjectCard({
  project,
  dense = false,
}: {
  project: Project;
  dense?: boolean;
}) {
  const selected = useCompare((s) => s.ids.includes(project.id));
  const toggle = useCompare((s) => s.toggle);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)]">
      <Link to="/projects/$id" params={{ id: project.id }} className="block">
        <ProjectCover project={project} className="aspect-[16/9]" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
              {project.rank ? `#${project.rank}` : ""} {project.category}
            </p>
            <h3 className="mt-1 truncate text-base font-medium leading-snug">
              <Link to="/projects/$id" params={{ id: project.id }}>
                {project.name.replaceAll("_", " ")}
              </Link>
            </h3>
          </div>
          <SignalScore score={project.signalScore} size="sm" />
        </div>
        {!dense && (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted">
            {project.fourLines[0]}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-2 text-xs text-subtle">
          <Badge tone={healthTone(project.health)}>{project.status}</Badge>
          <span className="inline-flex items-center gap-1">
            <Star className="size-3" aria-hidden />
            {formatCompact(project.stars)}
          </span>
          <span>{project.language}</span>
          <span>{timeAgo(project.pushedAt)}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm" variant="primary">
            <Link to="/projects/$id" params={{ id: project.id }}>
              Read more
            </Link>
          </Button>
          <Button asChild size="sm" variant="secondary">
            <a href={project.url} target="_blank" rel="noreferrer">
              <Github className="size-3.5" aria-hidden />
              GitHub
            </a>
          </Button>
          {project.homepage ? (
            <Button asChild size="sm" variant="ghost">
              <a href={project.homepage} target="_blank" rel="noreferrer">
                Demo <ArrowUpRight className="size-3.5" />
              </a>
            </Button>
          ) : null}
          <Button
            size="icon"
            variant={selected ? "primary" : "ghost"}
            className={cn("ml-auto size-9 min-h-9")}
            aria-pressed={selected}
            aria-label={selected ? "Remove from comparison" : "Add to comparison"}
            onClick={() => toggle(project.id)}
          >
            <GitCompare className="size-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
