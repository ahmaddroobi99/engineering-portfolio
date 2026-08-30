import { Link, useRouterState } from "@tanstack/react-router";
import { Github, Menu, Moon, Search, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/domains", label: "Domains" },
  { to: "/experiments", label: "Experiments" },
  { to: "/about", label: "About" },
] as const;

export function Navbar({ onSearch }: { onSearch: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { resolved, cycle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        <Link to="/" className="flex items-center gap-2 font-medium tracking-tight">
          <span className="grid size-7 place-items-center rounded-sm bg-accent text-accent-fg font-mono text-[11px]">
            AD
          </span>
          <span className="hidden sm:inline">Ahmad Droobi</span>
        </Link>
        <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm text-muted transition-[color,background-color] duration-150 hover:text-fg",
                  active && "text-fg bg-surface",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={onSearch} aria-label="Open command palette">
            <Search className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={cycle}
            aria-label="Toggle theme"
          >
            {resolved === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Button asChild variant="secondary" size="sm" className="hidden sm:inline-flex">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github className="size-3.5" />
              GitHub
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="size-4" />
          </Button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-border px-4 py-3 md:hidden" aria-label="Mobile">
          <div className="grid gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-3 py-3 text-sm"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/contact" className="rounded-md px-3 py-3 text-sm" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
