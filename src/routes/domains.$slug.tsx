import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProjectCard } from "@/components/projects/project-card";
import { projectsByDomain } from "@/data/catalog";
import { DOMAIN_META } from "@/data/types";

export const Route = createFileRoute("/domains/$slug")({
  loader: ({ params }) => {
    const meta = DOMAIN_META.find((d) => d.slug === params.slug);
    if (!meta) throw notFound();
    return { meta, items: projectsByDomain(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.meta.label ?? "Domain"} — Ahmad Droobi` }],
  }),
  component: DomainDetail,
});

function DomainDetail() {
  const { meta, items } = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{meta.kicker}</p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight">{meta.label}</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">{meta.summary}</p>
      <p className="mt-6 font-mono text-xs text-subtle">{items.length} ranked projects</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </main>
  );
}
