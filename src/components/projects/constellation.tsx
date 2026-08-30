import { useNavigate } from "@tanstack/react-router";
import { projects } from "@/data/catalog";
import { DOMAIN_META } from "@/data/types";

const POS: Record<string, { x: number; y: number }> = {
  ai: { x: 50, y: 14 },
  "computer-vision": { x: 22, y: 32 },
  robotics: { x: 18, y: 62 },
  scientific: { x: 50, y: 86 },
  systems: { x: 50, y: 54 },
  cloud: { x: 82, y: 62 },
  software: { x: 78, y: 32 },
  experiments: { x: 50, y: 38 },
};

const EDGES: Array<[string, string]> = [
  ["ai", "computer-vision"],
  ["ai", "software"],
  ["computer-vision", "robotics"],
  ["robotics", "systems"],
  ["systems", "scientific"],
  ["systems", "cloud"],
  ["cloud", "software"],
  ["ai", "experiments"],
];

export function ConstellationMap() {
  const navigate = useNavigate();
  const groups = DOMAIN_META.map((d) => ({
    ...d,
    items: projects.filter((p) => p.domain === d.slug).slice(0, 6),
  }));

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-auto w-full"
      role="img"
      aria-label="Project constellation by engineering domain"
    >
      {EDGES.map(([a, b]) => (
        <line
          key={a + b}
          x1={POS[a]?.x}
          y1={POS[a]?.y}
          x2={POS[b]?.x}
          y2={POS[b]?.y}
          stroke="currentColor"
          className="text-border-strong"
          strokeWidth="0.2"
        />
      ))}
      {groups.map((g) => {
        const origin = POS[g.slug] ?? { x: 50, y: 50 };
        return (
          <g key={g.slug}>
            <circle cx={origin.x} cy={origin.y} r="1.6" className="fill-accent" />
            <text
              x={origin.x}
              y={origin.y - 3}
              textAnchor="middle"
              className="fill-muted"
              fontSize="2.4"
            >
              {g.label}
            </text>
            {g.items.map((p, i) => {
              const angle = (i / Math.max(g.items.length, 1)) * Math.PI * 2 - Math.PI / 2;
              const r = 7 + (i % 2) * 2;
              const x = origin.x + Math.cos(angle) * r;
              const y = origin.y + Math.sin(angle) * r;
              return (
                <g
                  key={p.id}
                  className="cursor-pointer"
                  onClick={() => void navigate({ to: "/projects/$id", params: { id: p.id } })}
                >
                  <title>{p.name}</title>
                  <circle
                    cx={x}
                    cy={y}
                    r={0.7 + p.signalScore / 140}
                    className="fill-fg/80 hover:fill-accent"
                  />
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
