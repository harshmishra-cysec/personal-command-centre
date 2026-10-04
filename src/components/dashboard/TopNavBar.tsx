import { BarChart3, CalendarCheck, Map, ScanEye } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TabView } from "@/components/dashboard/nav";

export interface TopNavBarProps {
  activeTab: TabView;
  onTabChange: (tab: TabView) => void;
  className?: string;
}

export const TOP_NAV_ITEMS = [
  { id: "today", label: "Today", icon: CalendarCheck, code: "01" },
  { id: "roadmaps", label: "Roadmaps", icon: Map, code: "02" },
  { id: "reality", label: "Refocus", icon: ScanEye, code: "03" },
  { id: "stats", label: "Stats", icon: BarChart3, code: "04" },
] as const;

export function TopNavBar({ activeTab, onTabChange, className }: TopNavBarProps) {
  return (
    <nav
      aria-label="Main Navigation"
      className={cn(
        "relative flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl",
        "bg-gradient-to-b from-[#111927]/90 via-[#0d1422]/95 to-[#070b13]/98",
        "border border-cyan-500/20 backdrop-blur-md shadow-inner shadow-black/50",
        className,
      )}
    >
      {/* Outer Tactical Bracket Trim (Techfest Inspired) */}
      <span className="absolute -top-[1px] left-3 h-[2px] w-6 bg-cyan-400/50" />
      <span className="absolute -top-[1px] right-3 h-[2px] w-6 bg-amber-400/50" />
      <span className="absolute -bottom-[1px] left-6 h-[2px] w-8 bg-cyan-400/30" />
      <span className="absolute -bottom-[1px] right-6 h-[2px] w-8 bg-amber-400/30" />

      {TOP_NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabChange(item.id as TabView)}
            className={cn(
              "group relative flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg",
              "font-mono text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer focus:outline-none",
              isActive
                ? "text-cyan-200 bg-cyan-500/15 border border-cyan-400/40 shadow-[0_0_16px_rgba(0,229,255,0.22)]"
                : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05] border border-transparent hover:border-white/10",
            )}
          >
            {/* Top Indicator Accent for Active State */}
            {isActive && (
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
            )}

            <Icon
              className={cn(
                "size-3.5 sm:size-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                isActive ? "text-cyan-400 drop-shadow-[0_0_6px_rgba(0,229,255,0.7)]" : "text-muted-foreground group-hover:text-foreground",
              )}
            />

            <span className="font-mono text-[11px] sm:text-[12px] uppercase">
              {item.label}
            </span>

            {/* Micro Numeric Index */}
            <span
              className={cn(
                "hidden xl:inline text-[9px] font-mono opacity-50 transition-opacity",
                isActive ? "text-cyan-300 opacity-80" : "text-muted-foreground",
              )}
            >
              .{item.code}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
