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
  DURATION_PRESETS,
  formatDuration,
  type Pillar,
  type Priority,
  type Task,
} from "@/lib/dash-data";
import { Clock, Hourglass } from "lucide-react";

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
  const [durationMinutes, setDurationMinutes] = useState<number>(45);
  const [isCustomDuration, setIsCustomDuration] = useState(false);
  const [customMinutesInput, setCustomMinutesInput] = useState("45");
  const [date, setDate] = useState("");
  const [tag, setTag] = useState("STUDY");

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
  }, [open, initialPillar, initialTask]);

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
            Log mission parameters and allocated duration.
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
              rows={2}
              placeholder="Lab room, CVE references, chapter numbers…"
              className={cn(field, "resize-none")}
            />
          </div>

          {/* Track Selection */}
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
                Allocated Focus Duration
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
                Custom Mins
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
                {mode === "create" ? "DEPLOY OBJECTIVE" : "SAVE CHANGES"}
              </button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
