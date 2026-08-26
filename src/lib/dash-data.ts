export type Pillar = "cyber" | "gold" | "emerald";

export type Task = {
  id: string;
  tag: string;
  title: string;
  slot: string;
  done: boolean;
};

export type Board = {
  id: Pillar;
  title: string;
  subtitle: string;
  tasks: Task[];
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
    title: "Cybersecurity Track",
    subtitle: "Offensive ops · labs · certs",
    tasks: [
      { id: "c1", tag: "CRITICAL", title: "Finish TryHackMe AD room", slot: "08:00", done: false },
      { id: "c2", tag: "NORMAL", title: "Practice Linux PrivEsc", slot: "11:30", done: true },
      { id: "c3", tag: "CLASS", title: "CySec Lab", slot: "14:00", done: false },
      { id: "c4", tag: "NORMAL", title: "Review Burp Suite intruder notes", slot: "19:00", done: false },
      { id: "c5", tag: "CRITICAL", title: "Write up HTB machine report", slot: "21:30", done: false },
    ],
  },
  {
    id: "gold",
    title: "Academics & Labs",
    subtitle: "Coursework · deadlines · attendance",
    tasks: [
      { id: "a1", tag: "SUBMIT", title: "OS assignment — scheduling problems", slot: "09:00", done: false },
      { id: "a2", tag: "LECTURE", title: "Linear Algebra", slot: "10:00", done: true },
      { id: "a3", tag: "LAB", title: "AIML sitting", slot: "15:00", done: false },
      { id: "a4", tag: "REVISE", title: "DBMS normalization set", slot: "18:00", done: false },
    ],
  },
  {
    id: "emerald",
    title: "AIML & Extra",
    subtitle: "Builds · research · side quests",
    tasks: [
      { id: "m1", tag: "BUILD", title: "Train basic CNN model", slot: "16:30", done: false },
      { id: "m2", tag: "READ", title: "Research paper abstract — ViT survey", slot: "20:00", done: false },
      { id: "m3", tag: "SHIP", title: "Push portfolio site update", slot: "22:00", done: true },
    ],
  },
];
