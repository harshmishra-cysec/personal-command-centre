import { useEffect, useState } from "react";
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
  type Pillar,
  type Priority,
  type Task,
} from "@/lib/dash-data";

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
  onOpenChange,
  onSubmit,
  onDelete,
}: {
  open: boolean;
  mode: "create" | "edit";
  initialPillar: Pillar;
  initialTask?: Task | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (draft: ObjectiveDraft, originPillar: Pillar) => void;
  onDelete?: (pillar: Pillar, taskId: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pillar, setPillar] = useState<Pillar>(initialPillar);
  const [priority, setPriority] = useState<Priority>("normal");
  const [slot, setSlot] = useState("09:00");
  const [date, setDate] = useState("");
  const [tag, setTag] = useState("STUDY");

  useEffect(() => {
    if (!open) return;
    setPillar(initialPillar);
    setTitle(initialTask?.title ?? "");
    setDescription(initialTask?.description ?? "");
    setPriority(initialTask?.priority ?? "normal");
    setSlot(initialTask?.slot && initialTask.slot !== "—" ? initialTask.slot : "09:00");
    setDate(initialTask?.date ?? new Date().toISOString().slice(0, 10));
    setTag(initialTask?.tag ?? "STUDY");
  }, [open, initialPillar, initialTask]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = title.trim();
    if (!value) return;
    onSubmit(
      {
        pillar,
        task: {
          id: initialTask?.id ?? `${pillar}-${Date.now()}`,
          title: value,
          description: description.trim() || undefined,
          priority,
          slot: slot || "—",
          date: date || undefined,
          tag,
          done: initialTask?.done ?? false,
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
            {mode === "create" ? "NEW OBJECTIVE" : "EDIT OBJECTIVE"}
          </DialogTitle>
          <DialogDescription className="label-mono normal-case tracking-normal">
            Log the mission parameters. Title is required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="label-mono block" htmlFor="obj-title">
              Objective title
            </label>
            <input
              id="obj-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
              placeholder="e.g. Finish TryHackMe AD room"
              className={field}
            />
          </div>

          <div className="space-y-1.5">
            <label className="label-mono block" htmlFor="obj-desc">
              Description / notes
            </label>
            <textarea
              id="obj-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Lab room, CVE references, chapter numbers…"
              className={cn(field, "resize-none")}
            />
          </div>

          <div className="space-y-1.5">
            <span className="label-mono block">Track</span>
            <div className="grid grid-cols-3 gap-2">
              {PILLARS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPillar(p)}
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

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="label-mono block" htmlFor="obj-time">
                Time
              </label>
              <input
                id="obj-time"
                type="time"
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className={cn(field, "font-mono")}
              />
            </div>
            <div className="space-y-1.5">
              <label className="label-mono block" htmlFor="obj-date">
                Date
              </label>
              <input
                id="obj-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={cn(field, "font-mono")}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="label-mono block">Tag / type</span>
            <div className="flex flex-wrap gap-2">
              {TAG_OPTIONS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(t)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] transition-colors",
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

          <DialogFooter className="flex items-center justify-between sm:justify-between gap-2">
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
                {mode === "create" ? "DEPLOY OBJECTIVE" : "SAVE CHANGES"}
              </button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}