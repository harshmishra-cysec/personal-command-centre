import { BOARDS, type Board, type Task } from "@/lib/dash-data";

const TASKS_KEY = "pcc_tasks";
const HISTORY_KEY = "pcc_history";
const VISITED_INTRO_KEY = "pcc_intro_seen";

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
  const done = Boolean(rawTask.done);
  const actualFocusMinutes =
    typeof rawTask.actualFocusMinutes === "number" ? rawTask.actualFocusMinutes : done ? 45 : 0;

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

/** Read persisted boards; falls back to the default mock boards. */
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

/** Persist the full boards/tasks array. */
export function saveBoards(boards: Board[]) {
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

/** Intro screen seen flag in sessionStorage */
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
