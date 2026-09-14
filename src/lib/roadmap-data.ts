export type TrackId = "cyber" | "academics" | "aiml";
export type NodeStatus = "completed" | "active" | "locked";

export interface RoadmapSubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface RoadmapNode {
  id: string;
  sequence: string;
  title: string;
  description: string;
  status: NodeStatus;
  subTasks: RoadmapSubTask[];
  tags: string[];
  trackId: TrackId;
  estimatedHours?: number;
}

export interface TrackRoadmap {
  trackId: TrackId;
  title: string;
  code: string;
  subtitle: string;
  accentColor: "cyber" | "gold" | "emerald";
  hexColor: string;
  nodes: RoadmapNode[];
}

export const DEFAULT_ROADMAPS: Record<TrackId, TrackRoadmap> = {
  cyber: {
    trackId: "cyber",
    title: "Cybersecurity Path",
    code: "CYSEC-01",
    subtitle: "Offensive Ops, Active Directory & Enterprise Hardening",
    accentColor: "cyber",
    hexColor: "#00E5FF",
    nodes: [],
  },
  academics: {
    trackId: "academics",
    title: "Academics & Core CS",
    code: "ACAD-01",
    subtitle: "Operating Systems, Algorithms & Engineering Theory",
    accentColor: "gold",
    hexColor: "#FFB300",
    nodes: [],
  },
  aiml: {
    trackId: "aiml",
    title: "AI / Machine Learning",
    code: "AIML-01",
    subtitle: "Deep Learning, PyTorch & LLM Systems",
    accentColor: "emerald",
    hexColor: "#10B981",
    nodes: [],
  },
};

const ROADMAPS_KEY = "pcc_roadmaps";

export function loadRoadmaps(): Record<TrackId, TrackRoadmap> {
  try {
    const raw = window.localStorage.getItem(ROADMAPS_KEY);
    if (!raw) return DEFAULT_ROADMAPS;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.cyber && parsed.academics && parsed.aiml) {
      // If legacy pre-seeded mock with cy-01 is detected, wipe to clean zero state
      const isLegacyMock =
        parsed.cyber?.nodes?.length > 0 &&
        parsed.cyber.nodes[0]?.id === "cy-01" &&
        parsed.academics?.nodes?.[0]?.id === "acad-01";
      if (isLegacyMock) {
        saveRoadmaps(DEFAULT_ROADMAPS);
        return DEFAULT_ROADMAPS;
      }
      return parsed;
    }
    return DEFAULT_ROADMAPS;
  } catch {
    return DEFAULT_ROADMAPS;
  }
}

export function saveRoadmaps(roadmaps: Record<TrackId, TrackRoadmap>) {
  try {
    window.localStorage.setItem(ROADMAPS_KEY, JSON.stringify(roadmaps));
  } catch {
    // storage unavailable
  }
}

export function calculateNodeProgress(node: RoadmapNode): number {
  if (!node.subTasks || node.subTasks.length === 0) {
    return node.status === "completed" ? 100 : 0;
  }
  const completed = node.subTasks.filter((st) => st.completed).length;
  return Math.round((completed / node.subTasks.length) * 100);
}

export function calculateTrackProgress(nodes: RoadmapNode[]): number {
  if (nodes.length === 0) return 0;
  const totalSubTasks = nodes.reduce((sum, n) => sum + (n.subTasks.length || 1), 0);
  const completedSubTasks = nodes.reduce((sum, n) => {
    if (n.subTasks.length === 0) return sum + (n.status === "completed" ? 1 : 0);
    return sum + n.subTasks.filter((st) => st.completed).length;
  }, 0);
  return totalSubTasks > 0 ? Math.round((completedSubTasks / totalSubTasks) * 100) : 0;
}

export function pillarToTrackId(pillar: "cyber" | "gold" | "emerald"): TrackId {
  if (pillar === "cyber") return "cyber";
  if (pillar === "gold") return "academics";
  return "aiml";
}

export function trackIdToPillar(trackId: TrackId): "cyber" | "gold" | "emerald" {
  if (trackId === "cyber") return "cyber";
  if (trackId === "academics") return "gold";
  return "emerald";
}

/**
 * Updates a roadmap checklist item's completion status, recalculates the parent node's
 * status and progress, persists to localStorage, and dispatches the update event for live UI sync.
 */
export function setRoadmapChecklistItemCompletion(
  nodeId: string,
  checklistItemId: string,
  completed: boolean,
): { updatedTrackId: TrackId; updatedNodes: RoadmapNode[] } | null {
  const roadmaps = loadRoadmaps();
  let affectedTrackId: TrackId | null = null;
  let affectedNodes: RoadmapNode[] | null = null;

  const tracks: TrackId[] = ["cyber", "academics", "aiml"];
  for (const tid of tracks) {
    const track = roadmaps[tid];
    if (!track) continue;
    const nodeIndex = track.nodes.findIndex((n) => n.id === nodeId);
    if (nodeIndex !== -1) {
      affectedTrackId = tid;
      const targetNode = track.nodes[nodeIndex];
      const subTasks = (targetNode.subTasks || []).map((st) =>
        st.id === checklistItemId ? { ...st, completed } : st,
      );

      const allCompleted = subTasks.length > 0 && subTasks.every((st) => st.completed);
      let newStatus: NodeStatus = targetNode.status;
      if (allCompleted) {
        newStatus = "completed";
      } else if (targetNode.status === "completed" && !allCompleted) {
        newStatus = "active";
      }

      const updatedNode: RoadmapNode = {
        ...targetNode,
        subTasks,
        status: newStatus,
      };

      affectedNodes = track.nodes.map((n, idx) => (idx === nodeIndex ? updatedNode : n));
      roadmaps[tid] = {
        ...track,
        nodes: affectedNodes,
      };
      break;
    }
  }

  if (affectedTrackId && affectedNodes) {
    saveRoadmaps(roadmaps);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("pcc-roadmaps-updated", {
          detail: { trackId: affectedTrackId, nodes: affectedNodes },
        }),
      );
    }
    return { updatedTrackId: affectedTrackId, updatedNodes: affectedNodes };
  }

  return null;
}
