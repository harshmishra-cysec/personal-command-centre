import { useState } from "react";
import {
  BarChart3,
  CalendarCheck,
  Map,
  PanelLeftClose,
  PanelLeftOpen,
  ScanEye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MovoneLogo } from "@/components/dashboard/MovoneLogo";

export type TabView = "today" | "roadmaps" | "reality" | "stats";

export const NAV_ITEMS = [
  { id: "today", label: "Today", icon: CalendarCheck },
  { id: "roadmaps", label: "Roadmaps", icon: Map },
  { id: "reality", label: "Re-Check", icon: ScanEye },
  { id: "stats", label: "Stats", icon: BarChart3 },
] as const;

interface DesktopSidebarProps {
  activeTab?: TabView;
  setActiveTab?: (tab: TabView) => void;
  onTabChange?: (tab: TabView) => void;
  onReplayIntro?: () => void;
}

export function DesktopSidebar({
  activeTab = "today",
  setActiveTab,
  onTabChange,
  onReplayIntro,
}: DesktopSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const handleTabClick = (tab: TabView) => {
    setActiveTab?.(tab);
    onTabChange?.(tab);
  };

  return (
    <aside
      className={cn(
        "hidden lg:flex shrink-0 flex-col border-r border-border bg-surface/60 transition-[width] duration-200",
        collapsed ? "w-[68px]" : "w-[232px]",
      )}
    >
      <div className="flex h-16 items-center border-b border-border px-3">
        <button
          type="button"
          onClick={onReplayIntro}
          className="flex w-full items-center gap-2.5 rounded-md p-1 text-left group cursor-pointer hover:text-primary transition-colors focus:outline-none"
          title="Replay System Intro"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-md border border-border/80 bg-background/80 group-hover:border-[#D4AF37]/50 transition-all">
            <MovoneLogo
              size={22}
              glow={false}
              className="group-hover:scale-110 transition-transform"
            />
          </span>
          {!collapsed && (
            <span className="truncate font-mono text-[11px] font-bold tracking-[0.22em] text-foreground/80 group-hover:text-[#D4AF37] transition-colors">
              MOVONE
            </span>
          )}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id as TabView)}
              className={cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                collapsed && "justify-center px-0",
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-primary" />
              )}
              <item.icon className={cn("size-4 shrink-0", isActive && "text-primary")} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center gap-3 border-t border-border px-4 py-3 text-muted-foreground transition-colors hover:text-foreground"
      >
        {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
        {!collapsed && <span className="text-xs">Collapse</span>}
      </button>
    </aside>
  );
}

interface MobileBottomNavProps {
  activeTab?: TabView;
  setActiveTab?: (tab: TabView) => void;
  onTabChange?: (tab: TabView) => void;
}

export function MobileBottomNav({
  activeTab = "today",
  setActiveTab,
  onTabChange,
}: MobileBottomNavProps) {
  const handleTabClick = (tab: TabView) => {
    setActiveTab?.(tab);
    onTabChange?.(tab);
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-4">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id as TabView)}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[10px] tracking-wide transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="size-[18px]" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
