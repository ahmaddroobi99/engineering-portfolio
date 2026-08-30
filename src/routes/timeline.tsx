import { createFileRoute } from "@tanstack/react-router";
import { EngineeringTimeline } from "@/components/projects/timeline";

export const Route = createFileRoute("/timeline")({
  head: () => ({ meta: [{ title: "Timeline — Ahmad Droobi" }] }),
  component: TimelinePage,
});

function TimelinePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">History</p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight">Engineering timeline</h1>
      <p className="mt-3 text-sm text-muted">
        Dates are GitHub created/pushed timestamps. No invented milestones.
      </p>
      <div className="mt-10">
        <EngineeringTimeline />
      </div>
    </main>
  );
}
