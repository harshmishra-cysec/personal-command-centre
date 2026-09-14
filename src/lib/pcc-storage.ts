import { useEffect } from "react";
import { BOARDS, type Board, type Pillar, type Task } from "@/lib/dash-data";
import {
  DEFAULT_ROADMAPS,
  loadRoadmaps,
  saveRoadmaps,
  type RoadmapNode,
  type TrackId,
  type TrackRoadmap,
} from "@/lib/roadmap-data";
import { loadInterceptsCount, saveInterceptsCount } from "@/lib/reality-data";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const TASKS_KEY = "pcc_tasks";
const HISTORY_KEY = "pcc_history";
const VISITED_INTRO_KEY = "pcc_intro_seen";

export type SyncStatus = "synced" | "offline" | "syncing";

type SyncListener = (status: SyncStatus) => void;
const syncListeners = new Set<SyncListener>();

let currentSyncStatus: SyncStatus = isSupabaseConfigured ? "syncing" : "offline";
let pulseTimeout: ReturnType<typeof setTimeout> | null = null;

export function getSyncStatus(): SyncStatus {
  return currentSyncStatus;
}

export function setSyncStatus(status: SyncStatus): void {
  currentSyncStatus = status;
  syncListeners.forEach((fn) => fn(status));
}

/** Brief 400ms pulse to indicate an inbound realtime sync event before reverting to steady state */
export function triggerSyncPulse(durationMs = 400): void {
  if (pulseTimeout) {
    clearTimeout(pulseTimeout);
  }
  setSyncStatus("syncing");
  pulseTimeout = setTimeout(() => {
    setSyncStatus(isSupabaseConfigured ? "synced" : "offline");
    pulseTimeout = null;
  }, durationMs);
}

export function subscribeSyncStatus(listener: SyncListener): () => void {
  syncListeners.add(listener);
  listener(currentSyncStatus);
  return () => {
    syncListeners.delete(listener);
  };
}

if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    if (isSupabaseConfigured) {
      setSyncStatus("syncing");
      syncAllFromSupabase().catch(() => setSyncStatus("offline"));
    }
  });
  window.addEventListener("offline", () => {
    setSyncStatus("offline");
  });
}

function normalizeTask(rawTask: Record<string, unknown>): Task {
  const id =
    typeof rawTask.id === "string"
      ? rawTask.id
      : `task-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const tag = typeof rawTask.tag === "string" ? rawTask.tag : "STUDY";
  const title = typeof rawTask.title === "string" ? rawTask.title : "Untitled Objective";
  const description = typeof rawTask.description === "string" ? rawTask.description : undefined;
  const priority =
    rawTask.priority === "critical" || rawTask.priority === "normal" || rawTask.priority === "low"
      ? rawTask.priority
      : "normal";
  const durationMinutes =
    typeof rawTask.durationMinutes === "number" && rawTask.durationMinutes > 0
      ? rawTask.durationMinutes
      : 45;
  const done = Boolean(rawTask.done || rawTask.completed);
  const actualFocusMinutes =
    typeof rawTask.actualFocusMinutes === "number"
      ? rawTask.actualFocusMinutes
      : typeof rawTask.actual_focus_minutes === "number"
        ? rawTask.actual_focus_minutes
        : done
          ? durationMinutes
          : 0;

  return {
    id,
    tag,
    title,
    description,
    priority,
    durationMinutes,
    actualFocusMinutes,
    slot: typeof rawTask.slot === "string" ? rawTask.slot : undefined,
    date: typeof rawTask.date === "string" ? rawTask.date : undefined,
    done,
    node_id:
      typeof rawTask.node_id === "string"
        ? rawTask.node_id
        : typeof rawTask.nodeId === "string"
          ? rawTask.nodeId
          : undefined,
    checklist_item_id:
      typeof rawTask.checklist_item_id === "string"
        ? rawTask.checklist_item_id
        : typeof rawTask.checklistItemId === "string"
          ? rawTask.checklistItemId
          : undefined,
  };
}

function isBoardArray(value: unknown): value is Board[] {
  return (
    Array.isArray(value) &&
    value.every(
      (b) =>
        b &&
        typeof b === "object" &&
        typeof (b as Board).id === "string" &&
        Array.isArray((b as Board).tasks),
    )
  );
}

/** Read persisted boards from localStorage; falls back to default boards. */
export function loadBoards(): Board[] {
  try {
    const raw = window.localStorage.getItem(TASKS_KEY);
    if (!raw) return BOARDS;
    const parsed: unknown = JSON.parse(raw);
    if (isBoardArray(parsed)) {
      // Check if it only contains the legacy mock tasks (c1, c2, c3, c4, c5, a1... m3)
      const allTaskIds = parsed.flatMap((b) => b.tasks.map((t) => t.id));
      const legacyMockIds = new Set([
        "c1",
        "c2",
        "c3",
        "c4",
        "c5",
        "a1",
        "a2",
        "a3",
        "a4",
        "m1",
        "m2",
        "m3",
      ]);
      const hasOnlyLegacyMock =
        allTaskIds.length > 0 && allTaskIds.every((id) => legacyMockIds.has(id));
      if (hasOnlyLegacyMock) {
        saveBoards(BOARDS);
        return BOARDS;
      }

      return parsed.map((board) => ({
        ...board,
        tasks: board.tasks.map(normalizeTask),
      }));
    }
    return BOARDS;
  } catch {
    return BOARDS;
  }
}

/** Persist the full boards/tasks array to localStorage. */
export function saveBoards(boards: Board[]): void {
  try {
    window.localStorage.setItem(TASKS_KEY, JSON.stringify(boards));
  } catch {
    // storage unavailable
  }
}

function todayKey(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return d.toISOString().slice(0, 10);
}

export function recordCompletion(completion: number): number {
  let history: Record<string, number> = {};
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        history = parsed as Record<string, number>;
      }
    }
  } catch {
    history = {};
  }

  history[todayKey()] = completion;
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // ignore
  }

  let streak = 0;
  let offset = (history[todayKey()] ?? 0) > 0 ? 0 : 1;
  while ((history[todayKey(offset)] ?? 0) > 0) {
    streak += 1;
    offset += 1;
  }

  // Persist to Supabase if connected
  if (isSupabaseConfigured) {
    persistUserStatsToSupabase(streak, loadInterceptsCount(), history).catch(() => {});
  }

  return streak;
}

export function readStreak(): number {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return 0;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return 0;
    const history = parsed as Record<string, number>;
    let streak = 0;
    let offset = (history[todayKey()] ?? 0) > 0 ? 0 : 1;
    while ((history[todayKey(offset)] ?? 0) > 0) {
      streak += 1;
      offset += 1;
    }
    return streak;
  } catch {
    return 0;
  }
}

export function hasSeenIntro(): boolean {
  try {
    return window.sessionStorage.getItem(VISITED_INTRO_KEY) === "true";
  } catch {
    return false;
  }
}

export function markIntroSeen(): void {
  try {
    window.sessionStorage.setItem(VISITED_INTRO_KEY, "true");
  } catch {
    // ignore
  }
}

export function resetIntroSeen(): void {
  try {
    window.sessionStorage.removeItem(VISITED_INTRO_KEY);
  } catch {
    // ignore
  }
}

/* =========================================================================
   SUPABASE CLOUD SYNC & CRUD OPERATIONS
   ========================================================================= */

export function toSupabaseTaskPayload(task: Task, pillar: Pillar): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    id: task.id,
    title: task.title,
    tag: task.tag,
    description: task.description || null,
    priority: task.priority,
    completed: task.done,
    duration_minutes: task.durationMinutes ?? 45,
    actual_focus_minutes: task.actualFocusMinutes ?? 0,
    pillar: pillar,
    slot: task.slot || null,
    date: task.date || null,
  };
  if (task.node_id) {
    payload.node_id = task.node_id;
  }
  if (task.checklist_item_id) {
    payload.checklist_item_id = task.checklist_item_id;
  }
  return payload;
}

export function getTaskPillar(row: Record<string, unknown>, fallback: Pillar = "cyber"): Pillar {
  const val = String(row.pillar || row.board_id || row.pillar_id || "").toLowerCase();
  if (val === "cyber" || val === "academics" || val === "aiml") {
    return val as Pillar;
  }
  return fallback;
}

export function fromSupabaseTaskPayload(row: Record<string, unknown>): Task {
  const isDone =
    row.completed !== undefined
      ? Boolean(row.completed)
      : row.done !== undefined
        ? Boolean(row.done)
        : row.status === "completed" || row.status === "done";

  const durationMinutes =
    typeof row.duration_minutes === "number" && row.duration_minutes > 0
      ? row.duration_minutes
      : typeof row.durationMinutes === "number" && row.durationMinutes > 0
        ? row.durationMinutes
        : 45;

  const actualFocusMinutes =
    typeof row.actual_focus_minutes === "number"
      ? row.actual_focus_minutes
      : typeof row.actualFocusMinutes === "number"
        ? row.actualFocusMinutes
        : isDone
          ? durationMinutes
          : 0;

  const node_id =
    typeof row.node_id === "string"
      ? row.node_id
      : typeof row.nodeId === "string"
        ? row.nodeId
        : undefined;
  const checklist_item_id =
    typeof row.checklist_item_id === "string"
      ? row.checklist_item_id
      : typeof row.checklistItemId === "string"
        ? row.checklistItemId
        : undefined;

  return {
    id: String(row.id),
    title: String(row.title || "Untitled Objective"),
    tag: String(row.tag || "STUDY"),
    description: typeof row.description === "string" ? row.description : undefined,
    priority:
      row.priority === "critical" || row.priority === "low" || row.priority === "normal"
        ? row.priority
        : "normal",
    done: isDone,
    durationMinutes,
    actualFocusMinutes,
    slot: typeof row.slot === "string" ? row.slot : undefined,
    date: typeof row.date === "string" ? row.date : undefined,
    node_id,
    checklist_item_id,
  };
}

export interface SyncedCloudData {
  boards: Board[];
  roadmaps: Record<TrackId, TrackRoadmap>;
  streak: number;
  intercepts: number;
  isCloud: boolean;
}

/**
 * Sync all active tasks, roadmap nodes, and user stats from Supabase.
 * - If Supabase returns empty rows (first launch), seeds with default state / localStorage.
 * - Gracefully falls back to localStorage if offline or network fails.
 */
export async function syncAllFromSupabase(): Promise<SyncedCloudData> {
  if (!isSupabaseConfigured || (typeof navigator !== "undefined" && !navigator.onLine)) {
    setSyncStatus("offline");
    return {
      boards: loadBoards(),
      roadmaps: loadRoadmaps(),
      streak: readStreak(),
      intercepts: loadInterceptsCount(),
      isCloud: false,
    };
  }

  setSyncStatus("syncing");

  try {
    // 1. Fetch / Seed Tasks
    let finalBoards = loadBoards();
    try {
      const { data: taskRows, error: taskErr } = await supabase.from("tasks").select("*");
      if (taskErr) throw taskErr;

      if (!taskRows || taskRows.length === 0) {
        // First launch: seed Supabase from local boards
        const seedRows = finalBoards.flatMap((board) =>
          board.tasks.map((task) => toSupabaseTaskPayload(task, board.id)),
        );
        if (seedRows.length > 0) {
          await supabase.from("tasks").insert(seedRows);
        }
      } else {
        finalBoards = BOARDS.map((board) => {
          const matchingTasks = (taskRows as Record<string, unknown>[])
            .filter((row) => (row.pillar || row.board_id) === board.id)
            .map(fromSupabaseTaskPayload);

          return {
            ...board,
            tasks: matchingTasks.length > 0 ? matchingTasks : [],
          };
        });
        saveBoards(finalBoards);
      }
    } catch (taskError) {
      console.warn("[REDFOX Supabase] Tasks sync error, falling back to local:", taskError);
    }

    // 2. Fetch / Seed Roadmaps
    let finalRoadmaps = loadRoadmaps();
    try {
      const { data: roadmapRows, error: roadErr } = await supabase.from("roadmaps").select("*");
      if (roadErr) throw roadErr;

      if (!roadmapRows || roadmapRows.length === 0) {
        // First launch: seed Supabase with DEFAULT_ROADMAPS
        const tracks: TrackId[] = ["cyber", "academics", "aiml"];
        const seedRoadmapRows = tracks.map((trackId) => ({
          id: trackId,
          track: trackId,
          track_id: trackId,
          nodes: finalRoadmaps[trackId]?.nodes || DEFAULT_ROADMAPS[trackId].nodes,
          updated_at: new Date().toISOString(),
        }));
        await supabase.from("roadmaps").upsert(seedRoadmapRows, { onConflict: "id" });
      } else {
        const nextRoadmaps: Record<TrackId, TrackRoadmap> = { ...finalRoadmaps };
        (roadmapRows as Record<string, unknown>[]).forEach((row) => {
          const trackKey = (row.track_id || row.track || row.id) as TrackId;
          if (trackKey && nextRoadmaps[trackKey] && Array.isArray(row.nodes)) {
            nextRoadmaps[trackKey] = {
              ...nextRoadmaps[trackKey],
              nodes: row.nodes as RoadmapNode[],
            };
          }
        });
        finalRoadmaps = nextRoadmaps;
        saveRoadmaps(finalRoadmaps);
      }
    } catch (roadmapError) {
      console.warn("[REDFOX Supabase] Roadmaps sync error, falling back to local:", roadmapError);
    }

    // 3. Fetch / Seed User Stats
    let finalStreak = readStreak();
    let finalIntercepts = loadInterceptsCount();
    try {
      const { data: statsRows, error: statsErr } = await supabase
        .from("user_stats")
        .select("*")
        .limit(1);
      if (statsErr) throw statsErr;

      if (!statsRows || statsRows.length === 0) {
        await supabase.from("user_stats").upsert({
          id: "default",
          streak: finalStreak,
          intercepts: finalIntercepts,
          updated_at: new Date().toISOString(),
        });
      } else {
        const row = statsRows[0] as Record<string, unknown>;
        if (typeof row.streak === "number") finalStreak = row.streak;
        if (typeof row.intercepts === "number") {
          finalIntercepts = row.intercepts;
          saveInterceptsCount(finalIntercepts);
        }
      }
    } catch (statsError) {
      console.warn("[REDFOX Supabase] User stats sync error, falling back to local:", statsError);
    }

    setSyncStatus("synced");
    return {
      boards: finalBoards,
      roadmaps: finalRoadmaps,
      streak: finalStreak,
      intercepts: finalIntercepts,
      isCloud: true,
    };
  } catch (err) {
    console.warn("[REDFOX Supabase] Cloud sync error, graceful fallback to local storage:", err);
    setSyncStatus("offline");
    return {
      boards: loadBoards(),
      roadmaps: loadRoadmaps(),
      streak: readStreak(),
      intercepts: loadInterceptsCount(),
      isCloud: false,
    };
  }
}

/** Insert a newly created task into Supabase tasks table */
export async function insertTaskToSupabase(task: Task, pillar: Pillar): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    const payload = toSupabaseTaskPayload(task, pillar);
    const { error } = await supabase.from("tasks").insert(payload);
    if (error) {
      console.warn("[REDFOX Supabase] Failed to insert task row:", error);
      setSyncStatus("offline");
    } else {
      setSyncStatus("synced");
    }
  } catch (err) {
    console.warn("[REDFOX Supabase] Exception inserting task:", err);
    setSyncStatus("offline");
  }
}

/** Update an existing task row in Supabase (`completed`, `duration_minutes`, etc.) */
export async function updateTaskInSupabase(task: Task, pillar?: Pillar): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    const updatePayload: Record<string, unknown> = {
      title: task.title,
      tag: task.tag,
      description: task.description || null,
      priority: task.priority,
      completed: task.done,
      duration_minutes: task.durationMinutes ?? 45,
      actual_focus_minutes: task.actualFocusMinutes ?? 0,
      slot: task.slot || null,
      date: task.date || null,
    };
    if (pillar) {
      updatePayload.pillar = pillar;
    }

    const { error } = await supabase.from("tasks").update(updatePayload).eq("id", task.id);
    if (error) {
      console.warn("[REDFOX Supabase] Failed to update task row:", error);
      setSyncStatus("offline");
    } else {
      setSyncStatus("synced");
    }
  } catch (err) {
    console.warn("[REDFOX Supabase] Exception updating task row:", err);
    setSyncStatus("offline");
  }
}

/** Delete a task row by ID in Supabase */
export async function deleteTaskFromSupabase(taskId: string): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);
    if (error) {
      console.warn("[REDFOX Supabase] Failed to delete task row:", error);
      setSyncStatus("offline");
    } else {
      setSyncStatus("synced");
    }
  } catch (err) {
    console.warn("[REDFOX Supabase] Exception deleting task row:", err);
    setSyncStatus("offline");
  }
}

/** Upsert modified roadmap nodes for a track to the Supabase roadmaps table */
export async function upsertRoadmapTrackToSupabase(
  trackId: TrackId,
  nodes: RoadmapNode[],
): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    const payload = {
      id: trackId,
      track: trackId,
      track_id: trackId,
      nodes: nodes,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("roadmaps").upsert(payload, { onConflict: "id" });
    if (error) {
      await supabase.from("roadmaps").upsert({
        track_id: trackId,
        nodes: nodes,
        updated_at: new Date().toISOString(),
      });
    }
    setSyncStatus("synced");
  } catch (err) {
    console.warn("[REDFOX Supabase] Exception upserting roadmap track:", err);
    setSyncStatus("offline");
  }
}

/** Persist streak and dopamine intercept counters to user_stats table */
let lastPersistedStats: { streak: number; intercepts: number } | null = null;

export async function persistUserStatsToSupabase(
  streak: number,
  intercepts: number,
  history?: Record<string, number>,
): Promise<void> {
  if (!isSupabaseConfigured) return;
  if (
    lastPersistedStats &&
    lastPersistedStats.streak === streak &&
    lastPersistedStats.intercepts === intercepts &&
    !history
  ) {
    return;
  }
  lastPersistedStats = { streak, intercepts };
  try {
    const payload: Record<string, unknown> = {
      id: "default",
      streak,
      intercepts,
      updated_at: new Date().toISOString(),
    };
    if (history) {
      payload.history = history;
    }
    const { error } = await supabase.from("user_stats").upsert(payload, { onConflict: "id" });
    if (error) {
      console.warn("[REDFOX Supabase] Failed to persist user stats:", error);
      setSyncStatus("offline");
    } else {
      setSyncStatus("synced");
    }
  } catch (err) {
    console.warn("[REDFOX Supabase] Exception persisting user stats:", err);
    setSyncStatus("offline");
  }
}

/* =========================================================================
   SUPABASE REALTIME (ZERO-REFRESH INSTANT SYNC)
   ========================================================================= */

export interface PccRealtimeCallbacks {
  onTaskInsert?: (task: Task, pillar: Pillar) => void;
  onTaskUpdate?: (task: Task, pillar: Pillar) => void;
  onTaskDelete?: (taskId: string) => void;
  onRoadmapUpdate?: (trackId: TrackId, nodes: RoadmapNode[]) => void;
  onUserStatsUpdate?: (stats: { streak?: number; intercepts?: number }) => void;
}

/**
 * Subscribes to Supabase Realtime 'postgres_changes' on tasks, roadmaps, and user_stats.
 * Uses a timestamped unique channel name to prevent collision.
 * Returns an unsubscribe callback that tears down the channel via supabase.removeChannel(channel).
 */
export function subscribePccRealtime(callbacks?: PccRealtimeCallbacks): () => void {
  if (!isSupabaseConfigured) {
    return () => {};
  }

  let isMounted = true;
  const channel = supabase
    .channel(`pcc-tasks-sync-${Date.now()}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, (payload) => {
      if (!isMounted) return;
      triggerSyncPulse(400);
      const eventType = payload.eventType;
      if (eventType === "INSERT" && payload.new) {
        const row = payload.new as Record<string, unknown>;
        const task = fromSupabaseTaskPayload(row);
        const pillar = getTaskPillar(row);
        callbacks?.onTaskInsert?.(task, pillar);
      } else if (eventType === "UPDATE" && payload.new) {
        const row = payload.new as Record<string, unknown>;
        const task = fromSupabaseTaskPayload(row);
        const pillar = getTaskPillar(row);
        callbacks?.onTaskUpdate?.(task, pillar);
      } else if (eventType === "DELETE" && (payload.old || payload.new)) {
        const row = (payload.old || payload.new) as Record<string, unknown>;
        const deletedId = String(row.id || (payload.old as Record<string, unknown>)?.id || "");
        if (deletedId) {
          callbacks?.onTaskDelete?.(deletedId);
        }
      }
    })
    .on("postgres_changes", { event: "*", schema: "public", table: "roadmaps" }, (payload) => {
      if (!isMounted) return;
      triggerSyncPulse(400);
      if (payload.new) {
        const row = payload.new as Record<string, unknown>;
        const trackId = (row.track_id || row.track || row.id) as TrackId;
        if (
          (trackId === "cyber" || trackId === "academics" || trackId === "aiml") &&
          Array.isArray(row.nodes)
        ) {
          callbacks?.onRoadmapUpdate?.(trackId, row.nodes as RoadmapNode[]);
        }
      }
    })
    .on("postgres_changes", { event: "*", schema: "public", table: "user_stats" }, (payload) => {
      if (!isMounted) return;
      triggerSyncPulse(400);
      if (payload.new) {
        const row = payload.new as Record<string, unknown>;
        const stats: { streak?: number; intercepts?: number } = {};
        if (typeof row.streak === "number") stats.streak = row.streak;
        if (typeof row.intercepts === "number") stats.intercepts = row.intercepts;
        callbacks?.onUserStatsUpdate?.(stats);
      }
    })
    .subscribe((status) => {
      if (status === "SUBSCRIBED") {
        setSyncStatus("synced");
      } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        setSyncStatus("offline");
      }
    });

  return () => {
    isMounted = false;
    supabase.removeChannel(channel);
  };
}

/**
 * Direct Realtime Hook for components managing a flat Task[] state array.
 * Sets up a listener on mount with timestamped channel and clean teardown.
 */
export function useTasksRealtime(setTasks: React.Dispatch<React.SetStateAction<Task[]>>): void {
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let isMounted = true;
    const channel = supabase
      .channel(`pcc-tasks-sync-${Date.now()}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, (payload) => {
        if (!isMounted) return;
        triggerSyncPulse(400);
        if (payload.eventType === "INSERT") {
          const raw = payload.new as Record<string, unknown>;
          const formatted = fromSupabaseTaskPayload(raw);
          const incoming = { ...formatted, ...(payload.new as Task) };
          setTasks((prev) => {
            if (prev.some((t) => t.id === incoming.id)) return prev;
            return [...prev, incoming];
          });
        } else if (payload.eventType === "UPDATE") {
          const raw = payload.new as Record<string, unknown>;
          const formatted = fromSupabaseTaskPayload(raw);
          const incoming = { ...formatted, ...(payload.new as Task) };
          setTasks((prev) => prev.map((t) => (t.id === incoming.id ? { ...t, ...incoming } : t)));
        } else if (payload.eventType === "DELETE") {
          const raw = (payload.old || payload.new) as Record<string, unknown>;
          const targetId = String(raw?.id || (payload.old as Record<string, unknown>)?.id || "");
          if (targetId) {
            setTasks((prev) => prev.filter((t) => t.id !== targetId));
          }
        }
      })
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [setTasks]);
}

/**
 * Core React Hook for zero-refresh instant synchronization of Dashboard Boards & User Stats.
 * Handles task inserts, task updates, task deletions, roadmap track updates, and streak/intercepts.
 * Ensures clean channel teardown on component unmount.
 */
export function usePccRealtime({
  setBoards,
  setStreak,
}: {
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
  setStreak?: React.Dispatch<React.SetStateAction<number>>;
}): void {
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let isMounted = true;

    const channel = supabase
      .channel(`pcc-tasks-sync-${Date.now()}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, (payload) => {
        if (!isMounted) return;
        triggerSyncPulse(400);

        if (payload.eventType === "INSERT") {
          const raw = payload.new as Record<string, unknown>;
          const newTask = fromSupabaseTaskPayload(raw);
          const pillar = getTaskPillar(raw);

          setBoards((prevBoards) => {
            // Idempotency: guard against duplicate task IDs
            const alreadyExists = prevBoards.some((b) => b.tasks.some((t) => t.id === newTask.id));
            if (alreadyExists) return prevBoards;

            const nextBoards = prevBoards.map((b) =>
              b.id === pillar
                ? {
                    ...b,
                    tasks: [...b.tasks, newTask],
                  }
                : b,
            );
            saveBoards(nextBoards);
            return nextBoards;
          });
        } else if (payload.eventType === "UPDATE") {
          const raw = payload.new as Record<string, unknown>;
          const updatedTask = fromSupabaseTaskPayload(raw);
          const pillar = getTaskPillar(raw);

          setBoards((prevBoards) => {
            let originPillar: Pillar | null = null;
            for (const b of prevBoards) {
              if (b.tasks.some((t) => t.id === updatedTask.id)) {
                originPillar = b.id;
                break;
              }
            }

            const targetPillar = pillar || originPillar || "cyber";

            let nextBoards: Board[];
            if (originPillar && originPillar !== targetPillar) {
              // Task moved across pillars
              nextBoards = prevBoards.map((b) => {
                if (b.id === originPillar) {
                  return {
                    ...b,
                    tasks: b.tasks.filter((t) => t.id !== updatedTask.id),
                  };
                }
                if (b.id === targetPillar) {
                  return {
                    ...b,
                    tasks: [...b.tasks, updatedTask],
                  };
                }
                return b;
              });
            } else {
              // Same pillar or target pillar
              nextBoards = prevBoards.map((b) => {
                if (b.id === targetPillar) {
                  const taskExists = b.tasks.some((t) => t.id === updatedTask.id);
                  if (taskExists) {
                    return {
                      ...b,
                      tasks: b.tasks.map((t) =>
                        t.id === updatedTask.id
                          ? {
                              ...t,
                              ...updatedTask,
                              ...(payload.new as Task),
                              title: updatedTask.title || t.title,
                              tag: updatedTask.tag || t.tag,
                              description:
                                updatedTask.description !== undefined
                                  ? updatedTask.description
                                  : t.description,
                              priority: updatedTask.priority || t.priority,
                              done: updatedTask.done,
                              durationMinutes: updatedTask.durationMinutes || t.durationMinutes,
                              actualFocusMinutes:
                                updatedTask.actualFocusMinutes !== undefined
                                  ? updatedTask.actualFocusMinutes
                                  : t.actualFocusMinutes,
                              slot: updatedTask.slot !== undefined ? updatedTask.slot : t.slot,
                              date: updatedTask.date !== undefined ? updatedTask.date : t.date,
                            }
                          : t,
                      ),
                    };
                  } else {
                    return {
                      ...b,
                      tasks: [...b.tasks, updatedTask],
                    };
                  }
                }
                return b;
              });
            }

            saveBoards(nextBoards);
            return nextBoards;
          });
        } else if (payload.eventType === "DELETE") {
          const raw = (payload.old || payload.new) as Record<string, unknown>;
          const deletedTaskId = String(
            raw?.id || (payload.old as Record<string, unknown>)?.id || "",
          );
          if (deletedTaskId) {
            setBoards((prevBoards) => {
              const nextBoards = prevBoards.map((b) => ({
                ...b,
                tasks: b.tasks.filter((t) => t.id !== deletedTaskId),
              }));
              saveBoards(nextBoards);
              return nextBoards;
            });
          }
        }
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "roadmaps" }, (payload) => {
        if (!isMounted) return;
        triggerSyncPulse(400);
        if (payload.new) {
          const row = payload.new as Record<string, unknown>;
          const trackId = (row.track_id || row.track || row.id) as TrackId;
          if (
            (trackId === "cyber" || trackId === "academics" || trackId === "aiml") &&
            Array.isArray(row.nodes)
          ) {
            const currentRoadmaps = loadRoadmaps();
            if (currentRoadmaps[trackId]) {
              const nextRoadmaps = {
                ...currentRoadmaps,
                [trackId]: {
                  ...currentRoadmaps[trackId],
                  nodes: row.nodes as RoadmapNode[],
                },
              };
              saveRoadmaps(nextRoadmaps);
              window.dispatchEvent(
                new CustomEvent("pcc-roadmaps-updated", {
                  detail: { trackId, nodes: row.nodes },
                }),
              );
            }
          }
        }
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "user_stats" }, (payload) => {
        if (!isMounted) return;
        triggerSyncPulse(400);
        if (payload.new) {
          const row = payload.new as Record<string, unknown>;
          if (typeof row.streak === "number" && setStreak) {
            setStreak(row.streak);
          }
          if (typeof row.intercepts === "number") {
            saveInterceptsCount(row.intercepts);
            window.dispatchEvent(
              new CustomEvent("pcc-intercepts-updated", {
                detail: row.intercepts,
              }),
            );
          }
        }
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setSyncStatus("synced");
        } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          setSyncStatus("offline");
        }
      });

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [setBoards, setStreak]);
}

/**
 * Permanently purges all user tasks, roadmaps, and telemetry records from Supabase cloud.
 */
export async function purgeSupabaseCloudData(): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    await supabase.from("tasks").delete().neq("id", "___never_match___");
    const tracks: TrackId[] = ["cyber", "academics", "aiml"];
    for (const trackId of tracks) {
      await supabase.from("roadmaps").upsert({
        id: trackId,
        track: trackId,
        track_id: trackId,
        nodes: [],
        updated_at: new Date().toISOString(),
      });
    }
    await supabase.from("user_stats").upsert({
      id: "default",
      streak: 0,
      intercepts: 0,
      history: {},
      updated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn("[REDFOX Supabase] Cloud purge error:", err);
  }
}
