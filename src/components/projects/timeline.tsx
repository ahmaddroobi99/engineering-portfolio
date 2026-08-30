import { Link } from "@tanstack/react-router";
import { projects } from "@/data/catalog";
import { formatDate } from "@/lib/utils";

export function EngineeringTimeline() {
  const items = [...projects].sort((a, b) => (a.createdAt || "").localeCompare(b.createdAt || ""));
  return (
    <ol className="relative ml-3 border-l border-border">
      {items.map((p) => (
        <li key={p.id} className="mb-8 ml-6">
          <span className="absolute -left-1.5 mt-1.5 size-3 rounded-full bg-accent" />
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            {formatDate(p.createdAt)} · updated {formatDate(p.pushedAt)}
          </p>
          <h3 className="mt-1 text-base font-medium">
            <Link to="/projects/$id" params={{ id: p.id }} className="hover:underline">
              {p.name.replaceAll("_", " ")}
            </Link>
          </h3>
          <p className="text-sm text-muted">
            {p.category} · {p.language} · signal {Math.round(p.signalScore)}
          </p>
        </li>
      ))}
    </ol>
  );
}
