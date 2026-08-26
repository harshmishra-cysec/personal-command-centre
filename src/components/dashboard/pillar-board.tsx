import { useState, type FormEvent } from "react";
import { Check, Plus, ShieldHalf, GraduationCap, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Board, Pillar, Task } from "@/lib/dash-data";

const THEME: Record<
  Pillar,
  { text: string; border: string; bg: string; ring: string; icon: typeof ShieldHalf }
> = {
  cyber: {
    text: "text-cyber",
    border: "border-cyber/40",
    bg: "bg-cyber",
    ring: "focus-visible:border-cyber/60",
    icon: ShieldHalf,
  },
  gold: {
    text: "text-gold",
    border: "border-gold/40",
    bg: "bg-gold",
    ring: "focus-visible:border-gold/60",
    icon: GraduationCap,
  },
  emerald: {
    text: "text-emerald",
    border: "border-emerald/40",
    bg: "bg-emerald",
    ring: "focus-visible:border-emerald/60",
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
        <span className="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
          {done}/{tasks.length}
        </span>
      </div>

      <form onSubmit={addTask} className="flex items-center gap-2 border-b border-border p-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add objective…"
          className={cn(
            "min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground",
            theme.ring,
          )}
        />
        <button
          type="submit"
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-md border bg-background transition-colors hover:bg-accent",
            theme.border,
            theme.text,
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
              onClick={() => onToggle(board.id, task.id)}
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
                  task.done ? "text-muted-foreground line-through" : "text-foreground",
                )}
              >
                {task.title}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-[3px] border px-1.5 py-0.5 font-mono text-[9px] tracking-[0.12em]",
                    theme.border,
                    theme.text,
                  )}
                >
                  {task.tag}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">{task.slot}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
