import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  BOARD_META,
  PRIORITY_LABEL,
  TAG_OPTIONS,
  DURATION_PRESETS,
  formatDuration,
  type Pillar,
  type Priority,
  type Task,
} from "@/lib/dash-data";
import {
  loadRoadmaps,
  pillarToTrackId,
  type RoadmapNode,
  type RoadmapSubTask,
  type RoadmapSubItem,
  type TrackRoadmap,
  type TrackId,
} from "@/lib/roadmap-data";
import { Clock, Hourglass, ListCheck, GitCommit, CheckCircle2, ChevronDown } from "lucide-react";

const PILLARS: Pillar[] = ["cyber", "gold", "emerald"];
const PRIORITIES: Priority[] = ["critical", "normal", "low"];

const PILLAR_PICK: Record<Pillar, string> = {
  cyber: "border-cyber/60 bg-cyber/10 text-cyber",
  gold: "border-gold/60 bg-gold/10 text-gold",
  emerald: "border-emerald/60 bg-emerald/10 text-emerald",
};

const PRIORITY_PICK: Record<Priority, string> = {
  critical: "border-red-500/60 bg-red-500/10 text-red-400",
  normal: "border-primary/60 bg-primary/10 text-primary",
  low: "border-border bg-accent text-secondary-foreground",
};

const field =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20";

export type ObjectiveDraft = {
  task: Task;
  pillar: Pillar;
};

export function ObjectiveDialog({
  open,
  mode,
  initialPillar,
  initialTask,
  allActiveTasks = [],
  onOpenChange,
  onSubmit,
  onDelete,
}: {
  open: boolean;
  mode: "create" | "edit";
  initialPillar: Pillar;
  initialTask?: Task | null;
  allActiveTasks?: Task[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (draft: ObjectiveDraft, originPillar: Pillar) => void;
  onDelete?: (pillar: Pillar, taskId: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pillar, setPillar] = useState<Pillar>(initialPillar);
  const [priority, setPriority] = useState<Priority>("normal");
  const [durationMinutes, setDurationMinutes] = useState<number>(45);
  const [isCustomDuration, setIsCustomDuration] = useState(false);
  const [customMinutesInput, setCustomMinutesInput] = useState("45");
  const [date, setDate] = useState("");
  const [tag, setTag] = useState("STUDY");

  // Roadmap linking state
  const [selectedNodeId, setSelectedNodeId] = useState<string>("");
  const [selectedChecklistItemId, setSelectedChecklistItemId] = useState<string>("");
  const [roadmapsState, setRoadmapsState] = useState<Record<TrackId, TrackRoadmap>>(() =>
    loadRoadmaps(),
  );

  // Reload roadmaps whenever dialog opens
  useEffect(() => {
    if (open) {
      setRoadmapsState(loadRoadmaps());
    }
  }, [open]);

  // Derive active roadmap nodes for current track
  const currentTrackId = pillarToTrackId(pillar);
  const currentTrack = roadmapsState[currentTrackId];
  const activeMilestoneNodes = useMemo(() => {
    if (!currentTrack?.nodes) return [];
    return currentTrack.nodes.filter(
      (n) => n.status !== "locked" || (n.subTasks && n.subTasks.length > 0),
    );
  }, [currentTrack]);

  // Selected node object
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return activeMilestoneNodes.find((n) => n.id === selectedNodeId) || null;
  }, [selectedNodeId, activeMilestoneNodes]);

  // Set of checklist IDs already active in Today tasks (excluding currently edited task)
  const activeTaskChecklistIds = useMemo(() => {
    const ids = new Set<string>();
    allActiveTasks.forEach((t) => {
      if (t.checklist_item_id && t.id !== initialTask?.id) {
        ids.add(t.checklist_item_id);
      }
    });
    return ids;
  }, [allActiveTasks, initialTask]);

  // Available uncompleted checklist items and sub-items for selected node
  type SelectableOption =
    | { type: "item"; item: RoadmapSubTask }
    | {
        type: "item_with_subs";
        item: RoadmapSubTask;
        subItems: RoadmapSubItem[];
      };

  const selectableOptions = useMemo<SelectableOption[]>(() => {
    if (!selectedNode?.subTasks) return [];
    const result: SelectableOption[] = [];

    for (const item of selectedNode.subTasks) {
      if (item.subItems && item.subItems.length > 0) {
        const availableSubs = item.subItems.filter((si) => {
          if (initialTask && si.id === initialTask.checklist_item_id) return true;
          if (si.completed) return false;
          if (activeTaskChecklistIds.has(si.id)) return false;
          return true;
        });

        const parentAllowed =
          (initialTask && item.id === initialTask.checklist_item_id) ||
          (!item.completed && !activeTaskChecklistIds.has(item.id));

        if (availableSubs.length > 0 || parentAllowed) {
          result.push({
            type: "item_with_subs",
            item,
            subItems: availableSubs,
          });
        }
      } else {
        const isAllowed =
          (initialTask && item.id === initialTask.checklist_item_id) ||
          (!item.completed && !activeTaskChecklistIds.has(item.id));

        if (isAllowed) {
          result.push({
            type: "item",
            item,
          });
        }
      }
    }

    return result;
  }, [selectedNode, initialTask, activeTaskChecklistIds]);

  const totalSelectableCount = useMemo(() => {
    return selectableOptions.reduce((acc, opt) => {
      if (opt.type === "item_with_subs") {
        return acc + opt.subItems.length + 1;
      }
      return acc + 1;
    }, 0);
  }, [selectableOptions]);

  const linkedItemLabel = useMemo(() => {
    if (!selectedNode?.subTasks || !selectedChecklistItemId) return null;
    for (const st of selectedNode.subTasks) {
      if (st.id === selectedChecklistItemId) {
        return st.title;
      }
      if (st.subItems) {
        const sub = st.subItems.find((s) => s.id === selectedChecklistItemId);
        if (sub) {
          return `${st.title} ↳ ${sub.title}`;
        }
      }
    }
    return null;
  }, [selectedNode, selectedChecklistItemId]);

  useEffect(() => {
    if (!open) return;
    setPillar(initialPillar);
    setTitle(initialTask?.title ?? "");
    setDescription(initialTask?.description ?? "");
    setPriority(initialTask?.priority ?? "normal");

    const initialDur = initialTask?.durationMinutes ?? 45;
    setDurationMinutes(initialDur);
    const isPreset = DURATION_PRESETS.some((p) => p.minutes === initialDur);
    setIsCustomDuration(!isPreset);
    setCustomMinutesInput(String(initialDur));

    setDate(initialTask?.date ?? new Date().toISOString().slice(0, 10));
    setTag(initialTask?.tag ?? "STUDY");

    setSelectedNodeId(initialTask?.node_id ?? "");
    setSelectedChecklistItemId(initialTask?.checklist_item_id ?? "");
  }, [open, initialPillar, initialTask]);

  // When track / pillar changes, reset roadmap selections
  const handlePillarChange = (newPillar: Pillar) => {
    setPillar(newPillar);
    setSelectedNodeId("");
    setSelectedChecklistItemId("");
  };

  // When a milestone node is selected
  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setSelectedChecklistItemId("");
  };

  // When a checklist item or sub-item is selected, populate title and attach node_id & checklist_item_id
  const handleChecklistItemSelect = (itemId: string) => {
    setSelectedChecklistItemId(itemId);
    if (!itemId || !selectedNode?.subTasks) return;

    for (const st of selectedNode.subTasks) {
      if (st.subItems) {
        const sub = st.subItems.find((s) => s.id === itemId);
        if (sub) {
          setTitle(sub.title);
          if (tag === "STUDY") {
            if (pillar === "cyber") setTag("LAB");
            else if (pillar === "gold") setTag("CLASS");
            else setTag("BUILD");
          }
          return;
        }
      }
      if (st.id === itemId) {
        setTitle(st.title);
        if (tag === "STUDY") {
          if (pillar === "cyber") setTag("LAB");
          else if (pillar === "gold") setTag("CLASS");
          else setTag("BUILD");
        }
        return;
      }
    }
  };

  const handleSelectPreset = (minutes: number) => {
    setIsCustomDuration(false);
    setDurationMinutes(minutes);
    setCustomMinutesInput(String(minutes));
  };

  const handleCustomChange = (val: string) => {
    setCustomMinutesInput(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setDurationMinutes(parsed);
    }
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = title.trim();
    if (!value) return;

    const finalDuration = durationMinutes > 0 ? durationMinutes : 45;

    onSubmit(
      {
        pillar,
        task: {
          id: initialTask?.id ?? `${pillar}-${Date.now()}`,
          title: value,
          description: description.trim() || undefined,
          priority,
          durationMinutes: finalDuration,
          actualFocusMinutes:
            initialTask?.actualFocusMinutes ?? (initialTask?.done ? finalDuration : 0),
          slot: formatDuration(finalDuration),
          date: date || undefined,
          tag,
          done: initialTask?.done ?? false,
          node_id: selectedNodeId || undefined,
          checklist_item_id: selectedChecklistItemId || undefined,
        },
      },
      initialPillar,
    );
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-surface/95 backdrop-blur sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-sm tracking-[0.18em] text-foreground">
            {mode === "create" ? "NEW TASK" : "EDIT TASK"}
          </DialogTitle>
          <DialogDescription className="label-mono normal-case tracking-normal">
            Set your task details and focus time.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          {/* Track Selection */}
          <div className="space-y-1.5">
            <span className="label-mono block">Track</span>
            <div className="grid grid-cols-3 gap-2">
              {PILLARS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePillarChange(p)}
                  className={cn(
                    "rounded-md border px-2 py-2 font-mono text-[10px] tracking-wide transition-colors",
                    pillar === p
                      ? PILLAR_PICK[p]
                      : "border-border bg-background text-muted-foreground hover:bg-accent",
                  )}
                >
                  {BOARD_META[p].title}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Roadmap Milestone & Checklist Selection */}
          <div className="rounded-lg border border-border/80 bg-[#070B12] p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="label-mono flex items-center gap-1.5 text-foreground font-semibold">
                <GitCommit className="size-3.5 text-primary" />
                LINK TO ROADMAP MILESTONE OR CHECKLIST
              </span>
              <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
                (Optional)
              </span>
            </div>

            {/* First Dropdown: Milestone Nodes */}
            <div className="space-y-1">
              <label
                htmlFor="roadmap-node-select"
                className="font-mono text-[10px] text-muted-foreground tracking-wider block"
              >
                1. SELECT MILESTONE
              </label>
              <div className="relative">
                <select
                  id="roadmap-node-select"
                  value={selectedNodeId}
                  onChange={(e) => handleNodeSelect(e.target.value)}
                  className={cn(
                    field,
                    "font-mono text-xs pr-8 bg-[#0D131F] border-border/70 text-foreground cursor-pointer appearance-none",
                  )}
                >
                  <option value="">-- No milestone linked --</option>
                  {activeMilestoneNodes.map((node) => {
                    const uncompletedCount = (node.subTasks || []).reduce((sum, st) => {
                      if (st.subItems && st.subItems.length > 0) {
                        return (
                          sum +
                          st.subItems.filter(
                            (si) => !si.completed && !activeTaskChecklistIds.has(si.id),
                          ).length
                        );
                      }
                      return (
                        sum + (!st.completed && !activeTaskChecklistIds.has(st.id) ? 1 : 0)
                      );
                    }, 0);
                    return (
                      <option key={node.id} value={node.id}>
                        {node.sequence}. {node.title} ({uncompletedCount} available)
                      </option>
                    );
                  })}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              </div>
            </div>

            {/* Second Dropdown (Cascading): Uncompleted Checklist Items */}
            {selectedNodeId && (
              <div className="space-y-1 pt-1 border-t border-white/5 animate-in fade-in-50 duration-200">
                <label
                  htmlFor="roadmap-item-select"
                  className="font-mono text-[10px] text-muted-foreground tracking-wider flex items-center justify-between"
                >
                  <span className="flex items-center gap-1">
                    <ListCheck className="size-3 text-cyan-400" />
                    2. SELECT CHECKLIST ITEM
                  </span>
                  {totalSelectableCount === 0 && (
                    <span className="text-amber-400 text-[10px]">
                      All items completed or in queue
                    </span>
                  )}
                </label>

                {totalSelectableCount > 0 ? (
                  <div className="relative">
                    <select
                      id="roadmap-item-select"
                      value={selectedChecklistItemId}
                      onChange={(e) => handleChecklistItemSelect(e.target.value)}
                      className={cn(
                        field,
                        "font-mono text-xs pr-8 bg-[#0D131F] border-border/70 text-foreground cursor-pointer appearance-none",
                      )}
                    >
                      <option value="">-- Select an item to fill in title --</option>
                      {selectableOptions.map((opt) => {
                        if (opt.type === "item_with_subs") {
                          return (
                            <optgroup key={opt.item.id} label={opt.item.title}>
                              <option value={opt.item.id}>
                                {opt.item.title} (Entire checklist item)
                              </option>
                              {opt.subItems.map((sub) => (
                                <option key={sub.id} value={sub.id}>
                                  ↳ {sub.title}
                                </option>
                              ))}
                            </optgroup>
                          );
                        }
                        return (
                          <option key={opt.item.id} value={opt.item.id}>
                            {opt.item.title}
                          </option>
                        );
                      })}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  </div>
                ) : (
                  <div className="rounded border border-amber-500/20 bg-amber-950/20 px-3 py-2 font-mono text-xs text-amber-300/90 flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-400 shrink-0" />
                    <span>No uncompleted checklist items available for this milestone.</span>
                  </div>
                )}

                {selectedChecklistItemId && (
                  <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-emerald-400">
                    <span
                      className="flex items-center gap-1 truncate max-w-[80%]"
                      title={linkedItemLabel || undefined}
                    >
                      <CheckCircle2 className="size-3 shrink-0" />
                      <span className="truncate">
                        {linkedItemLabel
                          ? `Linked: ${linkedItemLabel}`
                          : "Linked to roadmap checklist"}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedChecklistItemId("");
                      }}
                      className="text-muted-foreground hover:text-foreground text-[10px] underline cursor-pointer shrink-0"
                    >
                      Unlink
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="label-mono block" htmlFor="obj-title">
              Task title
            </label>
            <input
              id="obj-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
              placeholder="e.g. Finish lab exercises"
              className={field}
            />
          </div>

          <div className="space-y-1.5">
            <label className="label-mono block" htmlFor="obj-desc">
              Notes
            </label>
            <textarea
              id="obj-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="References, chapter numbers, or specific steps…"
              className={cn(field, "resize-none")}
            />
          </div>

          {/* Priority Selection */}
          <div className="space-y-1.5">
            <span className="label-mono block">Priority</span>
            <div className="grid grid-cols-3 gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={cn(
                    "rounded-md border px-2 py-2 font-mono text-[10px] tracking-[0.12em] transition-colors",
                    priority === p
                      ? PRIORITY_PICK[p]
                      : "border-border bg-background text-muted-foreground hover:bg-accent",
                  )}
                >
                  {PRIORITY_LABEL[p]}
                </button>
              ))}
            </div>
          </div>

          {/* Allocated Duration Quick Pick */}
          <div className="space-y-2 rounded-lg border border-white/5 bg-[#0B0F17] p-3">
            <div className="flex items-center justify-between">
              <span className="label-mono flex items-center gap-1.5 text-foreground font-bold">
                <Clock className="size-3 text-cyan-400" />
                Estimated focus time
              </span>
              <span className="font-mono text-xs font-bold text-cyan-400">
                {formatDuration(durationMinutes)}
              </span>
            </div>

            {/* Duration Pills */}
            <div className="grid grid-cols-5 gap-1.5">
              {DURATION_PRESETS.map((preset) => {
                const isSelected = !isCustomDuration && durationMinutes === preset.minutes;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleSelectPreset(preset.minutes)}
                    className={cn(
                      "rounded-md border py-1.5 font-mono text-xs font-semibold transition-all",
                      isSelected
                        ? "border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-[0_0_10px_rgba(0,229,255,0.3)]"
                        : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground",
                    )}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {/* Custom Duration Toggle & Input */}
            <div className="pt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCustomDuration(true)}
                className={cn(
                  "rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors",
                  isCustomDuration
                    ? "border-gold/60 bg-gold/10 text-gold"
                    : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10",
                )}
              >
                Custom
              </button>

              {isCustomDuration && (
                <div className="flex items-center gap-1.5 flex-1">
                  <input
                    type="number"
                    min="5"
                    max="480"
                    step="5"
                    value={customMinutesInput}
                    onChange={(e) => handleCustomChange(e.target.value)}
                    placeholder="e.g. 75"
                    className={cn(field, "font-mono text-xs py-1 h-8")}
                  />
                  <span className="font-mono text-[11px] text-muted-foreground">minutes</span>
                </div>
              )}
            </div>
          </div>

          {/* Date & Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="label-mono block" htmlFor="obj-date">
                Target Date
              </label>
              <input
                id="obj-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={cn(field, "font-mono")}
              />
            </div>

            <div className="space-y-1.5">
              <span className="label-mono block">Tag / type</span>
              <div className="flex flex-wrap gap-1.5">
                {TAG_OPTIONS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTag(t)}
                    className={cn(
                      "rounded-md border px-2 py-1 font-mono text-[10px] tracking-[0.08em] transition-colors",
                      tag === t
                        ? "border-primary/60 bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:bg-accent",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between sm:justify-between gap-2 pt-2">
            <div>
              {mode === "edit" && initialTask && onDelete && (
                <button
                  type="button"
                  onClick={() => {
                    onDelete(initialPillar, initialTask.id);
                    onOpenChange(false);
                  }}
                  className="rounded-md border border-red-500/30 bg-red-950/40 px-3 py-2 font-mono text-[11px] font-semibold tracking-wide text-red-400 transition-colors hover:bg-red-900/50"
                >
                  DELETE
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-md border border-border bg-background px-4 py-2 font-mono text-[11px] tracking-wide text-muted-foreground transition-colors hover:bg-accent"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="rounded-md border border-primary/60 bg-primary/10 px-4 py-2 font-mono text-[11px] tracking-wide text-primary transition-all hover:bg-primary/20 hover:shadow-[0_0_18px_-4px_rgba(0,229,255,0.45)]"
              >
                {mode === "create" ? "ADD TASK" : "SAVE CHANGES"}
              </button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
