export type TrackId = "cyber" | "academics" | "aiml";
export type NodeStatus = "completed" | "active" | "locked";

export interface RoadmapSubItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface RoadmapSubTask {
  id: string;
  title: string;
  completed: boolean;
  subItems?: RoadmapSubItem[];
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
    title: "Cybersecurity",
    code: "CYSEC",
    subtitle: "Labs, network security, and practical skills",
    accentColor: "cyber",
    hexColor: "#00E5FF",
    nodes: [],
  },
  academics: {
    trackId: "academics",
    title: "Academics",
    code: "ACAD",
    subtitle: "Operating systems, algorithms, and core courses",
    accentColor: "gold",
    hexColor: "#FFB300",
    nodes: [],
  },
  aiml: {
    trackId: "aiml",
    title: "AI and Machine Learning",
    code: "AIML",
    subtitle: "Deep learning, models, and practical projects",
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
  let total = 0;
  let completed = 0;
  for (const st of node.subTasks) {
    if (st.subItems && st.subItems.length > 0) {
      total += st.subItems.length;
      completed += st.subItems.filter((si) => si.completed).length;
    } else {
      total += 1;
      if (st.completed) completed += 1;
    }
  }
  if (total === 0) return node.status === "completed" ? 100 : 0;
  return Math.round((completed / total) * 100);
}

export function calculateTrackProgress(nodes: RoadmapNode[]): number {
  if (nodes.length === 0) return 0;
  let total = 0;
  let completed = 0;
  for (const n of nodes) {
    if (!n.subTasks || n.subTasks.length === 0) {
      total += 1;
      if (n.status === "completed") completed += 1;
    } else {
      for (const st of n.subTasks) {
        if (st.subItems && st.subItems.length > 0) {
          total += st.subItems.length;
          completed += st.subItems.filter((si) => si.completed).length;
        } else {
          total += 1;
          if (st.completed) completed += 1;
        }
      }
    }
  }
  return total > 0 ? Math.round((completed / total) * 100) : 0;
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
 * Updates a roadmap checklist item or sub-item completion status, recalculates the parent node's
 * status and progress, persists to localStorage, and dispatches the update event for live UI sync.
 */
export function setRoadmapChecklistItemCompletion(
  nodeId: string,
  checklistItemId: string,
  completed: boolean,
  subItemId?: string,
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
      const subTasks = (targetNode.subTasks || []).map((st) => {
        // Case A: subItemId explicitly provided
        if (subItemId && st.id === checklistItemId && st.subItems) {
          const updatedSubItems = st.subItems.map((si) =>
            si.id === subItemId ? { ...si, completed } : si,
          );
          const allSubsDone =
            updatedSubItems.length > 0 && updatedSubItems.every((si) => si.completed);
          return {
            ...st,
            subItems: updatedSubItems,
            completed: allSubsDone,
          };
        }

        // Case B: checklistItemId matches a sub-item inside this st
        if (st.subItems && st.subItems.some((si) => si.id === checklistItemId)) {
          const updatedSubItems = st.subItems.map((si) =>
            si.id === checklistItemId ? { ...si, completed } : si,
          );
          const allSubsDone =
            updatedSubItems.length > 0 && updatedSubItems.every((si) => si.completed);
          return {
            ...st,
            subItems: updatedSubItems,
            completed: allSubsDone,
          };
        }

        // Case C: checklistItemId matches this parent st
        if (st.id === checklistItemId) {
          const updatedSubItems = st.subItems
            ? st.subItems.map((si) => ({ ...si, completed }))
            : undefined;
          return {
            ...st,
            completed,
            ...(updatedSubItems ? { subItems: updatedSubItems } : {}),
          };
        }

        return st;
      });

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
