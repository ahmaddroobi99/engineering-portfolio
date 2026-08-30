import { createFileRoute, Link } from "@tanstack/react-router";
import { catalog, projects } from "@/data/catalog";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/maintenance")({
  head: () => ({ meta: [{ title: "Maintenance — Ahmad Droobi" }] }),
  component: MaintenancePage,
});

function MaintenancePage() {
  const missingReadme = projects.filter((p) => p.issues.includes("Missing README"));
  const missingDesc = projects.filter((p) => p.issues.includes("Missing description"));
  const missingLicense = projects.filter((p) => p.issues.includes("Missing license"));
  const missingDemo = projects.filter((p) => p.issues.includes("Missing demo"));
  const missingShots = projects.filter((p) => p.issues.includes("Missing screenshots"));
  const inactive = projects.filter((p) => p.status === "Inactive" || p.health === "Needs Maintenance");

  const buckets = [
    ["Missing README", missingReadme],
    ["Missing description", missingDesc],
    ["Missing license", missingLicense],
    ["Missing demo", missingDemo],
    ["Missing screenshots", missingShots],
    ["Inactive / needs maintenance", inactive],
  ] as const;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Ops</p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight">Maintenance center</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        Observable gaps in the public GitHub corpus. This is an engineering cleanup tool, not a
        marketing dashboard. Index generated {formatDate(catalog.generatedAt)}.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {buckets.map(([label, list]) => (
          <article key={label} className="rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
            <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
            <p className="mt-2 font-mono text-3xl tabular-nums">{list.length}</p>
          </article>
        ))}
      </div>
      {buckets.map(([label, list]) => (
        <section key={label} className="mt-10">
          <h2 className="text-lg font-medium">{label}</h2>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {list.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
                <Link to="/projects/$id" params={{ id: p.id }} className="hover:underline">
                  {p.name}
                </Link>
                <span className="font-mono text-xs text-subtle">{p.status}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
