import { useState, useEffect, useRef } from "react";
import {
  Flame,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  Clock,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  FileJson,
  Check,
  Tag,
  Activity,
  Layers,
  Zap,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  computeStatsOverview,
  exportBackupData,
  importBackupData,
  purgeAllDataToZero,
  type StatsOverview,
  type DayActivity,
} from "@/lib/stats-data";

export function StatsView() {
  const [stats, setStats] = useState<StatsOverview>(() => computeStatsOverview());
  const [hoveredDay, setHoveredDay] = useState<DayActivity | null>(null);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshStats = () => {
    setStats(computeStatsOverview());
  };

  useEffect(() => {
    refreshStats();
  }, []);

  const handleExport = () => {
    exportBackupData();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importBackupData(content);
        if (success) {
          setImportStatus("success");
          refreshStats();
          setTimeout(() => setImportStatus("idle"), 3000);
        } else {
          setImportStatus("error");
          setTimeout(() => setImportStatus("idle"), 3000);
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleConfirmPurge = () => {
    purgeAllDataToZero();
    setResetModalOpen(false);
    refreshStats();
  };

  // 4-tier Cyan / Cyber progression for 30-day activity heatmap
  const getActivityColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-[#0B0F17] border-white/5 text-muted-foreground/30 hover:border-white/20";
      case 1:
        return "bg-cyan-950/50 border-cyan-800/50 text-cyan-400/90 hover:border-cyan-600";
      case 2:
        return "bg-cyan-900/60 border-cyan-600/70 text-cyan-300 shadow-[0_0_8px_rgba(0,229,255,0.2)] hover:border-cyan-400";
      case 3:
        return "bg-cyan-500/80 border-cyan-400 text-black font-bold shadow-[0_0_12px_rgba(0,229,255,0.4)] hover:scale-105";
      case 4:
        return "bg-[#00E5FF] border-white text-black font-extrabold shadow-[0_0_16px_rgba(0,229,255,0.6)] hover:scale-105";
      default:
        return "bg-[#0B0F17] border-white/5";
    }
  };

  // Pillar allocation percentages (strictly dynamic, 0% if no tasks exist)
  const totalPillarCount =
    stats.pillarStats.cyber.total + stats.pillarStats.gold.total + stats.pillarStats.emerald.total;
  const cyberPct =
    totalPillarCount > 0 ? (stats.pillarStats.cyber.total / totalPillarCount) * 100 : 0;
  const goldPct =
    totalPillarCount > 0 ? (stats.pillarStats.gold.total / totalPillarCount) * 100 : 0;
  const emeraldPct =
    totalPillarCount > 0 ? (stats.pillarStats.emerald.total / totalPillarCount) * 100 : 0;

  const avgFocusYield =
    stats.completedTasks > 0 ? (stats.totalFocusHours / stats.completedTasks).toFixed(1) : "0.0";

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="size-2 rounded-full bg-[#00E5FF] animate-pulse" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-mono text-base sm:text-lg font-bold uppercase tracking-wider text-foreground">
                Performance Telemetry & Analytics
              </h2>
              <span className="rounded border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[9px] text-primary font-bold">
                LIVE
              </span>
            </div>
            <p className="font-mono text-xs text-muted-foreground mt-0.5">
              Historical velocity, consistency matrix, and cross-pillar tactical yield.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={refreshStats}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="size-3" />
          <span>SYNC TELEMETRY</span>
        </button>
      </div>

      {/* 1. Sleek 4-Card Top Metrics Row with Hover Lift & Glow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Missions Completed */}
        <div className="panel p-4 rounded-xl border border-white/10 bg-[#131B2A] hover:-translate-y-1 hover:border-emerald/50 hover:shadow-[0_8px_24px_-8px_rgba(16,185,129,0.2)] transition-all duration-300 group flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Missions Completed
              </div>
              <div className="font-mono text-2xl font-extrabold text-foreground tracking-tight group-hover:text-emerald transition-colors">
                {stats.completedTasks}
                <span className="text-xs font-normal text-muted-foreground ml-1.5 font-mono">
                  / {stats.totalTasks}
                </span>
              </div>
            </div>
            <div className="grid size-9 place-items-center rounded-lg border border-emerald/40 bg-emerald/10 text-emerald group-hover:scale-105 transition-transform">
              <CheckCircle2 className="size-4" />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span>COMPLETION RATE</span>
              <span className="text-emerald font-bold">{stats.completionRate}%</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-[#0B0F17]">
              <div
                className="h-full bg-emerald transition-all duration-500"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Operational Streak */}
        <div className="panel p-4 rounded-xl border border-white/10 bg-[#131B2A] hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_8px_24px_-8px_rgba(255,179,0,0.2)] transition-all duration-300 group flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Operational Streak
              </div>
              <div className="font-mono text-2xl font-extrabold text-gold tracking-tight group-hover:drop-shadow-[0_0_8px_rgba(255,179,0,0.4)] transition-all">
                {stats.currentStreak}
                <span className="text-xs font-normal text-muted-foreground ml-1.5 font-mono">
                  DAYS
                </span>
              </div>
            </div>
            <div className="grid size-9 place-items-center rounded-lg border border-gold/40 bg-gold/10 text-gold group-hover:scale-105 transition-transform">
              <Flame className="size-4" />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
            <span>ALL-TIME RECORD</span>
            <span className="text-foreground font-bold">{stats.longestStreak} CONSECUTIVE</span>
          </div>
        </div>

        {/* Card 3: Deep Focus Output */}
        <div className="panel p-4 rounded-xl border border-white/10 bg-[#131B2A] hover:-translate-y-1 hover:border-cyber/50 hover:shadow-[0_8px_24px_-8px_rgba(0,229,255,0.2)] transition-all duration-300 group flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Estimated Focus Yield
              </div>
              <div className="font-mono text-2xl font-extrabold text-cyber tracking-tight group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.4)] transition-all">
                {stats.totalFocusHours}
                <span className="text-xs font-normal text-muted-foreground ml-1.5 font-mono">
                  HOURS
                </span>
              </div>
            </div>
            <div className="grid size-9 place-items-center rounded-lg border border-cyber/40 bg-cyber/10 text-cyber group-hover:scale-105 transition-transform">
              <Clock className="size-4" />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
            <span>HIGH-COGNITIVE YIELD</span>
            <span className="text-cyber font-bold">~{avgFocusYield}H / MISSION</span>
          </div>
        </div>

        {/* Card 4: Distractions Intercepted */}
        <div className="panel p-4 rounded-xl border border-white/10 bg-[#131B2A] hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_8px_24px_-8px_rgba(0,229,255,0.2)] transition-all duration-300 group flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Distractions Intercepted
              </div>
              <div className="font-mono text-2xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                {stats.interceptsCount}
                <span className="text-xs font-normal text-muted-foreground ml-1.5 font-mono">
                  SAVES
                </span>
              </div>
            </div>
            <div className="grid size-9 place-items-center rounded-lg border border-primary/40 bg-primary/10 text-primary group-hover:scale-105 transition-transform">
              <ShieldCheck className="size-4" />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
            <span>SAVED COGNITIVE TIME</span>
            <span className="text-emerald font-bold">
              ~{(stats.interceptsCount * 0.5).toFixed(1)}H PRESERVED
            </span>
          </div>
        </div>
      </div>

      {/* 2. Compact 30-Day Activity Heatmap (GitHub / LeetCode style) */}
      <div className="panel p-4 sm:p-5 rounded-xl border border-white/10 bg-[#131B2A] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-cyber" />
            <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
              30-Day Activity Matrix
            </h3>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
            <span>LESS</span>
            <span className="size-2.5 rounded-sm bg-[#0B0F17] border border-white/10" />
            <span className="size-2.5 rounded-sm bg-cyan-950/60 border border-cyan-800/50" />
            <span className="size-2.5 rounded-sm bg-cyan-900/60 border border-cyan-600/70" />
            <span className="size-2.5 rounded-sm bg-cyan-500/80 border border-cyan-400" />
            <span className="size-2.5 rounded-sm bg-[#00E5FF] border border-white" />
            <span>MORE</span>
          </div>
        </div>

        {/* Compact Grid */}
        <div className="relative pt-1">
          <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-1.5 sm:gap-2">
            {stats.activityMatrix.map((day) => (
              <div
                key={day.date}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                className={cn(
                  "relative flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-lg border transition-all duration-200 cursor-pointer select-none",
                  getActivityColor(day.level),
                  hoveredDay?.date === day.date && "ring-2 ring-cyber scale-105 z-10",
                )}
              >
                <span className="font-mono text-[9px] opacity-75 leading-none">{day.dayLabel}</span>
                <span className="font-mono text-xs font-bold mt-0.5 leading-none">
                  {day.dayNumber}
                </span>
                <span className="font-mono text-[8px] mt-0.5 opacity-80 leading-none">
                  {day.count}
                </span>
              </div>
            ))}
          </div>

          {/* Minimal Sleek Tooltip / Hover Banner */}
          <div className="mt-2.5 min-h-[28px] flex items-center justify-between px-3 py-1 rounded-md border border-white/10 bg-[#0B0F17] font-mono text-[11px]">
            {hoveredDay ? (
              <>
                <div className="flex items-center gap-2 text-foreground">
                  <Zap className="size-3 text-cyber" />
                  <span className="font-bold">{hoveredDay.date}</span>
                  <span className="text-muted-foreground">({hoveredDay.dayLabel})</span>
                </div>
                <div className="text-muted-foreground">
                  Logged:{" "}
                  <span className="text-cyber font-bold">{hoveredDay.count} operations</span> (Level{" "}
                  {hoveredDay.level}/4)
                </div>
              </>
            ) : (
              <div className="text-muted-foreground/60 flex items-center gap-2">
                <Activity className="size-3 text-muted-foreground/40" />
                <span>Hover over any day node to inspect tactical telemetry...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Unified Distribution & Telemetry Row (Pillar Ratio + Tags) */}
      <div className="panel p-4 sm:p-5 rounded-xl border border-white/10 bg-[#131B2A] space-y-4">
        {/* Cross-Pillar Allocation */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-foreground font-bold">
              <Layers className="size-3.5 text-primary" />
              <span>CROSS-PILLAR ALLOCATION RATIO</span>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="text-cyber font-semibold">● CYBER ({Math.round(cyberPct)}%)</span>
              <span className="text-gold font-semibold">● ACADEMICS ({Math.round(goldPct)}%)</span>
              <span className="text-emerald font-semibold">● AIML ({Math.round(emeraldPct)}%)</span>
            </div>
          </div>

          {totalPillarCount === 0 ? (
            <div className="space-y-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#0B0F17] border border-white/5" />
              <p className="text-[11px] font-mono text-muted-foreground/50 text-center pt-0.5">
                No active tasks logged across pillars yet (0 active objectives).
              </p>
            </div>
          ) : (
            <div className="h-2 w-full overflow-hidden rounded-full flex bg-[#0B0F17]">
              <div
                className="h-full bg-cyber transition-all duration-500"
                style={{ width: `${cyberPct}%` }}
              />
              <div
                className="h-full bg-gold transition-all duration-500"
                style={{ width: `${goldPct}%` }}
              />
              <div
                className="h-full bg-emerald transition-all duration-500"
                style={{ width: `${emeraldPct}%` }}
              />
            </div>
          )}
        </div>

        {/* Active Domain Tags */}
        <div className="pt-3 border-t border-white/5 space-y-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-muted-foreground flex items-center gap-1.5">
              <Tag className="size-3 text-muted-foreground" />
              ACTIVE DOMAIN TAGS
            </span>
            <span className="text-[10px] text-muted-foreground">
              {Object.keys(stats.tagStats).length} ACTIVE TAGS
            </span>
          </div>

          {Object.keys(stats.tagStats).length === 0 ? (
            <div className="text-xs font-mono text-muted-foreground/50 py-1.5">
              No active domain tags recorded yet.
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {Object.entries(stats.tagStats).map(([tag, data]) => {
                const rate = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
                return (
                  <div
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-[#0B0F17] px-2.5 py-1 font-mono text-[11px] hover:border-white/20 transition-colors"
                  >
                    <span className="font-bold text-foreground">#{tag}</span>
                    <span className="text-[10px] text-emerald font-semibold">{rate}%</span>
                    <span className="text-[10px] text-muted-foreground/70">
                      ({data.completed}/{data.total})
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 4. Minimal Data Vault Footer */}
      <div className="panel p-4 rounded-xl border border-white/10 bg-[#131B2A] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileJson className="size-3.5 text-primary" />
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
              Data Vault & Backups
            </h4>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            LOCAL PERSISTENCE ENCRYPTED
          </span>
        </div>

        {importStatus === "success" && (
          <div className="p-2.5 rounded-lg border border-emerald/50 bg-emerald/10 font-mono text-xs text-emerald flex items-center gap-2">
            <Check className="size-3.5" />
            <span>Tactical backup successfully imported and synchronized!</span>
          </div>
        )}

        {importStatus === "error" && (
          <div className="p-2.5 rounded-lg border border-red-500/50 bg-red-500/10 font-mono text-xs text-red-400 flex items-center gap-2">
            <AlertTriangle className="size-3.5" />
            <span>Failed to parse JSON backup file. Please verify file integrity.</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {/* Export JSON Button */}
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#0B0F17] px-3.5 py-2 font-mono text-xs font-bold text-foreground hover:bg-white/5 hover:border-emerald/40 hover:text-emerald transition-all"
          >
            <Download className="size-3.5 text-emerald" />
            <span>EXPORT JSON</span>
          </button>

          {/* Import JSON Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#0B0F17] px-3.5 py-2 font-mono text-xs font-bold text-foreground hover:bg-white/5 hover:border-cyber/40 hover:text-cyber transition-all"
          >
            <Upload className="size-3.5 text-cyber" />
            <span>IMPORT JSON</span>
          </button>

          {/* Reset / Purge Button */}
          <button
            type="button"
            onClick={() => setResetModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/5 px-3.5 py-2 font-mono text-xs font-bold text-red-400 hover:bg-red-500/15 hover:border-red-500/40 transition-all sm:ml-auto"
          >
            <Trash2 className="size-3.5" />
            <span>PURGE ALL LOCAL DATA</span>
          </button>
        </div>
      </div>

      {/* Confirmation Reset Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="panel max-w-md w-full p-6 border-red-500/40 bg-[#131B2A] shadow-2xl space-y-4 rounded-xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="size-5 flex-shrink-0" />
              <h4 className="font-mono text-sm font-bold uppercase tracking-wider">
                CONFIRM PURGE PROTOCOL (ZERO STATE)
              </h4>
            </div>

            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              This action will permanently wipe all local task boards, roadmap milestones, activity
              logs, streak counters, and session telemetry back to a clean zero state.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2.5 font-mono text-xs">
              <button
                type="button"
                onClick={() => setResetModalOpen(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-muted-foreground hover:text-foreground"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleConfirmPurge}
                className="rounded-lg bg-red-500/20 border border-red-500/50 px-4 py-2 font-bold text-red-300 hover:bg-red-500/30 transition-colors"
              >
                CONFIRM PURGE (ZERO STATE)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
