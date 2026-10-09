import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Trash2, Milestone, Shield, BookOpen, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type NodeStatus,
  type RoadmapNode,
  type RoadmapSubTask,
  type RoadmapSubItem,
  type TrackId,
} from "@/lib/roadmap-data";

interface ChecklistDraftItem {
  title: string;
  subItems: string[];
}

interface AddMilestoneModalProps {
  open: boolean;
  activeTrackId: TrackId;
  existingNodesCount: number;
  onOpenChange: (open: boolean) => void;
  onAddNode: (newNode: RoadmapNode) => void;
}

export function AddMilestoneModal({
  open,
  activeTrackId,
  existingNodesCount,
  onOpenChange,
  onAddNode,
}: AddMilestoneModalProps) {
  const nextSeq = String(existingNodesCount + 1).padStart(2, "0");
  const [sequence, setSequence] = useState(nextSeq);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [trackId, setTrackId] = useState<TrackId>(activeTrackId);
  const [status, setStatus] = useState<NodeStatus>("active");
  const [tagInput, setTagInput] = useState("");
  const [estimatedHours, setEstimatedHours] = useState<number>(40);
  const [checklistItems, setChecklistItems] = useState<ChecklistDraftItem[]>([
    { title: "", subItems: [] },
    { title: "", subItems: [] },
  ]);

  const handleItemTitleChange = (index: number, value: string) => {
    const next = [...checklistItems];
    next[index] = { ...next[index], title: value };
    setChecklistItems(next);
  };

  const handleAddItem = () => {
    setChecklistItems([...checklistItems, { title: "", subItems: [] }]);
  };

  const handleRemoveItem = (index: number) => {
    if (checklistItems.length === 1) {
      setChecklistItems([{ title: "", subItems: [] }]);
      return;
    }
    setChecklistItems(checklistItems.filter((_, i) => i !== index));
  };

  const handleAddSubItem = (itemIndex: number) => {
    const next = [...checklistItems];
    next[itemIndex] = {
      ...next[itemIndex],
      subItems: [...next[itemIndex].subItems, ""],
    };
    setChecklistItems(next);
  };

  const handleSubItemChange = (itemIndex: number, subIndex: number, value: string) => {
    const next = [...checklistItems];
    const updatedSubs = [...next[itemIndex].subItems];
    updatedSubs[subIndex] = value;
    next[itemIndex] = { ...next[itemIndex], subItems: updatedSubs };
    setChecklistItems(next);
  };

  const handleRemoveSubItem = (itemIndex: number, subIndex: number) => {
    const next = [...checklistItems];
    next[itemIndex] = {
      ...next[itemIndex],
      subItems: next[itemIndex].subItems.filter((_, j) => j !== subIndex),
    };
    setChecklistItems(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedSubTasks: RoadmapSubTask[] = checklistItems
      .filter((item) => item.title.trim().length > 0)
      .map((item, i) => {
        const validSubs: RoadmapSubItem[] = item.subItems
          .filter((si) => si.trim().length > 0)
          .map((si, j) => ({
            id: `si-${Date.now()}-${i}-${j}-${Math.random().toString(36).slice(2, 6)}`,
            title: si.trim(),
            completed: status === "completed",
          }));

        return {
          id: `st-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
          title: item.title.trim(),
          completed: status === "completed",
          ...(validSubs.length > 0 ? { subItems: validSubs } : {}),
        };
      });

    const parsedTags = tagInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newNode: RoadmapNode = {
      id: `node-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      sequence: sequence.trim() || nextSeq,
      title: title.trim(),
      description: description.trim() || "Milestone parameters pending...",
      trackId: trackId,
      status: status,
      tags: parsedTags.length > 0 ? parsedTags : ["PATH"],
      estimatedHours: Number(estimatedHours) || 40,
      subTasks: parsedSubTasks,
    };

    onAddNode(newNode);
    onOpenChange(false);

    // reset
    setTitle("");
    setDescription("");
    setTagInput("");
    setChecklistItems([
      { title: "", subItems: [] },
      { title: "", subItems: [] },
    ]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#131B2A] p-6 sm:max-w-lg text-foreground">
        <DialogHeader className="space-y-2 text-left">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded bg-primary/15 text-primary border border-primary/30">
              <Milestone className="size-4" />
            </span>
            <DialogTitle className="font-mono text-base font-bold tracking-wide text-foreground">
              INITIALIZE NEW MILESTONE NODE
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Add a progressive skill-tree waypoint with custom objectives.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Target Track */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Target Track Vector
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTrackId("cyber")}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-lg border p-2 font-mono text-[11px] transition-all",
                  trackId === "cyber"
                    ? "border-cyber bg-cyber/15 text-cyber font-bold shadow-[0_0_10px_rgba(0,229,255,0.15)]"
                    : "border-white/10 bg-[#0B0F17] text-muted-foreground hover:text-foreground",
                )}
              >
                <Shield className="size-3" />
                CYBER
              </button>
              <button
                type="button"
                onClick={() => setTrackId("academics")}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-lg border p-2 font-mono text-[11px] transition-all",
                  trackId === "academics"
                    ? "border-gold bg-gold/15 text-gold font-bold shadow-[0_0_10px_rgba(255,179,0,0.15)]"
                    : "border-white/10 bg-[#0B0F17] text-muted-foreground hover:text-foreground",
                )}
              >
                <BookOpen className="size-3" />
                ACADEMICS
              </button>
              <button
                type="button"
                onClick={() => setTrackId("aiml")}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-lg border p-2 font-mono text-[11px] transition-all",
                  trackId === "aiml"
                    ? "border-emerald bg-emerald/15 text-emerald font-bold shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                    : "border-white/10 bg-[#0B0F17] text-muted-foreground hover:text-foreground",
                )}
              >
                <Cpu className="size-3" />
                AIML
              </button>
            </div>
          </div>

          {/* Sequence & Title */}
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1 space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Sequence
              </label>
              <input
                type="text"
                value={sequence}
                onChange={(e) => setSequence(e.target.value)}
                placeholder="05"
                className="w-full rounded-md border border-white/15 bg-[#0B0F17] px-3 py-2 font-mono text-xs text-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <div className="col-span-3 space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Milestone Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Reverse Engineering & Binary Exploitation"
                className="w-full rounded-md border border-white/15 bg-[#0B0F17] px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Strategic Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Key concepts, laboratory challenges, or core systems..."
              className="w-full rounded-md border border-white/15 bg-[#0B0F17] px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
            />
          </div>

          {/* Initial Status & Tags */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as NodeStatus)}
                className="w-full rounded-md border border-white/15 bg-[#0B0F17] px-3 py-2 font-mono text-xs text-foreground focus:border-primary focus:outline-none"
              >
                <option value="active">Active / In-Progress</option>
                <option value="locked">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Ghidra, Assembly, GDB"
                className="w-full rounded-md border border-white/15 bg-[#0B0F17] px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Sub-Tasks Checklist Initial Setup */}
          <div className="space-y-2 rounded-lg border border-white/10 bg-[#0B0F17] p-3">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Action items and checklist
              </label>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center gap-1 font-mono text-[10px] text-primary hover:underline"
              >
                <Plus className="size-3" />
                ADD ITEM
              </button>
            </div>

            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {checklistItems.map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground w-4 text-right">
                      {i + 1}.
                    </span>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleItemTitleChange(i, e.target.value)}
                      placeholder={`Checklist item ${i + 1}`}
                      className="flex-1 rounded border border-white/10 bg-[#131B2A] px-2.5 py-1.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddSubItem(i)}
                      title="Add sub-task"
                      className="flex items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 py-1 font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Plus className="size-2.5" />
                      <span>Sub-task</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(i)}
                      className="text-muted-foreground hover:text-red-400 p-1"
                    >
                      <Trash2 className="size-3" />
                    </button>
                  </div>

                  {item.subItems.length > 0 && (
                    <div className="ml-6 space-y-1.5 border-l border-white/10 pl-3">
                      {item.subItems.map((si, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <span className="font-mono text-[9px] text-muted-foreground/70">
                            ↳
                          </span>
                          <input
                            type="text"
                            value={si}
                            onChange={(e) => handleSubItemChange(i, j, e.target.value)}
                            placeholder={`Sub-task ${j + 1}`}
                            className="flex-1 rounded border border-white/10 bg-[#101725] px-2 py-1 font-mono text-[11px] text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSubItem(i, j)}
                            className="text-muted-foreground/60 hover:text-red-400 p-0.5"
                          >
                            <Trash2 className="size-2.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-md border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-muted-foreground hover:text-foreground"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-1.5 rounded-md border border-white/10 bg-primary px-5 py-2 font-mono text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Plus className="size-3.5" />
              CREATE NODE
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
