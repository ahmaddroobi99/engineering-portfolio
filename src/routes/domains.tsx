import { createFileRoute, Link } from "@tanstack/react-router";
import { projectsByDomain } from "@/data/catalog";
import { DOMAIN_META } from "@/data/types";

export const Route = createFileRoute("/domains")({
  head: () => ({ meta: [{ title: "Engineering domains — Ahmad Droobi" }] }),
  component: DomainsPage,
});

function DomainsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Domains</p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight">Engineering domains</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        Automatic classification from repository names, descriptions, languages, and README text.
        Uncertain work is labeled Other / Experiments.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {DOMAIN_META.map((d) => {
          const count = projectsByDomain(d.slug).length;
          return (
            <Link
              key={d.slug}
              to="/domains/$slug"
              params={{ slug: d.slug }}
              className="rounded-xl bg-bg-elevated p-5 shadow-[var(--shadow-border)]"
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{d.kicker}</p>
              <h2 className="mt-2 text-xl font-medium">{d.label}</h2>
              <p className="mt-2 text-sm text-muted">{d.summary}</p>
              <p className="mt-4 font-mono text-xs tabular-nums text-subtle">{count} ranked</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
