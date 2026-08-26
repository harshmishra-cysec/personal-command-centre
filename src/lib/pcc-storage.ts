import { BOARDS, type Board } from "@/lib/dash-data";

const TASKS_KEY = "pcc_tasks";
const HISTORY_KEY = "pcc_history";

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

/** Read persisted boards; falls back to the default mock boards. */
export function loadBoards(): Board[] {
  try {
    const raw = window.localStorage.getItem(TASKS_KEY);
    if (!raw) return BOARDS;
    const parsed: unknown = JSON.parse(raw);
    return isBoardArray(parsed) ? parsed : BOARDS;
  } catch {
    return BOARDS;
  }
}

/** Persist the full boards/tasks array. */
export function saveBoards(boards: Board[]) {
  try {
    window.localStorage.setItem(TASKS_KEY, JSON.stringify(boards));
  } catch {
    // storage unavailable (private mode, quota) — state still lives in memory
  }
}

function todayKey(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return d.toISOString().slice(0, 10);
}

/**
 * Record today's completion percentage into the daily history log and
 * return the current streak: consecutive days (ending today, or yesterday
 * if today has no completions yet) with at least one completed task.
 */
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
  let offset = history[todayKey()]! > 0 ? 0 : 1; // today still in progress doesn't break the streak
  while ((history[todayKey(offset)] ?? 0) > 0) {
    streak += 1;
    offset += 1;
  }
  return streak;
}

/** Current streak without writing (used on initial load). */
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
