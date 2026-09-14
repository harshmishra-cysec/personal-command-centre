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
    costDescription: "45-60 micro-reels consumed with zero retained knowledge or synaptic value.",
    alternateGain: "1 TryHackMe room breakdown OR reading 2 technical RFC pages.",
  },
  {
    durationMinutes: 30,
    label: "30 Minutes",
    costDescription:
      "Elevated brain fog, shattered baseline attention span, and 30m delayed bedtime.",
    alternateGain: "1 complete LeetCode Medium derivation OR 5 CTF challenge recon sweeps.",
  },
  {
    durationMinutes: 60,
    label: "1 Hour",
    costDescription:
      "Severe dopamine depletion, heightened anxiety, and complete momentum collapse.",
    alternateGain:
      "Writing an entire custom Python exploit script OR studying 1 full OS textbook chapter.",
  },
  {
    durationMinutes: 120,
    label: "2 Hours",
    costDescription:
      "Loss of an entire operational evening. Regret, guilt, and reduced sleep quality.",
    alternateGain:
      "Full end-to-end Active Directory lab setup OR training a baseline transformer model.",
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
    title: "Read 3 pages of technical documentation / notes",
    category: "acad",
    estimatedMinutes: 5,
    directive: "Open your active OS/DSA notes or RFC docs. Read 3 pages with laser focus.",
  },
  {
    id: "act-2",
    title: "Solve 1 basic bug or write 1 script snippet",
    category: "cyber",
    estimatedMinutes: 5,
    directive: "Write a 15-line Bash/Python automation or analyze 1 Wireshark filter syntax.",
  },
  {
    id: "act-3",
    title: "Review 1 CySec tool syntax / CVE exploit writeup",
    category: "cyber",
    estimatedMinutes: 5,
    directive: "Analyze 1 recent NVD CVE entry or review Mimikatz / BloodHound flags.",
  },
  {
    id: "act-4",
    title: "Derive 1 mathematical or tensor equation step",
    category: "aiml",
    estimatedMinutes: 5,
    directive: "Write down the self-attention formula or autograd chain-rule step on paper.",
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
