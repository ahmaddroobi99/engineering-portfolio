import { cn } from "@/lib/utils";
import type { Project } from "@/data/types";

export function ProjectCover({
  project,
  className,
  priority = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  const src = project.gifs[0] || project.cover || project.images[0];
  const isReal = project.mediaKind !== "generated" && Boolean(src);

  if (isReal && src) {
    return (
      <div className={cn("relative overflow-hidden bg-surface", className)}>
        <img
          src={src}
          alt=""
          width={640}
          height={360}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover"
        />
        {project.mediaKind === "generated" ? null : (
          <span className="absolute left-2 top-2 rounded-full bg-bg/80 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
            {project.mediaKind === "gif" ? "Repository GIF" : "README image"}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex h-full min-h-36 flex-col justify-between overflow-hidden bg-bg-elevated p-4",
        className,
      )}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40 grain" />
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Generated visual
        </span>
        <span className="font-mono text-xs tabular-nums text-accent">
          {Math.round(project.signalScore)}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium leading-snug">{project.name.replaceAll("_", " ")}</p>
        <p className="mt-1 text-xs text-muted">
          {project.category} · {project.language}
        </p>
      </div>
    </div>
  );
}
