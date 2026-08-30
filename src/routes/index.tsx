import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import { ConstellationMap } from "@/components/projects/constellation";
import { catalog, featuredProjects } from "@/data/catalog";
import { DOMAIN_META } from "@/data/types";
import { aboutCopy, profile } from "@/data/profile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Ahmad Droobi — Engineering Portfolio" }],
  }),
  component: Home,
});

function Home() {
  const featured = featuredProjects();
  return (
    <main>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <img
            src={profile.hero}
            alt=""
            width={1400}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1.4fr_0.8fr] md:py-28">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              Engineering portfolio
            </p>
            <h1 className="mt-4 text-4xl font-medium tracking-tight md:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-3 text-lg text-muted">{profile.title}</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-fg/90">{profile.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/projects">Explore projects</Link>
              </Button>
              <Button asChild variant="secondary">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <Github className="size-4" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href={profile.cv} target="_blank" rel="noreferrer">
                  Download resume
                </a>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/contact">Contact</Link>
              </Button>
            </div>
          </div>
          <aside className="rounded-xl bg-bg/80 p-5 shadow-[var(--shadow-border)] backdrop-blur">
            <dl className="grid grid-cols-2 gap-4 font-mono text-sm tabular-nums">
              <Stat label="Public repos" value={catalog.totals.public} />
              <Stat label="Ranked" value={catalog.totals.selected} />
              <Stat label="Followers" value={catalog.profile.followers} />
              <Stat label="Originals indexed" value={catalog.totals.originalIndexed} />
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Ranked by Project Signal Score. Stars are 5% of the score. Forks of upstream
              libraries are excluded.
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <Header kicker="Who" title="An engineer who builds things." />
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{aboutCopy.intro}</p>
        <Link to="/about" className="mt-4 inline-flex items-center gap-1 text-sm hover:underline">
          Engineering focus <ArrowUpRight className="size-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <Header kicker="Domains" title="Click a field to filter the explorer." />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {DOMAIN_META.map((d) => (
            <Link
              key={d.slug}
              to="/domains/$slug"
              params={{ slug: d.slug }}
              className="rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)] transition-[transform] duration-150 hover:-translate-y-0.5"
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{d.kicker}</p>
              <h3 className="mt-2 font-medium">{d.label}</h3>
              <p className="mt-2 text-sm text-muted">{d.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <Header kicker="Featured" title="Eight projects, chosen for breadth — not stars." />
          <Link to="/top-50" className="hidden text-sm text-muted hover:text-fg sm:inline">
            Top 50 →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <Header kicker="Map" title="Project constellation" />
        <div className="mt-6 overflow-hidden rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
          <ConstellationMap />
        </div>
        <div className="mt-6">
          <Button asChild variant="secondary">
            <Link to="/projects">Explore all projects</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

function Header({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{kicker}</p>
      <h2 className="mt-2 text-2xl font-medium tracking-tight md:text-3xl">{title}</h2>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-subtle">{label}</dt>
      <dd className="mt-1 text-2xl text-fg">{value}</dd>
    </div>
  );
}
