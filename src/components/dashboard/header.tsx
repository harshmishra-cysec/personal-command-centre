import { useEffect, useState } from "react";
import { getSyncStatus, subscribeSyncStatus, type SyncStatus } from "@/lib/pcc-storage";
import { TopNavBar } from "@/components/dashboard/TopNavBar";
import { TacticalQuoteModule } from "@/components/dashboard/TacticalQuoteModule";
import { TacticalChronometer } from "@/components/dashboard/TacticalChronometer";
import type { TabView } from "@/components/dashboard/nav";

export interface DashHeaderProps {
  activeTab: TabView;
  setActiveTab: (tab: TabView) => void;
  onReplayIntro?: () => void;
  syncStatus?: SyncStatus;
}

export function DashHeader({
  activeTab,
  setActiveTab,
  onReplayIntro,
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
      {/* Primary Top Bar Row */}
      <div className="w-full max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        {/* Left: Brand + Tactical Status (Requirement 2) */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <button
            type="button"
            onClick={onReplayIntro}
            className="flex flex-col items-start gap-1 text-left group cursor-pointer focus:outline-none"
            title="Replay Tactical Boot Sequence"
          >
            {/* Direct /movone-logo.svg integration as requested */}
            <img
              src="/movone-logo.svg"
              alt="MOVONE"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />

            {/* Operational Status Tag neatly aligned below */}
            <div className="flex items-center gap-2">
              {syncStatus === "synced" ? (
                <span
                  className="inline-flex items-center gap-1.5 font-mono text-[9.5px] text-emerald-400 font-semibold tracking-wider"
                  title="Realtime synced with Supabase cloud"
                >
                  <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
                  STATUS: OPERATIONAL
                </span>
              ) : syncStatus === "syncing" ? (
                <span
                  className="inline-flex items-center gap-1.5 font-mono text-[9.5px] text-cyan-400 font-semibold tracking-wider"
                  title="Sync in-flight..."
                >
                  <span className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] animate-ping" />
                  SYNC IN-FLIGHT
                </span>
              ) : (
                <span
                  className="inline-flex items-center gap-1.5 font-mono text-[9.5px] text-amber-400/90 tracking-wider"
                  title="Local fallback active"
                >
                  <span className="size-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                  LOCAL ONLY
                </span>
              )}
            </div>
          </button>

          {/* Tactical Chronometer on Mobile */}
          <div className="md:hidden">
            <TacticalChronometer />
          </div>
        </div>

        {/* Center: Top Segmented Navbar (Grandmaster Tactical Navigation) */}
        <div className="flex justify-center w-full md:w-auto overflow-x-auto scroll-thin py-0.5">
          <TopNavBar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Right: Tactical Chronometer & Directives Module (Requirement 3) */}
        <div className="hidden md:flex items-center justify-end gap-3 min-w-0">
          <TacticalChronometer />
          <TacticalQuoteModule />
        </div>
      </div>
    </header>
  );
}
