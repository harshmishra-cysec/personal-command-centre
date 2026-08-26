import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DesktopSidebar, MobileBottomNav } from "@/components/dashboard/nav";
import { DashHeader } from "@/components/dashboard/header";
import { StatsRow } from "@/components/dashboard/stats";
import { PillarBoard } from "@/components/dashboard/pillar-board";
import { BOARDS, type Pillar } from "@/lib/dash-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Personal Command Center — Daily Dash" },
      {
        name: "description",
        content:
          "Tactical dark-mode dashboard tracking cybersecurity, academics, and AIML objectives with daily focus stats and streaks.",
      },
      { property: "og:title", content: "Personal Command Center — Daily Dash" },
      {
        property: "og:description",
        content:
          "Track cybersecurity, academics, and AIML objectives in one tactical daily dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [boards, setBoards] = useState(BOARDS);

  const all = boards.flatMap((b) => b.tasks);
  const completion = Math.round((all.filter((t) => t.done).length / all.length) * 100);

  function toggle(boardId: Pillar, taskId: string) {
    setBoards((prev) =>
      prev.map((b) =>
        b.id === boardId
          ? { ...b, tasks: b.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)) }
          : b,
      ),
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DesktopSidebar />

      <div className="grid-backdrop flex min-w-0 flex-1 flex-col">
        <DashHeader />

        <main className="flex-1 space-y-4 px-4 pt-4 pb-24 lg:px-6 lg:pb-8">
          <div className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-cyber" />
            <h2 className="label-mono text-foreground">Daily Dash</h2>
            <span className="h-px flex-1 bg-border" />
          </div>

          <StatsRow completion={completion} />

          <div className="grid gap-4 lg:grid-cols-3">
            {boards.map((board) => (
              <PillarBoard key={board.id} board={board} onToggle={toggle} />
            ))}
          </div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
