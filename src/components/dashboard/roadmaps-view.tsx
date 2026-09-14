import { useState, useEffect } from "react";
import {
  Shield,
  BookOpen,
  Cpu,
  Plus,
  Sparkles,
  Milestone,
  CheckCircle2,
  Radio,
  Layers,
  Flame,
  PlusCircle,
  FolderPlus,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  loadRoadmaps,
  saveRoadmaps,
  calculateTrackProgress,
  type RoadmapNode,
  type TrackId,
  type TrackRoadmap,
} from "@/lib/roadmap-data";
import { upsertRoadmapTrackToSupabase } from "@/lib/pcc-storage";
import { MilestoneNodeCard } from "@/components/dashboard/roadmaps/milestone-node-card";
import { MilestoneDetailModal } from "@/components/dashboard/roadmaps/milestone-detail-modal";
import { AddMilestoneModal } from "@/components/dashboard/roadmaps/add-milestone-modal";

export function RoadmapsView() {
  const [roadmaps, setRoadmaps] = useState<Record<TrackId, TrackRoadmap>>(() => loadRoadmaps());
  const [activeTrackId, setActiveTrackId] = useState<TrackId>("cyber");
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Sync to localStorage on state changes
  useEffect(() => {
    saveRoadmaps(roadmaps);
  }, [roadmaps]);

  // Listen for realtime roadmap track updates from Supabase
  useEffect(() => {
    const handleRemoteRoadmap = (e: Event) => {
      const custom = e as CustomEvent<{ trackId: TrackId; nodes: RoadmapNode[] }>;
      if (custom.detail?.trackId && custom.detail?.nodes) {
        setRoadmaps((prev) => ({
          ...prev,
          [custom.detail.trackId]: {
            ...prev[custom.detail.trackId],
            nodes: custom.detail.nodes,
          },
        }));
      }
    };
    window.addEventListener("pcc-roadmaps-updated", handleRemoteRoadmap);
    return () => window.removeEventListener("pcc-roadmaps-updated", handleRemoteRoadmap);
  }, []);

  const activeTrack = roadmaps[activeTrackId] ||
    roadmaps.cyber || {
      trackId: activeTrackId,
      title: "Path",
      code: "PATH",
      subtitle: "",
      accentColor: "cyber",
      hexColor: "#00E5FF",
      nodes: [],
    };

  const trackProgress = calculateTrackProgress(activeTrack.nodes);

  const completedCount = activeTrack.nodes.filter(
    (n) =>
      n.status === "completed" ||
      (n.subTasks && n.subTasks.length > 0 && n.subTasks.every((s) => s.completed)),
  ).length;
  const activeCount = activeTrack.nodes.filter((n) => n.status === "active").length;
  const upcomingCount = activeTrack.nodes.length - completedCount - activeCount;

  const handleSelectNode = (node: RoadmapNode) => {
    setSelectedNode(node);
    setDetailModalOpen(true);
  };

  const handleUpdateNode = (updatedNode: RoadmapNode) => {
    setRoadmaps((prev) => {
      const track = prev[updatedNode.trackId];
      if (!track) return prev;

      const updatedNodes = track.nodes.map((n) => (n.id === updatedNode.id ? updatedNode : n));
      const nextRoadmaps = {
        ...prev,
        [updatedNode.trackId]: {
          ...track,
          nodes: updatedNodes,
        },
      };
      saveRoadmaps(nextRoadmaps);
      upsertRoadmapTrackToSupabase(updatedNode.trackId, updatedNodes);
      return nextRoadmaps;
    });
    setSelectedNode(updatedNode);
  };

  const handleDeleteNode = (nodeId: string, trackId: TrackId) => {
    setRoadmaps((prev) => {
      const track = prev[trackId];
      if (!track) return prev;

      const updatedNodes = track.nodes.filter((n) => n.id !== nodeId);
      const nextRoadmaps = {
        ...prev,
        [trackId]: {
          ...track,
          nodes: updatedNodes,
        },
      };
      saveRoadmaps(nextRoadmaps);
      upsertRoadmapTrackToSupabase(trackId, updatedNodes);
      return nextRoadmaps;
    });
    setSelectedNode(null);
    setDetailModalOpen(false);
  };

  const handleAddNode = (newNode: RoadmapNode) => {
    setRoadmaps((prev) => {
      const track = prev[newNode.trackId];
      if (!track) return prev;

      const updatedNodes = [...track.nodes, newNode];
      const nextRoadmaps = {
        ...prev,
        [newNode.trackId]: {
          ...track,
          nodes: updatedNodes,
        },
      };
      saveRoadmaps(nextRoadmaps);
      upsertRoadmapTrackToSupabase(newNode.trackId, updatedNodes);
      return nextRoadmaps;
    });
    setActiveTrackId(newNode.trackId);
  };

  const getTrackTheme = (trackId: TrackId) => {
    switch (trackId) {
      case "cyber":
        return {
          tabActive:
            "border-cyber ring-1 ring-cyber/30 bg-[#131B2A] shadow-[0_0_20px_rgba(0,229,255,0.14)]",
          barColor: "bg-cyber",
          text: "text-cyber",
          border: "border-cyber",
          badge: "border-cyber/50 bg-cyber/10 text-cyber",
          glowLine: "bg-cyber shadow-[0_0_8px_rgba(0,229,255,0.6)]",
        };
      case "academics":
        return {
          tabActive:
            "border-gold ring-1 ring-gold/30 bg-[#131B2A] shadow-[0_0_20px_rgba(255,179,0,0.14)]",
          barColor: "bg-gold",
          text: "text-gold",
          border: "border-gold",
          badge: "border-gold/50 bg-gold/10 text-gold",
          glowLine: "bg-gold shadow-[0_0_8px_rgba(255,179,0,0.6)]",
        };
      case "aiml":
        return {
          tabActive:
            "border-emerald ring-1 ring-emerald/30 bg-[#131B2A] shadow-[0_0_20px_rgba(16,185,129,0.14)]",
          barColor: "bg-emerald",
          text: "text-emerald",
          border: "border-emerald",
          badge: "border-emerald/50 bg-emerald/10 text-emerald",
          glowLine: "bg-emerald shadow-[0_0_8px_rgba(16,185,129,0.6)]",
        };
    }
  };

  const currentTheme = getTrackTheme(activeTrackId);

  // Determine dynamic glowing path lines for THM progression
  // Find the index of the furthest active or completed milestone
  let lastCompletedOrActiveIndex = -1;
  activeTrack.nodes.forEach((n, idx) => {
    const isDone =
      n.status === "completed" ||
      (n.subTasks && n.subTasks.length > 0 && n.subTasks.every((s) => s.completed));
    if (isDone || n.status === "active") {
      lastCompletedOrActiveIndex = idx;
    }
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="size-2 rounded-full bg-cyber animate-pulse" />
          <div>
            <h2 className="font-mono text-base sm:text-lg font-bold uppercase tracking-wider text-foreground">
              Skill Paths & Progression Tree
            </h2>
            <p className="font-mono text-xs text-muted-foreground mt-0.5">
              TryHackMe-inspired sequential skill vectors, checkpoints, and tactical milestones.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary px-3.5 py-1.5 font-mono text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
          >
            <Plus className="size-3.5" />
            <span>ADD MILESTONE</span>
          </button>
        </div>
      </div>

      {/* Track Selector Tabs (3 Paths) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Track 1: Cyber */}
        <button
          type="button"
          onClick={() => setActiveTrackId("cyber")}
          className={cn(
            "panel text-left p-3.5 sm:p-4 transition-all relative overflow-hidden flex flex-col justify-between gap-3 rounded-xl border",
            activeTrackId === "cyber"
              ? getTrackTheme("cyber").tabActive
              : "border-white/10 bg-[#131B2A]/60 opacity-75 hover:opacity-100 hover:border-white/20",
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "grid size-8 place-items-center rounded-lg border",
                  activeTrackId === "cyber"
                    ? "border-cyber/60 bg-cyber/15 text-cyber"
                    : "border-white/10 bg-[#0B0F17] text-muted-foreground",
                )}
              >
                <Shield className="size-4" />
              </span>
              <div>
                <div className="font-mono text-[10px] text-muted-foreground font-semibold">
                  CYSEC-01
                </div>
                <div
                  className={cn(
                    "font-mono text-sm font-bold",
                    activeTrackId === "cyber" ? "text-cyber" : "text-foreground",
                  )}
                >
                  Cybersecurity Path
                </div>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-cyber">
              {calculateTrackProgress(roadmaps.cyber?.nodes || [])}%
            </span>
          </div>

          <div className="space-y-1">
            <div className="h-1 w-full overflow-hidden rounded-full bg-[#0B0F17]">
              <div
                className="h-full bg-cyber transition-all duration-300"
                style={{ width: `${calculateTrackProgress(roadmaps.cyber?.nodes || [])}%` }}
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
              <span>{roadmaps.cyber?.nodes?.length || 0} NODES</span>
              <span>
                {roadmaps.cyber?.nodes?.filter((n) => n.status === "completed").length || 0} DONE
              </span>
            </div>
          </div>
        </button>

        {/* Track 2: Academics */}
        <button
          type="button"
          onClick={() => setActiveTrackId("academics")}
          className={cn(
            "panel text-left p-3.5 sm:p-4 transition-all relative overflow-hidden flex flex-col justify-between gap-3 rounded-xl border",
            activeTrackId === "academics"
              ? getTrackTheme("academics").tabActive
              : "border-white/10 bg-[#131B2A]/60 opacity-75 hover:opacity-100 hover:border-white/20",
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "grid size-8 place-items-center rounded-lg border",
                  activeTrackId === "academics"
                    ? "border-gold/60 bg-gold/15 text-gold"
                    : "border-white/10 bg-[#0B0F17] text-muted-foreground",
                )}
              >
                <BookOpen className="size-4" />
              </span>
              <div>
                <div className="font-mono text-[10px] text-muted-foreground font-semibold">
                  ACAD-02
                </div>
                <div
                  className={cn(
                    "font-mono text-sm font-bold",
                    activeTrackId === "academics" ? "text-gold" : "text-foreground",
                  )}
                >
                  Academics & Semesters
                </div>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-gold">
              {calculateTrackProgress(roadmaps.academics?.nodes || [])}%
            </span>
          </div>

          <div className="space-y-1">
            <div className="h-1 w-full overflow-hidden rounded-full bg-[#0B0F17]">
              <div
                className="h-full bg-gold transition-all duration-300"
                style={{ width: `${calculateTrackProgress(roadmaps.academics?.nodes || [])}%` }}
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
              <span>{roadmaps.academics?.nodes?.length || 0} NODES</span>
              <span>
                {roadmaps.academics?.nodes?.filter((n) => n.status === "completed").length || 0}{" "}
                DONE
              </span>
            </div>
          </div>
        </button>

        {/* Track 3: AIML */}
        <button
          type="button"
          onClick={() => setActiveTrackId("aiml")}
          className={cn(
            "panel text-left p-3.5 sm:p-4 transition-all relative overflow-hidden flex flex-col justify-between gap-3 rounded-xl border",
            activeTrackId === "aiml"
              ? getTrackTheme("aiml").tabActive
              : "border-white/10 bg-[#131B2A]/60 opacity-75 hover:opacity-100 hover:border-white/20",
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "grid size-8 place-items-center rounded-lg border",
                  activeTrackId === "aiml"
                    ? "border-emerald/60 bg-emerald/15 text-emerald"
                    : "border-white/10 bg-[#0B0F17] text-muted-foreground",
                )}
              >
                <Cpu className="size-4" />
              </span>
              <div>
                <div className="font-mono text-[10px] text-muted-foreground font-semibold">
                  AIML-03
                </div>
                <div
                  className={cn(
                    "font-mono text-sm font-bold",
                    activeTrackId === "aiml" ? "text-emerald" : "text-foreground",
                  )}
                >
                  AIML & Systems
                </div>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-emerald">
              {calculateTrackProgress(roadmaps.aiml?.nodes || [])}%
            </span>
          </div>

          <div className="space-y-1">
            <div className="h-1 w-full overflow-hidden rounded-full bg-[#0B0F17]">
              <div
                className="h-full bg-emerald transition-all duration-300"
                style={{ width: `${calculateTrackProgress(roadmaps.aiml?.nodes || [])}%` }}
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
              <span>{roadmaps.aiml?.nodes?.length || 0} NODES</span>
              <span>
                {roadmaps.aiml?.nodes?.filter((n) => n.status === "completed").length || 0} DONE
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Active Track Header HUD */}
      <div className="panel p-5 sm:p-6 rounded-xl border border-white/10 bg-[#131B2A]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                MISSION VECTOR // {activeTrack.code}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase",
                  currentTheme.badge,
                )}
              >
                <Radio className="size-3 animate-pulse" />
                ACTIVE PATH
              </span>
            </div>
            <h3 className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {activeTrack.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
              {activeTrack.subtitle ||
                "Curated operational checkpoints and hands-on skill objectives."}
            </p>
          </div>

          {/* Telemetry Summary Stats */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="rounded-lg border border-white/10 bg-[#0B0F17] p-2.5 sm:p-3 min-w-[80px] text-center">
              <div className="font-mono text-[9px] sm:text-[10px] text-muted-foreground">
                PROGRESS
              </div>
              <div className={cn("font-mono text-base sm:text-lg font-bold", currentTheme.text)}>
                {trackProgress}%
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#0B0F17] p-2.5 sm:p-3 min-w-[80px] text-center">
              <div className="font-mono text-[9px] sm:text-[10px] text-emerald">COMPLETED</div>
              <div className="font-mono text-base sm:text-lg font-bold text-foreground">
                {completedCount}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#0B0F17] p-2.5 sm:p-3 min-w-[80px] text-center">
              <div className="font-mono text-[9px] sm:text-[10px] text-cyber">IN FLIGHT</div>
              <div className="font-mono text-base sm:text-lg font-bold text-foreground">
                {activeCount}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#0B0F17] p-2.5 sm:p-3 min-w-[80px] text-center">
              <div className="font-mono text-[9px] sm:text-[10px] text-muted-foreground">
                UPCOMING
              </div>
              <div className="font-mono text-base sm:text-lg font-bold text-muted-foreground">
                {upcomingCount}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Progression Bar */}
        <div className="mt-4 pt-4 border-t border-white/10 space-y-1">
          <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
            <span>TACTICAL PATH COMPLETION</span>
            <span className={cn("font-bold", currentTheme.text)}>{trackProgress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#0B0F17]">
            <div
              className={cn("h-full transition-all duration-500", currentTheme.barColor)}
              style={{ width: `${trackProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* THM Continuous Progression Path Tree */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Layers className="size-4 text-primary" />
            <span>PROGRESSION PIPELINE ({activeTrack.nodes.length} WAYPOINTS)</span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            CLICK ANY NODE TO INSPECT / EDIT SUB-TASKS
          </span>
        </div>

        {/* Empty State */}
        {activeTrack.nodes.length === 0 ? (
          <div className="panel p-8 sm:p-12 text-center rounded-xl border border-dashed border-white/15 bg-[#131B2A]/40 space-y-4">
            <div className="mx-auto grid size-12 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground">
              <Terminal className="size-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h4 className="font-mono text-sm font-bold uppercase text-foreground">
                NO ACTIVE MILESTONES // INITIALIZE NEW PATH (+)
              </h4>
              <p className="font-mono text-xs text-muted-foreground max-w-md mx-auto">
                All milestones in this track vector have been cleared. Build your custom progression
                roadmap from scratch.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 font-mono text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
              >
                <Plus className="size-3.5" />
                <span>+ ADD FIRST MILESTONE</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="relative pl-1 sm:pl-2">
            {activeTrack.nodes.map((node, index) => {
              const isGlowTop = index <= lastCompletedOrActiveIndex;
              const isGlowBottom = index < lastCompletedOrActiveIndex;

              return (
                <MilestoneNodeCard
                  key={node.id}
                  node={node}
                  index={index}
                  isFirst={index === 0}
                  isLast={index === activeTrack.nodes.length - 1}
                  isPathGlowTop={isGlowTop}
                  isPathGlowBottom={isGlowBottom}
                  onSelectNode={handleSelectNode}
                />
              );
            })}

            {/* Path Terminal Node: Add Milestone Action */}
            <div className="flex items-center gap-3 sm:gap-5 pt-1">
              <div className="flex flex-col items-center flex-shrink-0 w-10 sm:w-12">
                <div className="w-0.5 h-6 border-l-2 border-dashed border-slate-700/80" />
                <button
                  type="button"
                  onClick={() => setAddModalOpen(true)}
                  className="grid size-9 place-items-center rounded-xl border border-dashed border-white/20 bg-[#0B0F17] text-muted-foreground hover:border-primary hover:text-primary transition-all hover:scale-105"
                  title="Add Next Milestone"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setAddModalOpen(true)}
                className="flex-1 py-3 px-4 rounded-xl border border-dashed border-white/15 bg-[#131B2A]/40 hover:border-primary/50 hover:bg-[#131B2A]/80 font-mono text-xs text-muted-foreground hover:text-foreground transition-all flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <PlusCircle className="size-4 text-primary" />
                  <span>+ ADD NEW STRATEGIC MILESTONE TO THIS PATH</span>
                </span>
                <span className="text-[10px] text-primary/80 font-bold uppercase">
                  INITIALIZE // NODE {String(activeTrack.nodes.length + 1).padStart(2, "0")}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Milestone Detail / Sub-Task Inspection & Edit Modal */}
      <MilestoneDetailModal
        node={selectedNode}
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        onUpdateNode={handleUpdateNode}
        onDeleteNode={handleDeleteNode}
      />

      {/* Add Custom Milestone Modal */}
      <AddMilestoneModal
        open={addModalOpen}
        activeTrackId={activeTrackId}
        existingNodesCount={activeTrack.nodes.length}
        onOpenChange={setAddModalOpen}
        onAddNode={handleAddNode}
      />
    </div>
  );
}
