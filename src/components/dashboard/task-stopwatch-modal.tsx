import { useState, useEffect } from "react";
import { Play, Pause, Check, X, RotateCcw, Minimize2, Maximize2, Timer, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDuration, type Task, type Pillar } from "@/lib/dash-data";

interface TaskStopwatchModalProps {
  task: Task;
  pillar: Pillar;
  onClose: () => void;
  onFinishTask: (pillar: Pillar, taskId: string, elapsedMinutes: number) => void;
  onUpdateFocusMinutes: (pillar: Pillar, taskId: string, elapsedMinutes: number) => void;
}

export function TaskStopwatchModal({
  task,
  pillar,
  onClose,
  onFinishTask,
  onUpdateFocusMinutes,
}: TaskStopwatchModalProps) {
  const targetSeconds = (task.durationMinutes || 45) * 60;
  // Starting seconds count up
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [mode, setMode] = useState<"countdown" | "stopwatch">("countdown");
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTimeDisplay = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const remainingSeconds = Math.max(0, targetSeconds - secondsElapsed);
  const progressPercent = Math.min(100, (secondsElapsed / targetSeconds) * 100);

  const handleFinish = () => {
    const elapsedMinutes = Math.max(1, Math.round(secondsElapsed / 60));
    onFinishTask(pillar, task.id, elapsedMinutes);
    onClose();
  };

  const handleSaveProgressAndClose = () => {
    const elapsedMinutes = Math.round(secondsElapsed / 60);
    if (elapsedMinutes > 0) {
      onUpdateFocusMinutes(pillar, task.id, elapsedMinutes);
    }
    onClose();
  };

  // Minimized floating HUD widget
  if (isMinimized) {
    return (
      <div className="fixed bottom-20 right-5 z-50 animate-in slide-in-from-bottom-5 duration-300">
        <div className="flex items-center gap-3 rounded-xl border border-cyan-400/50 bg-[#0A0E17]/95 p-3 shadow-[0_0_25px_rgba(0,229,255,0.35)] backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-cyan-400 animate-ping" />
            <div className="min-w-0 max-w-[140px]">
              <div className="truncate font-mono text-[11px] font-bold text-foreground">
                {task.title}
              </div>
              <div className="font-mono text-xs font-black text-cyan-400">
                {mode === "countdown"
                  ? formatTimeDisplay(remainingSeconds)
                  : formatTimeDisplay(secondsElapsed)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 border-l border-white/10 pl-2">
            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className="grid size-7 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-foreground transition-colors"
            >
              {isRunning ? (
                <Pause className="size-3.5 text-amber-400" />
              ) : (
                <Play className="size-3.5 text-cyan-400" />
              )}
            </button>
            <button
              type="button"
              onClick={handleFinish}
              className="grid size-7 place-items-center rounded-lg border border-emerald-500/50 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
              title="Complete Task"
            >
              <Check className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsMinimized(false)}
              className="grid size-7 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-muted-foreground transition-colors"
              title="Maximize"
            >
              <Maximize2 className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Full Expanded Focus Stopwatch HUD
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="panel max-w-md w-full p-6 border-cyan-400/50 bg-[#0C121E] shadow-[0_0_50px_rgba(0,229,255,0.25)] rounded-2xl relative overflow-hidden space-y-5 animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Timer className="size-4 text-cyan-400" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
              FOCUS TIMER
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="grid size-7 place-items-center rounded-md border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              title="Minimize"
            >
              <Minimize2 className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={handleSaveProgressAndClose}
              className="grid size-7 place-items-center rounded-md border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              title="Close"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Task Name & Metadata */}
        <div className="space-y-1 text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] text-cyan-400 uppercase font-semibold">
            <Zap className="size-3 text-cyan-400" />
            <span>
              {task.tag} · {formatDuration(task.durationMinutes || 45)} GOAL
            </span>
          </div>
          <h3 className="font-mono text-base font-extrabold text-foreground tracking-tight line-clamp-2 pt-1">
            {task.title}
          </h3>
          {task.description && (
            <p className="font-mono text-xs text-muted-foreground line-clamp-2">
              {task.description}
            </p>
          )}
        </div>

        {/* Big Digit Display */}
        <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-white/10 bg-[#060A12] relative overflow-hidden">
          <div className="font-mono text-4xl sm:text-5xl font-black text-cyan-400 tracking-wider tabular-nums drop-shadow-[0_0_15px_rgba(0,229,255,0.6)]">
            {mode === "countdown"
              ? formatTimeDisplay(remainingSeconds)
              : formatTimeDisplay(secondsElapsed)}
          </div>
          <div className="font-mono text-[11px] text-muted-foreground mt-2 uppercase tracking-widest">
            {mode === "countdown"
              ? remainingSeconds === 0
                ? "GOAL REACHED · OVERTIME"
                : "TIME REMAINING"
              : "TOTAL TIME"}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-white/5 border border-white/10 mt-4 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300 shadow-[0_0_10px_rgba(0,229,255,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMode("countdown")}
            className={cn(
              "py-1.5 rounded-lg border font-mono text-xs transition-colors",
              mode === "countdown"
                ? "border-cyan-400/60 bg-cyan-950/40 text-cyan-300 font-bold"
                : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10",
            )}
          >
            Countdown
          </button>
          <button
            type="button"
            onClick={() => setMode("stopwatch")}
            className={cn(
              "py-1.5 rounded-lg border font-mono text-xs transition-colors",
              mode === "stopwatch"
                ? "border-cyan-400/60 bg-cyan-950/40 text-cyan-300 font-bold"
                : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10",
            )}
          >
            Stopwatch
          </button>
        </div>

        {/* Stopwatch Primary Controls */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => setSecondsElapsed(0)}
            className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
            title="Reset timer"
          >
            <RotateCcw className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className={cn(
              "flex-1 py-3 rounded-xl border font-mono text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer",
              isRunning
                ? "border-amber-400/60 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                : "border-cyan-400/80 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-400 hover:text-black shadow-[0_0_25px_rgba(0,229,255,0.4)]",
            )}
          >
            {isRunning ? (
              <>
                <Pause className="size-4" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="size-4 fill-current" />
                <span>RESUME</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleFinish}
            className="px-4 py-3 rounded-xl border border-emerald-500/60 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-black font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-1.5 cursor-pointer"
          >
            <Check className="size-4" />
            <span>FINISH TASK</span>
          </button>
        </div>
      </div>
    </div>
  );
}
