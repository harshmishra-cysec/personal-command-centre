import {
  Check,
  Plus,
  ShieldHalf,
  GraduationCap,
  BrainCircuit,
  Play,
  Clock,
  GitCommit,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDuration, type Board, type Pillar, type Task } from "@/lib/dash-data";

export const THEME: Record<
  Pillar,
  { text: string; border: string; bg: string; ring: string; glow: string; icon: typeof ShieldHalf }
> = {
  cyber: {
    text: "text-cyber",
    border: "border-cyber/40",
    bg: "bg-cyber",
    ring: "focus-visible:border-cyber focus-visible:ring-cyber/20",
    glow: "hover:shadow-[0_0_18px_-4px_rgba(0,229,255,0.35)] hover:border-cyber/60",
    icon: ShieldHalf,
  },
  gold: {
    text: "text-gold",
    border: "border-gold/40",
    bg: "bg-gold",
    ring: "focus-visible:border-gold focus-visible:ring-gold/20",
    glow: "hover:shadow-[0_0_18px_-4px_rgba(255,179,0,0.35)] hover:border-gold/60",
    icon: GraduationCap,
  },
  emerald: {
    text: "text-emerald",
    border: "border-emerald/40",
    bg: "bg-emerald",
    ring: "focus-visible:border-emerald focus-visible:ring-emerald/20",
    glow: "hover:shadow-[0_0_18px_-4px_rgba(16,185,129,0.35)] hover:border-emerald/60",
    icon: BrainCircuit,
  },
};

export function PillarBoard({
  board,
  onToggle,
  onNew,
  onOpenTask,
  onStartTimer,
}: {
  board: Board;
  onToggle: (boardId: Pillar, taskId: string) => void;
  onNew: (boardId: Pillar) => void;
  onOpenTask: (boardId: Pillar, task: Task) => void;
  onStartTimer?: (boardId: Pillar, task: Task) => void;
}) {
  const theme = THEME[board.id];
  const Icon = theme.icon;
  const done = board.tasks.filter((t) => t.done).length;

  return (
    <section className="panel flex min-h-0 flex-col">
      <div className="flex items-start gap-3 border-b border-border p-4">
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-md border bg-background",
            theme.border,
            theme.text,
          )}
        >
          <Icon className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-display text-sm font-semibold tracking-wide text-foreground">
            {board.title}
          </h2>
          <p className="label-mono mt-0.5 truncate normal-case tracking-normal">{board.subtitle}</p>
        </div>
        <span className="shrink-0 rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground tabular-nums">
          {done}/{board.tasks.length}
        </span>
      </div>

      <div className="border-b border-border p-3">
        <button
          type="button"
          onClick={() => onNew(board.id)}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-md border bg-background px-3 py-2 font-mono text-[11px] tracking-[0.12em] transition-all hover:bg-accent cursor-pointer",
            theme.border,
            theme.text,
            theme.glow,
          )}
        >
          <Plus className="size-3.5" />
          NEW TASK
        </button>
      </div>

      <ul className="scroll-thin max-h-[360px] flex-1 space-y-2 overflow-y-auto p-3 lg:max-h-[460px]">
        {board.tasks.map((task) => {
          const critical = task.priority === "critical";
          const durationStr = formatDuration(task.durationMinutes || 45);

          return (
            <li key={task.id}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => onOpenTask(board.id, task)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpenTask(board.id, task);
                  }
                }}
                className={cn(
                  "group flex w-full cursor-pointer items-start gap-3 rounded-md border bg-background/40 p-3 text-left transition-all",
                  critical
                    ? "border-red-500/30 hover:border-red-500/60 hover:shadow-[0_0_18px_-6px_rgba(239,68,68,0.55)]"
                    : cn(theme.border, theme.glow),
                  task.done && "opacity-50",
                )}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle(board.id, task.id);
                  }}
                  aria-label={task.done ? "Mark incomplete" : "Mark complete"}
                  className={cn(
                    "mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-[5px] border transition-colors cursor-pointer",
                    task.done
                      ? cn(theme.bg, theme.border)
                      : critical
                        ? "border-red-500/50 bg-background"
                        : "border-border bg-background",
                  )}
                >
                  {task.done && <Check className="size-3 text-background" strokeWidth={3} />}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2">
                    <p
                      className={cn(
                        "min-w-0 flex-1 truncate text-sm font-semibold text-foreground",
                        task.done && "line-through",
                      )}
                    >
                      {task.title}
                    </p>

                    {/* Allocated Duration Badge & Stopwatch Focus Launch Button */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded border border-white/10 bg-[#0B0F17] px-1.5 py-0.5 font-mono text-[10px] text-cyan-400 font-semibold tabular-nums",
                          task.done && "line-through opacity-70",
                        )}
                        title="Estimated focus time"
                      >
                        <Clock className="size-2.5" />
                        {durationStr}
                      </span>

                      {!task.done && onStartTimer && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onStartTimer(board.id, task);
                          }}
                          className="grid size-6 place-items-center rounded border border-cyan-400/40 bg-cyan-950/40 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_12px_rgba(0,229,255,0.6)] transition-all cursor-pointer"
                          title="Start timer"
                        >
                          <Play className="size-3 fill-current ml-0.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {task.description && (
                    <p
                      className={cn(
                        "mt-1 line-clamp-2 text-xs leading-snug text-slate-400",
                        task.done && "line-through",
                      )}
                    >
                      {task.description}
                    </p>
                  )}

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {task.checklist_item_id && (
                      <span
                        className="inline-flex items-center gap-1 rounded-[3px] border border-cyan-400/40 bg-cyan-950/40 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] text-cyan-300"
                        title="Linked to roadmap checklist"
                      >
                        <GitCommit className="size-2.5 text-cyan-400" />
                        ROADMAP
                      </span>
                    )}
                    {critical && (
                      <span className="rounded-[3px] border border-red-500/40 bg-red-500/10 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.12em] text-red-400">
                        CRITICAL
                      </span>
                    )}
                    <span
                      className={cn(
                        "rounded-[3px] border bg-accent/40 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.12em] brightness-125",
                        theme.border,
                        theme.text,
                      )}
                    >
                      {task.tag}
                    </span>
                    {task.priority === "low" && (
                      <span className="rounded-[3px] border border-border bg-accent/40 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.12em] text-muted-foreground">
                        LOW
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
