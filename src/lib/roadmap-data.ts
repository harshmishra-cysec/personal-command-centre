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
    nodes: [
      {
        id: "cy-01",
        sequence: "01",
        title: "Networking & Linux Internals",
        description:
          "Low-level TCP/IP stack analysis, iptables, Linux memory hierarchy, bash automation, and socket programming fundamentals.",
        status: "completed",
        tags: ["TCP/IP", "Wireshark", "Bash", "Linux"],
        trackId: "cyber",
        estimatedHours: 40,
        subTasks: [
          {
            id: "st-cy-01-1",
            title: "Complete OverTheWire Bandit wargame (Levels 1-34)",
            completed: true,
          },
          {
            id: "st-cy-01-2",
            title: "Wireshark PCAP deep-dive for TCP handshakes & DNS exfiltration",
            completed: true,
          },
          {
            id: "st-cy-01-3",
            title: "Build custom multi-threaded port scanner in Python/Rust",
            completed: true,
          },
          {
            id: "st-cy-01-4",
            title: "Configure strict iptables/nftables firewall rulesets",
            completed: true,
          },
        ],
      },
      {
        id: "cy-02",
        sequence: "02",
        title: "Web App Pentesting & OWASP",
        description:
          "Systematic auditing of modern web APIs, OAuth flows, deserialization vulnerabilities, and PortSwigger Web Security academy labs.",
        status: "active",
        tags: ["Burp Suite", "OWASP Top 10", "OAuth", "API Security"],
        trackId: "cyber",
        estimatedHours: 65,
        subTasks: [
          {
            id: "st-cy-02-1",
            title: "Solve 20 PortSwigger Web Security Academy Practitioner labs",
            completed: true,
          },
          {
            id: "st-cy-02-2",
            title: "Execute blind SQL injection via out-of-band (OAST) techniques",
            completed: true,
          },
          {
            id: "st-cy-02-3",
            title: "Audit GraphQL & REST endpoints for IDOR / Broken Object Level Auth",
            completed: false,
          },
          {
            id: "st-cy-02-4",
            title: "Craft weaponized CSRF & cross-origin WebSocket hijacking exploits",
            completed: false,
          },
        ],
      },
      {
        id: "cy-03",
        sequence: "03",
        title: "Active Directory & Privilege Escalation",
        description:
          "Enterprise domain enumeration, Kerberoasting, AS-REP roasting, BloodHound attack path computation, and DACL abuse.",
        status: "locked",
        tags: ["BloodHound", "Kerberos", "Mimikatz", "AD CS"],
        trackId: "cyber",
        estimatedHours: 80,
        subTasks: [
          {
            id: "st-cy-03-1",
            title: "Deploy local virtualized Active Directory forest with 2 DCs",
            completed: false,
          },
          {
            id: "st-cy-03-2",
            title: "Map domain attack paths using BloodHound CE and SharpHound",
            completed: false,
          },
          {
            id: "st-cy-03-3",
            title: "Perform Kerberoasting & AS-REP roasting with Impacket suite",
            completed: false,
          },
          {
            id: "st-cy-03-4",
            title: "Exploit vulnerable AD Certificate Services (AD CS / ESC1-ESC8)",
            completed: false,
          },
        ],
      },
      {
        id: "cy-04",
        sequence: "04",
        title: "Cloud & Enterprise Defense",
        description:
          "AWS/GCP IAM role assumption chains, Splunk SIEM detection engineering, MITRE ATT&CK coverage, and C2 traffic analysis.",
        status: "locked",
        tags: ["AWS IAM", "Splunk", "MITRE ATT&CK", "Detection Eng"],
        trackId: "cyber",
        estimatedHours: 90,
        subTasks: [
          {
            id: "st-cy-04-1",
            title: "Simulate CloudGoat AWS IAM privilege escalation paths",
            completed: false,
          },
          {
            id: "st-cy-04-2",
            title: "Write custom Sigma & YARA rules for living-off-the-land binaries",
            completed: false,
          },
          {
            id: "st-cy-04-3",
            title: "Configure central telemetry pipeline into Splunk / Elastic Security",
            completed: false,
          },
          {
            id: "st-cy-04-4",
            title: "Perform threat hunting for beaconing behaviors (Cobalt Strike / Sliver)",
            completed: false,
          },
        ],
      },
    ],
  },
  academics: {
    trackId: "academics",
    title: "Academics & Semesters",
    code: "ACAD-02",
    subtitle: "Core Computer Science, Distributed Systems & Rigorous Foundations",
    accentColor: "gold",
    hexColor: "#FFB300",
    nodes: [
      {
        id: "ac-01",
        sequence: "01",
        title: "Data Structures & Algorithmic Rigor",
        description:
          "Asymptotic complexity, Balanced Trees, Dynamic Programming optimization, Graph flow networks, and LeetCode algorithmic patterns.",
        status: "completed",
        tags: ["DSA", "Graphs", "DP", "C++"],
        trackId: "academics",
        estimatedHours: 50,
        subTasks: [
          {
            id: "st-ac-01-1",
            title: "Implement AVL and Red-Black trees with balance rotations from scratch",
            completed: true,
          },
          {
            id: "st-ac-01-2",
            title: "Solve 75 curated Blind LeetCode problems (Medium & Hard)",
            completed: true,
          },
          {
            id: "st-ac-01-3",
            title: "Master Dijkstra, Floyd-Warshall, and Min-Cut Max-Flow algorithms",
            completed: true,
          },
        ],
      },
      {
        id: "ac-02",
        sequence: "02",
        title: "Operating Systems & Concurrency",
        description:
          "Virtual memory paging, CPU scheduling, POSIX threads, deadlock avoidance algorithms, and system call implementations in xv6.",
        status: "active",
        tags: ["C / Assembly", "xv6", "Paging", "Threads"],
        trackId: "academics",
        estimatedHours: 60,
        subTasks: [
          {
            id: "st-ac-02-1",
            title: "Implement custom copy-on-write (COW) page allocator in xv6 kernel",
            completed: true,
          },
          {
            id: "st-ac-02-2",
            title: "Build lock-free multi-producer single-consumer ring buffer in C",
            completed: false,
          },
          {
            id: "st-ac-02-3",
            title: "Benchmark context switch overhead across kernel vs user threads",
            completed: false,
          },
        ],
      },
      {
        id: "ac-03",
        sequence: "03",
        title: "Database Engines & Storage Internals",
        description:
          "B+Tree disk pages, Write-Ahead Logging (WAL), Two-Phase Locking (2PL), MVCC transaction semantics, and query execution planners.",
        status: "locked",
        tags: ["B+Tree", "WAL", "MVCC", "SQL Engine"],
        trackId: "academics",
        estimatedHours: 75,
        subTasks: [
          {
            id: "st-ac-03-1",
            title: "Construct disk-backed B+ Tree storage engine in Go/Rust",
            completed: false,
          },
          {
            id: "st-ac-03-2",
            title: "Implement ARIES crash recovery and write-ahead log replay mechanism",
            completed: false,
          },
          {
            id: "st-ac-03-3",
            title: "Simulate multi-version concurrency control (MVCC) isolation levels",
            completed: false,
          },
        ],
      },
      {
        id: "ac-04",
        sequence: "04",
        title: "Distributed Systems & Consensus",
        description:
          "Fault-tolerant consensus (Raft/Paxos), Vector clocks, distributed hash tables, RPC protocols, and Byzantine fault boundaries.",
        status: "locked",
        tags: ["Raft", "gRPC", "Vector Clocks", "DHT"],
        trackId: "academics",
        estimatedHours: 85,
        subTasks: [
          {
            id: "st-ac-04-1",
            title: "Implement 3-node Raft consensus leader election and log replication",
            completed: false,
          },
          {
            id: "st-ac-04-2",
            title: "Build consistent hashing ring with virtual nodes for key sharding",
            completed: false,
          },
          {
            id: "st-ac-04-3",
            title: "Draft and present Semester Capstone on distributed state machines",
            completed: false,
          },
        ],
      },
    ],
  },
  aiml: {
    trackId: "aiml",
    title: "AIML & Systems",
    code: "AIML-03",
    subtitle: "Deep Learning Foundations, LLM Architecture & High-Throughput Inference",
    accentColor: "emerald",
    hexColor: "#10B981",
    nodes: [
      {
        id: "ai-01",
        sequence: "01",
        title: "Math Foundations & Tensor Computations",
        description:
          "Multivariable calculus, Jacobians, SVD matrix decompositions, custom autograd engines, and vectorized GPU broadcasting.",
        status: "completed",
        tags: ["Linear Algebra", "Autograd", "PyTorch", "Calculus"],
        trackId: "aiml",
        estimatedHours: 45,
        subTasks: [
          {
            id: "st-ai-01-1",
            title: "Build micrograd-style reverse-mode automatic differentiation engine",
            completed: true,
          },
          {
            id: "st-ai-01-2",
            title: "Derive backpropagation gradient math for LayerNorm and Softmax",
            completed: true,
          },
          {
            id: "st-ai-01-3",
            title: "Benchmark naive Matrix Multiplication vs Strassen vs cuBLAS",
            completed: true,
          },
        ],
      },
      {
        id: "ai-02",
        sequence: "02",
        title: "Transformer Architectures & Pre-Training",
        description:
          "Multi-Head Self-Attention, Rotary Position Embeddings (RoPE), KV-Caching, FlashAttention mechanics, and causal language modeling.",
        status: "active",
        tags: ["Transformers", "RoPE", "FlashAttention", "PyTorch"],
        trackId: "aiml",
        estimatedHours: 70,
        subTasks: [
          {
            id: "st-ai-02-1",
            title: "Train a 125M decoder-only transformer from scratch on TinyStories dataset",
            completed: true,
          },
          {
            id: "st-ai-02-2",
            title: "Implement RoPE (Rotary Position Embeddings) and KV-cache matrix management",
            completed: false,
          },
          {
            id: "st-ai-02-3",
            title: "Write custom CUDA kernel for fused GELU + bias addition",
            completed: false,
          },
        ],
      },
      {
        id: "ai-03",
        sequence: "03",
        title: "Agentic Systems & Post-Training (RLHF/DPO)",
        description:
          "Direct Preference Optimization (DPO), LoRA parameter-efficient fine-tuning, tool-use grounding, and multi-agent DAG execution.",
        status: "locked",
        tags: ["LoRA", "DPO", "DSPy", "Function Calling"],
        trackId: "aiml",
        estimatedHours: 80,
        subTasks: [
          {
            id: "st-ai-03-1",
            title: "Fine-tune Llama-3-8B with QLoRA for specialized cyber-threat report parsing",
            completed: false,
          },
          {
            id: "st-ai-03-2",
            title: "Implement DPO loss function to align model responses with human criteria",
            completed: false,
          },
          {
            id: "st-ai-03-3",
            title: "Build deterministic multi-step agent DAG with state recovery & rollbacks",
            completed: false,
          },
        ],
      },
      {
        id: "ai-04",
        sequence: "04",
        title: "Inference Optimization & Edge Deployment",
        description:
          "vLLM PagedAttention, TensorRT-LLM engine compilation, AWQ/FP8 model quantization, and distributed tensor-parallel serving.",
        status: "locked",
        tags: ["vLLM", "PagedAttention", "FP8 / AWQ", "TensorRT"],
        trackId: "aiml",
        estimatedHours: 85,
        subTasks: [
          {
            id: "st-ai-04-1",
            title: "Deploy continuous batching inference endpoint using vLLM",
            completed: false,
          },
          {
            id: "st-ai-04-2",
            title: "Quantize 70B parameter model down to 4-bit AWQ with zero accuracy degradation",
            completed: false,
          },
          {
            id: "st-ai-04-3",
            title: "Profile TTFT (Time-to-First-Token) and generation token throughput per GPU",
            completed: false,
          },
        ],
      },
    ],
  },
};

const ROADMAPS_KEY = "pcc_roadmaps";

export function loadRoadmaps(): Record<TrackId, TrackRoadmap> {
  try {
    const raw = window.localStorage.getItem(ROADMAPS_KEY);
    if (!raw) return DEFAULT_ROADMAPS;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.cyber && parsed.academics && parsed.aiml) {
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
