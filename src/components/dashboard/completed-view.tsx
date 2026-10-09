import { useMemo } from "react";
import { Check, Clock, GitCommit, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDuration, type Board, type Pillar, type Task } from "@/lib/dash-data";
import { THEME } from "@/components/dashboard/pillar-board";

function formatCompletedTime(iso?: string): string {
  if (!iso) return "Completed";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "Completed";
    const now = new Date();
    const isToday =
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear();

    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const timeStr = `${hours}:${minutes}`;

    if (isToday) {
      return `Today at ${timeStr}`;
    }
    const month = d.toLocaleString("en-US", { month: "short" });
    const day = d.getDate();
    return `${month} ${day}, ${timeStr}`;
  } catch {
    return "Completed";
  }
}

export interface CompletedViewProps {
  boards: Board[];
  onToggle: (boardId: Pillar, taskId: string) => void;
  onOpenTask: (boardId: Pillar, task: Task) => void;
  onNavigateToToday?: () => void;
}

export function CompletedView({
  boards,
  onToggle,
  onOpenTask,
  onNavigateToToday,
}: CompletedViewProps) {
  const totalCompleted = useMemo(() => {
    return boards.reduce((acc, b) => acc + b.tasks.filter((t) => t.done).length, 0);
  }, [boards]);

  return (
    <div className="space-y-4">
      {/* View Header */}
      <div className="flex items-center justify-between gap-3 pb-1 border-b border-white/[0.07]">
        <div className="flex items-center gap-2.5">
          <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          <h2 className="font-mono text-xs font-bold tracking-widest text-emerald-300 uppercase">
            Completed
          </h2>
          <span className="rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground tabular-nums">
            {totalCompleted} total
          </span>
        </div>
        {onNavigateToToday && (
          <button
            type="button"
            onClick={onNavigateToToday}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="size-3" />
            Back to Today
          </button>
        )}
      </div>

      {/* Track Boards Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {boards.map((board) => (
          <CompletedTrackBoard
            key={board.id}
            board={board}
            onToggle={onToggle}
            onOpenTask={onOpenTask}
          />
        ))}
      </div>
    </div>
  );
}

function CompletedTrackBoard({
  board,
  onToggle,
  onOpenTask,
}: {
  board: Board;
  onToggle: (boardId: Pillar, taskId: string) => void;
  onOpenTask: (boardId: Pillar, task: Task) => void;
}) {
  const theme = THEME[board.id];
  const Icon = theme.icon;

  const completedTasks = useMemo(() => {
    return [...board.tasks]
      .filter((t) => t.done)
      .sort((a, b) => {
        const timeA = a.completedAt ? new Date(a.completedAt).getTime() : 0;
        const timeB = b.completedAt ? new Date(b.completedAt).getTime() : 0;
        if (timeA !== timeB) {
          return timeB - timeA;
        }
        return 0;
      });
  }, [board.tasks]);

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
          {completedTasks.length}
        </span>
      </div>

      {completedTasks.length === 0 ? (
        <div className="p-8 text-center text-xs text-muted-foreground font-mono">
          No completed tasks yet in this track
        </div>
      ) : (
        <ul className="scroll-thin max-h-[460px] flex-1 space-y-2 overflow-y-auto p-3">
          {completedTasks.map((task) => {
            const critical = task.priority === "critical";
            const durationStr = formatDuration(task.actualFocusMinutes || task.durationMinutes || 45);
            const timeLabel = formatCompletedTime(task.completedAt);

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
                      ? "border-red-500/30 hover:border-red-500/60"
                      : cn(theme.border, theme.glow),
                  )}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggle(board.id, task.id);
                    }}
                    aria-label="Mark incomplete"
                    title="Click to move back to active tasks"
                    className={cn(
                      "mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-[5px] border transition-colors cursor-pointer",
                      theme.bg,
                      theme.border,
                    )}
                  >
                    <Check className="size-3 text-background" strokeWidth={3} />
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                      <p className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground line-through opacity-85">
                        {task.title}
                      </p>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className="inline-flex items-center gap-1 rounded border border-white/10 bg-[#0B0F17] px-1.5 py-0.5 font-mono text-[10px] text-cyan-400 font-semibold tabular-nums"
                          title="Focus time"
                        >
                          <Clock className="size-2.5" />
                          {durationStr}
                        </span>
                      </div>
                    </div>

                    {task.description && (
                      <p className="mt-1 line-clamp-2 text-xs leading-snug text-slate-400 line-through opacity-70">
                        {task.description}
                      </p>
                    )}

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[9px] text-emerald-400">
                        {timeLabel}
                      </span>
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
      )}
    </section>
  );
}
