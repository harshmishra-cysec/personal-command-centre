import { useState } from "react";
import { BarChart3, CalendarCheck, Map, PanelLeftClose, PanelLeftOpen, ScanEye, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { id: "today", label: "Today", icon: CalendarCheck },
  { id: "roadmaps", label: "Roadmaps", icon: Map },
  { id: "reality", label: "Reality Check", icon: ScanEye },
  { id: "stats", label: "Stats", icon: BarChart3 },
] as const;

export function DesktopSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState<string>("today");

  return (
    <aside
      className={cn(
        "hidden lg:flex shrink-0 flex-col border-r border-border bg-surface/60 transition-[width] duration-200",
        collapsed ? "w-[68px]" : "w-[232px]",
      )}
    >
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-4">
        <span className="grid size-8 shrink-0 place-items-center rounded-md border border-border bg-background text-primary">
          <Terminal className="size-4" />
        </span>
        {!collapsed && (
          <span className="truncate font-mono text-[11px] tracking-[0.22em] text-muted-foreground">
            PCC / v1.0
          </span>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
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

export function MobileBottomNav() {
  const [active, setActive] = useState<string>("today");

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-4">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
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
