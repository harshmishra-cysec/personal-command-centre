import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { QUOTES } from "@/lib/dash-data";
import { cn } from "@/lib/utils";

interface TacticalQuoteModuleProps {
  className?: string;
}

export function TacticalQuoteModule({ className }: TacticalQuoteModuleProps) {
  const [index, setIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [fadeState, setFadeState] = useState<"visible" | "fading">("visible");

  useEffect(() => {
    // Initial random quote
    setIndex(Math.floor(Math.random() * QUOTES.length));

    // Auto rotate every 15 seconds
    const interval = setInterval(() => {
      cycleQuote();
    }, 15_000);

    return () => clearInterval(interval);
  }, []);

  const cycleQuote = () => {
    setFadeState("fading");
    setIsRotating(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
      setFadeState("visible");
      setTimeout(() => setIsRotating(false), 350);
    }, 150);
  };

  const currentQuote = QUOTES[index] ?? QUOTES[0]!;

  return (
    <div
      onClick={cycleQuote}
      title="Click to cycle tactical directive"
      className={cn(
        "group relative select-none cursor-pointer overflow-hidden transition-all duration-300",
        "w-full max-w-[270px] sm:max-w-[310px] xl:max-w-[340px]",
        className,
      )}
    >
      {/* Ambient Cyber Hover Glow */}
      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-amber-500/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

      {/* Chamfered Tactical Container */}
      <div
        className={cn(
          "relative flex flex-col justify-between px-2.5 py-1.5 sm:px-3 sm:py-2",
          "bg-gradient-to-br from-[#111927]/95 via-[#0c1320]/95 to-[#070b13]/98",
          "border border-cyan-500/25 group-hover:border-cyan-400/50",
          "backdrop-blur-md shadow-lg shadow-black/40",
          "transition-all duration-300",
        )}
        style={{
          clipPath:
            "polygon(10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px)",
        }}
      >
        {/* Tactical Corner Bracket Accents */}
        <span className="absolute top-0 left-2.5 h-[2px] w-4 bg-cyan-400/60 pointer-events-none" />
        <span className="absolute top-2.5 left-0 w-[2px] h-4 bg-cyan-400/60 pointer-events-none" />
        <span className="absolute bottom-0 right-2.5 h-[2px] w-4 bg-amber-400/60 pointer-events-none" />
        <span className="absolute bottom-2.5 right-0 w-[2px] h-4 bg-amber-400/60 pointer-events-none" />

        {/* Subtle Grandmaster Chess Knight Watermark in Background */}
        <div className="absolute right-1 -bottom-2 pointer-events-none opacity-[0.06] group-hover:opacity-[0.09] transition-opacity">
          <svg width="78" height="78" viewBox="0 0 100 100" fill="currentColor" className="text-white">
            <path d="M50 10 C45 20, 35 25, 30 35 C28 42, 30 50, 35 55 L28 65 L40 68 C45 75, 48 85, 48 90 L75 90 C75 75, 78 60, 72 45 C68 35, 65 25, 50 10 Z" />
          </svg>
        </div>

        {/* Header Telemetry Row */}
        <div className="flex items-center justify-between gap-2 pb-1 border-b border-white/[0.08]">
          <div className="flex items-center gap-1.5">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
            </span>
            <span className="font-mono text-[8.5px] font-bold tracking-widest text-cyan-300/90 uppercase">
              [FOCUS // OVERRIDE]
            </span>
          </div>

          <div className="flex items-center gap-2">
            {"source" in currentQuote && (
              <span className="font-mono text-[8px] text-amber-400/80 tracking-widest uppercase hidden sm:inline">
                {String((currentQuote as { source?: string }).source)}
              </span>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                cycleQuote();
              }}
              className="p-0.5 rounded text-muted-foreground hover:text-cyan-300 hover:bg-white/5 transition-colors focus:outline-none"
              title="Next directive"
            >
              <RefreshCw
                className={cn("size-2.5 transition-transform duration-500", isRotating && "rotate-180")}
              />
            </button>
          </div>
        </div>

        {/* Directive Quote Body */}
        <div
          className={cn(
            "pt-1 transition-all duration-200 min-h-[38px] flex flex-col justify-center",
            fadeState === "fading" ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0",
          )}
        >
          <p className="line-clamp-2 font-display text-[10px] sm:text-[11px] leading-tight text-foreground/90 italic tracking-wide">
            “{currentQuote.text}”
          </p>
          <p className="font-mono text-[8px] sm:text-[8.5px] font-semibold text-right text-[#D4AF37] tracking-wider mt-0.5">
            — {currentQuote.author.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
