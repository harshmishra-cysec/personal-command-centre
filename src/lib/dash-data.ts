export type Pillar = "cyber" | "gold" | "emerald";

export type Priority = "critical" | "normal" | "low";

export type Task = {
  id: string;
  tag: string;
  title: string;
  description?: string | undefined;
  priority: Priority;
  durationMinutes: number; // Estimated duration in minutes (default: 45)
  actualFocusMinutes?: number; // Accumulated focus minutes from stopwatch/timer
  timerElapsedSeconds?: number; // Focus seconds already spent in the current unfinished run
  slot?: string | undefined; // Legacy / secondary time label
  date?: string | undefined;
  done: boolean;
  completedAt?: string | undefined;
  node_id?: string | undefined;
  checklist_item_id?: string | undefined;
};

export type Board = {
  id: Pillar;
  title: string;
  subtitle: string;
  tasks: Task[];
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  critical: "CRITICAL",
  normal: "NORMAL",
  low: "LOW PRIORITY",
};

export const TAG_OPTIONS = ["LAB", "EXAM", "STUDY", "BUILD", "ROOM", "CLASS", "SHIP", "READ"];

export const DURATION_PRESETS = [
  { label: "25m", minutes: 25 },
  { label: "45m", minutes: 45 },
  { label: "60m", minutes: 60 },
  { label: "90m", minutes: 90 },
  { label: "120m", minutes: 120 },
];

export function formatDuration(minutes: number): string {
  if (!minutes || minutes <= 0) return "25m";
  if (minutes < 60) return `${minutes}m`;
  const hrs = Math.floor(minutes / 60);
  const rem = minutes % 60;
  return rem > 0 ? `${hrs}h ${rem}m` : `${hrs}h`;
}

export const BOARD_META: Record<Pillar, { title: string; subtitle: string }> = {
  cyber: { title: "Cybersecurity Track", subtitle: "Labs, certs, and practice" },
  gold: { title: "Academics & Labs", subtitle: "Classes, assignments, and exams" },
  emerald: { title: "AIML & Extra", subtitle: "Side projects, research, and builds" },
};

export const QUOTES = [
  {
    text: "Excellence is a continuous process and not an accident.",
    author: "Dr. A.P.J. Abdul Kalam",
    source: "INSPIRATION",
  },
  {
    text: "You have power over your mind — not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    source: "MEDITATIONS",
  },
  {
    text: "The secret is to have courage in the opening, precision in the middle, and ruthlessness in the endgame.",
    author: "Garry Kasparov",
    source: "GRANDMASTER",
  },
  {
    text: "In the midst of chaos, there is also opportunity. Speed is the essence of war.",
    author: "Sun Tzu",
    source: "ART OF WAR",
  },
  {
    text: "I don't believe in psychology. I believe in good moves.",
    author: "Bobby Fischer",
    source: "CHESS",
  },
  {
    text: "Dream is not that which you see while sleeping, it is something that does not let you sleep.",
    author: "Dr. A.P.J. Abdul Kalam",
    source: "VISION",
  },
  {
    text: "Luck is what happens when preparation meets opportunity.",
    author: "Seneca",
    source: "LETTERS",
  },
  {
    text: "Fixation is the way to death. Fluidity is the way to life.",
    author: "Miyamoto Musashi",
    source: "FIVE RINGS",
  },
  {
    text: "Security is a process, not a product. Constant vigilance is the operational baseline.",
    author: "Bruce Schneier",
    source: "SECURITY",
  },
];

export const BOARDS: Board[] = [
  {
    id: "cyber",
    ...BOARD_META.cyber,
    tasks: [],
  },
  {
    id: "gold",
    ...BOARD_META.gold,
    tasks: [],
  },
  {
    id: "emerald",
    ...BOARD_META.emerald,
    tasks: [],
  },
];
