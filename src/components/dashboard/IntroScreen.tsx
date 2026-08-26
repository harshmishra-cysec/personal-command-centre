import { useState, useEffect } from "react";
import {
  ShieldAlert,
  Cpu,
  Zap,
  Terminal,
  Check,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Shield,
  Activity,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface IntroScreenProps {
  onComplete: () => void;
}

type Stage = 1 | 2 | 3 | 4;

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [stage, setStage] = useState<Stage>(1);
  const [patchProgress, setPatchProgress] = useState(0);
  const [roleCheck, setRoleCheck] = useState(false);
  const [goalCheck, setGoalCheck] = useState(false);
  const [levelCheck, setLevelCheck] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [lightningFlash, setLightningFlash] = useState(false);

  // Stage 1: Automatic 3.0s Breach & Tremor Glitch Sequence
  useEffect(() => {
    if (stage !== 1) return;

    // Fast sequential checkmarks
    const tRole = setTimeout(() => setRoleCheck(true), 400);
    const tGoal = setTimeout(() => setGoalCheck(true), 800);
    const tLevel = setTimeout(() => setLevelCheck(true), 1200);

    // Glitch tremor shake and red breach alert at ~1.5s
    const tGlitch = setTimeout(() => {
      setGlitchActive(true);
    }, 1500);

    // Transition automatically to Stage 2 at exactly 3.0s
    const tNext = setTimeout(() => {
      setStage(2);
    }, 3000);

    return () => {
      clearTimeout(tRole);
      clearTimeout(tGoal);
      clearTimeout(tLevel);
      clearTimeout(tGlitch);
      clearTimeout(tNext);
    };
  }, [stage]);

  // Stage 2: Automatic 2.5s Progress Bar Fill (0% to 100%) -> Stage 3
  useEffect(() => {
    if (stage !== 2) return;
    setPatchProgress(0);

    let current = 0;
    // 50 steps * 50ms = 2500ms (2.5 seconds total)
    const interval = setInterval(() => {
      current += 2;
      if (current >= 100) {
        setPatchProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setStage(3);
        }, 150);
      } else {
        setPatchProgress(current);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [stage]);

  // Stage 3: Automatic 1.8s Lightning Strike & System Ready -> Stage 4
  useEffect(() => {
    if (stage !== 3) return;
    setLightningFlash(true);

    const tFlashEnd = setTimeout(() => {
      setLightningFlash(false);
    }, 500);

    // Transition automatically to Stage 4 after ~1.8 seconds
    const tToStage4 = setTimeout(() => {
      setStage(4);
    }, 1800);

    return () => {
      clearTimeout(tFlashEnd);
      clearTimeout(tToStage4);
    };
  }, [stage]);

  const handleSkip = () => {
    if (stage < 4) {
      setStage(4);
    } else {
      onComplete();
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center p-4 select-none overflow-hidden transition-colors duration-1000",
        stage <= 2 ? "bg-[#06080E]" : "bg-[#040810]",
      )}
    >
      {/* Dynamic Ambient Background Aura */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-all duration-1000",
          stage <= 2
            ? glitchActive
              ? "bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(239,68,68,0.22),transparent_70%)]"
              : "bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(220,38,38,0.12),transparent_70%)]"
            : "bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(0,229,255,0.18),transparent_70%)]",
        )}
      />

      {/* Cyber Grid Background lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Lightning Flash Overlay (Stage 3) */}
      {lightningFlash && (
        <div className="absolute inset-0 bg-cyan-200/30 backdrop-blur-[1px] animate-pulse z-40 pointer-events-none transition-opacity duration-300" />
      )}

      {/* Skip Button */}
      <div className="absolute top-5 right-5 z-50">
        <button
          type="button"
          onClick={handleSkip}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 font-mono text-[11px] text-muted-foreground hover:text-cyan-300 hover:bg-white/10 hover:border-cyan-500/40 transition-all cursor-pointer shadow-sm"
        >
          <span>{stage < 4 ? "SKIP SEQUENCE >" : "INITIALIZE >"}</span>
          <ChevronRight className="size-3.5" />
        </button>
      </div>

      {/* Main Center Container */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center justify-center text-center">
        {/* Animated Lightning Bolt Arc */}
        {(stage === 3 || stage === 4) && (
          <div className="absolute -top-24 pointer-events-none opacity-40 animate-pulse">
            <Zap className="size-32 text-cyan-400 blur-sm drop-shadow-[0_0_25px_rgba(0,229,255,0.8)]" />
          </div>
        )}

        {/* STAGES 1 to 3: The Cyber Laptop Mockup */}
        {stage <= 3 && (
          <div
            className={cn(
              "w-full max-w-lg transition-all duration-700 flex flex-col items-center",
              glitchActive && stage === 1 && "animate-shake",
              stage === 3 && "scale-105",
            )}
          >
            {/* Laptop Screen Top Bezel */}
            <div
              className={cn(
                "w-full rounded-t-2xl border-t-2 border-x-2 p-3 sm:p-4 bg-[#0A0E17] shadow-2xl relative overflow-hidden transition-all duration-500",
                stage <= 2
                  ? glitchActive
                    ? "border-red-500/80 shadow-[0_0_40px_rgba(239,68,68,0.3)]"
                    : "border-red-900/40 shadow-[0_0_30px_rgba(239,68,68,0.15)]"
                  : "border-cyan-400/80 shadow-[0_0_40px_rgba(0,229,255,0.35)]",
              )}
            >
              {/* Webcam Dot & Mic */}
              <div className="flex items-center justify-center gap-1.5 pb-3">
                <span className="size-1.5 rounded-full bg-white/20" />
                <span
                  className={cn(
                    "size-2 rounded-full transition-colors",
                    stage <= 2
                      ? glitchActive
                        ? "bg-red-500 animate-ping"
                        : "bg-red-500/60"
                      : "bg-cyan-400 animate-pulse",
                  )}
                />
              </div>

              {/* Terminal Screen Inner Matrix */}
              <div
                className={cn(
                  "w-full rounded-lg p-4 sm:p-6 text-left font-mono relative overflow-hidden min-h-[220px] flex flex-col justify-between transition-colors duration-500",
                  stage <= 2
                    ? "bg-[#05070D] border border-red-950/60"
                    : "bg-[#030712] border border-cyan-900/60",
                )}
              >
                {/* Scanlines Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)",
                    backgroundSize: "100% 4px",
                  }}
                />

                {/* Stage 1 Content: Breach Sequence */}
                {stage === 1 && (
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="size-3 text-red-400" />
                        TERMINAL_ROOT // OPERATOR_SYNC
                      </span>
                      <span className="text-red-400 font-bold">PORT_443 // ACTIVE</span>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm">
                      <div
                        className={cn(
                          "flex items-center justify-between transition-opacity duration-300",
                          roleCheck ? "opacity-100 text-slate-200" : "opacity-0",
                        )}
                      >
                        <span className="text-muted-foreground">Role — Student</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="size-3.5" /> VERIFIED
                        </span>
                      </div>

                      <div
                        className={cn(
                          "flex items-center justify-between transition-opacity duration-300",
                          goalCheck ? "opacity-100 text-slate-200" : "opacity-0",
                        )}
                      >
                        <span className="text-muted-foreground">Goal — Elite Mastery</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="size-3.5" /> VERIFIED
                        </span>
                      </div>

                      <div
                        className={cn(
                          "flex items-center justify-between transition-opacity duration-300",
                          levelCheck ? "opacity-100 text-slate-200" : "opacity-0",
                        )}
                      >
                        <span className="text-muted-foreground">Level — Operator</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="size-3.5" /> VERIFIED
                        </span>
                      </div>
                    </div>

                    {glitchActive && (
                      <div className="pt-2 border-t border-red-500/30 animate-in fade-in duration-200">
                        <div className="flex items-center gap-2 text-red-400 font-bold text-xs sm:text-sm animate-pulse">
                          <ShieldAlert className="size-4 shrink-0 text-red-500" />
                          <span className="tracking-wider">
                            /// SYSTEM OVERRIDE / BREACH DETECTED
                          </span>
                        </div>
                        <p className="text-[10px] text-red-300/80 mt-1 font-mono">
                          Unauthorized cognitive distraction intercepted. Triggering patch
                          protocol...
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Stage 2 Content: Patch Deployment & Overclock */}
                {stage === 2 && (
                  <div className="space-y-4 relative z-10 my-auto">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-400 flex items-center gap-1.5 font-bold">
                        <Cpu className="size-3.5 animate-spin" />
                        LOADING PATCH // OVERCLOCKING PROTOCOL
                      </span>
                      <span className="text-amber-400 font-extrabold">{patchProgress}%</span>
                    </div>

                    {/* High Voltage Progress Bar */}
                    <div className="h-3 w-full rounded-full bg-black/60 border border-amber-400/40 p-0.5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-cyan-400 transition-all duration-75 shadow-[0_0_10px_rgba(245,158,11,0.6)]"
                        style={{ width: `${patchProgress}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-muted-foreground pt-1">
                      <span className="truncate text-emerald-400">KERNEL: ARMORED</span>
                      <span className="truncate text-center text-amber-400">DOPAMINE: GATED</span>
                      <span className="truncate text-right text-cyan-400">RAM: MAX_HZ</span>
                    </div>
                  </div>
                )}

                {/* Stage 3 Content: Overclocked & Online */}
                {stage === 3 && (
                  <div className="space-y-3 relative z-10 my-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/50 bg-cyan-950/40 text-cyan-300 text-xs font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                      <Zap className="size-3.5 text-cyan-400" />
                      <span>OVERCLOCK COMPLETED // 100% EFFICIENCY</span>
                    </div>

                    <div className="font-mono text-base sm:text-lg font-black text-cyan-400 tracking-wider drop-shadow-[0_0_10px_rgba(0,229,255,0.7)]">
                      // SYSTEM READY // COMMAND CENTER ONLINE
                    </div>

                    <p className="text-xs text-muted-foreground font-mono">
                      Tactical execution matrix synchronized. Deploying command deck...
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Laptop Base & Keyboard Hinge */}
            <div className="w-[108%] h-4 bg-gradient-to-b from-[#1C2538] to-[#0D131F] rounded-b-xl border-x-2 border-b-2 border-white/10 shadow-2xl relative flex items-center justify-center">
              <div className="w-16 h-1 rounded-full bg-white/20" />
            </div>
          </div>
        )}

        {/* STAGE 4: Hero Landing & Access Trigger */}
        {stage === 4 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-700 w-full max-w-xl">
            {/* Holographic Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/30 font-mono text-xs text-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.25)]">
              <Sparkles className="size-3.5 text-cyan-400" />
              <span className="font-bold">VERSION 2.5 // TACTICAL SUITE</span>
            </div>

            {/* App Brand Title */}
            <div className="space-y-2">
              <h1 className="font-mono text-3xl sm:text-5xl font-black uppercase tracking-wider text-foreground drop-shadow-[0_0_25px_rgba(0,229,255,0.4)]">
                PERSONAL <span className="text-cyan-400">COMMAND</span> CENTER
              </h1>
              <p className="font-mono text-sm sm:text-base text-muted-foreground font-medium max-w-lg mx-auto">
                Tactical Execution Engine // Zero Friction Focus
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="panel p-3 rounded-xl border border-white/10 bg-[#0E1524]/80 text-left">
                <Shield className="size-4 text-cyan-400 mb-1.5" />
                <div className="font-mono text-xs font-bold text-foreground">Cyber Pillar</div>
                <div className="font-mono text-[10px] text-muted-foreground">THM / HTB / Labs</div>
              </div>
              <div className="panel p-3 rounded-xl border border-white/10 bg-[#0E1524]/80 text-left">
                <Activity className="size-4 text-amber-400 mb-1.5" />
                <div className="font-mono text-xs font-bold text-foreground">Academics</div>
                <div className="font-mono text-[10px] text-muted-foreground">OS / Math / Exams</div>
              </div>
              <div className="panel p-3 rounded-xl border border-white/10 bg-[#0E1524]/80 text-left">
                <Flame className="size-4 text-emerald-400 mb-1.5" />
                <div className="font-mono text-xs font-bold text-foreground">AIML Builds</div>
                <div className="font-mono text-[10px] text-muted-foreground">Models / Papers</div>
              </div>
            </div>

            {/* High-Voltage Pulse Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onComplete}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl border-2 border-cyan-400 bg-cyan-500/20 text-cyan-300 font-mono text-sm font-extrabold tracking-wider hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(0,229,255,0.7)] transition-all duration-300 group cursor-pointer animate-pulse"
              >
                <span>[ INITIALIZE COMMAND / START ]</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Step Indicator Bullets at Bottom */}
      <div className="absolute bottom-6 flex items-center gap-2 z-10">
        {[1, 2, 3, 4].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStage(s as Stage)}
            aria-label={`Jump to stage ${s}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
              stage === s
                ? "w-8 bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.8)]"
                : "w-2 bg-white/20 hover:bg-white/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
