import { useState, useEffect, useRef } from "react";
import {
  ShieldAlert,
  Zap,
  Flame,
  Timer,
  Compass,
  ArrowRight,
  RotateCcw,
  Play,
  Pause,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  RefreshCw,
  Skull,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  HARD_TRUTHS,
  WASTE_COSTS,
  DEFAULT_MICRO_ACTIONS,
  loadInterceptsCount,
  saveInterceptsCount,
  type MicroAction,
  type RealityQuote,
  type WasteCostOption,
} from "@/lib/reality-data";

interface RealityCheckViewProps {
  onNavigateToToday?: () => void;
}

export function RealityCheckView({ onNavigateToToday }: RealityCheckViewProps) {
  // Mode selection: 'emergency' (Mode A) or 'micro' (Mode B)
  const [activeMode, setActiveMode] = useState<"emergency" | "micro">("emergency");

  // Intercept streak tracking
  const [intercepts, setIntercepts] = useState<number>(() => loadInterceptsCount());
  const [interceptLogged, setInterceptLogged] = useState(false);

  // Mode A: Emergency 3-Step Flow State
  const [emergencyStep, setEmergencyStep] = useState<1 | 2 | 3>(1);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [selectedCostIndex, setSelectedCostIndex] = useState(1); // Default to 30 mins
  const [selectedMicroAction, setSelectedMicroAction] = useState<MicroAction>(
    DEFAULT_MICRO_ACTIONS[0],
  );

  // Mode B: 5-Minute Micro-Kickstart Timer State
  const INITIAL_SECONDS = 5 * 60; // 300 seconds
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isTimerCompleted, setIsTimerCompleted] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync intercepts to localStorage
  useEffect(() => {
    saveInterceptsCount(intercepts);
  }, [intercepts]);

  // Timer countdown hook
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsTimerRunning(false);
            setIsTimerCompleted(true);
            playCompletionAlert();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timeLeft]);

  // Audio / Visual Completion Alert (Audio synthesized gracefully)
  const playCompletionAlert = () => {
    try {
      const audioCtx = new (
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      )();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch {
      // AudioContext unavailable in silent context
    }
  };

  const handleLogManualIntercept = () => {
    setIntercepts((prev) => prev + 1);
    setInterceptLogged(true);
    setTimeout(() => setInterceptLogged(false), 2000);
  };

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % HARD_TRUTHS.length);
  };

  const handleAcknowledgeReckoning = () => {
    setEmergencyStep(2);
  };

  const handleSelectCostAndProceed = () => {
    setEmergencyStep(3);
  };

  const handleSelectMicroActionAndLaunch = (action: MicroAction) => {
    setSelectedMicroAction(action);
    // Increment intercept count when committing to action
    setIntercepts((prev) => prev + 1);
    // Transition to 5-Minute Timer Mode
    setActiveMode("micro");
    setTimeLeft(INITIAL_SECONDS);
    setIsTimerRunning(true);
    setIsTimerCompleted(false);
  };

  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(INITIAL_SECONDS);
      setIsTimerCompleted(false);
      setIsTimerRunning(true);
      return;
    }
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(INITIAL_SECONDS);
    setIsTimerCompleted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const timerProgress = ((INITIAL_SECONDS - timeLeft) / INITIAL_SECONDS) * 100;
  const currentQuote: RealityQuote = HARD_TRUTHS[currentQuoteIndex];
  const currentCost: WasteCostOption = WASTE_COSTS[selectedCostIndex];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header Label & Intercept HUD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline/60 pb-4">
        <div className="flex items-center gap-3">
          <span className="size-2 rounded-full bg-crimson animate-pulse" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="label-mono text-foreground font-bold tracking-wider">
                Anti-Doomscroll // Reality Check Protocol
              </h2>
              <span className="rounded border border-crimson/50 bg-crimson/10 px-1.5 py-0.5 font-mono text-[9px] text-crimson font-bold">
                DEFCON 1 INTERRUPT
              </span>
            </div>
            <p className="font-mono text-xs text-muted-foreground mt-0.5">
              Cognitive pattern interruption & instant dopamine vector redirection.
            </p>
          </div>
        </div>

        {/* Intercept Counter & Quick Log */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-2 rounded-lg border border-hairline bg-surface/80 px-3 py-1.5 shadow-sm">
            <ShieldCheck className="size-4 text-emerald" />
            <div>
              <div className="font-mono text-[9px] text-muted-foreground uppercase leading-none">
                Distractions Intercepted
              </div>
              <div className="font-mono text-base font-bold text-foreground leading-tight">
                {intercepts} <span className="text-[10px] text-emerald font-normal">SAVES</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogManualIntercept}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 font-mono text-xs font-bold transition-all select-none",
              interceptLogged
                ? "border-emerald bg-emerald/20 text-emerald"
                : "border-hairline bg-background/60 text-muted-foreground hover:text-foreground hover:bg-surface",
            )}
          >
            {interceptLogged ? (
              <>
                <CheckCircle2 className="size-3.5" />
                LOGGED (+1)
              </>
            ) : (
              <>
                <Flame className="size-3.5 text-gold" />
                +1 INTERCEPT
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setActiveMode("emergency")}
          className={cn(
            "panel text-left p-3.5 sm:p-4 transition-all relative overflow-hidden flex items-center justify-between",
            activeMode === "emergency"
              ? "border-crimson ring-1 ring-crimson/40 bg-surface shadow-[0_0_20px_rgba(255,23,68,0.12)]"
              : "border-hairline/60 bg-surface/50 opacity-75 hover:opacity-100",
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "grid size-9 place-items-center rounded-lg border",
                activeMode === "emergency"
                  ? "border-crimson/60 bg-crimson/15 text-crimson"
                  : "border-hairline bg-background text-muted-foreground",
              )}
            >
              <ShieldAlert className="size-4" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-muted-foreground font-semibold">
                MODE A
              </div>
              <div
                className={cn(
                  "font-mono text-xs sm:text-sm font-bold",
                  activeMode === "emergency" ? "text-crimson" : "text-foreground",
                )}
              >
                Emergency Reality Check
              </div>
            </div>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground hidden sm:inline">
            3-STEP FLOW
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode("micro")}
          className={cn(
            "panel text-left p-3.5 sm:p-4 transition-all relative overflow-hidden flex items-center justify-between",
            activeMode === "micro"
              ? "border-cyber ring-1 ring-cyber/40 bg-surface shadow-[0_0_20px_rgba(0,229,255,0.12)]"
              : "border-hairline/60 bg-surface/50 opacity-75 hover:opacity-100",
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "grid size-9 place-items-center rounded-lg border",
                activeMode === "micro"
                  ? "border-cyber/60 bg-cyber/15 text-cyber"
                  : "border-hairline bg-background text-muted-foreground",
              )}
            >
              <Zap className="size-4" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-muted-foreground font-semibold">
                MODE B
              </div>
              <div
                className={cn(
                  "font-mono text-xs sm:text-sm font-bold",
                  activeMode === "micro" ? "text-cyber" : "text-foreground",
                )}
              >
                5-Minute Micro-Kickstart
              </div>
            </div>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground hidden sm:inline">
            FOCUS LAUNCHER
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODE A: EMERGENCY REALITY CHECK (3-STEP INTERACTIVE FLOW)                 */}
      {/* ========================================================================= */}
      {activeMode === "emergency" && (
        <div className="space-y-6">
          {/* Step Indicator Tracker */}
          <div className="flex items-center justify-between gap-2 border-b border-hairline/50 pb-3">
            <div className="flex items-center gap-2 sm:gap-4 font-mono text-xs">
              <button
                type="button"
                onClick={() => setEmergencyStep(1)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors",
                  emergencyStep === 1
                    ? "bg-crimson/15 text-crimson border border-crimson/40 font-bold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="grid size-4 place-items-center rounded-full bg-crimson/20 text-[10px]">
                  1
                </span>
                <span>THE ANCHOR</span>
              </button>

              <ChevronRight className="size-3.5 text-muted-foreground/40" />

              <button
                type="button"
                onClick={() => setEmergencyStep(2)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors",
                  emergencyStep === 2
                    ? "bg-gold/15 text-gold border border-gold/40 font-bold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="grid size-4 place-items-center rounded-full bg-gold/20 text-[10px]">
                  2
                </span>
                <span>COST ANALYSIS</span>
              </button>

              <ChevronRight className="size-3.5 text-muted-foreground/40" />

              <button
                type="button"
                onClick={() => setEmergencyStep(3)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors",
                  emergencyStep === 3
                    ? "bg-cyber/15 text-cyber border border-cyber/40 font-bold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="grid size-4 place-items-center rounded-full bg-cyber/20 text-[10px]">
                  3
                </span>
                <span>REDIRECTION</span>
              </button>
            </div>

            <span className="font-mono text-[10px] text-muted-foreground hidden md:inline">
              STEP {emergencyStep} OF 3
            </span>
          </div>

          {/* STEP 1: THE ANCHOR (High-Impact Truths) */}
          {emergencyStep === 1 && (
            <div className="panel border-crimson/40 bg-surface/95 p-6 sm:p-8 relative overflow-hidden shadow-[0_0_30px_rgba(255,23,68,0.08)]">
              <div className="flex items-center justify-between gap-2 border-b border-hairline/60 pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <Skull className="size-4 text-crimson" />
                  <span className="font-mono text-xs font-bold uppercase text-crimson tracking-wider">
                    STEP 1 // HARD-TRUTH ANCHOR
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleNextQuote}
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RefreshCw className="size-3" />
                  CYCLE TRUTH ({currentQuoteIndex + 1}/{HARD_TRUTHS.length})
                </button>
              </div>

              {/* Tactical Quote Display Card */}
              <div className="my-6 space-y-4 text-center max-w-2xl mx-auto py-4">
                <div className="inline-block rounded border border-crimson/30 bg-crimson/10 px-3 py-1 font-mono text-[10px] uppercase font-bold text-crimson tracking-widest">
                  THEMATIC CLASSIFICATION // {currentQuote.theme.toUpperCase()}
                </div>

                <blockquote className="font-mono text-xl sm:text-2xl font-bold leading-snug tracking-tight text-foreground">
                  &ldquo;{currentQuote.quote}&rdquo;
                </blockquote>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto font-sans">
                  {currentQuote.subtext}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-hairline/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-muted-foreground font-mono text-center sm:text-left">
                  Do not flinch or click away. Read it twice before advancing.
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleNextQuote}
                    className="flex-1 sm:flex-initial rounded border border-hairline bg-background/60 px-4 py-2.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ANOTHER TRUTH
                  </button>

                  <button
                    type="button"
                    onClick={handleAcknowledgeReckoning}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded bg-crimson px-5 py-2.5 font-mono text-xs font-bold text-white shadow-lg shadow-crimson/25 hover:bg-crimson/90 transition-all cursor-pointer"
                  >
                    <span>RECKONING ACKNOWLEDGED</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: COST ANALYSIS (Time & Opportunity Loss) */}
          {emergencyStep === 2 && (
            <div className="panel border-gold/40 bg-surface/95 p-6 sm:p-8 relative overflow-hidden shadow-[0_0_30px_rgba(255,179,0,0.08)]">
              <div className="flex items-center justify-between gap-2 border-b border-hairline/60 pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-gold" />
                  <span className="font-mono text-xs font-bold uppercase text-gold tracking-wider">
                    STEP 2 // FRICTION & COST ANALYSIS
                  </span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  SELECT INTENDED DURATION
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block font-mono text-xs font-bold text-foreground mb-3 uppercase tracking-wider">
                    How long were you about to waste in the scroll vortex?
                  </label>

                  {/* 4-Option Duration Selector */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {WASTE_COSTS.map((opt, idx) => (
                      <button
                        key={opt.durationMinutes}
                        type="button"
                        onClick={() => setSelectedCostIndex(idx)}
                        className={cn(
                          "panel p-3.5 text-center transition-all cursor-pointer font-mono flex flex-col items-center justify-center gap-1",
                          selectedCostIndex === idx
                            ? "border-gold bg-gold/15 text-gold shadow-[0_0_15px_rgba(255,179,0,0.2)] font-bold ring-1 ring-gold/40"
                            : "border-hairline bg-background/60 text-muted-foreground hover:text-foreground hover:bg-surface",
                        )}
                      >
                        <span className="text-sm sm:text-base font-bold">{opt.label}</span>
                        <span className="text-[10px] opacity-75">{opt.durationMinutes} MINS</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tactical Cost & Gain Comparison HUD */}
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  {/* The Damage Box */}
                  <div className="rounded-lg border border-crimson/30 bg-crimson/5 p-4 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-crimson font-bold">
                      <AlertTriangle className="size-3.5" />
                      SYNAPTIC & TIME DEFICIT
                    </div>
                    <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                      {currentCost.costDescription}
                    </p>
                  </div>

                  {/* The Alternate Mastery Box */}
                  <div className="rounded-lg border border-emerald/30 bg-emerald/5 p-4 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-emerald font-bold">
                      <Zap className="size-3.5" />
                      WHAT YOU ARE TRADING AWAY
                    </div>
                    <p className="text-xs text-foreground font-mono leading-relaxed font-semibold">
                      {currentCost.alternateGain}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Navigation */}
              <div className="pt-6 mt-6 border-t border-hairline/60 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setEmergencyStep(1)}
                  className="rounded border border-hairline bg-background/60 px-4 py-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  BACK TO ANCHOR
                </button>

                <button
                  type="button"
                  onClick={handleSelectCostAndProceed}
                  className="inline-flex items-center gap-2 rounded bg-gold px-5 py-2.5 font-mono text-xs font-bold text-background shadow-lg shadow-gold/25 hover:bg-gold/90 transition-all cursor-pointer"
                >
                  <span>PROCEED TO REDIRECTION</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: IMMEDIATE REDIRECTION (Micro-Action Selector) */}
          {emergencyStep === 3 && (
            <div className="panel border-cyber/40 bg-surface/95 p-6 sm:p-8 relative overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.08)]">
              <div className="flex items-center justify-between gap-2 border-b border-hairline/60 pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <Compass className="size-4 text-cyber" />
                  <span className="font-mono text-xs font-bold uppercase text-cyber tracking-wider">
                    STEP 3 // IMMEDIATE MICRO-REDIRECTION
                  </span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  LAUNCH 5-MIN KICKSTART
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-muted-foreground font-mono">
                  Select ONE immediate low-friction micro-action below. Completing this 5-minute
                  protocol breaks the dopamine trance and restores executive control.
                </p>

                <div className="grid gap-3 pt-2">
                  {DEFAULT_MICRO_ACTIONS.map((action) => (
                    <div
                      key={action.id}
                      onClick={() => handleSelectMicroActionAndLaunch(action)}
                      className="panel group flex items-start justify-between gap-4 p-4 border-hairline/80 bg-background/70 hover:border-cyber hover:bg-surface transition-all cursor-pointer"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase",
                              action.category === "cyber" &&
                                "bg-cyber/15 text-cyber border border-cyber/30",
                              action.category === "acad" &&
                                "bg-gold/15 text-gold border border-gold/30",
                              action.category === "aiml" &&
                                "bg-emerald/15 text-emerald border border-emerald/30",
                              action.category === "general" && "bg-secondary text-foreground",
                            )}
                          >
                            {action.category}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {action.estimatedMinutes} MIN RUN
                          </span>
                        </div>
                        <h4 className="font-mono text-sm font-bold text-foreground group-hover:text-cyber transition-colors">
                          {action.title}
                        </h4>
                        <p className="text-xs text-muted-foreground font-sans">
                          {action.directive}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="flex-shrink-0 mt-2 inline-flex items-center gap-1 rounded bg-cyber/10 border border-cyber/40 px-3 py-1.5 font-mono text-xs font-bold text-cyber group-hover:bg-cyber group-hover:text-background transition-all"
                      >
                        <Play className="size-3" />
                        LAUNCH
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-6 mt-6 border-t border-hairline/60 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setEmergencyStep(2)}
                  className="rounded border border-hairline bg-background/60 px-4 py-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  BACK TO COST
                </button>

                <span className="font-mono text-[10px] text-muted-foreground">
                  SELECTING AN ACTION STARTS THE 5:00 PROTOCOL
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE B: 5-MINUTE MICRO-KICKSTART TIMER (FOCUS LAUNCHER)                   */}
      {/* ========================================================================= */}
      {activeMode === "micro" && (
        <div className="space-y-6">
          <div className="panel border-cyber/50 bg-surface/95 p-6 sm:p-8 relative overflow-hidden shadow-[0_0_40px_rgba(0,229,255,0.12)]">
            {/* Top Tactical Directive Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline/60 pb-4 mb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-cyber animate-ping" />
                  <span className="font-mono text-xs font-bold uppercase text-cyber tracking-wider">
                    OPERATIONAL PROTOCOL // 5-MINUTE KICKSTART
                  </span>
                </div>
                <h3 className="font-mono text-lg font-bold text-foreground">
                  Active Mission: {selectedMicroAction.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveMode("emergency")}
                  className="rounded border border-hairline bg-background/60 px-2.5 py-1 font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  SWITCH TO REALITY FLOW
                </button>
              </div>
            </div>

            {/* Glowing Tactical Countdown Ring */}
            <div className="flex flex-col items-center justify-center py-6 sm:py-8 space-y-6">
              <div className="relative grid size-52 sm:size-60 place-items-center">
                {/* SVG Progress Ring */}
                <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                  {/* Track circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    className="stroke-background/80"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  {/* Animated Progress Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    className={cn(
                      "transition-all duration-1000",
                      isTimerCompleted ? "stroke-emerald" : "stroke-cyber",
                    )}
                    strokeWidth="6"
                    strokeDasharray={264}
                    strokeDashoffset={264 - (264 * timerProgress) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                {/* Inner Counter Content */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <div
                    className={cn(
                      "font-mono text-4xl sm:text-5xl font-extrabold tracking-tighter",
                      isTimerCompleted
                        ? "text-emerald animate-bounce"
                        : isTimerRunning
                          ? "text-cyber"
                          : "text-foreground",
                    )}
                  >
                    {formatTime(timeLeft)}
                  </div>
                  <span className="font-mono text-[10px] uppercase text-muted-foreground mt-1 tracking-widest">
                    {isTimerCompleted
                      ? "MISSION ACCOMPLISHED"
                      : isTimerRunning
                        ? "ENGAGED // ACTIVE"
                        : "PAUSED // STANDBY"}
                  </span>
                </div>
              </div>

              {/* Low Friction Directives Prompt */}
              <div className="max-w-md text-center space-y-1.5 px-4">
                <p className="font-mono text-xs font-semibold text-foreground">
                  &ldquo;Do not plan the whole day. Just focus for these 5 minutes. Momentum will
                  take care of the rest.&rdquo;
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Target: {selectedMicroAction.directive}
                </p>
              </div>

              {/* Timer Control Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={toggleTimer}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg px-6 py-3 font-mono text-sm font-bold shadow-lg transition-all cursor-pointer",
                    isTimerRunning
                      ? "border border-hairline bg-surface text-foreground hover:bg-secondary"
                      : "bg-cyber text-background hover:bg-cyber/90 shadow-cyber/20",
                  )}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="size-4" />
                      PAUSE RUN
                    </>
                  ) : (
                    <>
                      <Play className="size-4 fill-current" />
                      {timeLeft === 0 ? "RESTART 5:00" : "ENGAGE FOCUS (05:00)"}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetTimer}
                  className="rounded-lg border border-hairline bg-background/60 p-3 text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
                  title="Reset Timer"
                >
                  <RotateCcw className="size-4" />
                </button>
              </div>
            </div>

            {/* Victory Transition Banner when completed */}
            {isTimerCompleted && (
              <div className="mt-6 rounded-lg border border-emerald/50 bg-emerald/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <Award className="size-6 text-emerald flex-shrink-0" />
                  <div>
                    <h4 className="font-mono text-sm font-bold text-emerald">
                      Dopamine Loop Broken // Momentum Restored!
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      You successfully survived the friction hurdle. Transition to full tactical
                      command.
                    </p>
                  </div>
                </div>

                {onNavigateToToday && (
                  <button
                    type="button"
                    onClick={onNavigateToToday}
                    className="inline-flex items-center gap-2 rounded bg-emerald px-4 py-2 font-mono text-xs font-bold text-background hover:bg-emerald/90 transition-all flex-shrink-0 cursor-pointer shadow-md"
                  >
                    <span>TRANSITION TO FULL COMMAND</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Tactical Doctrine Card */}
      <div className="panel p-4 sm:p-5 border-hairline/60 bg-surface/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Radio className="size-4 text-cyber animate-pulse" />
          <span>
            TACTICAL DOCTRINE: Discipline is choosing what you want MOST over what you want NOW.
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-foreground font-semibold">RULE OF 5 MINS:</span>
          <span>Action precedes motivation.</span>
        </div>
      </div>
    </div>
  );
}
