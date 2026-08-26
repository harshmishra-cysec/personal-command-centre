import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DesktopSidebar, MobileBottomNav } from "@/components/dashboard/nav";
import { DashHeader } from "@/components/dashboard/header";
import { StatsRow } from "@/components/dashboard/stats";
import { PillarBoard } from "@/components/dashboard/pillar-board";
import { ObjectiveDialog, type ObjectiveDraft } from "@/components/dashboard/objective-dialog";
import { BOARDS, type Pillar, type Task } from "@/lib/dash-data";
import { loadBoards, readStreak, recordCompletion, saveBoards } from "@/lib/pcc-storage";

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

function computeCompletion(boards: typeof BOARDS) {
  const all = boards.flatMap((b) => b.tasks);
  return all.length ? Math.round((all.filter((t) => t.done).length / all.length) * 100) : 0;
}

function Index() {
  const [boards, setBoards] = useState(BOARDS);
  const [streak, setStreak] = useState(0);
  const hydrated = useRef(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [activePillar, setActivePillar] = useState<Pillar>("cyber");
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Load persisted tasks after mount (localStorage is browser-only).
  useEffect(() => {
    setBoards(loadBoards());
    setStreak(readStreak());
    hydrated.current = true;
  }, []);

  // Sync every change back to localStorage and update the streak.
  useEffect(() => {
    if (!hydrated.current) return;
    saveBoards(boards);
    setStreak(recordCompletion(computeCompletion(boards)));
  }, [boards]);

  const completion = computeCompletion(boards);

  function toggle(boardId: Pillar, taskId: string) {
    setBoards((prev) =>
      prev.map((b) =>
        b.id === boardId
          ? { ...b, tasks: b.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)) }
          : b,
      ),
    );
  }

  function openNew(boardId: Pillar) {
    setMode("create");
    setActivePillar(boardId);
    setActiveTask(null);
    setDialogOpen(true);
  }

  function openTask(boardId: Pillar, task: Task) {
    setMode("edit");
    setActivePillar(boardId);
    setActiveTask(task);
    setDialogOpen(true);
  }

  function submit(draft: ObjectiveDraft, originPillar: Pillar) {
    setBoards((prev) =>
      prev.map((b) => {
        let tasks = b.tasks;
        if (b.id === originPillar) tasks = tasks.filter((t) => t.id !== draft.task.id);
        if (b.id === draft.pillar) {
          const idx = tasks.findIndex((t) => t.id === draft.task.id);
          tasks =
            idx >= 0
              ? tasks.map((t) => (t.id === draft.task.id ? draft.task : t))
              : [...tasks, draft.task];
        }
        return tasks === b.tasks ? b : { ...b, tasks };
      }),
    );
  }

  function remove(boardId: Pillar, taskId: string) {
    setBoards((prev) =>
      prev.map((b) =>
        b.id === boardId ? { ...b, tasks: b.tasks.filter((t) => t.id !== taskId) } : b,
      ),
    );
    setDialogOpen(false);
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

          <StatsRow completion={completion} streak={streak} />

          <div className="grid gap-4 lg:grid-cols-3">
            {boards.map((board) => (
              <PillarBoard
                key={board.id}
                board={board}
                onToggle={toggle}
                onNew={openNew}
                onOpenTask={openTask}
              />
            ))}
          </div>
        </main>
      </div>

      <MobileBottomNav />

      <ObjectiveDialog
        open={dialogOpen}
        mode={mode}
        initialPillar={activePillar}
        initialTask={activeTask}
        onOpenChange={setDialogOpen}
        onSubmit={submit}
        onDelete={remove}
      />
    </div>
  );
}
