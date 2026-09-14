import { loadBoards, saveBoards, purgeSupabaseCloudData } from "@/lib/pcc-storage";
import { loadRoadmaps, saveRoadmaps, DEFAULT_ROADMAPS } from "@/lib/roadmap-data";
import { loadInterceptsCount, saveInterceptsCount } from "@/lib/reality-data";
import { BOARDS, type Board } from "@/lib/dash-data";

export interface DayActivity {
  date: string; // YYYY-MM-DD
  dayLabel: string; // Mon, Tue, etc.
  dayNumber: number;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0=none, 1=low, 2=medium, 3=high, 4=exceptional
}

export interface StatsOverview {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
  currentStreak: number;
  longestStreak: number;
  totalFocusHours: number;
  interceptsCount: number;
  pillarStats: {
    cyber: { total: number; completed: number; rate: number };
    gold: { total: number; completed: number; rate: number };
    emerald: { total: number; completed: number; rate: number };
  };
  priorityStats: {
    critical: { total: number; completed: number };
    normal: { total: number; completed: number };
    low: { total: number; completed: number };
  };
  tagStats: Record<string, { total: number; completed: number }>;
  activityMatrix: DayActivity[];
}

const HISTORY_KEY = "pcc_history";
const LONGEST_STREAK_KEY = "pcc_longest_streak";

function formatDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function loadRawHistory(): Record<string, number> {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, number>;
    }
    return {};
  } catch {
    return {};
  }
}

export function saveRawHistory(history: Record<string, number>): void {
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // ignore
  }
}

export function calculateLongestStreak(
  history: Record<string, number>,
  currentStreak: number,
): number {
  let longest = 0; // True zero baseline
  try {
    const raw = window.localStorage.getItem(LONGEST_STREAK_KEY);
    if (raw) {
      const parsed = parseInt(raw, 10);
      if (!isNaN(parsed) && parsed > longest) longest = parsed;
    }
  } catch {
    // ignore
  }

  // Check if current streak exceeds longest
  if (currentStreak > longest) {
    longest = currentStreak;
    try {
      window.localStorage.setItem(LONGEST_STREAK_KEY, String(longest));
    } catch {
      // ignore
    }
  }

  return longest;
}

export function generate30DayMatrix(history: Record<string, number>): DayActivity[] {
  const result: DayActivity[] = [];
  const today = new Date();

  // Strictly dynamic from real logged completions — no fake seeds
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = formatDateKey(d);

    let count = 0;
    if (key in history) {
      const val = history[key];
      count = typeof val === "number" && val > 0 ? (val > 10 ? Math.round(val / 20) : val) : 0;
    }

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count === 0) level = 0;
    else if (count <= 1) level = 1;
    else if (count <= 2) level = 2;
    else if (count <= 4) level = 3;
    else level = 4;

    result.push({
      date: key,
      dayLabel: d.toLocaleDateString("en-US", { weekday: "short" }),
      dayNumber: d.getDate(),
      count,
      level,
    });
  }

  return result;
}

export function computeFocusHoursFromBoards(boards: Board[]): number {
  let totalMinutes = 0;
  boards.forEach((b) => {
    b.tasks.forEach((t) => {
      if (t.done) {
        const taskMins =
          typeof t.actualFocusMinutes === "number" && t.actualFocusMinutes > 0
            ? t.actualFocusMinutes
            : t.durationMinutes || 0;
        totalMinutes += taskMins;
      } else if (typeof t.actualFocusMinutes === "number" && t.actualFocusMinutes > 0) {
        totalMinutes += t.actualFocusMinutes;
      }
    });
  });

  return Number((totalMinutes / 60).toFixed(1));
}

export function computeStatsOverview(): StatsOverview {
  const boards = loadBoards();
  const roadmaps = loadRoadmaps();
  const rawHistory = loadRawHistory();
  const intercepts = loadInterceptsCount();

  let totalTasks = 0;
  let completedTasks = 0;
  let accumulatedFocusMinutes = 0;

  const pillarStats = {
    cyber: { total: 0, completed: 0, rate: 0 },
    gold: { total: 0, completed: 0, rate: 0 },
    emerald: { total: 0, completed: 0, rate: 0 },
  };

  const priorityStats = {
    critical: { total: 0, completed: 0 },
    normal: { total: 0, completed: 0 },
    low: { total: 0, completed: 0 },
  };

  const tagStats: Record<string, { total: number; completed: number }> = {};

  // Process tasks across Today's boards
  boards.forEach((board) => {
    const pillarKey = board.id;
    board.tasks.forEach((task) => {
      totalTasks += 1;
      if (task.done) {
        completedTasks += 1;
        const mins =
          typeof task.actualFocusMinutes === "number" && task.actualFocusMinutes > 0
            ? task.actualFocusMinutes
            : task.durationMinutes || 0;
        accumulatedFocusMinutes += mins;
      } else if (typeof task.actualFocusMinutes === "number" && task.actualFocusMinutes > 0) {
        accumulatedFocusMinutes += task.actualFocusMinutes;
      }

      // Pillar stats
      if (pillarStats[pillarKey]) {
        pillarStats[pillarKey].total += 1;
        if (task.done) pillarStats[pillarKey].completed += 1;
      }

      // Priority stats
      const prio = task.priority || "normal";
      if (priorityStats[prio]) {
        priorityStats[prio].total += 1;
        if (task.done) priorityStats[prio].completed += 1;
      }

      // Tag stats
      if (task.tag) {
        const tag = task.tag.toUpperCase();
        if (!tagStats[tag]) {
          tagStats[tag] = { total: 0, completed: 0 };
        }
        tagStats[tag].total += 1;
        if (task.done) tagStats[tag].completed += 1;
      }
    });
  });

  // Also include roadmap milestones in total and completed counts
  Object.values(roadmaps).forEach((track) => {
    const pillarKey =
      track.trackId === "cyber" ? "cyber" : track.trackId === "academics" ? "gold" : "emerald";
    track.nodes.forEach((node) => {
      totalTasks += 1;
      const isDone =
        node.status === "completed" ||
        (node.subTasks && node.subTasks.length > 0 && node.subTasks.every((st) => st.completed));
      if (isDone) {
        completedTasks += 1;
      }

      if (pillarStats[pillarKey]) {
        pillarStats[pillarKey].total += 1;
        if (isDone) pillarStats[pillarKey].completed += 1;
      }

      if (node.tags && node.tags.length > 0) {
        node.tags.forEach((t) => {
          const tag = t.toUpperCase();
          if (!tagStats[tag]) {
            tagStats[tag] = { total: 0, completed: 0 };
          }
          tagStats[tag].total += 1;
          if (isDone) tagStats[tag].completed += 1;
        });
      }
    });
  });

  // Calculate pillar completion rates
  (["cyber", "gold", "emerald"] as const).forEach((p) => {
    const stat = pillarStats[p];
    stat.rate = stat.total > 0 ? Math.round((stat.completed / stat.total) * 100) : 0;
  });

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate current streak strictly from actual completion logs
  const today = new Date();
  let currentStreak = 0;
  let offset = 0;
  while (offset < 30) {
    const d = new Date(today);
    d.setDate(d.getDate() - offset);
    const key = formatDateKey(d);
    const count = rawHistory[key] ?? 0;
    if (count > 0) {
      currentStreak += 1;
      offset += 1;
    } else {
      if (offset === 0) {
        // Today has no completions yet; check yesterday to keep unbroken active streak
        offset += 1;
      } else {
        break;
      }
    }
  }

  const longestStreak = calculateLongestStreak(rawHistory, currentStreak);

  // Total Focus Output in hours (default to 0.0 when no focus time is logged)
  const calculatedHours = Number((accumulatedFocusMinutes / 60).toFixed(1));
  const totalFocusHours = calculatedHours;

  const activityMatrix = generate30DayMatrix(rawHistory);

  return {
    totalTasks,
    completedTasks,
    pendingTasks: totalTasks - completedTasks,
    completionRate,
    currentStreak,
    longestStreak,
    totalFocusHours,
    interceptsCount: intercepts,
    pillarStats,
    priorityStats,
    tagStats,
    activityMatrix,
  };
}

export function exportBackupData(): void {
  const exportPayload = {
    version: "2.0.0",
    exportDate: new Date().toISOString(),
    tasks: loadBoards(),
    roadmaps: loadRoadmaps(),
    intercepts: loadInterceptsCount(),
    history: loadRawHistory(),
  };

  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(exportPayload, null, 2),
  )}`;
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", jsonString);
  downloadAnchor.setAttribute(
    "download",
    `pcc-tactical-backup-${new Date().toISOString().slice(0, 10)}.json`,
  );
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function importBackupData(jsonText: string): boolean {
  try {
    const data = JSON.parse(jsonText);
    if (!data || typeof data !== "object") return false;

    if (Array.isArray(data.tasks)) {
      saveBoards(data.tasks);
    }
    if (data.roadmaps && typeof data.roadmaps === "object") {
      saveRoadmaps(data.roadmaps);
    }
    if (typeof data.intercepts === "number") {
      saveInterceptsCount(data.intercepts);
    }
    if (data.history && typeof data.history === "object") {
      saveRawHistory(data.history);
    }
    return true;
  } catch {
    return false;
  }
}

export function purgeAllDataToZero(): void {
  try {
    window.localStorage.removeItem("pcc_tasks");
    window.localStorage.removeItem("pcc_history");
    window.localStorage.removeItem("pcc_roadmaps");
    window.localStorage.removeItem("pcc_intercepts");
    window.localStorage.removeItem("pcc_longest_streak");
    saveBoards(BOARDS);
    saveRoadmaps(DEFAULT_ROADMAPS);
    saveInterceptsCount(0);
    saveRawHistory({});

    // Cloud purge if Supabase is connected
    purgeSupabaseCloudData().catch(() => {});

    // Broadcast local state reset events
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("pcc-intercepts-updated", { detail: 0 }));
      (["cyber", "academics", "aiml"] as const).forEach((trackId) => {
        window.dispatchEvent(
          new CustomEvent("pcc-roadmaps-updated", {
            detail: { trackId, nodes: [] },
          }),
        );
      });
    }
  } catch {
    // ignore
  }
}

export const purgeAllDataToDefaults = purgeAllDataToZero;
