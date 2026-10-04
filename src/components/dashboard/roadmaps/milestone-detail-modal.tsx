import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle2,
  Radio,
  Clock,
  Plus,
  Trash2,
  Tag,
  CheckSquare,
  Square,
  AlertTriangle,
  FileEdit,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  calculateNodeProgress,
  type NodeStatus,
  type RoadmapNode,
  type RoadmapSubTask,
  type TrackId,
} from "@/lib/roadmap-data";

interface MilestoneDetailModalProps {
  node: RoadmapNode | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateNode: (updatedNode: RoadmapNode) => void;
  onDeleteNode: (nodeId: string, trackId: TrackId) => void;
}

export function MilestoneDetailModal({
  node,
  open,
  onOpenChange,
  onUpdateNode,
  onDeleteNode,
}: MilestoneDetailModalProps) {
  // Local edit states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sequence, setSequence] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [estimatedHours, setEstimatedHours] = useState<number>(40);
  const [status, setStatus] = useState<NodeStatus>("active");
  const [subTasks, setSubTasks] = useState<RoadmapSubTask[]>([]);
  const [newSubTaskTitle, setNewSubTaskTitle] = useState("");
  const [isEditingMeta, setIsEditingMeta] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Sync state when node changes
  useEffect(() => {
    if (node) {
      setTitle(node.title);
      setDescription(node.description);
      setSequence(node.sequence);
      setTagsInput(node.tags.join(", "));
      setEstimatedHours(node.estimatedHours || 40);
      setStatus(node.status);
      setSubTasks(node.subTasks || []);
      setIsEditingMeta(false);
      setConfirmDelete(false);
    }
  }, [node, open]);

  if (!node) return null;

  const getAccentStyles = () => {
    switch (node.trackId) {
      case "cyber":
        return {
          badge: "border-cyber/50 bg-cyber/10 text-cyber",
          bar: "bg-cyber",
          text: "text-cyber",
          border: "border-cyber",
        };
      case "academics":
        return {
          badge: "border-gold/50 bg-gold/10 text-gold",
          bar: "bg-gold",
          text: "text-gold",
          border: "border-gold",
        };
      case "aiml":
        return {
          badge: "border-emerald/50 bg-emerald/10 text-emerald",
          bar: "bg-emerald",
          text: "text-emerald",
          border: "border-emerald",
        };
      default:
        return {
          badge: "border-cyber/50 bg-cyber/10 text-cyber",
          bar: "bg-cyber",
          text: "text-cyber",
          border: "border-cyber",
        };
    }
  };

  const styles = getAccentStyles();

  // Calculate live progress from local subTasks
  const completedSubTasksCount = subTasks.filter((st) => st.completed).length;
  const progress =
    subTasks.length > 0
      ? Math.round((completedSubTasksCount / subTasks.length) * 100)
      : status === "completed"
        ? 100
        : 0;

  const handleToggleSubTask = (subTaskId: string) => {
    const updatedSubTasks = subTasks.map((st) =>
      st.id === subTaskId ? { ...st, completed: !st.completed } : st,
    );
    setSubTasks(updatedSubTasks);

    const allDone = updatedSubTasks.length > 0 && updatedSubTasks.every((st) => st.completed);
    let newStatus = status;
    if (allDone) {
      newStatus = "completed";
      setStatus("completed");
    } else if (status === "completed" && !allDone) {
      newStatus = "active";
      setStatus("active");
    }

    const updatedNode: RoadmapNode = {
      ...node,
      title,
      description,
      sequence,
      estimatedHours,
      subTasks: updatedSubTasks,
      status: newStatus,
    };
    onUpdateNode(updatedNode);
  };

  const handleAddSubTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubTaskTitle.trim()) return;

    const newSub: RoadmapSubTask = {
      id: `st-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: newSubTaskTitle.trim(),
      completed: false,
    };

    const updatedSubTasks = [...subTasks, newSub];
    setSubTasks(updatedSubTasks);
    setNewSubTaskTitle("");

    const updatedNode: RoadmapNode = {
      ...node,
      title,
      description,
      sequence,
      estimatedHours,
      subTasks: updatedSubTasks,
      status: status === "completed" ? "active" : status,
    };
    onUpdateNode(updatedNode);
  };

  const handleDeleteSubTask = (subTaskId: string) => {
    const updatedSubTasks = subTasks.filter((st) => st.id !== subTaskId);
    setSubTasks(updatedSubTasks);

    const allDone = updatedSubTasks.length > 0 && updatedSubTasks.every((st) => st.completed);
    const newStatus = allDone ? "completed" : status;

    const updatedNode: RoadmapNode = {
      ...node,
      title,
      description,
      sequence,
      estimatedHours,
      subTasks: updatedSubTasks,
      status: newStatus,
    };
    onUpdateNode(updatedNode);
  };

  const handleSetStatus = (newStatus: NodeStatus) => {
    setStatus(newStatus);
    let updatedSubTasks = [...subTasks];
    if (newStatus === "completed") {
      updatedSubTasks = updatedSubTasks.map((st) => ({ ...st, completed: true }));
      setSubTasks(updatedSubTasks);
    }

    const updatedNode: RoadmapNode = {
      ...node,
      title,
      description,
      sequence,
      estimatedHours,
      status: newStatus,
      subTasks: updatedSubTasks,
    };
    onUpdateNode(updatedNode);
  };

  const handleSaveMetadata = () => {
    const parsedTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const updatedNode: RoadmapNode = {
      ...node,
      title: title.trim() || node.title,
      description: description.trim() || node.description,
      sequence: sequence.trim() || node.sequence,
      estimatedHours: Number(estimatedHours) || 40,
      tags: parsedTags.length > 0 ? parsedTags : node.tags,
      status,
      subTasks,
    };

    onUpdateNode(updatedNode);
    setIsEditingMeta(false);
  };

  const handleExecuteDelete = () => {
    onDeleteNode(node.id, node.trackId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#131B2A] p-6 sm:max-w-2xl text-foreground">
        <DialogHeader className="space-y-3 text-left">
          {/* Top Bar with Track Badge & Status Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-muted-foreground">
                MILESTONE · {sequence}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase font-bold tracking-wider",
                  styles.badge,
                )}
              >
                {node.trackId.toUpperCase()} TRACK
              </span>
            </div>

            {/* Quick Status Buttons */}
            <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#0B0F17] p-1">
              <button
                type="button"
                onClick={() => handleSetStatus("completed")}
                className={cn(
                  "flex items-center gap-1 rounded px-2.5 py-1 font-mono text-[10px] font-bold transition-all",
                  status === "completed"
                    ? "bg-emerald/20 text-emerald border border-emerald/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <CheckCircle2 className="size-3" />
                COMPLETED
              </button>
              <button
                type="button"
                onClick={() => handleSetStatus("active")}
                className={cn(
                  "flex items-center gap-1 rounded px-2.5 py-1 font-mono text-[10px] font-bold transition-all",
                  status === "active"
                    ? "bg-cyber/20 text-cyber border border-cyber/40 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Radio className="size-3 animate-pulse" />
                IN PROGRESS
              </button>
              <button
                type="button"
                onClick={() => handleSetStatus("locked")}
                className={cn(
                  "flex items-center gap-1 rounded px-2.5 py-1 font-mono text-[10px] font-bold transition-all",
                  status === "locked"
                    ? "bg-white/10 text-muted-foreground border border-white/20"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                UPCOMING
              </button>
            </div>
          </div>

          {/* Node Title & Edit Metadata Toggle */}
          <div>
            {!isEditingMeta ? (
              <div className="flex items-start justify-between gap-3">
                <div>
                  <DialogTitle className="font-mono text-lg sm:text-xl font-bold tracking-wide text-foreground">
                    {title}
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-xs text-muted-foreground">
                    Milestone details and checklist.
                  </DialogDescription>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingMeta(true)}
                  className="flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                >
                  <FileEdit className="size-3 text-primary" />
                  <span>Edit details</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 rounded-lg border border-primary/40 bg-[#0B0F17] p-3.5 mt-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary flex items-center gap-1.5">
                    <FileEdit className="size-3.5" />
                    Edit milestone details
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    Settings
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-1 space-y-1">
                    <label className="font-mono text-[10px] text-muted-foreground">SEQ</label>
                    <input
                      type="text"
                      value={sequence}
                      onChange={(e) => setSequence(e.target.value)}
                      className="w-full rounded border border-white/15 bg-[#131B2A] px-2 py-1 font-mono text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="col-span-3 space-y-1">
                    <label className="font-mono text-[10px] text-muted-foreground">TITLE</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded border border-white/15 bg-[#131B2A] px-2.5 py-1 text-xs font-bold text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-muted-foreground">DESCRIPTION</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded border border-white/15 bg-[#131B2A] px-2.5 py-1 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-muted-foreground">
                      TAGS (COMMA SEPARATED)
                    </label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="w-full rounded border border-white/15 bg-[#131B2A] px-2.5 py-1 font-mono text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-muted-foreground">
                      ESTIMATED HOURS
                    </label>
                    <input
                      type="number"
                      value={estimatedHours}
                      onChange={(e) => setEstimatedHours(Number(e.target.value))}
                      className="w-full rounded border border-white/15 bg-[#131B2A] px-2.5 py-1 font-mono text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsEditingMeta(false)}
                    className="rounded border border-white/10 px-3 py-1 font-mono text-[11px] text-muted-foreground hover:text-foreground"
                  >
                    CANCEL
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveMetadata}
                    className="rounded bg-primary px-3.5 py-1 font-mono text-[11px] font-bold text-primary-foreground hover:bg-primary/90"
                  >
                    APPLY CHANGES
                  </button>
                </div>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Description View */}
          {!isEditingMeta && (
            <div className="rounded-lg border border-white/10 bg-[#0B0F17]/80 p-4">
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
                <Sparkles className="size-3 text-primary" />
                Overview
              </h4>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">{description}</p>

              {/* Tags & Time */}
              <div className="mt-3 flex flex-wrap items-center gap-2 pt-3 border-t border-white/10">
                {tagsInput
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-foreground/80 border border-white/10"
                    >
                      <Tag className="size-2.5 text-muted-foreground" />
                      {tag}
                    </span>
                  ))}
                <span className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                  <Clock className="size-3" />
                  EST. {estimatedHours}H
                </span>
              </div>
            </div>
          )}

          {/* Sub-Tasks / Directives Checklist */}
          <div className="rounded-lg border border-white/10 bg-[#0B0F17]/80 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                  Checklist
                </span>
                <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {completedSubTasksCount} of {subTasks.length} completed
                </span>
              </div>
              <span className={cn("font-mono text-xs font-bold", styles.text)}>{progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className={cn("h-full transition-all duration-300", styles.bar)}
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Checklist Items */}
            <div className="space-y-2 pt-1">
              {subTasks.length === 0 ? (
                <div className="py-4 text-center font-mono text-xs text-muted-foreground">
                  No checklist items yet. Add one below to track progress.
                </div>
              ) : (
                subTasks.map((subTask) => (
                  <div
                    key={subTask.id}
                    className={cn(
                      "group flex items-start gap-3 rounded-lg border p-2.5 transition-all",
                      subTask.completed
                        ? "border-white/5 bg-white/5 text-muted-foreground"
                        : "border-white/10 bg-[#131B2A] hover:border-white/20 text-foreground",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => handleToggleSubTask(subTask.id)}
                      className="mt-0.5 flex-shrink-0 cursor-pointer text-primary transition-transform active:scale-95"
                    >
                      {subTask.completed ? (
                        <CheckSquare className="size-4 text-emerald" />
                      ) : (
                        <Square className="size-4 text-muted-foreground group-hover:text-primary" />
                      )}
                    </button>
                    <span
                      onClick={() => handleToggleSubTask(subTask.id)}
                      className={cn(
                        "flex-1 text-xs cursor-pointer select-none leading-relaxed",
                        subTask.completed && "line-through text-muted-foreground",
                      )}
                    >
                      {subTask.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSubTask(subTask.id)}
                      className="text-muted-foreground/60 hover:text-red-400 p-1 transition-colors"
                      title="Remove checklist item"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Add Sub-Task Form */}
            <form onSubmit={handleAddSubTask} className="flex gap-2 pt-2">
              <input
                type="text"
                value={newSubTaskTitle}
                onChange={(e) => setNewSubTaskTitle(e.target.value)}
                placeholder="Add a checklist item or task..."
                className="flex-1 rounded-md border border-white/15 bg-[#131B2A] px-3 py-1.5 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                disabled={!newSubTaskTitle.trim()}
                className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/10 px-3.5 py-1.5 font-mono text-xs font-bold text-foreground transition-colors hover:bg-white/20 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus className="size-3.5" />
                ADD
              </button>
            </form>
          </div>
        </div>

        {/* Footer Actions with Working Delete */}
        <DialogFooter className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4 mt-2">
          {!confirmDelete ? (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 hover:underline font-mono"
            >
              <Trash2 className="size-3.5" />
              Delete milestone
            </button>
          ) : (
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-red-400 flex items-center gap-1">
                <AlertTriangle className="size-3.5" />
                Are you sure?
              </span>
              <button
                type="button"
                onClick={handleExecuteDelete}
                className="rounded bg-red-500/20 border border-red-500/50 px-2 py-1 text-red-300 font-bold hover:bg-red-500/30"
              >
                YES, DELETE
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="rounded border border-white/10 px-2 py-1 text-muted-foreground hover:text-foreground"
              >
                CANCEL
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto rounded-md border border-white/10 bg-primary px-5 py-2 font-mono text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            SAVE & CLOSE
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
