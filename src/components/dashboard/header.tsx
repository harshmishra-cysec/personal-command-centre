import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { getSyncStatus, subscribeSyncStatus, type SyncStatus } from "@/lib/pcc-storage";
import { TopNavBar } from "@/components/dashboard/TopNavBar";
import { TacticalQuoteModule } from "@/components/dashboard/TacticalQuoteModule";
import type { TabView } from "@/components/dashboard/nav";

export interface DashHeaderProps {
  activeTab: TabView;
  setActiveTab: (tab: TabView) => void;
  onReplayIntro?: () => void;
  onLogout?: () => void;
  syncStatus?: SyncStatus;
}

export function DashHeader({
  activeTab,
  setActiveTab,
  onReplayIntro,
  onLogout,
  syncStatus: propSyncStatus,
}: DashHeaderProps) {
  const [internalSyncStatus, setInternalSyncStatus] = useState<SyncStatus>(() => getSyncStatus());

  useEffect(() => {
    const unsub = subscribeSyncStatus((s) => setInternalSyncStatus(s));
    return unsub;
  }, []);

  const syncStatus = propSyncStatus || internalSyncStatus;

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#06080e]/90 backdrop-blur-xl transition-all">
      {/* Primary Top Bar Row: 3 Balanced Zones */}
      <div className="w-full max-w-[1700px] mx-auto flex items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        {/* Zone 1 (Far Left): Brand + Operational Status */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onReplayIntro}
            className="flex flex-col items-start gap-0.5 text-left group cursor-pointer focus:outline-none shrink-0"
            title="Replay intro"
          >
            {/* Direct /movone-logo.svg integration */}
            <img
              src="/movone-logo.svg"
              alt="MOVONE"
              className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />

            {/* Status tag neatly aligned below */}
            <div className="flex items-center gap-2">
              {syncStatus === "synced" ? (
                <span
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] sm:text-[9.5px] text-emerald-400 font-semibold tracking-wider"
                  title="Synced with the cloud"
                >
                  <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
                  Synced
                </span>
              ) : syncStatus === "syncing" ? (
                <span
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] sm:text-[9.5px] text-cyan-400 font-semibold tracking-wider"
                  title="Syncing with the cloud"
                >
                  <span className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] animate-ping" />
                  Syncing
                </span>
              ) : (
                <span
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] sm:text-[9.5px] text-amber-400/90 tracking-wider"
                  title="Not connected to the cloud"
                >
                  <span className="size-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                  Saved on this device only
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Zone 2 (Center): Navigation Tabs Bar centered in viewport */}
        <div className="flex-1 flex justify-center items-center overflow-x-auto scroll-thin py-0.5 min-w-0">
          <TopNavBar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Zone 3 (Far Right): Compact Quote Module on desktop + Log out button on all screens */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="hidden lg:flex items-center justify-end">
            <TacticalQuoteModule />
          </div>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              aria-label="Log out"
              title="Log out"
              className="size-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer select-none"
            >
              <LogOut className="size-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
