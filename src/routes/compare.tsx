import { createFileRoute, Link } from "@tanstack/react-router";
import { projectById } from "@/data/catalog";
import { useCompare } from "@/lib/compare-store";
import { formatCompact, formatDate } from "@/lib/utils";

type Search = { ids?: string };

export const Route = createFileRoute("/compare")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ids: typeof s.ids === "string" ? s.ids : undefined,
  }),
  head: () => ({ meta: [{ title: "Compare projects — Ahmad Droobi" }] }),
  component: ComparePage,
});

function ComparePage() {
  const search = Route.useSearch();
  const stored = useCompare((s) => s.ids);
  const ids = (search.ids ? search.ids.split(",") : stored).filter(Boolean).slice(0, 3);
  const items = ids.map((id) => projectById.get(id)).filter(Boolean);

  if (items.length < 2) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-medium">Compare</h1>
        <p className="mt-3 text-sm text-muted">
          Select two or three projects from the explorer, then return here.
        </p>
        <Link to="/projects" className="mt-4 inline-block text-sm hover:underline">
          Open explorer
        </Link>
      </main>
    );
  }

  const rows: Array<[string, (p: (typeof items)[number]) => string]> = [
    ["Category", (p) => p!.category],
    ["Language", (p) => p!.language],
    ["Signal", (p) => String(Math.round(p!.signalScore))],
    ["Stars", (p) => formatCompact(p!.stars)],
    ["Status", (p) => p!.status],
    ["Created", (p) => formatDate(p!.createdAt)],
    ["Updated", (p) => formatDate(p!.pushedAt)],
    ["Demo", (p) => (p!.homepage ? "Yes" : "Not detected")],
    ["README", (p) => (p!.hasReadme ? "Present" : "Not detected")],
    ["Complexity", (p) => String(Math.round(p!.signalBreakdown.complexity))],
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-medium tracking-tight">Compare</h1>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr>
              <th className="py-3 pr-4 text-muted font-normal">Field</th>
              {items.map((p) => (
                <th key={p!.id} className="py-3 pr-4 font-medium">
                  <Link to="/projects/$id" params={{ id: p!.id }} className="hover:underline">
                    {p!.name.replaceAll("_", " ")}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, fn]) => (
              <tr key={label} className="border-t border-border">
                <td className="py-3 pr-4 text-muted">{label}</td>
                {items.map((p) => (
                  <td key={p!.id} className="py-3 pr-4">
                    {fn(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
