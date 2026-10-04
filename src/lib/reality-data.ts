export interface RealityQuote {
  id: string;
  theme: "family" | "discipline" | "future" | "mastery";
  quote: string;
  subtext: string;
}

export const HARD_TRUTHS: RealityQuote[] = [
  {
    id: "truth-1",
    theme: "discipline",
    quote: "Every hour lost to cheap algorithms delays your independence and security.",
    subtext: "You are trading permanent mastery for 15-second synthetic dopamine loops.",
  },
  {
    id: "truth-2",
    theme: "family",
    quote:
      "Comfort now is debt paid with interest tomorrow by you and the people who depend on you.",
    subtext:
      "Your family's future stability is purchased with the uncomfortable hours you put in right now.",
  },
  {
    id: "truth-3",
    theme: "mastery",
    quote:
      "The top 1% in Cyber, Systems, and AI do not doomscroll. They build when they are tired.",
    subtext:
      "While you scroll, someone else is dissecting the kernel, breaking the AD domain, and training the model.",
  },
  {
    id: "truth-4",
    theme: "future",
    quote:
      "In 3 years, you will either celebrate relentless consistency or mourn wasted potential.",
    subtext:
      "There is no middle ground. The algorithm was designed by PhDs to steal your ambition.",
  },
];

export interface WasteCostOption {
  durationMinutes: number;
  label: string;
  costDescription: string;
  alternateGain: string;
}

export const WASTE_COSTS: WasteCostOption[] = [
  {
    durationMinutes: 15,
    label: "15 Minutes",
    costDescription: "40 to 50 short videos watched with nothing useful remembered.",
    alternateGain: "Work through a lab room or read a couple pages of documentation.",
  },
  {
    durationMinutes: 30,
    label: "30 Minutes",
    costDescription:
      "Brain fog, lost attention span, and going to bed half an hour late.",
    alternateGain: "Solve a medium coding problem or practice hands-on challenges.",
  },
  {
    durationMinutes: 60,
    label: "1 Hour",
    costDescription:
      "Low energy, extra stress, and lost momentum for the rest of the evening.",
    alternateGain:
      "Write a small automation script or study a textbook chapter.",
  },
  {
    durationMinutes: 120,
    label: "2 Hours",
    costDescription:
      "An entire evening lost, plus regret, guilt, and poor sleep.",
    alternateGain:
      "Set up a complete home lab or train a machine learning model.",
  },
];

export interface MicroAction {
  id: string;
  title: string;
  category: "cyber" | "acad" | "aiml" | "general";
  estimatedMinutes: number;
  directive: string;
}

export const DEFAULT_MICRO_ACTIONS: MicroAction[] = [
  {
    id: "act-1",
    title: "Read 3 pages of notes or documentation",
    category: "acad",
    estimatedMinutes: 5,
    directive: "Open your current class or subject notes. Read 3 pages with full attention.",
  },
  {
    id: "act-2",
    title: "Solve 1 small bug or write a short script",
    category: "cyber",
    estimatedMinutes: 5,
    directive: "Write a quick 10-line script or test a command in your terminal.",
  },
  {
    id: "act-3",
    title: "Review 1 security tool or writeup",
    category: "cyber",
    estimatedMinutes: 5,
    directive: "Look over a recent vulnerability writeup or review security commands.",
  },
  {
    id: "act-4",
    title: "Work through 1 equation or concept on paper",
    category: "aiml",
    estimatedMinutes: 5,
    directive: "Write out a formula or sketch an architecture concept step on paper.",
  },
];

const INTERCEPTS_KEY = "pcc_intercepts";

export function loadInterceptsCount(): number {
  try {
    const raw = window.localStorage.getItem(INTERCEPTS_KEY);
    if (!raw || raw === "12") return 0; // Clean zero state default
    const parsed = parseInt(raw, 10);
    return isNaN(parsed) ? 0 : parsed;
  } catch {
    return 0;
  }
}

export function saveInterceptsCount(count: number): void {
  try {
    window.localStorage.setItem(INTERCEPTS_KEY, String(count));
  } catch {
    // storage unavailable
  }
}
