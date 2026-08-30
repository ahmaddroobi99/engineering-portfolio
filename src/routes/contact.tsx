import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Ahmad Droobi" }] }),
  component: ContactPage,
});

function ContactPage() {
  const links = [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Google Scholar", href: profile.scholar },
    { label: "Thesis", href: profile.thesis },
    { label: "GitHub Pages", href: profile.site },
    { label: "Email", href: `mailto:${profile.email}` },
    { label: "Resume PDF", href: profile.cv },
  ];
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Contact</p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight">How to reach me</h1>
      <p className="mt-3 text-sm text-muted">
        Links below exist in the public portfolio repository or GitHub profile. Nothing else is
        invented.
      </p>
      <ul className="mt-8 divide-y divide-border border-y border-border">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="flex min-h-14 items-center justify-between py-3 text-sm hover:text-muted"
              target={l.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
            >
              <span>{l.label}</span>
              <span className="truncate pl-6 font-mono text-xs text-subtle">{l.href.replace("mailto:", "")}</span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
