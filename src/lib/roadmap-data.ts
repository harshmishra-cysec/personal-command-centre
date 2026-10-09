export type TrackId = "cyber" | "academics" | "aiml";
export type NodeStatus = "completed" | "active" | "locked";

export interface RoadmapSubTask {
  id: string;
  title: string;
  completed: boolean;
  children?: RoadmapSubTask[];
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

export function getNodeLeafCounts(node: RoadmapNode): { total: number; completed: number } {
  if (!node.subTasks || node.subTasks.length === 0) {
    return { total: 0, completed: 0 };
  }
  let total = 0;
  let completed = 0;
  for (const st of node.subTasks) {
    if (st.children && st.children.length > 0) {
      total += st.children.length;
      completed += st.children.filter((c) => c.completed).length;
    } else {
      total += 1;
      if (st.completed) completed += 1;
    }
  }
  return { total, completed };
}

export function calculateNodeProgress(node: RoadmapNode): number {
  if (!node.subTasks || node.subTasks.length === 0) {
    return node.status === "completed" ? 100 : 0;
  }
  const { total, completed } = getNodeLeafCounts(node);
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
      const counts = getNodeLeafCounts(n);
      total += counts.total;
      completed += counts.completed;
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
        // Case 1: checklistItemId matches a sub-item inside st.children
        if (st.children && st.children.some((c) => c.id === checklistItemId)) {
          const updatedChildren = st.children.map((c) =>
            c.id === checklistItemId ? { ...c, completed } : c,
          );
          const allChildrenDone =
            updatedChildren.length > 0 && updatedChildren.every((c) => c.completed);
          return {
            ...st,
            children: updatedChildren,
            completed: allChildrenDone,
          };
        }

        // Case 2: checklistItemId matches this parent st
        if (st.id === checklistItemId) {
          if (st.children && st.children.length > 0) {
            const updatedChildren = st.children.map((c) => ({ ...c, completed }));
            return {
              ...st,
              children: updatedChildren,
              completed,
            };
          }
          return {
            ...st,
            completed,
          };
        }

        return st;
      });

      const tempNode: RoadmapNode = {
        ...targetNode,
        subTasks,
      };
      const { total, completed: completedLeaves } = getNodeLeafCounts(tempNode);
      let newStatus: NodeStatus = targetNode.status;
      if (total > 0 && completedLeaves === total) {
        newStatus = "completed";
      } else if (targetNode.status === "completed" && completedLeaves < total) {
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
