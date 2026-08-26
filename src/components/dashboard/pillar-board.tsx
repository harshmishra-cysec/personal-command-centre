import { useState, type FormEvent } from "react";
import { Check, Plus, ShieldHalf, GraduationCap, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Board, Pillar, Task } from "@/lib/dash-data";

const THEME: Record<
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
}: {
  board: Board;
  onToggle: (boardId: Pillar, taskId: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const [extra, setExtra] = useState<Task[]>([]);
  const theme = THEME[board.id];
  const Icon = theme.icon;

  const tasks = [...board.tasks, ...extra];
  const done = tasks.filter((t) => t.done).length;

  function addTask(e: FormEvent) {
    e.preventDefault();
    const value = draft.trim();
    if (!value) return;
    setExtra((prev) => [
      ...prev,
      { id: `${board.id}-${Date.now()}`, tag: "NEW", title: value, slot: "—", done: false },
    ]);
    setDraft("");
  }

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
          {done}/{tasks.length}
        </span>
      </div>

      <form onSubmit={addTask} className="flex items-center gap-2 border-b border-border p-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add objective…"
          className={cn(
            "min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-0 ring-offset-0 transition-all placeholder:text-muted-foreground focus-visible:ring-2",
            theme.ring,
          )}
        />
        <button
          type="submit"
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-md border bg-background transition-all hover:bg-accent",
            theme.border,
            theme.text,
            theme.glow,
          )}
          aria-label={`Add task to ${board.title}`}
        >
          <Plus className="size-4" />
        </button>
      </form>

      <ul className="scroll-thin max-h-[320px] flex-1 divide-y divide-border overflow-y-auto lg:max-h-[420px]">
        {tasks.map((task) => (
          <li key={task.id} className="group flex items-start gap-3 px-4 py-3 hover:bg-accent/40">
            <button
              onClick={() =>
                extra.some((t) => t.id === task.id)
                  ? setExtra((prev) =>
                      prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)),
                    )
                  : onToggle(board.id, task.id)
              }
              aria-label={task.done ? "Mark incomplete" : "Mark complete"}
              className={cn(
                "mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-[5px] border transition-colors",
                task.done ? cn(theme.bg, theme.border) : "border-border bg-background",
              )}
            >
              {task.done && <Check className="size-3 text-background" strokeWidth={3} />}
            </button>

            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "truncate text-sm",
                  task.done ? "text-muted-foreground/50 line-through" : "font-medium text-foreground",
                )}
              >
                {task.title}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-[3px] border bg-accent/40 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.12em] brightness-125",
                    theme.border,
                    theme.text,
                  )}
                >
                  {task.tag}
                </span>
                <span className="font-mono text-[9px] text-slate-400">{task.slot}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
