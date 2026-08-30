import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import { useEffect } from "react";
import { projects } from "@/data/catalog";
import { profile } from "@/data/profile";
import { useTheme } from "@/lib/theme";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const { cycle } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  function go(path: string) {
    onOpenChange(false);
    void navigate({ to: path });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        className="absolute inset-0 bg-bg/70"
        aria-label="Close command palette"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative mx-auto mt-[12vh] w-[min(640px,calc(100%-1.5rem))] overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)]">
        <Command label="Command palette" className="text-fg">
          <Command.Input
            autoFocus
            placeholder="Search projects, domains, pages…"
            className="h-12 w-full border-b border-border bg-transparent px-4 text-sm outline-none placeholder:text-subtle"
          />
          <Command.List className="max-h-[min(420px,60vh)] overflow-auto p-2">
            <Command.Empty className="px-3 py-6 text-sm text-muted">No matches.</Command.Empty>
            <Command.Group heading="Go" className="text-[11px] uppercase tracking-wider text-subtle">
              <Item onSelect={() => go("/")}>Home</Item>
              <Item onSelect={() => go("/projects")}>Projects</Item>
              <Item onSelect={() => go("/top-50")}>Top 50</Item>
              <Item onSelect={() => go("/domains/ai")}>AI projects</Item>
              <Item onSelect={() => go("/domains/robotics")}>Robotics projects</Item>
              <Item onSelect={() => go("/domains/cloud")}>Cloud projects</Item>
              <Item onSelect={() => go("/domains/scientific")}>Scientific computing</Item>
              <Item onSelect={() => go("/maintenance")}>Maintenance</Item>
              <Item onSelect={() => go("/about")}>About</Item>
              <Item onSelect={() => window.open(profile.github, "_blank")}>Open GitHub</Item>
              <Item onSelect={() => window.open(profile.cv, "_blank")}>Download resume</Item>
              <Item onSelect={() => { cycle(); onOpenChange(false); }}>Toggle theme</Item>
            </Command.Group>
            <Command.Group heading="Projects" className="mt-2 text-[11px] uppercase tracking-wider text-subtle">
              {projects.map((p) => (
                <Item key={p.id} onSelect={() => go(`/projects/${p.id}`)}>
                  {p.name.replaceAll("_", " ")}
                  <span className="ml-auto font-mono text-[10px] text-subtle">{Math.round(p.signalScore)}</span>
                </Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
        <p className="border-t border-border px-4 py-2 text-[11px] text-subtle">
          Ctrl / Cmd + K
        </p>
      </div>
    </div>
  );
}

function Item({
  children,
  onSelect,
}: {
  children: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-fg aria-selected:bg-surface"
    >
      {children}
    </Command.Item>
  );
}
