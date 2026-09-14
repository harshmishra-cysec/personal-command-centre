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

export function getSyncStatus(): SyncStatus {
  return currentSyncStatus;
}

export function setSyncStatus(status: SyncStatus): void {
  currentSyncStatus = status;
  syncListeners.forEach((fn) => fn(status));
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
  return {
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
}

export function fromSupabaseTaskPayload(row: Record<string, unknown>): Task {
  const isDone = Boolean(row.completed ?? row.done);
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
    durationMinutes: Number(row.duration_minutes ?? row.durationMinutes ?? 45),
    actualFocusMinutes: Number(
      row.actual_focus_minutes ?? row.actualFocusMinutes ?? (isDone ? 45 : 0),
    ),
    slot: typeof row.slot === "string" ? row.slot : undefined,
    date: typeof row.date === "string" ? row.date : undefined,
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
      console.warn("[PCC Supabase] Tasks sync error, falling back to local:", taskError);
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
      console.warn("[PCC Supabase] Roadmaps sync error, falling back to local:", roadmapError);
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
      console.warn("[PCC Supabase] User stats sync error, falling back to local:", statsError);
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
    console.warn("[PCC Supabase] Cloud sync error, graceful fallback to local storage:", err);
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
      console.warn("[PCC Supabase] Failed to insert task row:", error);
      setSyncStatus("offline");
    } else {
      setSyncStatus("synced");
    }
  } catch (err) {
    console.warn("[PCC Supabase] Exception inserting task:", err);
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
      console.warn("[PCC Supabase] Failed to update task row:", error);
      setSyncStatus("offline");
    } else {
      setSyncStatus("synced");
    }
  } catch (err) {
    console.warn("[PCC Supabase] Exception updating task row:", err);
    setSyncStatus("offline");
  }
}

/** Delete a task row by ID in Supabase */
export async function deleteTaskFromSupabase(taskId: string): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);
    if (error) {
      console.warn("[PCC Supabase] Failed to delete task row:", error);
      setSyncStatus("offline");
    } else {
      setSyncStatus("synced");
    }
  } catch (err) {
    console.warn("[PCC Supabase] Exception deleting task row:", err);
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
    console.warn("[PCC Supabase] Exception upserting roadmap track:", err);
    setSyncStatus("offline");
  }
}

/** Persist streak and dopamine intercept counters to user_stats table */
export async function persistUserStatsToSupabase(
  streak: number,
  intercepts: number,
  history?: Record<string, number>,
): Promise<void> {
  if (!isSupabaseConfigured) return;
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
      console.warn("[PCC Supabase] Failed to persist user stats:", error);
      setSyncStatus("offline");
    } else {
      setSyncStatus("synced");
    }
  } catch (err) {
    console.warn("[PCC Supabase] Exception persisting user stats:", err);
    setSyncStatus("offline");
  }
}
