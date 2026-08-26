import { Flame, Target, Timer } from "lucide-react";

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="panel p-4">{children}</div>;
}

export function StatsRow({
  completion,
  streak = 0,
}: {
  completion: number;
  streak?: number;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Panel>
        <div className="flex items-center justify-between gap-3">
          <span className="label-mono">% Completed today</span>
          <Target className="size-3.5 shrink-0 text-cyber" />
        </div>
        <p className="mt-3 font-display text-3xl font-semibold tabular-nums text-foreground">
          {completion}
          <span className="ml-0.5 text-base text-muted-foreground">%</span>
        </p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-cyber transition-[width] duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>
      </Panel>

      <Panel>
        <div className="flex items-center justify-between gap-3">
          <span className="label-mono">Focused hours</span>
          <Timer className="size-3.5 shrink-0 text-gold" />
        </div>
        <p className="mt-3 font-display text-3xl font-semibold tabular-nums text-foreground">
          5.4<span className="ml-0.5 text-base text-muted-foreground">h</span>
        </p>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Deep work 3.2h · Labs 1.4h · Review 0.8h
        </p>
      </Panel>

      <Panel>
        <div className="flex items-center justify-between gap-3">
          <span className="label-mono">Daily streak</span>
          <Flame className="size-3.5 shrink-0 text-emerald" />
        </div>
        <p className="mt-3 font-display text-3xl font-semibold tabular-nums text-foreground">
          {streak}
          <span className="ml-1 text-base text-muted-foreground">days</span>
        </p>
        <div className="mt-3 flex gap-1">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className={
                i >= 14 - Math.min(streak, 14)
                  ? "h-4 flex-1 rounded-[2px] bg-emerald/70"
                  : "h-4 flex-1 rounded-[2px] bg-muted"
              }
            />
          ))}
        </div>
      </Panel>
    </div>
  );
}