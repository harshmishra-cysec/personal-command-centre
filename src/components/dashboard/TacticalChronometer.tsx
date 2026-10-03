import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TacticalChronometerProps {
  className?: string;
}

export function TacticalChronometer({ className }: TacticalChronometerProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    // Live ticker updating every second for true chronometer precision
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

  const dayName = now ? now.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase() : "SYNC";
  const monthName = now ? now.toLocaleDateString("en-US", { month: "short" }).toUpperCase() : "LIVE";
  const dayNumber = now ? now.getDate().toString().padStart(2, "0") : "01";
  const year = now ? now.getFullYear() : 2026;

  return (
    <div
      className={cn(
        "relative flex flex-col items-end justify-center px-3 py-1.5 sm:px-3.5 sm:py-2 select-none",
        "rounded-xl border border-cyan-500/30 bg-gradient-to-b from-[#111927]/95 via-[#0c1320]/95 to-[#070b13]/98",
        "backdrop-blur-md shadow-lg shadow-black/50 group hover:border-cyan-400/60 transition-all duration-300",
        className,
      )}
      style={{
        boxShadow: "0 0 16px rgba(0, 229, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Tactical Corner Tick Marks (Military Bezel Accent) */}
      <span className="absolute top-1 left-1.5 size-1.5 border-t border-l border-cyan-400 pointer-events-none opacity-80 group-hover:opacity-100" />
      <span className="absolute top-1 right-1.5 size-1.5 border-t border-r border-cyan-400 pointer-events-none opacity-80 group-hover:opacity-100" />
      <span className="absolute bottom-1 left-1.5 size-1.5 border-b border-l border-amber-400 pointer-events-none opacity-70 group-hover:opacity-100" />
      <span className="absolute bottom-1 right-1.5 size-1.5 border-b border-r border-amber-400 pointer-events-none opacity-70 group-hover:opacity-100" />

      {/* Primary Digits Row: Live Chronometer HH:MM:SS */}
      <div className="flex items-center gap-1.5">
        {/* Pulsing Sync Dot */}
        <span className="relative flex size-1.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00e5ff]" />
        </span>

        <span className="font-mono text-xs sm:text-[13px] font-bold tracking-widest text-cyan-300 drop-shadow-[0_0_8px_rgba(0,229,255,0.7)] tabular-nums">
          {displayHours}
          <span className="animate-pulse text-cyan-400/90">:</span>
          {minutes}
          <span className="animate-pulse text-cyan-400/90">:</span>
          {seconds}
        </span>

        <span className="font-mono text-[9px] font-extrabold text-[#D4AF37] px-1 py-0.2 rounded border border-[#D4AF37]/30 bg-[#D4AF37]/10 tracking-wider">
          {period}
        </span>
      </div>

      {/* Secondary Data: Date & Tactical Local Mode */}
      <div className="flex items-center gap-1 mt-0.5 font-mono text-[9px] text-slate-400 tracking-wider uppercase">
        <span className="text-cyan-400/70 font-semibold">[LOCAL]</span>
        <span>{dayName} · {dayNumber} {monthName} {year}</span>
      </div>
    </div>
  );
}
