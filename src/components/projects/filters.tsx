import { DOMAIN_META } from "@/data/types";
import { uniqueLanguages, uniqueStatuses } from "@/data/catalog";
import { cn } from "@/lib/utils";

export type SortKey =
  | "signal"
  | "updated"
  | "stars"
  | "complexity"
  | "newest"
  | "oldest"
  | "alpha";

export type FilterState = {
  domain: string;
  language: string;
  status: string;
  sort: SortKey;
  query: string;
};

export const defaultFilters: FilterState = {
  domain: "all",
  language: "all",
  status: "all",
  sort: "signal",
  query: "",
};

const sorts: Array<{ id: SortKey; label: string }> = [
  { id: "signal", label: "Highest signal" },
  { id: "updated", label: "Recently updated" },
  { id: "stars", label: "Most stars" },
  { id: "complexity", label: "Most complex" },
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "alpha", label: "Alphabetical" },
];

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 rounded-full px-3 text-xs transition-[background-color,color] duration-150",
        active ? "bg-accent text-accent-fg" : "bg-surface text-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

export function FilterBar({
  value,
  onChange,
}: {
  value: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const languages = uniqueLanguages();
  const statuses = uniqueStatuses();

  return (
    <div className="grid gap-4">
      <label className="block">
        <span className="sr-only">Search projects</span>
        <input
          value={value.query}
          onChange={(e) => onChange({ ...value, query: e.target.value })}
          placeholder="Search name, description, language, topic…"
          className="h-12 w-full rounded-lg bg-bg-elevated px-4 text-sm shadow-[var(--shadow-border)] placeholder:text-subtle"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <Chip active={value.domain === "all"} onClick={() => onChange({ ...value, domain: "all" })}>
          All
        </Chip>
        {DOMAIN_META.map((d) => (
          <Chip
            key={d.slug}
            active={value.domain === d.slug}
            onClick={() => onChange({ ...value, domain: d.slug })}
          >
            {d.label}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip
          active={value.language === "all"}
          onClick={() => onChange({ ...value, language: "all" })}
        >
          Any language
        </Chip>
        {languages.map((l) => (
          <Chip
            key={l}
            active={value.language === l}
            onClick={() => onChange({ ...value, language: l })}
          >
            {l}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {statuses.map((s) => (
          <Chip
            key={s}
            active={value.status === s}
            onClick={() =>
              onChange({ ...value, status: value.status === s ? "all" : s })
            }
          >
            {s}
          </Chip>
        ))}
        <label className="ml-auto text-xs text-muted">
          Sort
          <select
            className="ml-2 h-9 rounded-md bg-surface px-2 text-fg"
            value={value.sort}
            onChange={(e) => onChange({ ...value, sort: e.target.value as SortKey })}
          >
            {sorts.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
