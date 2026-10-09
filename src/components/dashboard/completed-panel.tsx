import { useEffect, useMemo, useState } from "react";
import {
  X,
  RotateCcw,
  ShieldHalf,
  GraduationCap,
  BrainCircuit,
  ChevronDown,
  Clock,
  GitCommit,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type Board, type Pillar, type Task } from "@/lib/dash-data";

interface CompletedPanelProps {
  open: boolean;
  onClose: () => void;
  boards: Board[];
  onToggleTask: (boardId: Pillar, taskId: string) => void;
}

const TRACK_CONFIG: Record<
  Pillar,
  {
    name: string;
    icon: typeof ShieldHalf;
    text: string;
    border: string;
    bg: string;
    badge: string;
  }
> = {
  cyber: {
    name: "Cybersecurity Track",
    icon: ShieldHalf,
    text: "text-cyber",
    border: "border-cyber/40",
    bg: "bg-cyber/10",
    badge: "border-cyber/40 bg-cyber/10 text-cyber",
  },
  gold: {
    name: "Academics & Labs",
    icon: GraduationCap,
    text: "text-gold",
    border: "border-gold/40",
    bg: "bg-gold/10",
    badge: "border-gold/40 bg-gold/10 text-gold",
  },
  emerald: {
    name: "AIML & Extra",
    icon: BrainCircuit,
    text: "text-emerald",
    border: "border-emerald/40",
    bg: "bg-emerald/10",
    badge: "border-emerald/40 bg-emerald/10 text-emerald",
  },
};

function getDateGroupLabel(isoString?: string): string {
  if (!isoString) return "Earlier";
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "Earlier";
    const now = new Date();
    const isToday =
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear();
    if (isToday) return "Today";

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday =
      d.getDate() === yesterday.getDate() &&
      d.getMonth() === yesterday.getMonth() &&
      d.getFullYear() === yesterday.getFullYear();
    if (isYesterday) return "Yesterday";

    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  } catch {
    return "Earlier";
  }
}

function formatCompletionTime(isoString?: string): string | null {
  if (!isoString) return null;
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return null;
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return null;
  }
}

export function CompletedPanel({
  open,
  onClose,
  boards,
  onToggleTask,
}: CompletedPanelProps) {
  // Collapsible sections per track (collapsed by default)
  const [expandedTracks, setExpandedTracks] = useState<Record<Pillar, boolean>>({
    cyber: false,
    gold: false,
    emerald: false,
  });

  // Handle Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const toggleTrack = (pillar: Pillar) => {
    setExpandedTracks((prev) => ({
      ...prev,
      [pillar]: !prev[pillar],
    }));
  };

  const totalCompletedCount = useMemo(() => {
    return boards.reduce(
      (sum, b) => sum + b.tasks.filter((t) => t.done).length,
      0,
    );
  }, [boards]);

  if (!open) return null;

  const tracksOrder: Pillar[] = ["cyber", "gold", "emerald"];

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-start">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in panel on desktop / Bottom sheet on mobile */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Completed tasks"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative z-50 flex flex-col w-full bg-[#0C121E] border border-cyan-400/50 shadow-[0_0_35px_rgba(0,229,255,0.22)]",
          "inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl",
          "md:inset-auto md:ml-24 md:w-[480px] md:max-h-[85vh] md:rounded-2xl",
          "animate-in fade-in-0 slide-in-from-bottom-6 md:slide-in-from-left-6 duration-200 overflow-hidden",
        )}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-border/70 p-4">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
              <CheckCircle2 className="size-4 text-emerald-400" />
            </span>
            <div>
              <h2 className="font-mono text-sm font-bold tracking-wider text-foreground">
                COMPLETED TASKS
              </h2>
              <p className="label-mono mt-0.5 text-[10px] text-muted-foreground">
                {totalCompletedCount} tasks completed across all tracks
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Scrollable Track Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {tracksOrder.map((trackId) => {
            const config = TRACK_CONFIG[trackId];
            const Icon = config.icon;
            const board = boards.find((b) => b.id === trackId);
            const doneTasks = (board?.tasks || []).filter((t) => t.done);
            const isExpanded = expandedTracks[trackId];

            // Sort completed tasks: completedAt descending, tasks without completedAt at the bottom
            const sorted = [...doneTasks].sort((a, b) => {
              if (a.completedAt && b.completedAt) {
                return (
                  new Date(b.completedAt).getTime() -
                  new Date(a.completedAt).getTime()
                );
              }
              if (a.completedAt && !b.completedAt) return -1;
              if (!a.completedAt && b.completedAt) return 1;
              return 0;
            });

            // Group by date
            const groupsMap = new Map<string, Task[]>();
            for (const t of sorted) {
              const label = getDateGroupLabel(t.completedAt);
              const list = groupsMap.get(label);
              if (list) {
                list.push(t);
              } else {
                groupsMap.set(label, [t]);
              }
            }
            const groups = Array.from(groupsMap.entries()).map(
              ([label, tasks]) => ({ label, tasks }),
            );

            return (
              <div
                key={trackId}
                className={cn(
                  "rounded-xl border transition-all duration-200 overflow-hidden",
                  isExpanded
                    ? cn("border-border/80 bg-[#101726]/80", config.border)
                    : "border-border/40 bg-[#0E1522]/60 hover:border-border/70",
                )}
              >
                {/* Collapsible Header */}
                <button
                  type="button"
                  onClick={() => toggleTrack(trackId)}
                  className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-white/[0.02] cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={cn(
                        "grid size-7 shrink-0 place-items-center rounded-md border",
                        config.border,
                        config.bg,
                        config.text,
                      )}
                    >
                      <Icon className="size-3.5" />
                    </span>
                    <span className="font-mono text-xs font-semibold text-foreground truncate">
                      {config.name}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-border/60 bg-background/50 text-muted-foreground tabular-nums shrink-0">
                      {doneTasks.length} completed
                    </span>
                  </div>

                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground transition-transform duration-200 shrink-0",
                      isExpanded && "rotate-180 text-foreground",
                    )}
                  />
                </button>

                {/* Collapsible Content */}
                {isExpanded && (
                  <div className="border-t border-border/40 p-3 pt-2 space-y-3">
                    {doneTasks.length === 0 ? (
                      <p className="py-3 text-center font-mono text-xs text-muted-foreground">
                        No completed tasks in this track yet.
                      </p>
                    ) : (
                      groups.map((group) => (
                        <div key={group.label} className="space-y-1.5">
                          {/* Date Header */}
                          <div className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-1 pt-1">
                            {group.label}
                          </div>

                          {/* Task List */}
                          <div className="space-y-1.5">
                            {group.tasks.map((task) => {
                              const completionTime = formatCompletionTime(
                                task.completedAt,
                              );
                              const critical = task.priority === "critical";

                              return (
                                <div
                                  key={task.id}
                                  className="group flex items-center justify-between gap-2.5 rounded-lg border border-white/5 bg-[#131C2D]/70 p-2.5 transition-all hover:border-white/15 hover:bg-[#131C2D]"
                                >
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 min-w-0">
                                      <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                                      <span className="truncate font-mono text-xs text-slate-300 line-through">
                                        {task.title}
                                      </span>
                                    </div>

                                    {/* Badges row */}
                                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                                      {task.checklist_item_id && (
                                        <span
                                          className="inline-flex items-center gap-1 rounded-[3px] border border-cyan-400/40 bg-cyan-950/40 px-1.5 py-0.2 font-mono text-[9px] tracking-[0.08em] text-cyan-300"
                                          title="Linked to roadmap checklist"
                                        >
                                          <GitCommit className="size-2.5 text-cyan-400" />
                                          ROADMAP
                                        </span>
                                      )}

                                      {critical && (
                                        <span className="rounded-[3px] border border-red-500/40 bg-red-500/10 px-1.5 py-0.2 font-mono text-[9px] text-red-400">
                                          CRITICAL
                                        </span>
                                      )}

                                      <span
                                        className={cn(
                                          "rounded-[3px] border bg-accent/40 px-1.5 py-0.2 font-mono text-[9px]",
                                          config.border,
                                          config.text,
                                        )}
                                      >
                                        {task.tag}
                                      </span>

                                      {(task.actualFocusMinutes ||
                                        task.durationMinutes) && (
                                        <span className="inline-flex items-center gap-1 rounded-[3px] border border-border/50 bg-background/40 px-1.5 py-0.2 font-mono text-[9px] text-muted-foreground">
                                          <Clock className="size-2.5" />
                                          {task.actualFocusMinutes ||
                                            task.durationMinutes}
                                          m
                                        </span>
                                      )}

                                      {completionTime && (
                                        <span className="font-mono text-[9px] text-slate-400">
                                          {completionTime}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Restore Button */}
                                  <button
                                    type="button"
                                    onClick={() => onToggleTask(trackId, task.id)}
                                    title="Restore task to Today"
                                    className="flex items-center gap-1 rounded border border-cyan-500/30 bg-cyan-950/40 px-2 py-1 font-mono text-[10px] text-cyan-300 hover:bg-cyan-900/60 hover:border-cyan-400 transition-colors shrink-0 cursor-pointer"
                                  >
                                    <RotateCcw className="size-2.5" />
                                    <span>Restore</span>
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
