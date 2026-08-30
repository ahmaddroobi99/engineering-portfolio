import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { projectById } from "@/data/catalog";
import { useCompare } from "@/lib/compare-store";
import { Button } from "@/components/ui/button";

export function CompareBar() {
  const ids = useCompare((s) => s.ids);
  const toggle = useCompare((s) => s.toggle);
  const clear = useCompare((s) => s.clear);
  if (!ids.length) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
        <p className="text-xs uppercase tracking-wider text-muted">Compare {ids.length}/3</p>
        <div className="flex flex-1 flex-wrap gap-2">
          {ids.map((id) => {
            const p = projectById.get(id);
            if (!p) return null;
            return (
              <button
                key={id}
                className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs"
                onClick={() => toggle(id)}
              >
                {p.name.replaceAll("_", " ")}
                <X className="size-3" />
              </button>
            );
          })}
        </div>
        <Button asChild size="sm" disabled={ids.length < 2}>
          <Link to="/compare" search={{ ids: ids.join(",") }}>
            Compare
          </Link>
        </Button>
        <Button size="sm" variant="ghost" onClick={clear}>
          Clear
        </Button>
      </div>
    </div>
  );
}
