import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DesktopSidebar, MobileBottomNav, type TabView } from "@/components/dashboard/nav";
import { DashHeader } from "@/components/dashboard/header";
import { StatsRow } from "@/components/dashboard/stats";
import { PillarBoard } from "@/components/dashboard/pillar-board";
import { ObjectiveDialog, type ObjectiveDraft } from "@/components/dashboard/objective-dialog";
import { RoadmapsView } from "@/components/dashboard/roadmaps-view";
import { RealityCheckView } from "@/components/dashboard/reality-check-view";
import { StatsView } from "@/components/dashboard/stats-view";
import { IntroScreen } from "@/components/dashboard/IntroScreen";
import { TaskStopwatchModal } from "@/components/dashboard/task-stopwatch-modal";
import { BOARDS, type Pillar, type Task } from "@/lib/dash-data";
import {
  deleteTaskFromSupabase,
  getSyncStatus,
  insertTaskToSupabase,
  loadBoards,
  readStreak,
  recordCompletion,
  saveBoards,
  subscribeSyncStatus,
  syncAllFromSupabase,
  updateTaskInSupabase,
  usePccRealtime,
  type SyncStatus,
} from "@/lib/pcc-storage";
import { computeFocusHoursFromBoards } from "@/lib/stats-data";

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
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: Index,
});

function computeCompletion(boards: typeof BOARDS) {
  const all = boards.flatMap((b) => b.tasks);
  return all.length ? Math.round((all.filter((t) => t.done).length / all.length) * 100) : 0;
}

function Index() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabView>("today");
  const [boards, setBoards] = useState(BOARDS);
  const [streak, setStreak] = useState(0);
  const [syncStatus, setSyncStatusState] = useState<SyncStatus>(() => getSyncStatus());
  const hydrated = useRef(false);

  // Task Dialog State
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [activePillar, setActivePillar] = useState<Pillar>("cyber");
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Active Stopwatch Modal State
  const [activeStopwatch, setActiveStopwatch] = useState<{
    task: Task;
    pillar: Pillar;
  } | null>(null);

  // Listen to live sync status updates
  useEffect(() => {
    const unsub = subscribeSyncStatus(setSyncStatusState);
    return unsub;
  }, []);

  // Supabase Realtime Zero-Refresh Instant Sync (tasks, roadmaps, user stats)
  usePccRealtime({
    setBoards,
    setStreak,
  });

  // Hydrate local state first, then sync from Supabase cloud
  useEffect(() => {
    setBoards(loadBoards());
    setStreak(readStreak());
    hydrated.current = true;

    syncAllFromSupabase()
      .then((synced) => {
        setBoards(synced.boards);
        setStreak(synced.streak);
      })
      .catch((err) => {
        console.warn("[PCC Supabase] Initial mount sync failed:", err);
      });
  }, []);

  // Sync every change back to localStorage and update the streak
  useEffect(() => {
    if (!hydrated.current) return;
    saveBoards(boards);
    setStreak(recordCompletion(computeCompletion(boards)));
  }, [boards]);

  const completion = computeCompletion(boards);
  const focusedHours = computeFocusHoursFromBoards(boards);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  function toggle(boardId: Pillar, taskId: string) {
    let updatedTaskForCloud: Task | null = null;
    setBoards((prev) =>
      prev.map((b) =>
        b.id === boardId
          ? {
              ...b,
              tasks: b.tasks.map((t) => {
                if (t.id === taskId) {
                  const nextDone = !t.done;
                  const updated: Task = {
                    ...t,
                    done: nextDone,
                    actualFocusMinutes:
                      nextDone && (!t.actualFocusMinutes || t.actualFocusMinutes === 0)
                        ? t.durationMinutes || 45
                        : t.actualFocusMinutes,
                  };
                  updatedTaskForCloud = updated;
                  return updated;
                }
                return t;
              }),
            }
          : b,
      ),
    );

    if (updatedTaskForCloud) {
      updateTaskInSupabase(updatedTaskForCloud, boardId);
    }
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

  function handleStartTimer(boardId: Pillar, task: Task) {
    setActiveStopwatch({ task, pillar: boardId });
  }

  function handleFinishTimerTask(pillar: Pillar, taskId: string, elapsedMinutes: number) {
    let updatedTaskForCloud: Task | null = null;
    setBoards((prev) =>
      prev.map((b) =>
        b.id === pillar
          ? {
              ...b,
              tasks: b.tasks.map((t) => {
                if (t.id === taskId) {
                  const updated: Task = {
                    ...t,
                    done: true,
                    actualFocusMinutes: (t.actualFocusMinutes || 0) + elapsedMinutes,
                  };
                  updatedTaskForCloud = updated;
                  return updated;
                }
                return t;
              }),
            }
          : b,
      ),
    );

    if (updatedTaskForCloud) {
      updateTaskInSupabase(updatedTaskForCloud, pillar);
    }
  }

  function handleUpdateFocusMinutes(pillar: Pillar, taskId: string, elapsedMinutes: number) {
    let updatedTaskForCloud: Task | null = null;
    setBoards((prev) =>
      prev.map((b) =>
        b.id === pillar
          ? {
              ...b,
              tasks: b.tasks.map((t) => {
                if (t.id === taskId) {
                  const updated: Task = {
                    ...t,
                    actualFocusMinutes: (t.actualFocusMinutes || 0) + elapsedMinutes,
                  };
                  updatedTaskForCloud = updated;
                  return updated;
                }
                return t;
              }),
            }
          : b,
      ),
    );

    if (updatedTaskForCloud) {
      updateTaskInSupabase(updatedTaskForCloud, pillar);
    }
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

    if (mode === "create") {
      insertTaskToSupabase(draft.task, draft.pillar);
    } else {
      updateTaskInSupabase(draft.task, draft.pillar);
    }
  }

  function remove(boardId: Pillar, taskId: string) {
    setBoards((prev) =>
      prev.map((b) =>
        b.id === boardId ? { ...b, tasks: b.tasks.filter((t) => t.id !== taskId) } : b,
      ),
    );
    deleteTaskFromSupabase(taskId);
    setDialogOpen(false);
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Interactive TryHackMe Breach & Overclock Intro Sequence */}
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}

      <DesktopSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReplayIntro={handleReplayIntro}
      />

      <div className="grid-backdrop flex min-w-0 flex-1 flex-col">
        <DashHeader onReplayIntro={handleReplayIntro} syncStatus={syncStatus} />

        <main className="flex-1 space-y-4 px-4 pt-4 pb-24 lg:px-6 lg:pb-8">
          {activeTab === "today" && (
            <>
              <div className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-cyber" />
                <h2 className="label-mono text-foreground">Daily Dash</h2>
                <span className="h-px flex-1 bg-border" />
              </div>

              <StatsRow completion={completion} streak={streak} focusedHours={focusedHours} />

              <div className="grid gap-4 lg:grid-cols-3">
                {boards.map((board) => (
                  <PillarBoard
                    key={board.id}
                    board={board}
                    onToggle={toggle}
                    onNew={openNew}
                    onOpenTask={openTask}
                    onStartTimer={handleStartTimer}
                  />
                ))}
              </div>
            </>
          )}

          {activeTab === "roadmaps" && <RoadmapsView />}
          {activeTab === "reality" && (
            <RealityCheckView onNavigateToToday={() => setActiveTab("today")} />
          )}
          {activeTab === "stats" && <StatsView />}
        </main>
      </div>

      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Task Creation & Edit Modal */}
      <ObjectiveDialog
        open={dialogOpen}
        mode={mode}
        initialPillar={activePillar}
        initialTask={activeTask}
        onOpenChange={setDialogOpen}
        onSubmit={submit}
        onDelete={remove}
      />

      {/* Floating / Full Tactical Focus Stopwatch */}
      {activeStopwatch && (
        <TaskStopwatchModal
          task={activeStopwatch.task}
          pillar={activeStopwatch.pillar}
          onClose={() => setActiveStopwatch(null)}
          onFinishTask={handleFinishTimerTask}
          onUpdateFocusMinutes={handleUpdateFocusMinutes}
        />
      )}
    </div>
  );
}
