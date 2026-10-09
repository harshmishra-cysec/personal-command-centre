import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MobileBottomNav, type TabView } from "@/components/dashboard/nav";
import { DashHeader } from "@/components/dashboard/header";
import { StatsRow } from "@/components/dashboard/stats";
import { PillarBoard } from "@/components/dashboard/pillar-board";
import { ObjectiveDialog, type ObjectiveDraft } from "@/components/dashboard/objective-dialog";
import { RoadmapsView } from "@/components/dashboard/roadmaps-view";
import { RealityCheckView } from "@/components/dashboard/reality-check-view";
import { StatsView } from "@/components/dashboard/stats-view";
import { IntroScreen } from "@/components/dashboard/IntroScreen";
import { TacticalChronometerDock } from "@/components/dashboard/TacticalChronometerDock";
import { TacticalQuickDock } from "@/components/dashboard/TacticalQuickDock";
import { CompletedPanel } from "@/components/dashboard/completed-panel";
import {
  TaskStopwatchModal,
  type InitialTimerState,
} from "@/components/dashboard/task-stopwatch-modal";
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
  upsertRoadmapTrackToSupabase,
  usePccRealtime,
  type SyncStatus,
} from "@/lib/pcc-storage";
import { setRoadmapChecklistItemCompletion } from "@/lib/roadmap-data";
import { computeFocusHoursFromBoards } from "@/lib/stats-data";
import { useAuthSession, signOutOwner } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MOVONE" },
      {
        name: "description",
        content:
          "MOVONE: a personal space to plan your day and stay consistent. One day or Day One. You decide.",
      },
      { property: "og:title", content: "MOVONE" },
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
  const { session, ready } = useAuthSession();
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [replayRequested, setReplayRequested] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabView>("today");
  const [boards, setBoards] = useState(BOARDS);
  const [streak, setStreak] = useState(0);
  const [syncStatus, setSyncStatusState] = useState<SyncStatus>(() => getSyncStatus());
  const hydrated = useRef(false);

  // Force showIntro to true whenever there is no session
  useEffect(() => {
    if (!session) {
      setShowIntro(true);
    }
  }, [session]);

  // Task Dialog State
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [activePillar, setActivePillar] = useState<Pillar>("cyber");
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Completed Tasks Panel State
  const [isCompletedPanelOpen, setIsCompletedPanelOpen] = useState(false);

  // Active Stopwatch Modal State
  const [activeStopwatch, setActiveStopwatch] = useState<{
    task: Task;
    pillar: Pillar;
    initialTimerState?: InitialTimerState;
  } | null>(null);

  // Restore active timer from localStorage if present
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("movone_active_timer");
      if (raw) {
        const data = JSON.parse(raw);
        if (data && data.taskId && data.pillar) {
          const allTasks = loadBoards().flatMap((b) => b.tasks);
          const found = allTasks.find((t) => t.id === data.taskId) || data.taskSnapshot;
          if (found) {
            setActiveStopwatch({
              task: found,
              pillar: data.pillar,
              initialTimerState: {
                startedAt: typeof data.startedAt === "number" ? data.startedAt : null,
                accumulatedSeconds: Number(data.accumulatedSeconds) || 0,
                isRunning: Boolean(data.isRunning),
                mode: data.mode === "stopwatch" ? "stopwatch" : "countdown",
              },
            });
          }
        }
      }
    } catch {
      // Ignore storage/parse errors
    }
  }, []);

  // Listen to live sync status updates
  useEffect(() => {
    const unsub = subscribeSyncStatus(setSyncStatusState);
    return unsub;
  }, []);

  // Supabase Realtime Zero-Refresh Instant Sync (tasks, roadmaps, user stats) - only when logged in
  usePccRealtime({
    setBoards,
    setStreak,
    enabled: Boolean(session),
  });

  // Hydrate local state first
  useEffect(() => {
    setBoards(loadBoards());
    setStreak(readStreak());
    hydrated.current = true;
  }, []);

  // Sync from Supabase cloud when signed-in user id becomes available
  useEffect(() => {
    if (!session?.user?.id) return;

    syncAllFromSupabase()
      .then((synced) => {
        setBoards(synced.boards);
        setStreak(synced.streak);
      })
      .catch((err) => {
        console.warn("[MOVONE Supabase] Initial mount sync failed:", err);
      });
  }, [session?.user?.id]);

  // Sync every change back to localStorage and update the streak
  useEffect(() => {
    if (!hydrated.current) return;
    saveBoards(boards);
    setStreak(recordCompletion(computeCompletion(boards)));
  }, [boards]);

  const completion = computeCompletion(boards);
  const focusedHours = computeFocusHoursFromBoards(boards);
  const completedCount = useMemo(() => {
    return boards.reduce(
      (sum, b) => sum + b.tasks.filter((t) => t.done).length,
      0,
    );
  }, [boards]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setReplayRequested(false);
  };

  const handleReplayIntro = () => {
    setReplayRequested(true);
    try {
      sessionStorage.removeItem("movone_intro_seen");
    } catch {
      // Ignore storage errors in SSR / private browsing
    }
    setShowIntro(true);
  };

  const handleLogout = async () => {
    await signOutOwner();
  };

  function syncRoadmapChecklistItem(nodeId?: string, checklistItemId?: string, done = false) {
    if (!nodeId || !checklistItemId) return;
    const result = setRoadmapChecklistItemCompletion(nodeId, checklistItemId, done);
    if (result) {
      upsertRoadmapTrackToSupabase(result.updatedTrackId, result.updatedNodes);
    }
  }

  function toggle(boardId: Pillar, taskId: string) {
    let updatedTaskForCloud: Task | null = null;
    let targetTask: Task | null = null;

    setBoards((prev) =>
      prev.map((b) =>
        b.id === boardId
          ? {
              ...b,
              tasks: b.tasks.map((t) => {
                if (t.id === taskId) {
                  targetTask = t;
                  const nextDone = !t.done;
                  const updated: Task = {
                    ...t,
                    done: nextDone,
                    completedAt: nextDone ? new Date().toISOString() : undefined,
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

      // Bidirectional sync with Roadmap checklist
      const taskObj: Task = updatedTaskForCloud;
      if (taskObj.node_id && taskObj.checklist_item_id) {
        syncRoadmapChecklistItem(taskObj.node_id, taskObj.checklist_item_id, taskObj.done);
      }
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
    const savedSecs = task.timerElapsedSeconds || 0;
    setActiveStopwatch({
      task,
      pillar: boardId,
      initialTimerState: {
        startedAt: savedSecs > 0 ? null : Date.now(),
        accumulatedSeconds: savedSecs,
        isRunning: savedSecs > 0 ? false : true,
        mode: "countdown",
      },
    });
  }

  function handleFinishTimerTask(pillar: Pillar, taskId: string, elapsedMinutes: number) {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("movone_active_timer");
      } catch {
        // Ignore storage error
      }
    }
    setActiveStopwatch(null);
    let updatedTaskForCloud: Task | null = null;
    setBoards((prev) =>
      prev.map((b) =>
        b.id === pillar
          ? {
              ...b,
              tasks: b.tasks.map((t) => {
                if (t.id === taskId) {
                  const previouslySavedSecs = t.timerElapsedSeconds || 0;
                  const previouslySavedMins = Math.round(previouslySavedSecs / 60);
                  const deltaMinutes = Math.max(0, elapsedMinutes - previouslySavedMins);
                  const updated: Task = {
                    ...t,
                    done: true,
                    completedAt: t.completedAt || new Date().toISOString(),
                    actualFocusMinutes: (t.actualFocusMinutes || 0) + deltaMinutes,
                    timerElapsedSeconds: 0,
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

      // Bidirectional sync with Roadmap checklist
      const taskObj: Task = updatedTaskForCloud;
      if (taskObj.node_id && taskObj.checklist_item_id) {
        syncRoadmapChecklistItem(taskObj.node_id, taskObj.checklist_item_id, true);
      }
    }
  }

  function handleUpdateFocusMinutes(
    pillar: Pillar,
    taskId: string,
    _elapsedMinutes: number,
    newElapsedSeconds?: number,
  ) {
    let updatedTaskForCloud: Task | null = null;
    setBoards((prev) =>
      prev.map((b) =>
        b.id === pillar
          ? {
              ...b,
              tasks: b.tasks.map((t) => {
                if (t.id === taskId) {
                  const nextElapsedSecs =
                    typeof newElapsedSeconds === "number"
                      ? newElapsedSeconds
                      : t.timerElapsedSeconds || 0;
                  const previouslySavedSecs = t.timerElapsedSeconds || 0;
                  const deltaMins =
                    Math.round(nextElapsedSecs / 60) - Math.round(previouslySavedSecs / 60);

                  const updated: Task = {
                    ...t,
                    actualFocusMinutes: Math.max(0, (t.actualFocusMinutes || 0) + deltaMins),
                    timerElapsedSeconds: nextElapsedSecs,
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

  function handleResetProgress(pillar: Pillar, taskId: string) {
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
                    timerElapsedSeconds: 0,
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

    // If task was already completed or updated, sync linked roadmap item
    if (draft.task.node_id && draft.task.checklist_item_id) {
      syncRoadmapChecklistItem(
        draft.task.node_id,
        draft.task.checklist_item_id,
        draft.task.done,
      );
    }
  }

  function remove(boardId: Pillar, taskId: string) {
    let taskToRemove: Task | null = null;
    setBoards((prev) =>
      prev.map((b) => {
        if (b.id === boardId) {
          taskToRemove = b.tasks.find((t) => t.id === taskId) || null;
          return { ...b, tasks: b.tasks.filter((t) => t.id !== taskId) };
        }
        return b;
      }),
    );

    deleteTaskFromSupabase(taskId);

    // If removing a linked task that was completed, revert checklist item completion
    const linkedTask: Task | null = taskToRemove;
    if (linkedTask && linkedTask.node_id && linkedTask.checklist_item_id) {
      syncRoadmapChecklistItem(
        linkedTask.node_id,
        linkedTask.checklist_item_id,
        false,
      );
    }

    setDialogOpen(false);
  }

  if (!ready) {
    return <div className="fixed inset-0 bg-[#06080E]" />;
  }

  const isAuth = Boolean(session);
  const shouldRenderIntro = !isAuth || showIntro;

  return (
    <div className="relative min-h-screen bg-transparent text-foreground flex flex-col overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* IntroScreen at stable position in element tree */}
      {shouldRenderIntro && (
        <IntroScreen
          key="movone-intro"
          isSignedIn={isAuth}
          replay={replayRequested}
          onComplete={handleIntroComplete}
        />
      )}

      {isAuth && (
        <>
          <div className="relative z-0 flex min-w-0 flex-1 flex-col">
            <DashHeader
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onReplayIntro={handleReplayIntro}
              onLogout={handleLogout}
              syncStatus={syncStatus}
            />

            <main className="flex-1 w-full max-w-[1720px] mx-auto space-y-4 px-4 pt-4 pb-24 sm:px-6 lg:pl-24 lg:pr-24 xl:pl-28 xl:pr-28 lg:pb-12">
              {activeTab === "today" && (
                <>
                  <div className="flex items-center justify-between gap-3 pb-1 border-b border-white/[0.07]">
                    <div className="flex items-center gap-2.5">
                      <span className="size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff] animate-pulse" />
                      <h2 className="font-mono text-xs font-bold tracking-widest text-cyan-300 uppercase">
                        Today
                      </h2>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider hidden sm:inline">
                      Your tracks and goals
                    </span>
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

          {/* Floating Tactical Chronometer Dock on Left Gutter */}
          <TacticalChronometerDock
            isTodayTab={activeTab === "today"}
            completedCount={completedCount}
            isCompletedPanelOpen={isCompletedPanelOpen}
            onToggleCompletedPanel={() => setIsCompletedPanelOpen((prev) => !prev)}
          />

          {/* Slide-in Completed Tasks Panel */}
          <CompletedPanel
            open={isCompletedPanelOpen}
            onClose={() => setIsCompletedPanelOpen(false)}
            boards={boards}
            onToggleTask={toggle}
          />

          {/* Floating Tactical Quick Links Dock on Right Gutter */}
          <TacticalQuickDock />

          <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Task Creation & Edit Modal */}
          <ObjectiveDialog
            open={dialogOpen}
            mode={mode}
            initialPillar={activePillar}
            initialTask={activeTask}
            allActiveTasks={boards.flatMap((b) => b.tasks)}
            onOpenChange={setDialogOpen}
            onSubmit={submit}
            onDelete={remove}
          />

          {/* Floating / Full Tactical Focus Stopwatch */}
          {activeStopwatch && (
            <TaskStopwatchModal
              task={
                boards
                  .find((b) => b.id === activeStopwatch.pillar)
                  ?.tasks.find((t) => t.id === activeStopwatch.task.id) || activeStopwatch.task
              }
              pillar={activeStopwatch.pillar}
              initialTimerState={activeStopwatch.initialTimerState}
              onClose={() => {
                if (typeof window !== "undefined") {
                  try {
                    localStorage.removeItem("movone_active_timer");
                  } catch {
                    // Ignore storage error
                  }
                }
                setActiveStopwatch(null);
              }}
              onFinishTask={handleFinishTimerTask}
              onUpdateFocusMinutes={handleUpdateFocusMinutes}
              onResetProgress={handleResetProgress}
            />
          )}
        </>
      )}
    </div>
  );
}
