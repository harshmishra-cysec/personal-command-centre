import {
  CheckCircle2,
  Radio,
  ChevronRight,
  Shield,
  Terminal,
  Swords,
  Trophy,
  BookOpen,
  Cpu,
  Binary,
  Layers,
  Sparkles,
  Zap,
  Edit3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getNodeLeafCounts,
  calculateNodeProgress,
  type RoadmapNode,
  type TrackId,
} from "@/lib/roadmap-data";

interface MilestoneNodeCardProps {
  node: RoadmapNode;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  isPathGlowTop: boolean;
  isPathGlowBottom: boolean;
  onSelectNode: (node: RoadmapNode) => void;
}

export function MilestoneNodeCard({
  node,
  index,
  isFirst,
  isLast,
  isPathGlowTop,
  isPathGlowBottom,
  onSelectNode,
}: MilestoneNodeCardProps) {
  const progress = calculateNodeProgress(node);
  const isCompleted = node.status === "completed" || progress === 100;
  const isActive = node.status === "active" && !isCompleted;
  const isUpcoming = !isCompleted && !isActive;

  // Track Color theme
  const getTrackTheme = () => {
    switch (node.trackId) {
      case "cyber":
        return {
          glow: "shadow-[0_0_20px_rgba(0,229,255,0.22)]",
          border: "border-cyber",
          text: "text-cyber",
          bgBadge: "bg-cyber/15 text-cyber border-cyber/50",
          pathColor: "bg-cyber shadow-[0_0_8px_rgba(0,229,255,0.6)]",
          pingColor: "bg-cyber",
          iconColor: "text-cyber",
        };
      case "academics":
        return {
          glow: "shadow-[0_0_20px_rgba(255,179,0,0.22)]",
          border: "border-gold",
          text: "text-gold",
          bgBadge: "bg-gold/15 text-gold border-gold/50",
          pathColor: "bg-gold shadow-[0_0_8px_rgba(255,179,0,0.6)]",
          pingColor: "bg-gold",
          iconColor: "text-gold",
        };
      case "aiml":
        return {
          glow: "shadow-[0_0_20px_rgba(16,185,129,0.22)]",
          border: "border-emerald",
          text: "text-emerald",
          bgBadge: "bg-emerald/15 text-emerald border-emerald/50",
          pathColor: "bg-emerald shadow-[0_0_8px_rgba(16,185,129,0.6)]",
          pingColor: "bg-emerald",
          iconColor: "text-emerald",
        };
    }
  };

  const theme = getTrackTheme();

  // Pick contextual icon for THM skill tree feel
  const getNodeIcon = () => {
    if (isCompleted) return <CheckCircle2 className="size-5 text-emerald stroke-[2.4]" />;

    if (node.trackId === "cyber") {
      if (index === 0) return <Terminal className="size-4" />;
      if (index === 1) return <Shield className="size-4" />;
      if (index === 2) return <Swords className="size-4" />;
      return <Trophy className="size-4" />;
    } else if (node.trackId === "academics") {
      if (index === 0) return <Binary className="size-4" />;
      if (index === 1) return <Cpu className="size-4" />;
      if (index === 2) return <BookOpen className="size-4" />;
      return <Trophy className="size-4" />;
    } else {
      if (index === 0) return <Binary className="size-4" />;
      if (index === 1) return <Cpu className="size-4" />;
      if (index === 2) return <Sparkles className="size-4" />;
      return <Zap className="size-4" />;
    }
  };

  const leafCounts = getNodeLeafCounts(node);
  const completedSubTasks = leafCounts.completed;
  const totalSubTasks = leafCounts.total;

  return (
    <div className="relative flex items-stretch gap-3 sm:gap-5 group">
      {/* 1. THM Stepped Connector "Rope" Path & Node Badge */}
      <div className="relative flex flex-col items-center flex-shrink-0 w-10 sm:w-12">
        {/* Top Connector Segment */}
        {!isFirst && (
          <div
            className={cn(
              "w-0.5 h-4 sm:h-5 transition-all duration-500",
              isPathGlowTop
                ? theme.pathColor
                : "border-l-2 border-dashed border-slate-700/80 bg-transparent",
            )}
          />
        )}

        {/* THM Node Badge */}
        <button
          type="button"
          onClick={() => onSelectNode(node)}
          className={cn(
            "relative grid size-10 sm:size-11 place-items-center rounded-xl border transition-all duration-300 cursor-pointer select-none",
            isCompleted &&
              "border-emerald/80 bg-emerald/15 text-emerald shadow-[0_0_15px_rgba(16,185,129,0.35)] hover:scale-105 hover:bg-emerald/25",
            isActive &&
              cn("border-2 bg-[#131B2A] text-foreground hover:scale-105", theme.border, theme.glow),
            isUpcoming &&
              "border-white/15 bg-[#0B0F17] text-muted-foreground/70 hover:border-white/40 hover:text-foreground hover:scale-105",
          )}
        >
          {/* Active Pulsing Beacon */}
          {isActive && (
            <span
              className={cn(
                "absolute -inset-1 rounded-xl animate-ping opacity-30 pointer-events-none",
                theme.pingColor,
              )}
            />
          )}

          {/* Node Icon */}
          <div
            className={cn(
              "relative z-10 flex items-center justify-center",
              isActive && theme.iconColor,
            )}
          >
            {getNodeIcon()}
          </div>

          {/* Sequence Tiny Badge */}
          <span
            className={cn(
              "absolute -bottom-1.5 font-mono text-[9px] font-bold px-1 rounded bg-[#0B0F17] border leading-tight",
              isCompleted
                ? "border-emerald/60 text-emerald"
                : isActive
                  ? cn(theme.border, theme.text)
                  : "border-white/10 text-muted-foreground",
            )}
          >
            {node.sequence}
          </span>
        </button>

        {/* Bottom Connector Segment */}
        {!isLast && (
          <div
            className={cn(
              "w-0.5 flex-1 min-h-[48px] my-1 transition-all duration-500",
              isPathGlowBottom
                ? theme.pathColor
                : "border-l-2 border-dashed border-slate-700/80 bg-transparent",
            )}
          />
        )}
      </div>

      {/* 2. Lightweight, Tactile Node Card */}
      <div
        onClick={() => onSelectNode(node)}
        className={cn(
          "panel flex-1 mb-4 p-3.5 sm:p-4 transition-all duration-200 cursor-pointer select-none relative overflow-hidden flex flex-col justify-between gap-2.5",
          isCompleted &&
            "border-emerald/30 bg-[#131B2A]/90 hover:border-emerald/60 shadow-[0_4px_16px_-6px_rgba(16,185,129,0.12)] hover:bg-[#131B2A]",
          isActive && cn("border-2 bg-[#131B2A] hover:bg-[#151F30]", theme.border, theme.glow),
          isUpcoming &&
            "border-white/10 bg-[#131B2A]/60 hover:border-white/25 hover:bg-[#131B2A]/90",
        )}
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[11px] font-extrabold text-muted-foreground">
              {node.sequence}.
            </span>
            <h3
              className={cn(
                "font-mono text-sm sm:text-base font-bold tracking-tight transition-colors",
                isCompleted
                  ? "text-foreground group-hover:text-emerald"
                  : isActive
                    ? "text-foreground group-hover:text-cyber"
                    : "text-foreground/90 group-hover:text-foreground",
              )}
            >
              {node.title}
            </h3>
          </div>

          {/* Status Chip & Quick Edit Button */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {isCompleted && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald/50 bg-emerald/10 px-2 py-0.5 font-mono text-[10px] text-emerald font-bold">
                <CheckCircle2 className="size-3" />
                DONE
              </span>
            )}
            {isActive && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold",
                  theme.bgBadge,
                )}
              >
                <Radio className="size-3 animate-pulse" />
                ACTIVE
              </span>
            )}
            {isUpcoming && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-muted-foreground font-semibold">
                UPCOMING
              </span>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectNode(node);
              }}
              className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-primary transition-colors py-0.5 px-1.5 rounded hover:bg-white/5"
            >
              <Edit3 className="size-3 text-primary" />
              <span>Details</span>
              <ChevronRight className="size-3" />
            </button>
          </div>
        </div>

        {/* Compact Description */}
        <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">
          {node.description}
        </p>

        {/* Sub-task Mini Progress & Tags Footer */}
        <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          {/* Progress Indicator */}
          <div className="flex items-center gap-2.5 flex-1 max-w-xs">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className={cn(
                  "h-full transition-all duration-300",
                  isCompleted ? "bg-emerald" : theme.pathColor,
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground font-semibold flex-shrink-0">
              {totalSubTasks > 0
                ? `${completedSubTasks}/${totalSubTasks} tasks`
                : `${progress}%`}
            </span>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {node.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded bg-[#0B0F17] px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground border border-white/10"
              >
                #{tag}
              </span>
            ))}
            {node.tags.length > 3 && (
              <span className="font-mono text-[9px] text-muted-foreground/60">
                +{node.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
