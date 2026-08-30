import { createFileRoute } from "@tanstack/react-router";
import { aboutCopy, awards, education, experience, profile, publications, skills } from "@/data/profile";
import { catalog } from "@/data/catalog";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Ahmad Droobi" }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">About</p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight">Engineering focus</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_220px]">
        <div className="grid gap-4 text-sm leading-relaxed text-muted">
          <p className="text-fg">{aboutCopy.intro}</p>
          <p>{aboutCopy.body}</p>
          <ul className="grid gap-2">
            {aboutCopy.highlights.map((h) => (
              <li key={h} className="border-l border-border pl-3">
                {h}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={profile.portrait}
          alt={profile.name}
          width={720}
          height={900}
          className="w-full rounded-xl object-cover"
        />
      </div>

      <section className="mt-16">
        <h2 className="text-xl font-medium">Current work</h2>
        <p className="mt-3 text-sm text-muted">
          Public GitHub shows {catalog.totals.public} repositories. This site ranks{" "}
          {catalog.totals.selected} original projects. Employment details below are taken from the
          existing portfolio repository, not invented.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-medium">Experience</h2>
        <ol className="mt-6 grid gap-6">
          {experience.map((e) => (
            <li key={e.title} className="grid gap-3 sm:grid-cols-[72px_1fr]">
              <img src={e.img} alt="" width={72} height={72} className="size-14 rounded-md object-cover" />
              <div>
                <p className="font-mono text-[11px] text-muted">{e.date}</p>
                <h3 className="font-medium">{e.title}</h3>
                <p className="text-sm text-muted">{e.place}</p>
                <ul className="mt-2 list-disc pl-5 text-sm text-muted">
                  {e.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-medium">Education</h2>
        <ol className="mt-6 grid gap-6">
          {education.map((e) => (
            <li key={e.title}>
              <p className="font-mono text-[11px] text-muted">{e.date}</p>
              <h3 className="font-medium">{e.title}</h3>
              <p className="text-sm text-muted">{e.place}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-medium">Technology areas</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {skills.map((s) => (
            <article key={s.category} className="rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
              <h3 className="font-medium">{s.category}</h3>
              <p className="mt-2 text-sm text-muted">{s.items.join(" · ")}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-medium">Research / publications</h2>
        <ul className="mt-4 grid gap-4">
          {publications.map((p) => (
            <li key={p.title}>
              <a href={p.href} className="font-medium hover:underline" target="_blank" rel="noreferrer">
                {p.title}
              </a>
              <p className="text-xs text-muted">{p.meta}</p>
              <p className="mt-1 text-sm text-muted">{p.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-medium">Awards (from the existing portfolio repo)</h2>
        <ul className="mt-4 grid gap-2 text-sm">
          {awards.map(([title, org, date]) => (
            <li key={title} className="flex flex-wrap justify-between gap-2 border-b border-border py-2">
              <span>
                {title}
                <span className="block text-muted">{org}</span>
              </span>
              <span className="font-mono text-xs text-subtle">{date}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
