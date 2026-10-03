import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TacticalChronometerDockProps {
  className?: string;
}

export function TacticalChronometerDock({ className }: TacticalChronometerDockProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format 12-hour time with seconds
  const hours = now ? now.getHours() : 12;
  const minutes = now ? now.getMinutes().toString().padStart(2, "0") : "00";
  const seconds = now ? now.getSeconds().toString().padStart(2, "0") : "00";
  const period = now ? (hours >= 12 ? "PM" : "AM") : "SYS";
  const displayHours = now ? (hours % 12 || 12).toString().padStart(2, "0") : "12";

  const dayName = now ? now.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase() : "SAT";
  const monthName = now ? now.toLocaleDateString("en-US", { month: "short" }).toUpperCase() : "OCT";
  const dayNumber = now ? now.getDate().toString().padStart(2, "0") : "03";
  const year = now ? now.getFullYear() : 2026;

  return (
    <aside
      aria-label="Tactical Chronometer Dock"
      className={cn(
        "fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center",
        "bg-[#0c121e]/85 backdrop-blur-md border border-cyan-500/20 shadow-[0_0_20px_rgba(0,0,0,0.6)] rounded-2xl",
        "py-2.5 sm:py-3 px-1.5 sm:px-2 gap-2 sm:gap-2.5 select-none hover:border-cyan-400/40 transition-all duration-300",
        className,
      )}
    >
      {/* Top Cyber Tick Accent */}
      <div className="w-2.5 h-[2px] rounded-full bg-cyan-400/50" />

      {/* Status Indicator Badge */}
      <div className="group relative flex items-center justify-center">
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30">
          <span className="relative flex size-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
          </span>
          <span className="font-mono text-[7px] sm:text-[7.5px] font-bold tracking-widest text-cyan-300 uppercase whitespace-nowrap">
            LIVE
          </span>
        </div>

        {/* Hover Tooltip to the Right */}
        <div
          role="tooltip"
          className={cn(
            "absolute left-full ml-3 top-1/2 -translate-y-1/2 pointer-events-none",
            "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
            "transition-all duration-150 ease-out z-50 flex items-center",
          )}
        >
          {/* Micro Arrow */}
          <div className="w-0 h-0 border-y-[5px] border-y-transparent border-r-[6px] border-r-[#0c1320] -mr-[1px]" />
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-cyan-500/30 bg-[#0c1320]/95 backdrop-blur-md shadow-xl shadow-black/80 whitespace-nowrap">
            <span className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00e5ff]" />
            <span className="font-mono text-[11px] font-semibold text-cyan-200 tracking-wider">
              TACTICAL CHRONOMETER
            </span>
            <span className="font-mono text-[9px] text-[#D4AF37] tracking-wider ml-1 uppercase">
              [SYS // CLOCK]
            </span>
          </div>
        </div>
      </div>

      {/* Time Digits: High-Contrast Cyan Stacked Monospace */}
      <div className="flex flex-col items-center leading-none tracking-wider font-mono">
        {/* Hours */}
        <span className="text-base sm:text-lg font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(0,229,255,0.7)] tabular-nums">
          {displayHours}
        </span>

        {/* Pulsing Colon Divider */}
        <span className="text-cyan-400/70 text-xs font-bold my-0.5 animate-pulse select-none">
          :
        </span>

        {/* Minutes */}
        <span className="text-base sm:text-lg font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(0,229,255,0.7)] tabular-nums">
          {minutes}
        </span>

        {/* Seconds & Period Micro-tag */}
        <div className="mt-1 flex items-center gap-0.5 px-1 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
          <span className="text-[8.5px] font-mono font-bold text-cyan-400 tabular-nums">
            :{seconds}
          </span>
          <span className="text-[7px] font-mono font-bold text-[#D4AF37] uppercase">
            {period}
          </span>
        </div>
      </div>

      {/* Subtle Micro-divider */}
      <div className="w-3.5 h-[1px] bg-white/[0.08]" />

      {/* Date & Day Badge: Compact Vertical Tactical Typography */}
      <div className="flex flex-col items-center gap-0.5 font-mono text-center">
        <span className="text-[7.5px] sm:text-[8px] font-bold tracking-widest text-[#D4AF37] uppercase px-1 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30">
          {dayName}
        </span>
        <span className="text-[11px] sm:text-xs font-bold text-slate-200 mt-0.5 tabular-nums">
          {dayNumber}
        </span>
        <span className="text-[8.5px] sm:text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
          {monthName}
        </span>
        <span className="text-[7px] sm:text-[7.5px] font-medium text-slate-500 tracking-wider">
          {year}
        </span>
      </div>

      {/* Bottom Amber Tick Accent */}
      <div className="w-2.5 h-[2px] rounded-full bg-amber-400/50" />
    </aside>
  );
}
