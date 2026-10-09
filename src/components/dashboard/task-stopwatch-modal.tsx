import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Play,
  Pause,
  Check,
  X,
  RotateCcw,
  Minimize2,
  Maximize2,
  Timer,
  Zap,
  PictureInPicture2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDuration, type Task, type Pillar } from "@/lib/dash-data";

export interface InitialTimerState {
  startedAt: number | null;
  accumulatedSeconds: number;
  isRunning: boolean;
  mode: "countdown" | "stopwatch";
}

interface TaskStopwatchModalProps {
  task: Task;
  pillar: Pillar;
  initialTimerState?: InitialTimerState;
  onClose: () => void;
  onFinishTask: (pillar: Pillar, taskId: string, elapsedMinutes: number) => void;
  onUpdateFocusMinutes: (pillar: Pillar, taskId: string, elapsedMinutes: number, newElapsedSeconds?: number) => void;
  onResetProgress?: (pillar: Pillar, taskId: string) => void;
}

function playTimerDoneSound() {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.7);
  } catch {
    // Audio context may be restricted by autoplay policy
  }
}

function triggerTimerDoneNotification(taskTitle: string) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  try {
    if (Notification.permission === "granted") {
      new Notification("Focus time complete!", {
        body: taskTitle,
      });
    }
  } catch {
    // Notification denied or not available
  }
}

export function TaskStopwatchModal({
  task,
  pillar,
  initialTimerState,
  onClose,
  onFinishTask,
  onUpdateFocusMinutes,
  onResetProgress,
}: TaskStopwatchModalProps) {
  const targetSeconds = (task.durationMinutes || 45) * 60;
  const initialSavedSeconds = task.timerElapsedSeconds || 0;

  const [startedAt, setStartedAt] = useState<number | null>(() => {
    if (initialTimerState) return initialTimerState.startedAt;
    // If resuming an unfinished run with saved progress, start in paused state
    if (initialSavedSeconds > 0) return null;
    return Date.now();
  });
  const [accumulatedSeconds, setAccumulatedSeconds] = useState<number>(() => {
    if (initialTimerState) return initialTimerState.accumulatedSeconds;
    return initialSavedSeconds;
  });
  const [isRunning, setIsRunning] = useState<boolean>(() => {
    if (initialTimerState) return initialTimerState.isRunning;
    if (initialSavedSeconds > 0) return false;
    return true;
  });
  const [mode, setMode] = useState<"countdown" | "stopwatch">(() => {
    if (initialTimerState) return initialTimerState.mode;
    return "countdown";
  });
  const [isMinimized, setIsMinimized] = useState(false);
  const [nowTick, setNowTick] = useState<number>(() => Date.now());
  const [confirmReset, setConfirmReset] = useState(false);

  const [pipWindow, setPipWindow] = useState<Window | null>(null);
  const isPipSupported =
    typeof window !== "undefined" &&
    "documentPictureInPicture" in window &&
    Boolean(
      (
        window as unknown as {
          documentPictureInPicture?: { requestWindow?: unknown };
        }
      ).documentPictureInPicture?.requestWindow,
    );

  const hasNotifiedRef = useRef(false);
  const originalTitleRef = useRef("");

  // Track latest current elapsed seconds via ref for unmount/beforeunload/pagehide saving
  const currentElapsedRef = useRef(accumulatedSeconds);

  // Store original tab title and restore on unmount
  useEffect(() => {
    if (typeof document !== "undefined") {
      originalTitleRef.current = document.title;
    }
    return () => {
      if (typeof document !== "undefined" && originalTitleRef.current) {
        document.title = originalTitleRef.current;
      }
    };
  }, []);

  // Interval timer tick & visibility change listener
  useEffect(() => {
    if (!isRunning) return;

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      setNowTick(Date.now());
    }, 500);

    const handleVisibilityChange = () => {
      setNowTick(Date.now());
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isRunning]);

  // Accurate elapsed calculation using timestamps
  const currentElapsedExact =
    accumulatedSeconds + (isRunning && startedAt ? Math.max(0, (nowTick - startedAt) / 1000) : 0);
  const secondsElapsed = Math.max(0, Math.floor(currentElapsedExact));
  const remainingSeconds = Math.max(0, targetSeconds - secondsElapsed);
  const progressPercent = Math.min(100, (secondsElapsed / targetSeconds) * 100);

  currentElapsedRef.current = secondsElapsed;

  // Save current progress helper
  const saveCurrentProgress = (sec: number) => {
    onUpdateFocusMinutes(pillar, task.id, 0, sec);
  };

  // Periodic autosave every 60s while running
  useEffect(() => {
    if (!isRunning) return;
    const autoSaveInterval = setInterval(() => {
      saveCurrentProgress(currentElapsedRef.current);
    }, 60000);
    return () => clearInterval(autoSaveInterval);
  }, [isRunning, pillar, task.id]);

  // Auto-save on page hide / visibility hidden
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePageHideOrHidden = () => {
      saveCurrentProgress(currentElapsedRef.current);
    };

    const handleVisChange = () => {
      if (document.visibilityState === "hidden") {
        saveCurrentProgress(currentElapsedRef.current);
      }
    };

    window.addEventListener("pagehide", handlePageHideOrHidden);
    window.addEventListener("beforeunload", handlePageHideOrHidden);
    document.addEventListener("visibilitychange", handleVisChange);

    return () => {
      window.removeEventListener("pagehide", handlePageHideOrHidden);
      window.removeEventListener("beforeunload", handlePageHideOrHidden);
      document.removeEventListener("visibilitychange", handleVisChange);
    };
  }, [pillar, task.id]);

  const formatTimeDisplay = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Live document.title update
  useEffect(() => {
    if (typeof document === "undefined") return;
    const timeDisplay = formatTimeDisplay(
      mode === "countdown" ? remainingSeconds : secondsElapsed,
    );
    const prefix = isRunning ? "⏱ " : "⏸ ";
    document.title = `${prefix}${timeDisplay} · ${task.title}`;
  }, [isRunning, mode, remainingSeconds, secondsElapsed, task.title]);

  // Trigger sound & notification when countdown reaches zero
  useEffect(() => {
    if (
      mode === "countdown" &&
      isRunning &&
      targetSeconds > 0 &&
      secondsElapsed >= targetSeconds
    ) {
      if (!hasNotifiedRef.current) {
        hasNotifiedRef.current = true;
        playTimerDoneSound();
        triggerTimerDoneNotification(task.title);
      }
    } else if (mode === "countdown" && secondsElapsed < targetSeconds) {
      hasNotifiedRef.current = false;
    }
  }, [mode, isRunning, targetSeconds, secondsElapsed, task.title]);

  // Persist timer state to localStorage under "movone_active_timer"
  useEffect(() => {
    if (typeof window !== "undefined") return;
  }, []);

  const persistToLocalStorage = (
    cStartedAt: number | null,
    cAccumulated: number,
    cRunning: boolean,
    cMode: "countdown" | "stopwatch",
  ) => {
    if (typeof window === "undefined") return;
    try {
      const payload = {
        taskId: task.id,
        pillar,
        startedAt: cStartedAt,
        accumulatedSeconds: cAccumulated,
        isRunning: cRunning,
        mode: cMode,
        taskSnapshot: {
          ...task,
          timerElapsedSeconds: Math.floor(cAccumulated),
        },
      };
      localStorage.setItem("movone_active_timer", JSON.stringify(payload));
    } catch {
      // Storage quota or SSR guard
    }
  };

  useEffect(() => {
    persistToLocalStorage(startedAt, accumulatedSeconds, isRunning, mode);
  }, [task, pillar, startedAt, accumulatedSeconds, isRunning, mode]);

  // Clean up Picture-in-Picture window if active
  useEffect(() => {
    return () => {
      if (pipWindow && !pipWindow.closed) {
        pipWindow.close();
      }
    };
  }, [pipWindow]);

  const clearPersistedTimer = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("movone_active_timer");
      } catch {
        // Ignore storage error
      }
    }
  };

  const handleTogglePlay = () => {
    const now = Date.now();
    if (isRunning) {
      const added = startedAt ? Math.max(0, (now - startedAt) / 1000) : 0;
      const nextAccum = accumulatedSeconds + added;
      setAccumulatedSeconds(nextAccum);
      setStartedAt(null);
      setIsRunning(false);
      setNowTick(now);
      // Save progress immediately when pausing
      saveCurrentProgress(Math.floor(nextAccum));
    } else {
      setStartedAt(now);
      setIsRunning(true);
      setNowTick(now);
      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "default"
      ) {
        Notification.requestPermission().catch(() => {});
      }
    }
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    setConfirmReset(false);
    const now = Date.now();
    setAccumulatedSeconds(0);
    setStartedAt(isRunning ? now : null);
    setNowTick(now);
    hasNotifiedRef.current = false;
    clearPersistedTimer();
    if (onResetProgress) {
      onResetProgress(pillar, task.id);
    } else {
      onUpdateFocusMinutes(pillar, task.id, 0, 0);
    }
  };

  const handleFinish = () => {
    clearPersistedTimer();
    if (pipWindow && !pipWindow.closed) {
      pipWindow.close();
    }
    const elapsedMinutes = Math.max(1, Math.round(secondsElapsed / 60));
    onFinishTask(pillar, task.id, elapsedMinutes);
    onClose();
  };

  const handleSaveProgressAndClose = () => {
    const now = Date.now();
    const finalElapsed = isRunning && startedAt
      ? accumulatedSeconds + Math.max(0, (now - startedAt) / 1000)
      : accumulatedSeconds;
    const finalElapsedInt = Math.floor(finalElapsed);

    clearPersistedTimer();
    if (pipWindow && !pipWindow.closed) {
      pipWindow.close();
    }

    // Stop timer and save elapsed seconds to task progress
    saveCurrentProgress(finalElapsedInt);
    onClose();
  };

  const handleTogglePip = async () => {
    if (!isPipSupported) return;

    if (pipWindow && !pipWindow.closed) {
      pipWindow.close();
      setPipWindow(null);
      return;
    }

    try {
      const pipWin = await (
        window as unknown as {
          documentPictureInPicture: {
            requestWindow: (opts: { width: number; height: number }) => Promise<Window>;
          };
        }
      ).documentPictureInPicture.requestWindow({
        width: 320,
        height: 200,
      });

      // Transfer style sheets to the Document Picture-in-Picture window
      Array.from(document.styleSheets).forEach((sheet) => {
        try {
          const rules = Array.from(sheet.cssRules)
            .map((r) => r.cssText)
            .join("");
          const style = document.createElement("style");
          style.textContent = rules;
          pipWin.document.head.appendChild(style);
        } catch {
          if (sheet.href) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = sheet.href;
            pipWin.document.head.appendChild(link);
          }
        }
      });

      pipWin.document.body.className =
        "bg-[#0A0E17] text-white p-3 font-mono m-0 flex items-center justify-center min-h-screen select-none";

      const onPageHide = () => {
        setPipWindow(null);
      };
      pipWin.addEventListener("pagehide", onPageHide);

      setPipWindow(pipWin);
    } catch (err) {
      console.warn("Could not open Picture-in-Picture window:", err);
    }
  };

  // Picture-in-Picture Window Portal
  const pipPortal =
    pipWindow &&
    createPortal(
      <div className="flex flex-col items-center justify-between w-full h-full p-2 bg-[#0A0E17] text-foreground font-mono">
        <div className="flex items-center justify-between w-full border-b border-white/10 pb-1.5 mb-1.5">
          <span className="truncate text-xs font-bold text-cyan-400 max-w-[200px]">
            {task.title}
          </span>
          <span className="text-[10px] uppercase text-muted-foreground">
            {mode === "countdown" ? "Countdown" : "Stopwatch"}
          </span>
        </div>

        <div className="text-3xl font-black text-cyan-400 tabular-nums my-1 drop-shadow-[0_0_12px_rgba(0,229,255,0.6)]">
          {mode === "countdown"
            ? formatTimeDisplay(remainingSeconds)
            : formatTimeDisplay(secondsElapsed)}
        </div>

        <div className="flex items-center gap-2 mt-1">
          <button
            type="button"
            onClick={handleTogglePlay}
            className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-foreground transition-colors cursor-pointer"
            title={isRunning ? "Pause" : "Resume"}
          >
            {isRunning ? (
              <Pause className="size-4 text-amber-400" />
            ) : (
              <Play className="size-4 text-cyan-400 fill-current" />
            )}
          </button>
          <button
            type="button"
            onClick={handleFinish}
            className="px-3 py-1.5 rounded-lg border border-emerald-500/50 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 font-mono text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
            title="Complete Task"
          >
            <Check className="size-3.5" />
            <span>Finish</span>
          </button>
        </div>
      </div>,
      pipWindow.document.body,
    );

  // Minimized floating HUD widget
  if (isMinimized) {
    return (
      <>
        {pipPortal}
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
                onClick={handleTogglePlay}
                className="grid size-7 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-foreground transition-colors cursor-pointer"
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
                className="grid size-7 place-items-center rounded-lg border border-emerald-500/50 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                title="Complete Task"
              >
                <Check className="size-3.5" />
              </button>
              {isPipSupported && (
                <button
                  type="button"
                  onClick={handleTogglePip}
                  className="grid size-7 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-muted-foreground hover:text-cyan-400 transition-colors cursor-pointer"
                  title="Picture in picture"
                >
                  <PictureInPicture2 className="size-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsMinimized(false)}
                className="grid size-7 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-muted-foreground transition-colors cursor-pointer"
                title="Maximize"
              >
                <Maximize2 className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Full Expanded Focus Stopwatch HUD
  return (
    <>
      {pipPortal}
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
              {isPipSupported && (
                <button
                  type="button"
                  onClick={handleTogglePip}
                  className="grid size-7 place-items-center rounded-md border border-white/10 text-muted-foreground hover:text-cyan-400 hover:bg-white/5 transition-colors cursor-pointer"
                  title="Picture in picture"
                >
                  <PictureInPicture2 className="size-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="grid size-7 place-items-center rounded-md border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
                title="Minimize"
              >
                <Minimize2 className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={handleSaveProgressAndClose}
                className="grid size-7 place-items-center rounded-md border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
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
              onClick={() => {
                setMode("countdown");
                hasNotifiedRef.current = false;
              }}
              className={cn(
                "py-1.5 rounded-lg border font-mono text-xs transition-colors cursor-pointer",
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
                "py-1.5 rounded-lg border font-mono text-xs transition-colors cursor-pointer",
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
              onClick={handleReset}
              className={cn(
                "h-11 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all cursor-pointer flex items-center justify-center gap-1.5 px-3 text-xs font-mono",
                confirmReset && "border-red-500/60 bg-red-500/20 text-red-300 hover:bg-red-500/30",
              )}
              title={confirmReset ? "Click again to confirm reset" : "Reset progress"}
            >
              <RotateCcw className="size-4 shrink-0" />
              {confirmReset ? <span>Confirm Reset</span> : (secondsElapsed > 0 && <span className="hidden sm:inline">Reset</span>)}
            </button>

            <button
              type="button"
              onClick={handleTogglePlay}
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
    </>
  );
}
