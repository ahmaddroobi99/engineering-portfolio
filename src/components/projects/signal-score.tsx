import { cn } from "@/lib/utils";

export function SignalScore({
  score,
  size = "md",
}: {
  score: number;
  size?: "sm" | "md" | "lg";
}) {
  const rounded = Math.round(score);
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1.5 font-mono tabular-nums text-fg",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        size === "lg" && "text-2xl",
      )}
      title="Project Signal Score 0–100"
    >
      <span className="text-subtle uppercase tracking-wider text-[10px] font-sans">
        Signal
      </span>
      <span>{rounded}</span>
    </span>
  );
}

export function SignalBars({
  breakdown,
}: {
  breakdown: Record<string, number>;
}) {
  const rows: Array<[string, number]> = [
    ["Relevance", breakdown.relevance],
    ["Activity", breakdown.activity],
    ["Docs", breakdown.documentation],
    ["Visual", breakdown.visual],
    ["Complexity", breakdown.complexity],
    ["Stars", breakdown.stars],
    ["Complete", breakdown.completeness],
    ["Recency", breakdown.recency],
  ];
  return (
    <dl className="grid gap-2">
      {rows.map(([label, value]) => (
        <div key={label} className="grid grid-cols-[7rem_1fr_2rem] items-center gap-3 text-xs">
          <dt className="text-muted">{label}</dt>
          <dd className="h-1.5 rounded-full bg-surface overflow-hidden">
            <span
              className="block h-full rounded-full bg-accent"
              style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
            />
          </dd>
          <span className="font-mono tabular-nums text-muted text-right">{Math.round(value)}</span>
        </div>
      ))}
    </dl>
  );
}
