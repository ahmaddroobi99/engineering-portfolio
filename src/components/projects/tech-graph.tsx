import { projects } from "@/data/catalog";

const NODES = [
  { id: "Python", x: 18, y: 30 },
  { id: "TypeScript", x: 18, y: 70 },
  { id: "C++", x: 50, y: 82 },
  { id: "MATLAB", x: 82, y: 70 },
  { id: "Computer Vision", x: 50, y: 18 },
  { id: "Scientific Computing", x: 82, y: 30 },
  { id: "Cloud", x: 50, y: 50 },
  { id: "Robotics", x: 68, y: 50 },
];

const LINKS: Array<[string, string]> = [
  ["Python", "Computer Vision"],
  ["Python", "Scientific Computing"],
  ["Python", "Cloud"],
  ["TypeScript", "Cloud"],
  ["MATLAB", "Scientific Computing"],
  ["C++", "Robotics"],
  ["Computer Vision", "Robotics"],
  ["Scientific Computing", "Cloud"],
];

export function TechGraph() {
  const counts: Record<string, number> = {};
  for (const p of projects) {
    counts[p.language] = (counts[p.language] || 0) + 1;
    counts[p.category] = (counts[p.category] || 0) + 1;
  }

  return (
    <svg viewBox="0 0 100 100" className="h-auto w-full" role="img" aria-label="Technology graph">
      {LINKS.map(([a, b]) => {
        const A = NODES.find((n) => n.id === a)!;
        const B = NODES.find((n) => n.id === b)!;
        return (
          <line
            key={a + b}
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            stroke="currentColor"
            className="text-border-strong"
            strokeWidth="0.25"
          />
        );
      })}
      {NODES.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r="2.2" className="fill-surface stroke-accent" strokeWidth="0.3" />
          <text x={n.x} y={n.y - 4} textAnchor="middle" fontSize="2.6" className="fill-fg">
            {n.id}
          </text>
          <text x={n.x} y={n.y + 5.5} textAnchor="middle" fontSize="2.1" className="fill-muted">
            {counts[n.id] ?? 0}
          </text>
        </g>
      ))}
    </svg>
  );
}
