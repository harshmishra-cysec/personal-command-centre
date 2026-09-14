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
  slot?: string | undefined; // Legacy / secondary time label
  date?: string | undefined;
  done: boolean;
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
  cyber: { title: "Cybersecurity Track", subtitle: "Offensive ops · labs · certs" },
  gold: { title: "Academics & Labs", subtitle: "Coursework · deadlines · attendance" },
  emerald: { title: "AIML & Extra", subtitle: "Builds · research · side quests" },
};

export const QUOTES = [
  {
    text: "Dream is not that which you see while sleeping, it is something that does not let you sleep.",
    author: "Dr. A.P.J. Abdul Kalam",
  },
  {
    text: "You have power over your mind — not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
  },
  {
    text: "Excellence is a continuous process and not an accident.",
    author: "Dr. A.P.J. Abdul Kalam",
  },
];

export const BOARDS: Board[] = [
  {
    id: "cyber",
    ...BOARD_META.cyber,
    tasks: [
      {
        id: "c1",
        tag: "ROOM",
        title: "Finish TryHackMe AD room",
        description:
          "Complete the Active Directory attack path: Kerberoasting, AS-REP roasting, then dump NTDS with secretsdump.",
        priority: "critical",
        durationMinutes: 60,
        actualFocusMinutes: 0,
        done: false,
      },
      {
        id: "c2",
        tag: "STUDY",
        title: "Practice Linux PrivEsc",
        description: "SUID binaries, capabilities, cron abuse — GTFOBins drill set.",
        priority: "normal",
        durationMinutes: 45,
        actualFocusMinutes: 45,
        done: true,
      },
      {
        id: "c3",
        tag: "CLASS",
        title: "CySec Lab",
        description: "Lab block 3, room B-204. Bring Kali VM snapshot.",
        priority: "normal",
        durationMinutes: 90,
        actualFocusMinutes: 0,
        done: false,
      },
      {
        id: "c4",
        tag: "READ",
        title: "Review Burp Suite intruder notes",
        description: "Cluster bomb vs pitchfork payload positioning recap.",
        priority: "low",
        durationMinutes: 25,
        actualFocusMinutes: 0,
        done: false,
      },
      {
        id: "c5",
        tag: "BUILD",
        title: "Write up HTB machine report",
        description:
          "Full walkthrough for the retired box incl. CVE-2023-23397 exploitation chain.",
        priority: "critical",
        durationMinutes: 60,
        actualFocusMinutes: 0,
        done: false,
      },
    ],
  },
  {
    id: "gold",
    ...BOARD_META.gold,
    tasks: [
      {
        id: "a1",
        tag: "EXAM",
        title: "OS assignment — scheduling problems",
        description:
          "Chapter 5: SJF, round robin with quantum 4, and priority aging problems 1-12.",
        priority: "critical",
        durationMinutes: 60,
        actualFocusMinutes: 0,
        done: false,
      },
      {
        id: "a2",
        tag: "CLASS",
        title: "Linear Algebra",
        description: "Eigenvalues lecture, hall A-101.",
        priority: "normal",
        durationMinutes: 45,
        actualFocusMinutes: 45,
        done: true,
      },
      {
        id: "a3",
        tag: "LAB",
        title: "AIML sitting",
        description: "Lab record submission — experiments 6 and 7.",
        priority: "normal",
        durationMinutes: 90,
        actualFocusMinutes: 0,
        done: false,
      },
      {
        id: "a4",
        tag: "STUDY",
        title: "DBMS normalization set",
        description: "1NF through BCNF worked examples.",
        priority: "low",
        durationMinutes: 45,
        actualFocusMinutes: 0,
        done: false,
      },
    ],
  },
  {
    id: "emerald",
    ...BOARD_META.emerald,
    tasks: [
      {
        id: "m1",
        tag: "BUILD",
        title: "Train basic CNN model",
        description: "CIFAR-10 baseline, 3 conv blocks, track val accuracy over 20 epochs.",
        priority: "normal",
        durationMinutes: 60,
        actualFocusMinutes: 0,
        done: false,
      },
      {
        id: "m2",
        tag: "READ",
        title: "Research paper abstract — ViT survey",
        description: "Summarize patch embedding + attention scaling takeaways in notes.",
        priority: "low",
        durationMinutes: 30,
        actualFocusMinutes: 0,
        done: false,
      },
      {
        id: "m3",
        tag: "SHIP",
        title: "Push portfolio site update",
        description: "Deploy new projects section and refresh OG images.",
        priority: "critical",
        durationMinutes: 45,
        actualFocusMinutes: 45,
        done: true,
      },
    ],
  },
];
