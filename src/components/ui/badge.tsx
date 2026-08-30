import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "ok" | "warn" | "danger" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase",
        tone === "default" && "bg-surface text-muted",
        tone === "accent" && "bg-accent text-accent-fg",
        tone === "ok" && "bg-ok/15 text-ok",
        tone === "warn" && "bg-warn/15 text-warn",
        tone === "danger" && "bg-danger/15 text-danger",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function healthTone(health: string) {
  if (health === "Healthy" || health === "Active") return "ok" as const;
  if (health === "Needs Maintenance") return "warn" as const;
  if (health === "Archived") return "danger" as const;
  return "default" as const;
}
